/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ExecutiveDashboard } from './pages/ExecutiveDashboard';
import { BulkUpload } from './pages/BulkUpload';
import { OCRValidation } from './pages/OCRValidation';
import { VendorDriverManagement } from './pages/VendorDriverManagement';
import { RevenueIntegration } from './pages/RevenueIntegration';
import { BankReconciliation } from './pages/BankReconciliation';
import { PaymentReportIntegration } from './pages/PaymentReportIntegration';
import { RecurringAutomation } from './pages/RecurringAutomation';
import { GoogleSheetsIntegration } from './pages/GoogleSheetsIntegration';

export default function App() {
  const [currentPage, setCurrentPage] = useState('Executive Dashboard');
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  const renderPage = () => {
    if (selectedInvoice) {
      return <OCRValidation onBack={() => setSelectedInvoice(null)} />;
    }

    switch (currentPage) {
      case 'Executive Dashboard':
        return <ExecutiveDashboard onSelectInvoice={setSelectedInvoice} />;
      case 'Bulk Invoice Upload':
        return <BulkUpload />;
      case 'Invoice OCR Validation':
        return <OCRValidation onBack={() => setCurrentPage('Executive Dashboard')} />;
      case 'Vendor & Driver Management':
        return <VendorDriverManagement />;
      case 'Revenue Integration':
        return <RevenueIntegration />;
      case 'Bank Reconciliation':
        return <BankReconciliation />;
      case 'Payment Report Integration':
        return <PaymentReportIntegration />;
      case 'Recurring Automation':
        return <RecurringAutomation />;
      case 'Google Sheets Integration':
        return <GoogleSheetsIntegration />;
      default:
        return <ExecutiveDashboard onSelectInvoice={setSelectedInvoice} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}
