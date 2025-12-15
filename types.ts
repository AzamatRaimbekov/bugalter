import { LucideIcon } from 'lucide-react';

export interface SubService {
  text: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  items: SubService[];
  highlight?: boolean;
}