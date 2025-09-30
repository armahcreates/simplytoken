'use client'

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SignIn } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Simply Token
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Welcome back to your tokenization platform
          </p>
        </div>

        {/* Clerk Sign In Component */}
        <div className="flex items-center justify-center">
          <SignIn
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'shadow-lg border-0',
              },
            }}
            routing="path"
            path="/login"
            signUpUrl="/signup"
            afterSignInUrl="/"
          />
        </div>

        {/* Features */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-blue-900 text-sm sm:text-base">
                Why Choose Simply Token?
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-blue-800">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span>Comprehensive tokenization platform</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-800">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span>Regulatory compliance tools</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-800">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span>Community and investor management</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>
            By signing in, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-foreground">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
