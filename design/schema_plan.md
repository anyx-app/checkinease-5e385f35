# CheckInEase Schema Plan

## Overview
This schema supports a vacation rental check-in system where Hosts manage Properties, and Guests access Bookings for those properties. The system focuses on providing information (Wifi, Rules, Recommendations) to guests during their stay.

## Tables

### 1. profiles
*   **Description**: Stores host profiles, linked to Supabase Auth.
*   **Columns**:
    *   `id` (uuid, PK) - References `auth.users.id`
    *   `full_name` (text)
    *   `avatar_url` (text)
    *   `created_at` (timestamptz)

### 2. properties
*   **Description**: Vacation rental units managed by a host.
*   **Columns**:
    *   `id` (uuid, PK)
    *   `host_id` (uuid, FK) - References `profiles.id`
    *   `title` (text) - e.g., "Oceanview Condo"
    *   `address` (text)
    *   `image_url` (text) - Hero image for the welcome guide
    *   `wifi_ssid` (text, nullable)
    *   `wifi_password` (text, nullable)
    *   `check_in_time` (time)
    *   `check_out_time` (time)
    *   `parking_instructions` (text)
    *   `access_instructions` (text) - General instructions for entering (e.g., "Keypad on front door")
    *   `created_at` (timestamptz)

### 3. bookings
*   **Description**: Specific stays for guests. Used to generate unique access links or welcome pages.
*   **Columns**:
    *   `id` (uuid, PK)
    *   `property_id` (uuid, FK) - References `properties.id`
    *   `guest_name` (text)
    *   `guest_email` (text)
    *   `check_in_date` (date)
    *   `check_out_date` (date)
    *   `access_code` (text) - Specific door code for this booking (optional/override)
    *   `status` (text) - 'upcoming', 'active', 'completed', 'cancelled'
    *   `created_at` (timestamptz)

### 4. house_rules
*   **Description**: List of rules for a specific property.
*   **Columns**:
    *   `id` (uuid, PK)
    *   `property_id` (uuid, FK) - References `properties.id`
    *   `rule` (text)
    *   `category` (text) - e.g., 'Safety', 'Noise', 'General'
    *   `order_index` (int) - For sorting display
    *   `created_at` (timestamptz)

### 5. local_recommendations
*   **Description**: Host recommendations for food, activities, etc.
*   **Columns**:
    *   `id` (uuid, PK)
    *   `property_id` (uuid, FK) - References `properties.id`
    *   `title` (text)
    *   `description` (text)
    *   `category` (text) - e.g., 'Dining', 'Shopping', 'Adventure'
    *   `location_address` (text, nullable)
    *   `link_url` (text, nullable)
    *   `created_at` (timestamptz)

### 6. emergency_contacts
*   **Description**: Important numbers for guests.
*   **Columns**:
    *   `id` (uuid, PK)
    *   `property_id` (uuid, FK) - References `properties.id`
    *   `name` (text) - e.g., "Local Hospital", "Property Manager"
    *   `phone` (text)
    *   `type` (text) - e.g., 'Emergency', 'Medical', 'Service'
    *   `created_at` (timestamptz)

## Relationships
*   `profiles` (1) -> (Many) `properties`
*   `properties` (1) -> (Many) `bookings`
*   `properties` (1) -> (Many) `house_rules`
*   `properties` (1) -> (Many) `local_recommendations`
*   `properties` (1) -> (Many) `emergency_contacts`

## Security Policies (RLS)
*   **Hosts**: Can CRUD everything related to their own `properties`.
*   **Guests**: Can READ `properties`, `house_rules`, `local_recommendations`, `emergency_contacts` IF they have a valid booking OR via a public property link (depending on desired privacy level). For MVP, likely open read for property-related tables if uuid is known, or restricted by a "guest token".
