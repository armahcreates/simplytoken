'use client'

import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

const phases = [
  { id: 1, name: 'SimplyReady', path: '/asset-readiness' },
  { id: 2, name: 'SimplyEngage', path: '/community-management' },
  { id: 3, name: 'SimplyGovern', path: '/governance-tools' },
  { id: 4, name: 'SimplyRaise', path: '/capital-formation' },
];

export function ProgressBreadcrumb() {
  const pathname = usePathname();

  // Determine current phase based on path
  const getCurrentPhase = () => {
    for (const phase of phases) {
      if (pathname.startsWith(phase.path)) {
        return phase.id;
      }
    }
    return 1; // Default to first phase
  };

  const currentPhase = getCurrentPhase();

  return (
    <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0A1F44]/5 to-[#D4AF37]/5 border-b">
      <div className="flex items-center gap-1 text-sm">
        {phases.map((phase, index) => (
          <div key={phase.id} className="flex items-center gap-1">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                phase.id === currentPhase
                  ? 'bg-[#0A1F44] text-white'
                  : phase.id < currentPhase
                  ? 'bg-[#D4AF37] text-[#0A1F44]'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {phase.id}. {phase.name}
            </span>
            {index < phases.length - 1 && (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}