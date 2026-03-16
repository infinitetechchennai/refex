import React, { useState } from 'react';
import { Search, Filter, Plus, MoreHorizontal, CheckCircle2, AlertCircle, Clock, ExternalLink, Building2, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const vendors = [
  {
    id: 'V-001',
    name: 'Amazon Web Services',
    category: 'Cloud Services',
    kycStatus: 'verified',
    syncStatus: 'synced',
    lastTransaction: 'Mar 14, 2024',
    email: 'billing@aws.amazon.com'
  },
  {
    id: 'V-002',
    name: 'Slack Technologies',
    category: 'SaaS',
    kycStatus: 'pending',
    syncStatus: 'pending',
    lastTransaction: 'Mar 13, 2024',
    email: 'accounts@slack.com'
  },
  {
    id: 'V-003',
    name: 'DigitalOcean Inc.',
    category: 'Cloud Services',
    kycStatus: 'verified',
    syncStatus: 'synced',
    lastTransaction: 'Mar 12, 2024',
    email: 'billing@digitalocean.com'
  },
  {
    id: 'V-004',
    name: 'Global Tech Solutions',
    category: 'Hardware',
    kycStatus: 'failed',
    syncStatus: 'error',
    lastTransaction: 'Mar 10, 2024',
    email: 'info@globaltech.com'
  }
];

export function Vendors() {
  const [activeTab, setActiveTab] = useState('All Vendors');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = ['All Vendors', 'Pending KYC', 'Synced', 'Flagged'];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Vendor Management</h1>
          <p className="text-zinc-500 mt-1">Manage your vendors, KYC documentation, and ERP synchronization.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200"
        >
          <Plus className="w-4 h-4" />
          Add Vendor
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-zinc-900">Add New Vendor</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-500" />
                </button>
              </div>

              <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Vendor Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Amazon Web Services"
                    className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Category</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Cloud Services"
                      className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="billing@vendor.com"
                      className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">KYC Status</label>
                    <select className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
                      <option value="verified">Verified</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Tally Sync Status</label>
                    <select className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
                      <option value="synced">Synced</option>
                      <option value="pending">Pending</option>
                      <option value="error">Error</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Last Transaction Date</label>
                  <input 
                    type="date" 
                    required
                    className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 bg-zinc-100 text-zinc-700 rounded-xl text-sm font-medium hover:bg-zinc-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200"
                  >
                    Save Vendor
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between border-b border-zinc-200">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-4 text-sm font-medium transition-all relative",
                activeTab === tab ? "text-indigo-600" : "text-zinc-500 hover:text-zinc-900"
              )}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search by vendor name, ID, or email..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-all">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50">
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Vendor Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">KYC Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">ERP Sync</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Last Transaction</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {vendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-400">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900">{vendor.name}</p>
                        <p className="text-xs text-zinc-500">{vendor.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600">{vendor.category}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                      vendor.kycStatus === 'verified' ? "bg-emerald-50 text-emerald-700" :
                      vendor.kycStatus === 'pending' ? "bg-amber-50 text-amber-700" :
                      "bg-red-50 text-red-700"
                    )}>
                      {vendor.kycStatus === 'verified' && <CheckCircle2 className="w-3 h-3" />}
                      {vendor.kycStatus === 'pending' && <Clock className="w-3 h-3" />}
                      {vendor.kycStatus === 'failed' && <AlertCircle className="w-3 h-3" />}
                      {vendor.kycStatus.charAt(0).toUpperCase() + vendor.kycStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        vendor.syncStatus === 'synced' ? "bg-emerald-500" :
                        vendor.syncStatus === 'pending' ? "bg-amber-500" :
                        "bg-red-500"
                      )}></div>
                      <span className="text-sm text-zinc-600 font-medium">
                        {vendor.syncStatus.charAt(0).toUpperCase() + vendor.syncStatus.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-500">{vendor.lastTransaction}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 rounded-lg transition-all">
                        <MoreHorizontal className="w-4 h-4" />
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
