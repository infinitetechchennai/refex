import React from 'react';
import { CreditCard, Upload, Search, Filter, CheckCircle2, AlertCircle, RefreshCw, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

const paymentReports = [
  { id: 'PR-001', mode: 'UPI', source: 'PhonePe Business', amount: '₹1,24,500', status: 'processed', date: 'Mar 15, 2024' },
  { id: 'PR-002', mode: 'Bank', source: 'HDFC Statement', amount: '₹4,50,000', status: 'pending', date: 'Mar 15, 2024' },
  { id: 'PR-003', mode: 'Gateway', source: 'Razorpay', amount: '₹85,200', status: 'error', date: 'Mar 14, 2024' },
  { id: 'PR-004', mode: 'Cash', source: 'Petty Cash Log', amount: '₹12,000', status: 'processed', date: 'Mar 14, 2024' },
];

export function PaymentReportIntegration() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Payment Report Integration</h1>
          <p className="text-zinc-500 mt-1">Import and sync payment reports from UPI, Bank, Cash, and Gateways to Tally.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm">
          <Upload className="w-4 h-4" />
          Import Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {['UPI', 'Bank', 'Cash', 'Gateway'].map((mode) => (
          <div key={mode} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <p className="text-sm text-zinc-500 font-medium">{mode} Volume</p>
            <h3 className="text-xl font-bold text-zinc-900 mt-1">₹{Math.floor(Math.random() * 500000).toLocaleString()}</h3>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
              <RefreshCw className="w-3 h-3" /> Auto-detected
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-zinc-900">Recent Payment Reports</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Search reports..." 
                className="pl-9 pr-4 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none"
              />
            </div>
            <button className="p-2 border border-zinc-200 rounded-lg hover:bg-zinc-50">
              <Filter className="w-4 h-4 text-zinc-500" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50">
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Report ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Mode</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {paymentReports.map((report) => (
                <tr key={report.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-zinc-900">{report.id}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-zinc-100 text-zinc-700 text-[10px] font-bold uppercase tracking-wider">
                      {report.mode}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600">{report.source}</td>
                  <td className="px-6 py-4 text-sm font-bold text-zinc-900">{report.amount}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                      report.status === 'processed' ? "bg-emerald-50 text-emerald-700" :
                      report.status === 'pending' ? "bg-amber-50 text-amber-700" :
                      "bg-red-50 text-red-700"
                    )}>
                      {report.status === 'processed' ? <CheckCircle2 className="w-3 h-3" /> : 
                       report.status === 'pending' ? <RefreshCw className="w-3 h-3" /> : 
                       <AlertCircle className="w-3 h-3" />}
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline">
                      <FileText className="w-3 h-3" /> Create Receipt
                    </button>
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
