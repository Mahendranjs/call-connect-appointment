
-- Create the user_role enum type if it doesn't exist
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('admin', 'staff');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Ensure the profiles table uses the correct enum type
ALTER TABLE public.profiles 
ALTER COLUMN role SET DEFAULT 'staff'::user_role;

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
    COALESCE((NEW.raw_user_meta_data ->> 'role')::user_role, 'staff'::user_role)
  );
  RETURN NEW;
END;
$$;

-- Ensure RLS policies are properly set up
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

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
