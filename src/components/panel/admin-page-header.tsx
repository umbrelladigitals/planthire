import React from 'react';

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b-2 border-slate-900 pb-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-black uppercase tracking-widest text-slate-900">
          {title}
        </h1>
        {description && (
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="flex items-center">
          {action}
        </div>
      )}
    </div>
  );
}