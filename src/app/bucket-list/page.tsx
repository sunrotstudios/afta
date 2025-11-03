'use client';

import { AppLayout } from '@/components/layout/app-layout';

export default function BucketListPage() {
  return (
    <AppLayout title="Bucket List">
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-neutral-900 mb-2">Bucket List</h3>
          <p className="text-neutral-600">Coming soon...</p>
        </div>
      </div>
    </AppLayout>
  );
}
