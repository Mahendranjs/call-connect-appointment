
-- First, let's check the current state and fix the enum type issue
-- We need to ensure the enum exists in the correct schema

-- Drop the existing enum if it exists (to clean up any conflicts)
DROP TYPE IF EXISTS public.user_role CASCADE;

-- Create the user_role enum type in the public schema
CREATE TYPE public.user_role AS ENUM ('admin', 'staff');

-- Now fix the profiles table to use the correct enum type
-- First, drop the existing role column if it has issues
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;

-- Add the role column back with the correct enum type
ALTER TABLE public.profiles ADD COLUMN role public.user_role DEFAULT 'staff'::public.user_role;

-- Update the handle_new_user function to properly handle the role enum
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
    COALESCE((NEW.raw_user_meta_data ->> 'role')::public.user_role, 'staff'::public.user_role)
  );
  RETURN NEW;
END;
$$;

-- Ensure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
