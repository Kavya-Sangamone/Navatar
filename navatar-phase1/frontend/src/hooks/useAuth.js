import { useState, useEffect, useCallback } from 'react';

// Hardcoded super admin emails for now - later we'll move this to backend
const AUTHORIZED_EMAILS = [
  'kavyashankarkulal.sangamone@gmail.com'
];

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleGoogleResponse = useCallback(async (response) => {
    try {
      // Decode the JWT token to get user information
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const { email, name, picture } = JSON.parse(jsonPayload);

      // Check if email is authorized
      if (!AUTHORIZED_EMAILS.includes(email)) {
        setError('Unauthorized email address');
        setUser(null);
        return;
      }

      setUser({
        email,
        name,
        picture,
        role: 'super_admin'
      });
      setError(null);
    } catch (err) {
      console.error('Failed to process auth response:', err);
      setError('Failed to process authentication response');
      setUser(null);
    }
  }, []);

  const initializeGoogleAuth = useCallback(async () => {
    if (isInitialized) return;

    try {
      console.log('Starting Google Auth initialization...');
      await new Promise((resolve, reject) => {
        if (window.google) {
          console.log('Google API already loaded');
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.onload = () => {
          console.log('Google Auth script loaded successfully');
          resolve();
        };
        script.onerror = (error) => {
          console.error('Failed to load Google Auth script:', error);
          reject(error);
        };
        document.body.appendChild(script);
      });

      // Wait a bit to ensure the API is fully loaded
      await new Promise(resolve => setTimeout(resolve, 100));

      if (!process.env.REACT_APP_GOOGLE_CLIENT_ID) {
        throw new Error('REACT_APP_GOOGLE_CLIENT_ID is not defined in environment variables');
      }

      if (!window.google?.accounts?.id) {
        throw new Error('Google API not properly loaded');
      }

      console.log('Initializing Google Auth with client ID...');
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      // Configure the custom button
      window.google.accounts.id.renderButton(
        document.getElementById('googleButton'),
        { 
          type: 'standard',
          theme: 'filled_blue',
          size: 'large',
          text: 'continue_with',
          shape: 'rectangular',
          logo_alignment: 'left',
          width: 280,
          locale: 'en'
        }
      );

      console.log('Google Auth initialized successfully');
      setIsInitialized(true);
      setLoading(false);
    } catch (err) {
      console.error('Failed to initialize Google Auth:', err);
      setError('Failed to initialize authentication: ' + err.message);
      setLoading(false);
    }
  }, [handleGoogleResponse, isInitialized]);

  const login = useCallback(async () => {
    try {


      if (!isInitialized) {
        await initializeGoogleAuth();
      }

      if (!window.google?.accounts?.id) {
        throw new Error('Google authentication is not initialized');
      }

      // Instead of showing the prompt, we'll click the hidden Google button
      const googleButton = document.getElementById('googleButton')?.querySelector('div[role="button"]');
      if (googleButton) {
        googleButton.click();
      } else {
        throw new Error('Google Sign-In button not found');
      }
    } catch (err) {
      console.error('Failed to trigger Google Sign-In:', err);
      setError('Failed to start login process: ' + err.message);
    }
  }, [isInitialized, initializeGoogleAuth]);

  const logout = useCallback(() => {
    if (window.google?.accounts?.id && user?.email) {
      window.google.accounts.id.revoke(user.email, () => {
        setUser(null);
        setError(null);
      });
    } else {
      setUser(null);
      setError(null);
    }
  }, [user?.email]);

  useEffect(() => {
    initializeGoogleAuth();
  }, [initializeGoogleAuth]);

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user
  };
}; 