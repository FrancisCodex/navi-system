import { LayoutDashboard, Users, BookOpen, User, ClipboardEdit, Book } from 'lucide-react';

const SidebarLinks = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: 'Startups',
    url: '/dashboard/startups',
    icon: Users,
  },
  {
    title: 'Leaders',
    url: '/dashboard/leaders',
    icon: User,
  },
  {
    title: 'Activities',
    icon: Book,
    url: '/dashboard/activities',
  },
  {
    title: 'Appointments',
    url: '/dashboard/appointments',
    icon: ClipboardEdit,
  },
  {
    title: 'Mentors',
    url: '/dashboard/mentors',
    icon: BookOpen,
  }
];

export default SidebarLinks;