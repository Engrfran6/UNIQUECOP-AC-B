'use client';

import type React from 'react';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Separator} from '@/components/ui/separator';
import {useAuth} from '@/contexts/AuthContext';
import {ArrowLeft, Eye, EyeOff, Lock, Mail} from 'lucide-react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const {
    isGuest,
    signIn,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    resetPassword,
    continueAsGuest,
  } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(email, password);
      router.push('/');
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'facebook' | 'twitter') => {
    setIsLoading(true);

    try {
      switch (provider) {
        case 'google':
          await signInWithGoogle();
          break;
        case 'facebook':
          await signInWithFacebook();
          break;
        case 'twitter':
          await signInWithTwitter();
          break;
      }
      router.push('/');
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      return;
    }

    try {
      await resetPassword(email);
      setResetEmailSent(true);
    } catch (error) {
      console.error('Password reset error:', error);
    }
  };

  const handleContinueAsGuest = () => {
    continueAsGuest();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center text-sage-green hover:text-sage-green/80 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Card className="bg-warm-white border-soft-taupe/20 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="font-playfair text-3xl text-charcoal-gray">
              Welcome Back
            </CardTitle>
            <p className="text-charcoal-gray/70">Sign in to your Uniquecop AC&B account</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Sign In */}
            <div className="space-y-3">
              <Button
                onClick={() => handleSocialSignIn('google')}
                disabled={isLoading}
                variant="outline"
                className="w-full border-soft-taupe/30 hover:bg-creamy-beige">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <Button
                onClick={() => handleSocialSignIn('facebook')}
                disabled={isLoading}
                variant="outline"
                className="w-full border-soft-taupe/30 hover:bg-creamy-beige">
                <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Continue with Facebook
              </Button>

              <Button
                onClick={() => handleSocialSignIn('twitter')}
                disabled={isLoading}
                variant="outline"
                className="w-full border-soft-taupe/30 hover:bg-creamy-beige">
                <svg className="w-5 h-5 mr-2" fill="#1DA1F2" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                Continue with Twitter
              </Button>
            </div>

            <div className="relative">
              <Separator className="bg-soft-taupe/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-warm-white px-4 text-sm text-charcoal-gray/70">or</span>
              </div>
            </div>

            {/* Email Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-charcoal-gray/50" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 bg-creamy-beige border-soft-taupe/30"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-charcoal-gray/50" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 bg-creamy-beige border-soft-taupe/30"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-charcoal-gray/50 hover:text-charcoal-gray">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="text-sm text-sage-green hover:text-sage-green/80"
                  disabled={!email || resetEmailSent}>
                  {resetEmailSent ? 'Reset email sent!' : 'Forgot password?'}
                </button>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full btn-accent">
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <Separator className="bg-soft-taupe/30" />

            {/* Guest Option */}
            {!isGuest && (
              <Button
                onClick={handleContinueAsGuest}
                variant="outline"
                className="w-full border-dusty-rose text-dusty-rose hover:bg-dusty-rose hover:text-warm-white bg-transparent">
                Continue as Guest
              </Button>
            )}

            <div className="text-center text-sm text-charcoal-gray/70">
              Don't have an account?{' '}
              <Link
                href="/auth/signup"
                className="text-sage-green hover:text-sage-green/80 font-medium">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
