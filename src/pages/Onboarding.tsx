import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroCTA } from '@/components/recipes/heroes/HeroCTA';
import { FeatureShowcase } from '@/components/recipes/features/FeatureShowcase';

export default function Onboarding() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="w-full">
      <HeroCTA
        title="Welcome to CheckInEase"
        subtitle="Let's get your property set up in minutes."
        badge="Get Started"
        pricingTiers={[
          {
            name: "Free Forever",
            price: "$0",
            period: "/ month",
            description: "Perfect for getting started with your first property.",
            features: [
              "1 Property",
              "Digital Welcome Guide",
              "House Rules & WiFi",
              "Local Recommendations"
            ],
            cta: "Create Free Account",
            highlighted: true,
            onCtaClick: handleGetStarted
          }
        ]}
      />
      
      <FeatureShowcase
        title="Everything you need to host"
        description="Set up your property guide once, and share it with every guest automatically."
        features={[
          {
            title: "Digital Guide",
            description: "Create a beautiful, mobile-friendly guide for your property."
          },
          {
            title: "Access Codes",
            description: "Securely share door codes and wifi passwords."
          },
          {
            title: "Local Recommendations",
            description: "Share your favorite local spots with your guests."
          }
        ]}
        imageSide="right"
      />
    </div>
  );
}

