import React from 'react';
import { cn } from '../lib/utils';

const activities = [
  {
    id: '1',
    user: 'Sarah Chen',
    action: 'approved invoice',
    target: 'INV-2024-001',
    time: '2 mins ago',
    avatar: 'SC'
  },
  {
    id: '2',
    user: 'System',
    action: 'auto-reconciled',
    target: '12 transactions',
    time: '15 mins ago',
    avatar: 'AI'
  },
  {
    id: '3',
    user: 'Mike Ross',
    action: 'uploaded bulk',
    target: '45 invoices',
    time: '1 hour ago',
    avatar: 'MR'
  },
  {
    id: '4',
    user: 'Jessica P.',
    action: 'flagged vendor',
    target: 'Global Tech',
    time: '3 hours ago',
    avatar: 'JP'
  }
];

export function RecentActivity() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
      <h3 className="text-lg font-bold text-zinc-900 mb-6">Recent Activity</h3>
      <div className="space-y-6">
        {activities.map((activity, idx) => (
          <div key={activity.id} className="flex gap-4 relative">
            {idx !== activities.length - 1 && (
              <div className="absolute left-4 top-8 bottom-[-24px] w-px bg-zinc-100"></div>
            )}
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 z-10",
              activity.user === 'System' ? "bg-indigo-600 text-white" : "bg-zinc-100 text-zinc-600"
            )}>
              {activity.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-zinc-600">
                <span className="font-semibold text-zinc-900">{activity.user}</span>
                {' '}{activity.action}{' '}
                <span className="font-medium text-indigo-600">{activity.target}</span>
              </p>
              <p className="text-xs text-zinc-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
        View all activity
      </button>
    </div>
  );
}
