import React from 'react';
import { StatsGrid } from '../components/StatsGrid';
import { TrendsChart } from '../components/TrendsChart';
import { RecentActivity } from '../components/RecentActivity';
import { PriorityInvoices } from '../components/PriorityInvoices';
import { Plus, Download, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export function ExecutiveDashboard({ onSelectInvoice }: { onSelectInvoice: (id: string) => void }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Executive Dashboard</h1>
          <p className="text-zinc-500 mt-1">Real-time overview of your Tally ERP automation and financial health.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Tally Connected</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200">
            <Plus className="w-4 h-4" />
            New Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Revenue Sync', value: '98.2%', status: 'Healthy', icon: RefreshCw, color: 'text-indigo-600' },
          { label: 'Bank Recon', value: '84/92', status: 'Pending', icon: CheckCircle2, color: 'text-emerald-600' },
          { label: 'OCR Accuracy', value: '99.4%', status: 'Optimal', icon: CheckCircle2, color: 'text-blue-600' },
          { label: 'Pending Validations', value: '14', status: 'Action Required', icon: AlertCircle, color: 'text-amber-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg bg-zinc-50", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{stat.status}</span>
            </div>
            <p className="text-sm text-zinc-500 font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-zinc-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <TrendsChart />
          <PriorityInvoices onSelectInvoice={onSelectInvoice} />
        </div>
        <div className="space-y-8">
          <RecentActivity />
          <div className="bg-zinc-900 rounded-2xl p-6 text-white overflow-hidden relative">
            <div className="relative z-10">
              <h4 className="font-bold text-lg mb-2">Tally Sync Health</h4>
              <p className="text-zinc-400 text-sm mb-4">Last successful sync was 12 minutes ago. All modules are operational.</p>
              <div className="space-y-3">
                {['Invoices', 'Revenue', 'Bank', 'Masters'].map((m) => (
                  <div key={m} className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">{m}</span>
                    <span className="text-emerald-400 font-bold">ACTIVE</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
