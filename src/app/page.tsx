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
    description: 'See when everyone is free. Sync calendars. Make plans that actually happen.',
  },
  {
    icon: Users,
    title: 'Friend Circles',
    description: 'Organize events by group. Keep your work friends and weekend crew separate.',
  },
  {
    icon: MessageCircle,
    title: 'Built-in Chat',
    description: 'Every plan gets its own thread. No more lost messages in group chats.',
  },
  {
    icon: List,
    title: 'Bucket Lists',
    description: 'Save ideas. Turn ideas into actual plans.',
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-charcoal-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-24 pb-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-6xl md:text-7xl font-semibold tracking-tight leading-tight mb-6 text-charcoal-950">
            You down?
          </h1>
          <p className="text-xl md:text-2xl text-charcoal-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The social calendar that helps friends actually sync up.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/calendar">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" strokeWidth={2} />
              </Button>
            </Link>
            <Link href="/calendar">
              <Button variant="ghost" size="lg">
                View Demo
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-24 max-w-4xl mx-auto"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} variants={fadeIn}>
                <Card hoverable className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent-600 rounded-xl flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-charcoal-950 mb-2 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-charcoal-600 leading-relaxed">
                        {feature.description}
                      </p>
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
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-24 max-w-4xl mx-auto"
        >
          <Card className="p-12 bg-gradient-to-br from-accent-600 to-accent-700 border-accent-600 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
              Ready to sync up?
            </h2>
            <p className="text-lg text-accent-100 mb-6">
              Join friends making plans that actually happen.
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
