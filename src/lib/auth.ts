import { getAnyxConfig } from '../config/anyx';

export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: Record<string, any>;
  app_metadata?: Record<string, any>;
}

export interface AuthSession {
  user: AuthUser | null;
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
}

const STORAGE_KEY = 'anyx.auth.session';

export function getSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const item = window.localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

export function setSession(session: AuthSession) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new CustomEvent('auth-session-change', { detail: session }));
}

export async function signOut() {
  if (typeof window === 'undefined') return;
  
  // Optional: Call backend to revoke token if supported
  try {
    await authRequest('/logout', 'POST');
  } catch (e) {
    // Ignore error on logout
    console.warn('Logout API call failed', e);
  }

  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('auth-session-change', { detail: null }));
}

// API Client Implementation

const { serverUrl, projectId } = getAnyxConfig();
const AUTH_BASE_URL = `${serverUrl}/api/projects/${projectId}/auth`;

async function authRequest(endpoint: string, method: string, body?: any) {
  if (!projectId) throw new Error('Project ID not configured');
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add auth token if available (for logout or other authenticated requests)
  const session = getSession();
  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  const response = await fetch(`${AUTH_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Authentication failed');
  }

  return data;
}

export async function login(email: string, password: string): Promise<{ session: AuthSession; user: AuthUser }> {
  const data = await authRequest('/login', 'POST', { email, password });
  
  // Normalize session structure if needed
  const session: AuthSession = {
    user: data.user,
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    expires_in: data.session.expires_in,
    token_type: data.session.token_type,
  };

  setSession(session);
  return { session, user: data.user };
}

export async function signup(email: string, password: string, metadata?: Record<string, any>): Promise<{ user: AuthUser; message?: string }> {
  return authRequest('/signup', 'POST', { 
    email, 
    password,
    user_metadata: metadata 
  });
}

export async function confirm(token: string, type: string, redirectTo?: string): Promise<{ session: AuthSession; user: AuthUser }> {
  const data = await authRequest('/verify', 'POST', { token, type, redirect_to: redirectTo });
  
  const session: AuthSession = {
    user: data.user,
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    expires_in: data.session.expires_in,
    token_type: data.session.token_type,
  };

  setSession(session);
  return { session, user: data.user };
}

export async function initiateOAuth(provider: string, redirectTo: string): Promise<{ auth_url: string }> {
  return authRequest(`/oauth/${provider}`, 'POST', { redirect_to: redirectTo });
}

export function handleCallback(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');
  const error = params.get('error');

  if (error) {
    throw new Error(error);
  }

  if (accessToken) {
    const session: AuthSession = {
      user: null, 
      access_token: accessToken,
      refresh_token: refreshToken || undefined,
    };
    
    // Try to decode JWT payload for basic user info
    try {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      session.user = {
        id: payload.sub,
        email: payload.email,
        user_metadata: payload.user_metadata,
        app_metadata: payload.app_metadata,
      };
    } catch (e) {
      console.error('Failed to decode JWT', e);
    }

    setSession(session);
    return session;
  }

  return null;
}

