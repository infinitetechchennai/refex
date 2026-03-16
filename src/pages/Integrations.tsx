import React from 'react';
import { Database, Table, ArrowRight, Save, RefreshCw, AlertCircle, CheckCircle2, ExternalLink, FileSpreadsheet } from 'lucide-react';
import { cn } from '../lib/utils';

const mappings = [
  { source: 'Invoice Number', target: 'Voucher No.', type: 'String', status: 'mapped' },
  { source: 'Vendor Name', target: 'Ledger Name', type: 'String', status: 'mapped' },
  { source: 'Total Amount', target: 'Amount', type: 'Number', status: 'mapped' },
  { source: 'Tax Amount', target: 'GST Ledger', type: 'Number', status: 'pending' },
  { source: 'Due Date', target: 'Due On', type: 'Date', status: 'mapped' },
];

export function Integrations() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Google Sheets Integration</h1>
          <p className="text-zinc-500 mt-1">Sync your invoice data directly from Google Sheets to your accounting system.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-all">
            <RefreshCw className="w-4 h-4" />
            Sync Now
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm">
            <Save className="w-4 h-4" />
            Save Configuration
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-zinc-900">Field Mapping</h3>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">4/5 Fields Mapped</span>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-4 text-xs font-bold text-zinc-400 uppercase tracking-wider px-4">
                <div className="col-span-3">Google Sheet Column</div>
                <div className="flex justify-center"></div>
                <div className="col-span-3">ERP Field</div>
              </div>
              
              {mappings.map((mapping, idx) => (
                <div key={idx} className="grid grid-cols-7 gap-4 items-center p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                  <div className="col-span-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg border border-zinc-200 flex items-center justify-center text-zinc-400">
                        <FileSpreadsheet className="w-4 h-4" />
                      </div>
                      <select className="flex-1 bg-transparent font-medium text-sm focus:outline-none">
                        <option>{mapping.source}</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="w-4 h-4 text-zinc-300" />
                  </div>
                  <div className="col-span-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                        <Database className="w-4 h-4" />
                      </div>
                      <select className={cn(
                        "flex-1 bg-transparent font-medium text-sm focus:outline-none",
                        mapping.status === 'pending' ? "text-zinc-400 italic" : "text-zinc-900"
                      )}>
                        <option>{mapping.status === 'pending' ? 'Select field...' : mapping.target}</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900">Sync Logs</h3>
              <button className="text-sm font-medium text-zinc-500 hover:text-zinc-900">Clear Logs</button>
            </div>
            <div className="divide-y divide-zinc-100">
              <div className="p-4 flex items-center justify-between hover:bg-zinc-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <div>
                    <p className="text-sm font-medium text-zinc-900">Successfully synced 124 rows</p>
                    <p className="text-xs text-zinc-500">Today at 09:42 AM</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-indigo-600 hover:underline">View Details</button>
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-zinc-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-zinc-900">Failed to sync row #42: Invalid Date Format</p>
                    <p className="text-xs text-zinc-500">Today at 09:41 AM</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-indigo-600 hover:underline">Fix Error</button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-900 mb-6">Connection Status</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900">Google Sheets</p>
                    <p className="text-xs text-emerald-600 font-medium">Connected</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-zinc-400 hover:text-red-600 transition-colors">Disconnect</button>
              </div>
              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <p className="text-xs text-zinc-400 uppercase font-bold tracking-wider mb-2">Connected Sheet</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-zinc-900 truncate max-w-[150px]">Invoice_Master_2024</p>
                  <ExternalLink className="w-4 h-4 text-zinc-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6 text-white">
            <h4 className="font-bold text-lg mb-4">Automation Tip</h4>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              Enable "Auto-Sync" to automatically fetch new rows from your Google Sheet every 15 minutes.
            </p>
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
