import React from 'react';
import { Play, Pause, Settings, Clock, Calendar, CheckCircle2, AlertCircle, RefreshCw, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

const jobs = [
  {
    id: 'JOB-001',
    name: 'Monthly Payroll Sync',
    type: 'ERP Integration',
    schedule: 'Every 1st of month',
    nextRun: 'Apr 01, 2024',
    status: 'active',
    lastSuccess: 'Mar 01, 2024',
    accuracy: '100%'
  },
  {
    id: 'JOB-002',
    name: 'Daily Bank Reconciliation',
    type: 'Bank Sync',
    schedule: 'Daily at 02:00 AM',
    nextRun: 'Mar 17, 2024',
    status: 'active',
    lastSuccess: 'Mar 16, 2024',
    accuracy: '98.5%'
  },
  {
    id: 'JOB-003',
    name: 'Vendor KYC Audit',
    type: 'Compliance',
    schedule: 'Weekly on Mondays',
    nextRun: 'Mar 23, 2024',
    status: 'paused',
    lastSuccess: 'Mar 09, 2024',
    accuracy: 'N/A'
  },
  {
    id: 'JOB-004',
    name: 'GST Return Auto-Draft',
    type: 'Taxation',
    schedule: 'Every 10th of month',
    nextRun: 'Apr 10, 2024',
    status: 'error',
    lastSuccess: 'Feb 10, 2024',
    accuracy: '94.2%'
  }
];

export function Automation() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Automation Jobs</h1>
          <p className="text-zinc-500 mt-1">Configure and monitor recurring accounting entries and system integrations.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200">
          <Zap className="w-4 h-4" />
          Create New Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <p className="text-sm text-zinc-500 font-medium">Active Automations</p>
          <div className="flex items-center justify-between mt-2">
            <h3 className="text-2xl font-bold text-zinc-900">12</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+2 this month</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <p className="text-sm text-zinc-500 font-medium">Total Tasks Executed</p>
          <div className="flex items-center justify-between mt-2">
            <h3 className="text-2xl font-bold text-zinc-900">8,420</h3>
            <span className="text-xs font-bold text-zinc-400">Last 30 days</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <p className="text-sm text-zinc-500 font-medium">Time Saved (Est.)</p>
          <div className="flex items-center justify-between mt-2">
            <h3 className="text-2xl font-bold text-zinc-900">142 hrs</h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">ROI: 4.2x</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100">
          <h3 className="text-lg font-bold text-zinc-900">Recurring Accounting Jobs</h3>
        </div>
        <div className="divide-y divide-zinc-100">
          {jobs.map((job) => (
            <div key={job.id} className="p-6 hover:bg-zinc-50/50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  job.status === 'active' ? "bg-indigo-50 text-indigo-600" :
                  job.status === 'paused' ? "bg-zinc-100 text-zinc-400" :
                  "bg-red-50 text-red-600"
                )}>
                  <RefreshCw className={cn("w-6 h-6", job.status === 'active' && "animate-spin-slow")} />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900">{job.name}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-medium text-zinc-500 flex items-center gap-1">
                      <Settings className="w-3 h-3" /> {job.type}
                    </span>
                    <span className="text-xs font-medium text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {job.schedule}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="text-right">
                  <p className="text-xs text-zinc-400 uppercase font-bold tracking-wider">Next Run</p>
                  <p className="text-sm font-medium text-zinc-900 mt-1 flex items-center gap-1 justify-end">
                    <Calendar className="w-3 h-3" /> {job.nextRun}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-400 uppercase font-bold tracking-wider">Last Success</p>
                  <p className="text-sm font-medium text-emerald-600 mt-1 flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3 h-3" /> {job.lastSuccess}
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
