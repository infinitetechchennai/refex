import React from 'react';
import { FileSpreadsheet, RefreshCw, ExternalLink, CheckCircle2, AlertCircle, Database, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const sheetEntries = [
  { id: 'RM-001', vendor: 'City Garage', description: 'Vehicle Service - MH12-4567', amount: '₹12,400', status: 'pending', date: 'Mar 15, 2024' },
  { id: 'RM-002', vendor: 'Quick Fix Spares', description: 'Brake Pad Replacement', amount: '₹4,200', status: 'synced', date: 'Mar 14, 2024' },
  { id: 'RM-003', vendor: 'Modern Tyres', description: 'Tyre Rotation & Alignment', amount: '₹2,100', status: 'error', date: 'Mar 14, 2024' },
];

export function GoogleSheetsIntegration() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Google Sheets Integration</h1>
          <p className="text-zinc-500 mt-1">Sync repairs and maintenance expenses from Google Sheets directly to Tally ERP.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 shadow-sm">
            <ExternalLink className="w-4 h-4" />
            Open Sheet
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 shadow-sm shadow-indigo-200">
            <RefreshCw className="w-4 h-4" />
            Sync from Sheet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900">Repairs & Maintenance Log</h3>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">Connected to: R&M_Log_2024</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50/50">
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Vendor</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {sheetEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-zinc-900">{entry.vendor}</p>
                        <p className="text-xs text-zinc-500">{entry.date}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-600 max-w-[200px] truncate">{entry.description}</td>
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
                          Verify & Post
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-zinc-900 mb-4">Field Mapping Configuration</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { sheet: 'Column A', tally: 'Date' },
                { sheet: 'Column B', tally: 'Vendor Name' },
                { sheet: 'Column C', tally: 'Expense Ledger' },
                { sheet: 'Column D', tally: 'Amount' },
              ].map((map, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                  <span className="text-xs font-bold text-zinc-400">{map.sheet}</span>
                  <ArrowRight className="w-3 h-3 text-zinc-300" />
                  <span className="text-sm font-medium text-zinc-900">{map.tally}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-900 mb-4">Sync Configuration</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">Google Sheet</span>
                </div>
                <span className="text-xs font-bold text-emerald-600">Active</span>
              </div>
              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-zinc-300 rotate-90" />
              </div>
              <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white">
                    <Database className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">Tally Vouchers</span>
                </div>
                <span className="text-xs font-bold text-emerald-600">Active</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6 text-white">
            <h4 className="font-bold mb-2">Auto-Sync Schedule</h4>
            <p className="text-zinc-400 text-xs mb-4">Current schedule: Every 4 hours</p>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-sm font-medium">Auto-Sync</span>
              <div className="w-10 h-5 bg-indigo-600 rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
