import { User } from './auth';

export type ProjectSortValues =
  | 'newest'
  | 'oldest'
  | 'a-z'
  | 'z-a'
  | 'most-bugs'
  | 'least-bugs'
  | 'most-members'
  | 'least-members';

export interface ProjectMember {
  id: number;
  joinedAt: Date;
  member: User;
}

export interface ProjectPayload {
  name: string;
  members: string[];
}

export interface ProjectState {
  id: string;
  name: string;
  members: string;
  bugs: string;
  admin: string;
  timestamp: Date;
}