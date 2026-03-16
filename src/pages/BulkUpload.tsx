import React, { useState } from 'react';
import { Upload, File, CheckCircle2, AlertCircle, Clock, Search, Filter, MoreVertical, Download } from 'lucide-react';
import { cn } from '../lib/utils';

const history = [
  { id: 'BATCH-001', date: 'Mar 14, 2024', count: 45, status: 'completed', success: 45, failed: 0 },
  { id: 'BATCH-002', date: 'Mar 13, 2024', count: 12, status: 'processing', success: 8, failed: 0 },
  { id: 'BATCH-003', date: 'Mar 12, 2024', count: 30, status: 'completed', success: 28, failed: 2 },
];

export function BulkUpload() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Bulk Invoice Upload</h1>
        <p className="text-zinc-500 mt-1">Upload batches of invoices for automatic Tally ERP entry processing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-medium">Batch Uploads</p>
              <h3 className="text-xl font-bold text-zinc-900">1,452</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-medium">Auto-Sync Rate</p>
              <h3 className="text-xl font-bold text-zinc-900">99.4%</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-medium">Avg. Sync Time</p>
              <h3 className="text-xl font-bold text-zinc-900">4.2s</h3>
            </div>
          </div>
        </div>
      </div>

      <div 
        className={cn(
          "bg-white border-2 border-dashed rounded-3xl p-12 transition-all flex flex-col items-center justify-center text-center",
          isDragging ? "border-indigo-500 bg-indigo-50/30" : "border-zinc-200 hover:border-zinc-300"
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
      >
        <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6">
          <Upload className="w-8 h-8 text-zinc-400" />
        </div>
        <h3 className="text-lg font-bold text-zinc-900 mb-2">Drop your invoice batches here</h3>
        <p className="text-zinc-500 max-w-sm mb-8">
          Support PDF, Excel (XLSX), and ZIP archives. Max 50MB per batch.
        </p>
        <div className="flex items-center gap-4">
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            Select Files
          </button>
          <button className="bg-white border border-zinc-200 text-zinc-700 px-8 py-3 rounded-xl font-bold hover:bg-zinc-50 transition-all">
            Connect ERP
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-zinc-900">Upload History</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Search batches..." 
                className="pl-9 pr-4 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <button className="p-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors">
              <Filter className="w-4 h-4 text-zinc-500" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50">
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Batch ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Total Files</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Success/Failed</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {history.map((batch) => (
                <tr key={batch.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-zinc-900">{batch.id}</td>
                  <td className="px-6 py-4 text-sm text-zinc-500">{batch.date}</td>
                  <td className="px-6 py-4 text-sm text-zinc-900 font-medium">{batch.count}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                      batch.status === 'completed' ? "bg-emerald-50 text-emerald-700" : "bg-indigo-50 text-indigo-700"
                    )}>
                      {batch.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-emerald-600 font-medium text-sm">
                        <CheckCircle2 className="w-3 h-3" />
                        {batch.success}
                      </div>
                      {batch.failed > 0 && (
                        <div className="flex items-center gap-1 text-red-600 font-medium text-sm">
                          <AlertCircle className="w-3 h-3" />
                          {batch.failed}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Download Batch">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
