import React from 'react';
import { Clock, Plus, Play, Pause, Settings, CheckCircle2, AlertCircle, Calendar, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

const recurringJobs = [
  { id: 'REC-001', name: 'Office Lease Payment', type: 'Lease', schedule: '1st of month', amount: '₹1,25,000', status: 'active', lastRun: 'Mar 01, 2024' },
  { id: 'REC-002', name: 'Interest Accrual - Loan A', type: 'Interest', schedule: 'Last day of month', amount: '₹42,000', status: 'active', lastRun: 'Feb 29, 2024' },
  { id: 'REC-003', name: 'Software Subscriptions', type: 'SaaS', schedule: '15th of month', amount: '₹18,500', status: 'paused', lastRun: 'Feb 15, 2024' },
];

export function RecurringAutomation() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Recurring Accounting Automation</h1>
          <p className="text-zinc-500 mt-1">Automate recurring entries like leases, interest accruals, and subscriptions in Tally.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 shadow-sm shadow-indigo-200">
          <Plus className="w-4 h-4" />
          New Automation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <p className="text-sm text-zinc-500 font-medium">Active Automations</p>
          <div className="flex items-center justify-between mt-2">
            <h3 className="text-2xl font-bold text-zinc-900">8</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">All Healthy</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <p className="text-sm text-zinc-500 font-medium">Vouchers Created (MTD)</p>
          <div className="flex items-center justify-between mt-2">
            <h3 className="text-2xl font-bold text-zinc-900">24</h3>
            <span className="text-xs font-bold text-zinc-400">Next run in 2 days</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <p className="text-sm text-zinc-500 font-medium">Automation Accuracy</p>
          <div className="flex items-center justify-between mt-2">
            <h3 className="text-2xl font-bold text-zinc-900">100%</h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">No Errors</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100">
          <h3 className="text-lg font-bold text-zinc-900">Automated Recurring Vouchers</h3>
        </div>
        <div className="divide-y divide-zinc-100">
          {recurringJobs.map((job) => (
            <div key={job.id} className="p-6 hover:bg-zinc-50/50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  job.status === 'active' ? "bg-indigo-50 text-indigo-600" : "bg-zinc-100 text-zinc-400"
                )}>
                  <Zap className={cn("w-6 h-6", job.status === 'active' && "animate-pulse")} />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900">{job.name}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-medium text-zinc-500 flex items-center gap-1">
                      <Settings className="w-3 h-3" /> {job.type}
                    </span>
                    <span className="text-xs font-medium text-zinc-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {job.schedule}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="text-right">
                  <p className="text-xs text-zinc-400 uppercase font-bold tracking-wider">Amount</p>
                  <p className="text-sm font-bold text-zinc-900 mt-1">{job.amount}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-400 uppercase font-bold tracking-wider">Last Run</p>
                  <p className="text-sm font-medium text-emerald-600 mt-1 flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3 h-3" /> {job.lastRun}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                    {job.status === 'active' ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <button className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-all">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
