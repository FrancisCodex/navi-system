import { LayoutDashboard, Users, BookOpen, Settings2, ClipboardEdit, Book } from 'lucide-react';

const SidebarLinks = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: 'Incubatees',
    url: '/dashboard/incubatees',
    icon: Users,
  },
  {
    title: 'Activities',
    url: '/dashboard/activities',
    icon: Book,
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