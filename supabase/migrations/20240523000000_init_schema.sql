SET search_path TO proj_c7ff06f3;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. profiles
-- Stores host profiles. ID matches Supabase Auth ID logically.
CREATE TABLE profiles (
    id UUID PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (id::text = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (id::text = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- 2. properties
-- Vacation rental units managed by a host.
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    address TEXT,
    image_url TEXT,
    wifi_ssid TEXT,
    wifi_password TEXT,
    check_in_time TIME,
    check_out_time TIME,
    parking_instructions TEXT,
    access_instructions TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_properties_host_id ON properties(host_id);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hosts can CRUD their own properties" ON properties
    USING (host_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Public read access for properties" ON properties
    FOR SELECT USING (true);

-- 3. bookings
-- Specific stays for guests.
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    guest_name TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    access_code TEXT,
    status TEXT DEFAULT 'upcoming', -- 'upcoming', 'active', 'completed', 'cancelled'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bookings_property_id ON bookings(property_id);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hosts can view bookings for their properties" ON bookings
    USING (EXISTS (
        SELECT 1 FROM properties 
        WHERE properties.id = bookings.property_id 
        AND properties.host_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    ));
    
CREATE POLICY "Hosts can insert bookings" ON bookings
    WITH CHECK (EXISTS (
        SELECT 1 FROM properties 
        WHERE properties.id = bookings.property_id 
        AND properties.host_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    ));

-- 4. house_rules
CREATE TABLE house_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    rule TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_house_rules_property_id ON house_rules(property_id);

ALTER TABLE house_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hosts can CRUD house rules" ON house_rules
    USING (EXISTS (
        SELECT 1 FROM properties 
        WHERE properties.id = house_rules.property_id 
        AND properties.host_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    ));

CREATE POLICY "Public read access for house rules" ON house_rules
    FOR SELECT USING (true);

-- 5. local_recommendations
CREATE TABLE local_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'General',
    location_address TEXT,
    link_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_local_recommendations_property_id ON local_recommendations(property_id);

ALTER TABLE local_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hosts can CRUD recommendations" ON local_recommendations
    USING (EXISTS (
        SELECT 1 FROM properties 
        WHERE properties.id = local_recommendations.property_id 
        AND properties.host_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    ));

CREATE POLICY "Public read access for recommendations" ON local_recommendations
    FOR SELECT USING (true);

-- 6. emergency_contacts
CREATE TABLE emergency_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    type TEXT DEFAULT 'Emergency',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_emergency_contacts_property_id ON emergency_contacts(property_id);

ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hosts can CRUD emergency contacts" ON emergency_contacts
    USING (EXISTS (
        SELECT 1 FROM properties 
        WHERE properties.id = emergency_contacts.property_id 
        AND properties.host_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    ));

CREATE POLICY "Public read access for emergency contacts" ON emergency_contacts
    FOR SELECT USING (true);
