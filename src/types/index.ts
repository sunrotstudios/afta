// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

// Event types
export interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  createdBy: string;
  attendees: string[];
  groupId?: string;
  isPrivate: boolean;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Group types
export interface Group {
  id: string;
  name: string;
  description?: string;
  members: string[];
  createdBy: string;
  avatar?: string;
  color?: string;
  createdAt: Date;
}

// Message types
export interface Message {
  id: string;
  content: string;
  senderId: string;
  eventId?: string;
  groupId?: string;
  createdAt: Date;
  read: boolean;
}

// Poll types
export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  eventId?: string;
  groupId?: string;
  createdBy: string;
  createdAt: Date;
  expiresAt?: Date;
}

export interface PollOption {
  id: string;
  text: string;
  votes: string[];
}

// Bucket list types
export interface BucketListItem {
  id: string;
  title: string;
  description?: string;
  groupId?: string;
  createdBy: string;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
}

// Activity feed types
export type ActivityType =
  | 'event_created'
  | 'event_updated'
  | 'event_joined'
  | 'poll_created'
  | 'poll_voted'
  | 'bucket_item_added'
  | 'bucket_item_completed';

export interface Activity {
  id: string;
  type: ActivityType;
  userId: string;
  eventId?: string;
  groupId?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}
