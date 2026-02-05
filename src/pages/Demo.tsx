import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroVideo } from '@/components/recipes/heroes';

export default function Demo() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen">
      <HeroVideo
        badge="Interactive Demo"
        title="Experience CheckInEase"
        subtitle="See how easy it is to manage your vacation rental check-ins. Watch the video to learn more."
        primaryCta="Start for Free"
        onPrimaryClick={() => navigate('/onboarding')}
        videoUrl="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        posterImage="https://images.unsplash.com/photo-1556912173-3db996e16054?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        overlayOpacity={50}
        contentPosition="center"
      />
      
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Ready to streamline your check-ins?</h2>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Join thousands of hosts who are saving time and impressing guests with CheckInEase.
        </p>
      </div>
    </div>
  );
}

