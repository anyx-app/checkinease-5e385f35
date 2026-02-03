import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleCallback } from '@/lib/auth';
import { Loader2 } from 'lucide-react';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Attempt to handle the callback (parse tokens from URL)
        const session = handleCallback();
        
        if (session) {
          // Successful auth, redirect to dashboard
          // We could also check for a 'next' param in the URL
          navigate('/dashboard', { replace: true });
        } else {
          // No session found in URL, check for error params
          const params = new URLSearchParams(window.location.search);
          const errorParam = params.get('error');
          const errorDescription = params.get('error_description');
          
          if (errorParam) {
            throw new Error(errorDescription || errorParam);
          }
          
          // If no tokens and no error, just redirect to login
          navigate('/login', { replace: true });
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
        // Delay redirect to let user see error
        setTimeout(() => {
          navigate('/login', { 
            replace: true,
            state: { error: err instanceof Error ? err.message : 'Authentication failed' }
          });
        }, 2000);
      }
    };

    processCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <div className="w-full max-w-md rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center text-destructive">
          <h2 className="mb-2 text-lg font-semibold">Authentication Error</h2>
          <p>{error}</p>
          <p className="mt-4 text-sm text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Completing authentication...</p>
      </div>
    </div>
  );
}

