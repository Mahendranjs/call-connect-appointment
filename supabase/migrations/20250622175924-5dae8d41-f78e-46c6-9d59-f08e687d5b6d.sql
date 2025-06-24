
-- First, let's create the profiles table that will be automatically populated when users sign up
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  email text NOT NULL,
  role user_role DEFAULT 'staff',
  avatar_url text,
  phone text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create a businesses table to manage business information
CREATE TABLE IF NOT EXISTS public.businesses (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  owner_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  twilio_sid text,
  twilio_auth_token text,
  twilio_phone_number text,
  sms_auto_followup boolean DEFAULT false,
  call_recording_enabled boolean DEFAULT false,
  subscription_plan text DEFAULT 'free',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);

-- Add business_id column to profiles table first
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS business_id uuid;

-- Now add the foreign key constraint (without IF NOT EXISTS since it's not supported)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'profiles_business_id_fkey'
  ) THEN
    ALTER TABLE public.profiles 
    ADD CONSTRAINT profiles_business_id_fkey 
    FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Update existing tables to reference businesses instead of profiles directly
ALTER TABLE public.calls 
DROP CONSTRAINT IF EXISTS calls_business_id_fkey;

ALTER TABLE public.calls 
ADD CONSTRAINT calls_business_id_fkey 
FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON DELETE CASCADE;

ALTER TABLE public.clients 
DROP CONSTRAINT IF EXISTS clients_business_id_fkey;

ALTER TABLE public.clients 
ADD CONSTRAINT clients_business_id_fkey 
FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON DELETE CASCADE;

ALTER TABLE public.appointments 
DROP CONSTRAINT IF EXISTS appointments_business_id_fkey;

ALTER TABLE public.appointments 
ADD CONSTRAINT appointments_business_id_fkey 
FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON DELETE CASCADE;

ALTER TABLE public.sms_logs 
DROP CONSTRAINT IF EXISTS sms_logs_business_id_fkey;

ALTER TABLE public.sms_logs 
ADD CONSTRAINT sms_logs_business_id_fkey 
FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON DELETE CASCADE;

ALTER TABLE public.sms_templates 
DROP CONSTRAINT IF EXISTS sms_templates_business_id_fkey;

ALTER TABLE public.sms_templates 
ADD CONSTRAINT sms_templates_business_id_fkey 
FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON DELETE CASCADE;

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for businesses
DROP POLICY IF EXISTS "Business owners and staff can view their business" ON public.businesses;
CREATE POLICY "Business owners and staff can view their business" ON public.businesses
  FOR SELECT USING (
    auth.uid() = owner_id OR 
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE business_id = businesses.id
    )
  );

DROP POLICY IF EXISTS "Business owners can update their business" ON public.businesses;
CREATE POLICY "Business owners can update their business" ON public.businesses
  FOR UPDATE USING (auth.uid() = owner_id);

DROP POLICY IF EXISTS "Admins can create businesses" ON public.businesses;
CREATE POLICY "Admins can create businesses" ON public.businesses
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Update the handle_new_user function to create profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE((NEW.raw_user_meta_data ->> 'role')::user_role, 'staff')
  );
  RETURN NEW;
END;
$$;

-- Create or update the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to create business for admin users
CREATE OR REPLACE FUNCTION public.create_business_for_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  new_business_id uuid;
BEGIN
  -- Only create business if user is admin and doesn't have one
  IF NEW.role = 'admin' AND NEW.business_id IS NULL THEN
    -- Create new business
    INSERT INTO public.businesses (name, owner_id)
    VALUES (
      COALESCE(NEW.full_name || '''s Business', 'New Business'),
      NEW.id
    )
    RETURNING id INTO new_business_id;
    
    -- Update profile with business_id
    UPDATE public.profiles 
    SET business_id = new_business_id,
        updated_at = now()
    WHERE id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger to auto-create business for admin users
DROP TRIGGER IF EXISTS on_profile_created ON public.profiles;
CREATE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.create_business_for_admin();

-- Create the enum
CREATE TYPE "user_role" AS ENUM ('admin', 'staff');

-- Then create or update the table that uses it
ALTER TABLE profiles
  ADD COLUMN role user_role;
