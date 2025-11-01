'use client';

import { Calendar, Users, MessageCircle, List } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: Calendar,
    title: 'Shared Calendar',
    description: 'Sync and share calendars with friends.',
  },
  {
    icon: Users,
    title: 'Friend Groups',
    description: 'Organize events with different circles.',
  },
  {
    icon: MessageCircle,
    title: 'Group Chat',
    description: 'Built-in chat for every plan.',
  },
  {
    icon: List,
    title: 'Bucket Lists',
    description: 'Track things to do together.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-8 py-32">
        <div className="max-w-5xl">
          <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-none mb-8">
            Social<br/>
            Planning
          </h1>
          <p className="text-2xl font-bold uppercase tracking-wide mb-12 max-w-2xl">
            The calendar app for friends. Plan together. Chat together. Stay connected.
          </p>
          <div className="flex gap-4">
            <Link href="/calendar">
              <Button size="lg">
                Start Now
              </Button>
            </Link>
            <Link href="/calendar">
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-32 max-w-5xl">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-black flex items-center justify-center">
                    <Icon className="h-8 w-8 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wide mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-base text-gray-700">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-32">
          <Card className="p-16 bg-black text-white border-black">
            <h2 className="text-5xl font-bold uppercase tracking-tighter mb-6">
              Ready to start?
            </h2>
            <p className="text-xl font-bold uppercase tracking-wide mb-8 text-gray-300">
              Join thousands making plans together.
            </p>
            <Link href="/calendar">
              <Button variant="secondary" size="lg">
                Launch Calendar
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
