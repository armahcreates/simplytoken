import React from 'react';

interface FormSectionProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

export function FormSection({ number, title, children }: FormSectionProps) {
  return (
    <div className="space-y-6 pt-6">
      <div className="flex items-center gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
          {number}
        </div>
        <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
      </div>
      <div className="pl-0 sm:pl-12">{children}</div>
    </div>
  );
}
