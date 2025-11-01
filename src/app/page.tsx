'use client';

import { motion } from 'framer-motion';
import { Calendar, Users, MessageCircle, List, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: Calendar,
    title: 'Shared Calendar',
    description: 'Sync and share calendars with friends. See everyone\'s availability at a glance.',
  },
  {
    icon: Users,
    title: 'Friend Groups',
    description: 'Organize events with different friend circles. Keep your plans organized.',
  },
  {
    icon: MessageCircle,
    title: 'Group Chat',
    description: 'Built-in chat for every plan. Coordinate without switching apps.',
  },
  {
    icon: List,
    title: 'Bucket Lists',
    description: 'Track things you want to do together. Turn ideas into plans.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/30 to-neutral-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
            Social planning,{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              made simple
            </span>
          </h1>
          <p className="text-xl text-neutral-600 mb-8">
            The sleek calendar app designed for friends. Plan together, chat together, stay connected.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/calendar">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/calendar">
              <Button variant="secondary" size="lg">
                View Demo
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <Card hoverable className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-neutral-600">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <Card className="p-12 max-w-3xl mx-auto bg-gradient-to-r from-primary-600 to-primary-500">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to start planning?
            </h2>
            <p className="text-primary-100 mb-6 text-lg">
              Join thousands of friends making plans together.
            </p>
            <Link href="/calendar">
              <Button variant="secondary" size="lg">
                Launch Calendar
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
