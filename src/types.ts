export interface Invoice {
  id: string;
  vendor: string;
  amount: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  priority: 'high' | 'medium' | 'low';
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  kycStatus: 'verified' | 'pending' | 'failed';
  syncStatus: 'synced' | 'pending' | 'error';
  lastTransaction: string;
}

export interface Activity {
  id: string;
  type: 'upload' | 'approval' | 'reconciliation' | 'sync';
  description: string;
  timestamp: string;
  user: string;
}
