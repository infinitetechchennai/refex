import React from 'react';
import { Layers, ArrowRight, Database, CheckCircle2, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

const revenueEntries = [
  { id: 'REV-001', source: 'Tech Portal', type: 'Subscription', amount: '₹4,50,000', status: 'pending', date: 'Mar 15, 2024' },
  { id: 'REV-002', source: 'Tech Portal', type: 'Ad Revenue', amount: '₹1,20,000', status: 'synced', date: 'Mar 14, 2024' },
  { id: 'REV-003', source: 'Tech Portal', type: 'Service Fee', amount: '₹85,000', status: 'error', date: 'Mar 14, 2024' },
];

export function RevenueIntegration() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Revenue Integration</h1>
          <p className="text-zinc-500 mt-1">Sync revenue entries from Tech Portal directly to Tally ERP vouchers.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-all">
            <RefreshCw className="w-4 h-4" />
            Sync Transactions
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm">
            <ExternalLink className="w-4 h-4" />
            Open Tech Portal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900">Revenue Voucher Queue</h3>
              <button className="text-sm font-medium text-indigo-600">Post All to Tally</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50/50">
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Transaction ID</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {revenueEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-zinc-900">{entry.id}</td>
                      <td className="px-6 py-4 text-sm text-zinc-600">{entry.type}</td>
                      <td className="px-6 py-4 text-sm font-bold text-zinc-900">{entry.amount}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                          entry.status === 'synced' ? "bg-emerald-50 text-emerald-700" :
                          entry.status === 'pending' ? "bg-amber-50 text-amber-700" :
                          "bg-red-50 text-red-700"
                        )}>
                          {entry.status === 'synced' ? <CheckCircle2 className="w-3 h-3" /> : 
                           entry.status === 'pending' ? <RefreshCw className="w-3 h-3" /> : 
                           <AlertCircle className="w-3 h-3" />}
                          {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-xs font-bold text-indigo-600 hover:underline">
                          Generate Voucher
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-100">
              <h3 className="text-lg font-bold text-zinc-900">Sync Logs</h3>
            </div>
            <div className="p-6 space-y-4">
              {[
                { time: '10:45 AM', msg: 'Successfully synced 124 revenue entries to Tally.', status: 'success' },
                { time: '09:12 AM', msg: 'Failed to sync voucher REV-003: Ledger mapping missing.', status: 'error' },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span className="text-zinc-400 font-mono whitespace-nowrap">{log.time}</span>
                  <p className={log.status === 'error' ? 'text-red-600' : 'text-zinc-600'}>{log.msg}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-900 mb-4">Integration Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">Tech Portal</span>
                </div>
                <span className="text-xs font-bold text-emerald-600">Connected</span>
              </div>
              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-zinc-300 rotate-90" />
              </div>
              <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white">
                    <Database className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">Tally ERP</span>
                </div>
                <span className="text-xs font-bold text-emerald-600">Connected</span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 rounded-2xl p-6 text-white">
            <h4 className="font-bold mb-2">Revenue Mapping</h4>
            <p className="text-indigo-100 text-xs mb-4">Ensure Tech Portal categories are correctly mapped to Tally Ledgers.</p>
            <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-colors border border-white/20">
              Configure Ledger Mapping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
