'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent } from "@/components/ui/card";


const LeafletMap = dynamic(() => import('@/components/leaflet-map'), {
  ssr: false,
});

export default function MapPage() {
  return (
    <div className="p-4">
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-0 overflow-hidden">
          <div className="h-[500px] w-full rounded-b-2xl">
            <LeafletMap />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
