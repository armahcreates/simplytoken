'use client'

import * as React from 'react';
import { SignUp } from '@clerk/nextjs';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Info } from 'lucide-react';

export function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Simply Token
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Start your tokenization journey today
          </p>
        </div>

        {/* Clerk Sign Up Component */}
        <div className="flex items-center justify-center">
          <SignUp
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'shadow-lg border-0',
              },
            }}
            routing="path"
            path="/signup"
            signInUrl="/login"
            afterSignUpUrl="/onboarding"
          />
        </div>

        {/* Next Steps Info */}
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-blue-800">
            <strong>What happens next?</strong> After creating your account, you'll be guided through a personalized onboarding process to set up your tokenization project.
          </AlertDescription>
        </Alert>

        {/* Features */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-green-900 text-sm sm:text-base">
                What You'll Get Access To:
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-green-800">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Asset readiness assessment tools</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-800">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Community and stakeholder management</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-800">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Capital formation and investor tools</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-800">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Regulatory compliance guidance</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
