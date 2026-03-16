import React from 'react';
import { Database, CheckCircle2, AlertCircle, RefreshCw, Search, Filter, ExternalLink, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

const logs = [
  { id: 'LOG-001', module: 'Invoices', action: 'Bulk Upload', status: 'success', details: '45 invoices processed, 45 vouchers created', time: '10 mins ago' },
  { id: 'LOG-002', module: 'Revenue', action: 'Tech Portal Sync', status: 'success', details: '₹4,50,000 revenue entries synced', time: '1 hour ago' },
  { id: 'LOG-003', module: 'Bank', action: 'Auto-Reconcile', status: 'partial', details: '12/14 items matched, 2 require manual review', time: '2 hours ago' },
  { id: 'LOG-004', module: 'Vendors', action: 'Tally Sync', status: 'error', details: 'Failed to sync V-004: Invalid GSTIN format', time: '3 hours ago' },
];

export function SyncLogs() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Integrations & Sync Logs</h1>
          <p className="text-zinc-500 mt-1">Monitor the health and history of all Tally ERP integrations.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-all shadow-sm">
          <RefreshCw className="w-4 h-4" />
          Refresh Status
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <p className="text-sm text-zinc-500 font-medium">System Health</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <h3 className="text-xl font-bold text-zinc-900">All Systems Operational</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <p className="text-sm text-zinc-500 font-medium">Sync Success Rate</p>
          <div className="flex items-center justify-between mt-2">
            <h3 className="text-xl font-bold text-zinc-900">98.4%</h3>
            <span className="text-xs font-bold text-emerald-600">+0.2%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <p className="text-sm text-zinc-500 font-medium">Pending Syncs</p>
          <div className="flex items-center justify-between mt-2">
            <h3 className="text-xl font-bold text-zinc-900">12</h3>
            <span className="text-xs font-bold text-amber-600">Action Required</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <p className="text-sm text-zinc-500 font-medium">Last Tally Sync</p>
          <div className="flex items-center justify-between mt-2">
            <h3 className="text-xl font-bold text-zinc-900">4 mins ago</h3>
            <span className="text-xs font-bold text-zinc-400">v2.4.1</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900">Integration Activity Logs</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="text" 
                    placeholder="Search logs..." 
                    className="pl-9 pr-4 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none"
                  />
                </div>
                <button className="p-2 border border-zinc-200 rounded-lg hover:bg-zinc-50">
                  <Filter className="w-4 h-4 text-zinc-500" />
                </button>
              </div>
            </div>
            <div className="divide-y divide-zinc-100">
              {logs.map((log) => (
                <div key={log.id} className="p-6 hover:bg-zinc-50/50 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      log.status === 'success' ? "bg-emerald-50 text-emerald-600" :
                      log.status === 'partial' ? "bg-amber-50 text-amber-600" :
                      "bg-red-50 text-red-600"
                    )}>
                      {log.status === 'success' ? <CheckCircle2 className="w-5 h-5" /> : 
                       log.status === 'partial' ? <Activity className="w-5 h-5" /> : 
                       <AlertCircle className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{log.module}</span>
                        <span className="text-zinc-300">•</span>
                        <span className="text-sm font-bold text-zinc-900">{log.action}</span>
                      </div>
                      <p className="text-sm text-zinc-500 mt-0.5">{log.details}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xs text-zinc-400 font-medium">{log.time}</span>
                    <button className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-zinc-50 border-t border-zinc-100 text-center">
              <button className="text-sm font-bold text-zinc-500 hover:text-zinc-900">Load More Logs</button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-900 mb-6">Endpoint Health</h3>
            <div className="space-y-4">
              {[
                { name: 'Tally ERP Connector', status: 'Healthy', latency: '12ms' },
                { name: 'Tech Portal API', status: 'Healthy', latency: '45ms' },
                { name: 'Google Sheets API', status: 'Healthy', latency: '120ms' },
                { name: 'OCR Engine', status: 'Degraded', latency: '2.4s' },
              ].map((endpoint) => (
                <div key={endpoint.name} className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                  <div>
                    <p className="text-sm font-bold text-zinc-900">{endpoint.name}</p>
                    <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Latency: {endpoint.latency}</p>
                  </div>
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    endpoint.status === 'Healthy' ? "bg-emerald-500" : "bg-amber-500"
                  )}></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6 text-white">
            <h4 className="font-bold text-lg mb-4">Sync Statistics</h4>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Total Syncs (24h)</span>
                <span className="font-bold">1,284</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Failed Syncs</span>
                <span className="font-bold text-red-400">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Data Transferred</span>
                <span className="font-bold">42.5 MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
