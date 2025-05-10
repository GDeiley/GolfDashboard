'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Email and password are required.');
      return;
    }

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="bg-gradient-golfbag">
      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#1d3557' }}>
          {isSignUp ? 'Sign Up' : 'Log In'}
        </h2>
        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="golf-input"
            style={{ marginBottom: '1rem' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="golf-input"
            style={{ marginBottom: '1rem' }}
          />
          <button type="submit" className="cool-golf-button" style={{ width: '100%' }}>
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
          {errorMsg && <p style={{ color: 'red', marginTop: '1rem' }}>{errorMsg}</p>}
        </form>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            style={{
              textDecoration: 'underline',
              background: 'none',
              border: 'none',
              color: '#1d3557',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            {isSignUp ? 'Log in here' : 'Sign up here'}
          </button>
        </p>
      </div>
    </div>
  );
}
