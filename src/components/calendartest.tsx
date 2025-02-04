import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  addMonths,
  subMonths,
  isToday,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Appointment {
  id: string;
  title: string;
  date: Date;
  description: string;
}

// Mock appointments data
const appointments: Appointment[] = [
  {
    id: '1',
    title: 'Dental Checkup',
    date: new Date(2023, 11, 15, 10, 30),
    description: 'Regular dental checkup with Dr. Smith',
  },
  {
    id: '2',
    title: 'Eye Examination',
    date: new Date(2023, 11, 18, 14, 0),
    description: 'Annual eye examination with Dr. Johnson',
  },
];

export function Calendar2() {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(
      (appointment) =>
        format(appointment.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <th
                  key={day}
                  className="p-2 border text-sm font-semibold text-gray-600"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => (
              <tr key={weekIndex}>
                {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day) => {
                  const dayAppointments = getAppointmentsForDate(day);
                  const hasAppointments = dayAppointments.length > 0;

                  return (
                    <td
                      key={day.toString()}
                      className={`border p-2 h-24 align-top ${
                        !isSameMonth(day, currentDate) ? 'bg-gray-50' : ''
                      } ${isToday(day) ? 'bg-blue-50' : ''}`}
                    >
                      <Dialog>
                        <DialogTrigger className="w-full h-full">
                          <div className="flex flex-col h-full">
                            <span className="text-sm mb-1">
                              {format(day, 'd')}
                            </span>
                            {hasAppointments && (
                              <div className="space-y-1">
                                {dayAppointments.map((apt) => (
                                  <div
                                    key={apt.id}
                                    className="text-xs bg-blue-100 p-1 rounded truncate"
                                  >
                                    {apt.title}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </DialogTrigger>
                        {hasAppointments && (
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Appointments for {format(day, 'MMMM d, yyyy')}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              {dayAppointments.map((apt) => (
                                <div key={apt.id} className="border-b pb-2">
                                  <h3 className="font-semibold">{apt.title}</h3>
                                  <p className="text-sm text-gray-600">
                                    {format(apt.date, 'h:mm a')}
                                  </p>
                                  <p className="text-sm mt-1">
                                    {apt.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </DialogContent>
                        )}
                      </Dialog>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="grid grid-cols-7 gap-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-gray-600 p-2"
            >
              {day}
            </div>
          ))}
          {days.map((day) => {
            const dayAppointments = getAppointmentsForDate(day);
            const hasAppointments = dayAppointments.length > 0;

            return (
              <Dialog key={day.toString()}>
                <DialogTrigger
                  className={`aspect-square p-2 text-center ${
                    !isSameMonth(day, currentDate) ? 'text-gray-400' : ''
                  } ${isToday(day) ? 'bg-blue-50' : ''} ${
                    hasAppointments ? 'bg-blue-100' : ''
                  }`}
                >
                  <div className="text-sm">{format(day, 'd')}</div>
                </DialogTrigger>
                {hasAppointments && (
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Appointments for {format(day, 'MMMM d, yyyy')}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {dayAppointments.map((apt) => (
                        <div key={apt.id} className="border-b pb-2">
                          <h3 className="font-semibold">{apt.title}</h3>
                          <p className="text-sm text-gray-600">
                            {format(apt.date, 'h:mm a')}
                          </p>
                          <p className="text-sm mt-1">{apt.description}</p>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                )}
              </Dialog>
            );
          })}
        </div>
      </div>
    </div>
  );
}