import React from 'react';
import { FileText, CheckCircle2, AlertCircle, Save, ArrowLeft, ZoomIn, ZoomOut, RotateCw, Download } from 'lucide-react';
import { cn } from '../lib/utils';

export function OCRValidation({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-zinc-900">Invoice OCR Validation</h1>
            <p className="text-sm text-zinc-500">Invoice ID: INV-2024-001 • Amazon Web Services</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-all">
            Flag for Review
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm">
            <Save className="w-4 h-4" />
            Push to Tally
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
        {/* Document Preview */}
        <div className="bg-zinc-800 rounded-2xl overflow-hidden flex flex-col relative">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 z-10">
            <button className="p-1 text-white hover:text-indigo-400 transition-colors"><ZoomOut className="w-4 h-4" /></button>
            <span className="text-xs text-white font-medium px-2 border-x border-white/10">100%</span>
            <button className="p-1 text-white hover:text-indigo-400 transition-colors"><ZoomIn className="w-4 h-4" /></button>
            <div className="w-px h-4 bg-white/10 mx-1"></div>
            <button className="p-1 text-white hover:text-indigo-400 transition-colors"><RotateCw className="w-4 h-4" /></button>
            <button className="p-1 text-white hover:text-indigo-400 transition-colors"><Download className="w-4 h-4" /></button>
          </div>
          
          <div className="flex-1 flex items-center justify-center p-12">
            <div className="bg-white w-full max-w-md aspect-[1/1.4] shadow-2xl p-8 relative">
              <div className="flex justify-between mb-12">
                <div className="w-24 h-8 bg-zinc-100 rounded"></div>
                <div className="text-right space-y-2">
                  <div className="w-32 h-4 bg-zinc-100 rounded ml-auto"></div>
                  <div className="w-24 h-4 bg-zinc-100 rounded ml-auto"></div>
                </div>
              </div>
              <div className="space-y-4 mb-12">
                <div className="w-full h-4 bg-zinc-100 rounded"></div>
                <div className="w-full h-4 bg-zinc-100 rounded"></div>
                <div className="w-2/3 h-4 bg-zinc-100 rounded"></div>
              </div>
              <div className="border-y border-zinc-100 py-4 space-y-4">
                <div className="flex justify-between">
                  <div className="w-32 h-4 bg-zinc-100 rounded"></div>
                  <div className="w-16 h-4 bg-zinc-100 rounded"></div>
                </div>
                <div className="flex justify-between">
                  <div className="w-32 h-4 bg-zinc-100 rounded"></div>
                  <div className="w-16 h-4 bg-zinc-100 rounded"></div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <div className="w-32 h-8 bg-zinc-900 rounded"></div>
              </div>

              {/* OCR Highlight Overlays */}
              <div className="absolute top-[120px] left-[32px] w-[120px] h-[20px] bg-indigo-500/20 border border-indigo-500 rounded-sm"></div>
              <div className="absolute top-[145px] left-[32px] w-[80px] h-[20px] bg-indigo-500/20 border border-indigo-500 rounded-sm"></div>
              <div className="absolute bottom-[48px] right-[32px] w-[128px] h-[32px] bg-indigo-500/20 border border-indigo-500 rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Extracted Fields Form */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-zinc-100 bg-zinc-50/50">
            <h3 className="font-bold text-zinc-900">Extracted Fields</h3>
            <p className="text-xs text-zinc-500 mt-1">Review and correct the data extracted by AI.</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Invoice Number</label>
                <div className="relative">
                  <input type="text" defaultValue="INV-2024-001" className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Invoice Date</label>
                <div className="relative">
                  <input type="text" defaultValue="Mar 14, 2024" className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Vendor Name</label>
              <div className="relative">
                <input type="text" defaultValue="Amazon Web Services" className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Vendor Address</label>
              <textarea 
                rows={3} 
                defaultValue="410 Terry Ave N, Seattle, WA 98109, United States"
                className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"
              />
            </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Currency</label>
                  <select className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
                    <option>INR (₹)</option>
                    <option>USD (₹)</option>
                    <option>EUR (€)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Total Amount</label>
                  <div className="relative">
                    <input type="text" defaultValue="12,450.00" className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                  </div>
                  <p className="text-[10px] text-amber-600 font-medium">Confidence: 84% - Please verify manually</p>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Line Items</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-zinc-900">EC2 Instance - m5.large</p>
                      <p className="text-xs text-zinc-500">Qty: 2 • Unit: ₹96.00</p>
                    </div>
                    <p className="text-sm font-bold text-zinc-900">₹192.00</p>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-zinc-900">S3 Storage - Standard</p>
                      <p className="text-xs text-zinc-500">Qty: 1 • Unit: ₹450.00</p>
                    </div>
                    <p className="text-sm font-bold text-zinc-900">₹450.00</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
