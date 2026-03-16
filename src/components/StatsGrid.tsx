import React from 'react';
import { TrendingUp, TrendingDown, FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const stats = [
  {
    label: 'Total Invoices',
    value: '1,284',
    change: '+12.5%',
    trend: 'up',
    icon: FileText,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    label: 'Pending Approval',
    value: '42',
    change: '-3.2%',
    trend: 'down',
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    label: 'Processed Today',
    value: '156',
    change: '+18.4%',
    trend: 'up',
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    label: 'OCR Accuracy',
    value: '98.2%',
    change: '+0.4%',
    trend: 'up',
    icon: AlertCircle,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className={cn("p-2 rounded-xl", stat.bg)}>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <div className={cn(
              "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
              stat.trend === 'up' ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
            )}>
              {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {stat.change}
            </div>
          </div>
          <div>
            <p className="text-sm text-zinc-500 font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-zinc-900 mt-1">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
