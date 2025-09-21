import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <>
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center text-sm text-muted-foreground">
          <span>© 2025 PRISM FLOW. All rights reserved.</span>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Contact Support</a>
          </div>
        </div>
      </footer>
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="icon" className="rounded-full h-14 w-14 bg-blue-600 hover:bg-blue-700 shadow-lg">
          <HelpCircle className="h-7 w-7 text-white" />
        </Button>
      </div>
    </>
  );
}
