'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

export type PhaseId = 'simply-ready' | 'simply-engage' | 'simply-govern' | 'simply-raise';

interface Phase {
  id: PhaseId;
  name: string;
  completed: boolean;
  progress: number; // 0-100
  startedAt?: Date;
  completedAt?: Date;
}

interface JourneyState {
  phases: Record<PhaseId, Phase>;
  currentPhase: PhaseId;
  isFirstLogin: boolean;
}

interface JourneyContextType {
  journeyState: JourneyState;
  completePhase: (phaseId: PhaseId) => void;
  updatePhaseProgress: (phaseId: PhaseId, progress: number) => void;
  setCurrentPhase: (phaseId: PhaseId) => void;
  dismissFirstLogin: () => void;
  getVisiblePhases: () => Phase[];
  getArchivedPhases: () => Phase[];
}

const defaultJourneyState: JourneyState = {
  phases: {
    'simply-ready': {
      id: 'simply-ready',
      name: 'SimplyReady',
      completed: false,
      progress: 0,
    },
    'simply-engage': {
      id: 'simply-engage',
      name: 'SimplyEngage',
      completed: false,
      progress: 0,
    },
    'simply-govern': {
      id: 'simply-govern',
      name: 'SimplyGovern',
      completed: false,
      progress: 0,
    },
    'simply-raise': {
      id: 'simply-raise',
      name: 'SimplyRaise',
      completed: false,
      progress: 0,
    },
  },
  currentPhase: 'simply-ready',
  isFirstLogin: true,
};

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export function JourneyProvider({ children }: { children: React.ReactNode }) {
  const [journeyState, setJourneyState] = useState<JourneyState>(defaultJourneyState);

  // Load journey state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('simplytoken_journey');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setJourneyState(parsed);
      } catch (error) {
        console.error('Failed to parse journey state:', error);
      }
    }
  }, []);

  // Persist journey state to localStorage
  useEffect(() => {
    localStorage.setItem('simplytoken_journey', JSON.stringify(journeyState));
  }, [journeyState]);

  const completePhase = (phaseId: PhaseId) => {
    setJourneyState((prev) => ({
      ...prev,
      phases: {
        ...prev.phases,
        [phaseId]: {
          ...prev.phases[phaseId],
          completed: true,
          progress: 100,
          completedAt: new Date(),
        },
      },
    }));
  };

  const updatePhaseProgress = (phaseId: PhaseId, progress: number) => {
    setJourneyState((prev) => ({
      ...prev,
      phases: {
        ...prev.phases,
        [phaseId]: {
          ...prev.phases[phaseId],
          progress: Math.min(100, Math.max(0, progress)),
          startedAt: prev.phases[phaseId].startedAt || new Date(),
        },
      },
    }));
  };

  const setCurrentPhase = (phaseId: PhaseId) => {
    setJourneyState((prev) => ({
      ...prev,
      currentPhase: phaseId,
    }));
  };

  const dismissFirstLogin = () => {
    setJourneyState((prev) => ({
      ...prev,
      isFirstLogin: false,
    }));
  };

  const getVisiblePhases = (): Phase[] => {
    const phaseOrder: PhaseId[] = ['simply-ready', 'simply-engage', 'simply-govern', 'simply-raise'];
    const completedCount = phaseOrder.filter((id) => journeyState.phases[id].completed).length;

    // Show completed phases + the next unlocked phase
    const visiblePhaseIds = phaseOrder.slice(0, Math.min(completedCount + 1, phaseOrder.length));
    return visiblePhaseIds.map((id) => journeyState.phases[id]);
  };

  const getArchivedPhases = (): Phase[] => {
    return Object.values(journeyState.phases).filter((phase) => phase.completed);
  };

  return (
    <JourneyContext.Provider
      value={{
        journeyState,
        completePhase,
        updatePhaseProgress,
        setCurrentPhase,
        dismissFirstLogin,
        getVisiblePhases,
        getArchivedPhases,
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney() {
  const context = useContext(JourneyContext);
  if (context === undefined) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return context;
}
