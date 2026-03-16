import React from 'react';
import { MoreHorizontal, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

const invoices = [
  {
    id: 'INV-2024-001',
    vendor: 'Amazon Web Services',
    amount: '₹12,450.00',
    date: 'Mar 14, 2024',
    priority: 'high',
    status: 'processing'
  },
  {
    id: 'INV-2024-002',
    vendor: 'Slack Technologies',
    amount: '₹2,800.00',
    date: 'Mar 13, 2024',
    priority: 'medium',
    status: 'pending'
  },
  {
    id: 'INV-2024-003',
    vendor: 'DigitalOcean Inc.',
    amount: '₹450.00',
    date: 'Mar 12, 2024',
    priority: 'low',
    status: 'approved'
  },
  {
    id: 'INV-2024-004',
    vendor: 'Adobe Systems',
    amount: '₹1,200.00',
    date: 'Mar 12, 2024',
    priority: 'high',
    status: 'pending'
  }
];

export function PriorityInvoices({ onSelectInvoice }: { onSelectInvoice: (id: string) => void }) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
        <h3 className="text-lg font-bold text-zinc-900">Priority Invoices</h3>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
          View all <ExternalLink className="w-3 h-3" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/50">
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Invoice ID</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Vendor</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {invoices.map((invoice) => (
              <tr 
                key={invoice.id} 
                className="hover:bg-zinc-50/50 transition-colors group cursor-pointer"
                onClick={() => onSelectInvoice(invoice.id)}
              >
                <td className="px-6 py-4 text-sm font-medium text-zinc-900">{invoice.id}</td>
                <td className="px-6 py-4 text-sm text-zinc-600">{invoice.vendor}</td>
                <td className="px-6 py-4 text-sm font-semibold text-zinc-900">{invoice.amount}</td>
                <td className="px-6 py-4 text-sm text-zinc-500">{invoice.date}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                    invoice.priority === 'high' ? "bg-red-50 text-red-700" :
                    invoice.priority === 'medium' ? "bg-amber-50 text-amber-700" :
                    "bg-blue-50 text-blue-700"
                  )}>
                    {invoice.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "inline-flex items-center gap-1.5 text-sm font-medium",
                    invoice.status === 'approved' ? "text-emerald-600" :
                    invoice.status === 'processing' ? "text-indigo-600" :
                    "text-zinc-500"
                  )}>
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      invoice.status === 'approved' ? "bg-emerald-600" :
                      invoice.status === 'processing' ? "bg-indigo-600 animate-pulse" :
                      "bg-zinc-400"
                    )}></span>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 text-zinc-400 hover:text-zinc-600 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
