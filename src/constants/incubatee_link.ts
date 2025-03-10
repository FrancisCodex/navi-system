import { LayoutDashboard, Users, BookOpen, Egg, ClipboardEdit, Book } from 'lucide-react';

const IncubateeNavLinks = [
  {
    title: 'Dashboard',
    url: '/incubatees',
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: 'Activities',
    url: '/incubatees/activities',
    icon: Book,
  },
  {
    title: 'Appointments',
    url: '/incubatees/appointments',
    icon: ClipboardEdit,
  },
  {
    title: 'Mentors',
    url: '/incubatees/mentors',
    icon: BookOpen,
  },
  {
    title: 'My Startup',
    url: '/incubatees/myteam',
    icon: Egg,
  }
];

export default IncubateeNavLinks;