import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout({ children, currentPage, onNavigate }: { children: React.ReactNode, currentPage: string, onNavigate: (page: string) => void }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <div className="pl-64">
        <Header />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
