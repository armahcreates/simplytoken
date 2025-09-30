import { useState, useEffect } from 'react';
import { X, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface OnboardingOverlayProps {
  isFirstLogin?: boolean;
  onDismiss?: () => void;
}

export function OnboardingOverlay({ isFirstLogin = false, onDismiss }: OnboardingOverlayProps) {
  const [showWelcome, setShowWelcome] = useState(isFirstLogin);
  const [showTooltips, setShowTooltips] = useState(false);

  useEffect(() => {
    if (isFirstLogin) {
      setShowWelcome(true);
    }
  }, [isFirstLogin]);

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    setShowTooltips(true);
    if (onDismiss) {
      onDismiss();
    }
    // Auto-hide tooltips after 10 seconds
    setTimeout(() => setShowTooltips(false), 10000);
  };

  return (
    <TooltipProvider>
      {/* Welcome Dialog */}
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              <span className="bg-gradient-to-r from-[#0A1F44] via-[#D4AF37] to-[#0A1F44] bg-clip-text text-transparent text-2xl font-bold">
                Welcome to SimplyToken™
              </span>
            </DialogTitle>
          </DialogHeader>
          <Card className="border-0 shadow-none">
            <CardContent className="space-y-4 pt-4">
              <p className="text-center text-muted-foreground">
                Your step-by-step tokenization roadmap
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-[#0A1F44]/5 rounded-lg border-l-4 border-[#0A1F44]">
                  <h4 className="font-semibold text-[#0A1F44]">Phase 1: SimplyReady</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete your asset health check to unlock Phase 2
                  </p>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  <p>Three more phases will unlock as you progress:</p>
                  <p className="font-medium mt-1">SimplyEngage → SimplyGovern → SimplyRaise</p>
                </div>
              </div>
              <div className="flex justify-center pt-4">
                <Button onClick={handleWelcomeClose} className="bg-[#0A1F44] hover:bg-[#0A1F44]/90">
                  Get Started
                </Button>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>

      {/* Tooltip Helpers */}
      {showTooltips && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="absolute top-20 right-6 pointer-events-auto">
            <Card className="bg-[#0A1F44] text-white border-[#D4AF37] shadow-lg">
              <CardContent className="p-3 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute -top-1 -right-1 h-6 w-6 p-0 text-white hover:bg-white/20"
                  onClick={() => setShowTooltips(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
                <div className="flex items-start gap-2 pr-6">
                  <HelpCircle className="h-4 w-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <div className="text-xs">
                    <p className="font-medium">Need help?</p>
                    <p className="text-white/80">Hover over ? icons for guidance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </TooltipProvider>
  );
}

// Tooltip wrapper component for form fields
export function HelpTooltip({ children, content }: { children: React.ReactNode; content: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            {children}
            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}