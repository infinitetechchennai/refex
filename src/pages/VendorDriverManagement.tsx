import React, { useState } from 'react';
import { Users, Search, Filter, Plus, CheckCircle2, AlertCircle, Clock, Building2, User, ShieldCheck, Database, X, Upload, FileText } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_MASTERS = [
  { id: 'M-001', name: 'Amazon Web Services', type: 'Vendor', kyc: 'verified', tallyStatus: 'synced', lastUpdate: 'Mar 14, 2024' },
  { id: 'M-002', name: 'Rajesh Kumar', type: 'Driver', kyc: 'pending', tallyStatus: 'pending', lastUpdate: 'Mar 13, 2024' },
  { id: 'M-003', name: 'Global Tech Solutions', type: 'Vendor', kyc: 'failed', tallyStatus: 'blocked', lastUpdate: 'Mar 12, 2024' },
  { id: 'M-004', name: 'Sunil Verma', type: 'Driver', kyc: 'verified', tallyStatus: 'synced', lastUpdate: 'Mar 12, 2024' },
];

export function VendorDriverManagement() {
  const [mastersList, setMastersList] = useState(INITIAL_MASTERS);
  const [activeTab, setActiveTab] = useState('All Masters');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'Vendor' | 'Driver'>('Vendor');
  const [kycFilter, setKycFilter] = useState('All KYC');
  const [syncFilter, setSyncFilter] = useState('All Sync');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    categoryOrLicense: '',
    emailOrPhone: '',
    kycStatus: 'pending',
    syncStatus: 'pending',
    lastDate: '',
    kycFile: null as File | null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!formData.categoryOrLicense.trim()) {
      newErrors.categoryOrLicense = modalType === 'Vendor' ? 'Category is required' : 'License number is required';
    }

    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = modalType === 'Vendor' ? 'Email is required' : 'Phone number is required';
    } else if (modalType === 'Vendor') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.emailOrPhone)) {
        newErrors.emailOrPhone = 'Invalid email format';
      }
    } else {
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(formData.emailOrPhone)) {
        newErrors.emailOrPhone = 'Invalid phone number format';
      }
    }

    if (!formData.lastDate) {
      newErrors.lastDate = 'Date is required';
    } else {
      const selectedDate = new Date(formData.lastDate);
      const today = new Date();
      if (selectedDate > today) {
        newErrors.lastDate = 'Date cannot be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const tabs = ['All Masters', 'Vendors', 'Drivers', 'KYC Pending'];

  const pendingKYCCount = mastersList.filter(m => m.kyc === 'pending').length;
  const failedKYCCount = mastersList.filter(m => m.kyc === 'failed').length;

  const handleAddMaster = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const newMaster = {
      id: `M-00${mastersList.length + 1}`,
      name: formData.name,
      type: modalType,
      kyc: formData.kycStatus,
      tallyStatus: formData.syncStatus === 'error' ? 'blocked' : formData.syncStatus,
      lastUpdate: new Date(formData.lastDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setMastersList([newMaster, ...mastersList]);
    setIsModalOpen(false);
    setFormData({
      name: '',
      categoryOrLicense: '',
      emailOrPhone: '',
      kycStatus: 'pending',
      syncStatus: 'pending',
      lastDate: '',
      kycFile: null
    });
    setErrors({});
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Vendor & Driver Management</h1>
          <p className="text-zinc-500 mt-1">Manage master data with mandatory KYC and GSTIN validation before Tally creation.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => { setModalType('Vendor'); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-xl text-sm font-medium hover:bg-zinc-50 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Vendor
          </button>
          <button 
            onClick={() => { setModalType('Driver'); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200"
          >
            <Plus className="w-4 h-4" />
            Add Driver
          </button>
        </div>
      </div>

      {(pendingKYCCount > 0 || failedKYCCount > 0) && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-4"
        >
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-amber-900">KYC Compliance Action Required</h4>
            <p className="text-xs text-amber-700 mt-1">
              There are <span className="font-bold">{pendingKYCCount} pending</span> and <span className="font-bold">{failedKYCCount} failed</span> KYC validations that require your attention.
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('KYC Pending')}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg text-xs font-bold hover:bg-amber-700 transition-colors"
          >
            Review Now
          </button>
        </motion.div>
      )}

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
                <h3 className="text-xl font-bold text-zinc-900">Add New {modalType}</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-500" />
                </button>
              </div>

              <form className="p-6 space-y-4" onSubmit={handleAddMaster}>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{modalType} Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder={modalType === 'Vendor' ? "e.g. Amazon Web Services" : "e.g. Rajesh Kumar"}
                    className={cn(
                      "w-full px-4 py-2 bg-zinc-50 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all",
                      errors.name ? "border-red-500" : "border-zinc-200"
                    )}
                  />
                  {errors.name && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      {modalType === 'Vendor' ? 'Category' : 'License Number'}
                    </label>
                    <input 
                      type="text" 
                      value={formData.categoryOrLicense}
                      onChange={(e) => {
                        setFormData({ ...formData, categoryOrLicense: e.target.value });
                        if (errors.categoryOrLicense) setErrors({ ...errors, categoryOrLicense: '' });
                      }}
                      placeholder={modalType === 'Vendor' ? "e.g. Cloud Services" : "e.g. DL-1234567890"}
                      className={cn(
                        "w-full px-4 py-2 bg-zinc-50 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all",
                        errors.categoryOrLicense ? "border-red-500" : "border-zinc-200"
                      )}
                    />
                    {errors.categoryOrLicense && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{errors.categoryOrLicense}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      {modalType === 'Vendor' ? 'Email' : 'Phone Number'}
                    </label>
                    <input 
                      type={modalType === 'Vendor' ? "email" : "tel"} 
                      value={formData.emailOrPhone}
                      onChange={(e) => {
                        setFormData({ ...formData, emailOrPhone: e.target.value });
                        if (errors.emailOrPhone) setErrors({ ...errors, emailOrPhone: '' });
                      }}
                      placeholder={modalType === 'Vendor' ? "billing@vendor.com" : "+91 98765 43210"}
                      className={cn(
                        "w-full px-4 py-2 bg-zinc-50 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all",
                        errors.emailOrPhone ? "border-red-500" : "border-zinc-200"
                      )}
                    />
                    {errors.emailOrPhone && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{errors.emailOrPhone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">KYC Status</label>
                    <select 
                      value={formData.kycStatus}
                      onChange={(e) => setFormData({ ...formData, kycStatus: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    >
                      <option value="verified">Verified</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Tally Sync Status</label>
                    <select 
                      value={formData.syncStatus}
                      onChange={(e) => setFormData({ ...formData, syncStatus: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    >
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
                    value={formData.lastDate}
                    onChange={(e) => {
                      setFormData({ ...formData, lastDate: e.target.value });
                      if (errors.lastDate) setErrors({ ...errors, lastDate: '' });
                    }}
                    className={cn(
                      "w-full px-4 py-2 bg-zinc-50 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all",
                      errors.lastDate ? "border-red-500" : "border-zinc-200"
                    )}
                  />
                  {errors.lastDate && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{errors.lastDate}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">KYC Documents</label>
                  <div 
                    className={cn(
                      "border-2 border-dashed rounded-xl p-4 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-zinc-50",
                      formData.kycFile ? "border-indigo-200 bg-indigo-50/30" : "border-zinc-200 bg-zinc-50/50"
                    )}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files[0];
                      if (file) setFormData({ ...formData, kycFile: file });
                    }}
                    onClick={() => document.getElementById('kyc-upload')?.click()}
                  >
                    <input 
                      id="kyc-upload"
                      type="file" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setFormData({ ...formData, kycFile: file });
                      }}
                    />
                    {formData.kycFile ? (
                      <>
                        <FileText className="w-8 h-8 text-indigo-600" />
                        <div className="text-center">
                          <p className="text-sm font-bold text-zinc-900">{formData.kycFile.name}</p>
                          <p className="text-xs text-zinc-500">{(formData.kycFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData({ ...formData, kycFile: null });
                          }}
                          className="text-xs font-bold text-red-600 hover:underline"
                        >
                          Remove File
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-zinc-100 flex items-center justify-center text-zinc-400">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-zinc-900">Click to upload or drag and drop</p>
                          <p className="text-xs text-zinc-500">PDF, JPG, or PNG (max. 5MB)</p>
                        </div>
                      </>
                    )}
                  </div>
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
                    Save {modalType}
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-100 flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Search masters..." 
                  className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">KYC:</span>
                  <select 
                    value={kycFilter}
                    onChange={(e) => setKycFilter(e.target.value)}
                    className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option>All KYC</option>
                    <option value="verified">Verified</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Tally Sync:</span>
                  <select 
                    value={syncFilter}
                    onChange={(e) => setSyncFilter(e.target.value)}
                    className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option>All Sync</option>
                    <option value="synced">Synced</option>
                    <option value="pending">Pending</option>
                    <option value="blocked">Error</option>
                  </select>
                </div>
              </div>
              <button className="p-2 border border-zinc-200 rounded-lg hover:bg-zinc-50">
                <Filter className="w-4 h-4 text-zinc-500" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50/50">
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      {activeTab === 'Drivers' ? 'Driver Name' : 'Name'}
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      {activeTab === 'Drivers' ? 'License Number' : 'GSTIN / ID'}
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">KYC Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Tally Sync</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {mastersList
                    .filter(m => {
                      // Tab filtering
                      if (activeTab === 'Vendors' && m.type !== 'Vendor') return false;
                      if (activeTab === 'Drivers' && m.type !== 'Driver') return false;
                      if (activeTab === 'KYC Pending' && !(m.kyc === 'pending' || m.kyc === 'failed')) return false;

                      // Status filtering
                      if (kycFilter !== 'All KYC' && m.kyc !== kycFilter) return false;
                      if (syncFilter !== 'All Sync' && m.tallyStatus !== syncFilter) return false;

                      return true;
                    })
                    .map((master) => (
                    <tr 
                      key={master.id} 
                      className={cn(
                        "hover:bg-zinc-50/50 transition-colors",
                        (master.kyc === 'failed' || master.tallyStatus === 'blocked') && "bg-red-50/30"
                      )}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center",
                            master.type === 'Vendor' ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                          )}>
                            {master.type === 'Vendor' ? <Building2 className="w-4 h-4" /> : <User className="w-4 h-4" />}
                          </div>
                          <span className="text-sm font-bold text-zinc-900">{master.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-600">{master.type}</td>
                      <td className="px-6 py-4 text-sm text-zinc-500 font-mono">
                        {master.type === 'Vendor' ? '29AAACR1234A1Z1' : 'DL-1234567890'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                          master.kyc === 'verified' ? "bg-emerald-50 text-emerald-700" :
                          master.kyc === 'pending' ? "bg-amber-50 text-amber-700" :
                          "bg-red-100 text-red-700 border border-red-200"
                        )}>
                          {master.kyc === 'verified' ? <ShieldCheck className="w-3 h-3" /> : 
                           master.kyc === 'pending' ? <Clock className="w-3 h-3" /> : 
                           <AlertCircle className="w-3 h-3" />}
                          {master.kyc.charAt(0).toUpperCase() + master.kyc.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Database className={cn(
                            "w-4 h-4",
                            master.tallyStatus === 'synced' ? "text-emerald-500" : 
                            master.tallyStatus === 'blocked' ? "text-red-500" :
                            "text-zinc-300"
                          )} />
                          <span className={cn(
                            "text-sm font-medium",
                            master.tallyStatus === 'blocked' ? "text-red-600" : "text-zinc-600"
                          )}>
                            {master.tallyStatus === 'blocked' ? 'Error' : master.tallyStatus.charAt(0).toUpperCase() + master.tallyStatus.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          disabled={master.kyc !== 'verified'}
                          className={cn(
                            "text-xs font-bold transition-colors",
                            master.kyc === 'verified' && master.tallyStatus !== 'synced' 
                              ? "text-indigo-600 hover:underline" 
                              : "text-zinc-400 cursor-not-allowed"
                          )}
                        >
                          {master.kyc === 'verified' && master.tallyStatus !== 'synced' ? 'Approve & Sync' : 'View Details'}
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
            <h3 className="text-lg font-bold text-zinc-900 mb-4">KYC Compliance Control</h3>
            <p className="text-xs text-zinc-500 mb-4">Requirement: New vendors can only be created in Tally upon receipt of all required KYC documents.</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Verified</span>
                <span className="text-sm font-bold text-emerald-600">84%</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[84%]"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Pending</span>
                <span className="text-sm font-bold text-amber-600">12%</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[12%]"></div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6 text-white">
            <h4 className="font-bold mb-2">Compliance Alert</h4>
            <p className="text-zinc-400 text-xs mb-4">3 vendors have expired KYC documents. Tally sync has been suspended for these accounts.</p>
            <button className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-xl text-xs font-bold transition-colors">
              Review Suspended Masters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
