import React from 'react';
import { RefreshCw, Search, Filter, CheckCircle2, AlertCircle, Clock, Building2, CreditCard, Landmark } from 'lucide-react';
import { cn } from '../lib/utils';

const transactions = [
  { id: 'TXN-001', mode: 'UPI', amount: '₹12,500', status: 'matched', date: 'Mar 15, 2024', bank: 'HDFC Bank' },
  { id: 'TXN-002', mode: 'Bank Transfer', amount: '₹45,000', status: 'pending', date: 'Mar 15, 2024', bank: 'ICICI Bank' },
  { id: 'TXN-003', mode: 'Gateway', amount: '₹8,200', status: 'unmatched', date: 'Mar 14, 2024', bank: 'HDFC Bank' },
];

export function BankReconciliation() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Bank Reconciliation</h1>
          <p className="text-zinc-500 mt-1">Automate receipt and payment entries from bank statements to Tally vouchers.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 shadow-sm">
            Import Statement
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 shadow-sm shadow-indigo-200">
            <RefreshCw className="w-4 h-4" />
            Auto-Match
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900">Unmatched Statement Lines</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="text" 
                    placeholder="Search transactions..." 
                    className="pl-9 pr-4 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50/50">
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {transactions.map((txn) => (
                    <tr key={txn.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-zinc-500">{txn.date}</td>
                      <td className="px-6 py-4 text-sm font-medium text-zinc-900">{txn.mode} - {txn.bank}</td>
                      <td className="px-6 py-4 text-sm font-bold text-zinc-900">{txn.amount}</td>
                      <td className="px-6 py-4">
                        <button className="text-xs font-bold text-indigo-600 hover:underline">
                          Match with Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-900 mb-4">Manual Reconciliation</h3>
            <div className="space-y-4">
              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Selected Line</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">TXN-003</span>
                  <span className="text-sm font-bold text-red-600">₹8,200</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Search Tally Invoice</label>
                <input type="text" placeholder="Invoice # or Vendor" className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none" />
              </div>
              <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all">
                Confirm Match
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
