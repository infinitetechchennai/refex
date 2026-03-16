import React from 'react';
import { Search, Bell, HelpCircle, ChevronDown } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search invoices, vendors, or transactions..." 
            className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Tally Connected</span>
        </div>
        <button className="p-2 text-zinc-500 hover:bg-zinc-50 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2 text-zinc-500 hover:bg-zinc-50 rounded-lg transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
        <div className="h-6 w-px bg-zinc-200 mx-2"></div>
        <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-50 rounded-lg transition-colors">
          <span className="text-sm font-medium text-zinc-700">Financial Year 2024-25</span>
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        </button>
      </div>
    </header>
  );
}
