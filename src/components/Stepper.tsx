import { cn } from '@/lib/utils';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute top-0 right-0 text-sm text-muted-foreground -mt-6">
          Step {currentStep} of {steps.length}
        </div>
        <div className="relative w-full h-2 bg-gray-200 rounded-full">
            <div
            className="absolute top-0 left-0 h-2 bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep - 0.5) / (steps.length)) * 100}%` }}
            />
        </div>
        <div className="mt-2 grid" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            
            return (
              <div
                key={step}
                className={cn(
                  'text-center text-sm font-medium',
                  isActive ? 'text-blue-600' : 'text-muted-foreground',
                  index === 0 && 'text-left',
                  index === steps.length - 1 && 'text-right'
                )}
              >
                {step}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
