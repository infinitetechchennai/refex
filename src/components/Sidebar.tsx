import React from 'react';
import { 
  LayoutDashboard, 
  UploadCloud, 
  FileCheck, 
  Users, 
  Globe, 
  RefreshCw, 
  CreditCard, 
  Clock, 
  FileSpreadsheet,
  Settings,
  LogOut
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Executive Dashboard' },
  { icon: UploadCloud, label: 'Bulk Invoice Upload' },
  { icon: FileCheck, label: 'Invoice OCR Validation' },
  { icon: Users, label: 'Vendor & Driver Management' },
  { icon: Globe, label: 'Revenue Integration' },
  { icon: RefreshCw, label: 'Bank Reconciliation' },
  { icon: CreditCard, label: 'Payment Report Integration' },
  { icon: Clock, label: 'Recurring Automation' },
  { icon: FileSpreadsheet, label: 'Google Sheets Integration' },
];

export function Sidebar({ currentPage, onNavigate }: { currentPage: string, onNavigate: (page: string) => void }) {
  return (
    <div className="w-64 h-screen bg-white border-r border-zinc-200 flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <RefreshCw className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl tracking-tight">Refex</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigate(item.label)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              currentPage === item.label 
                ? "bg-indigo-50 text-indigo-600" 
                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-200">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-bold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-900 truncate">John Doe</p>
            <p className="text-xs text-zinc-500 truncate">Admin</p>
          </div>
          <Settings className="w-4 h-4 text-zinc-400" />
        </div>
        <button className="w-full mt-2 flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-600 hover:text-red-600 transition-colors">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
