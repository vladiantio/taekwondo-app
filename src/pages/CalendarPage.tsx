import { Calendar, CalendarDayButton } from '@/common/Calendar';
import { Separator } from '@/common/Separator';
import { eventCategories, events, type CalendarEvent } from '@/consts/events';
import { cn } from '@/utils/cn';
import { toTitleCase } from '@/utils/string';
import { format, parse } from 'date-fns';
import { MapPin } from 'lucide-react';
import { useState } from 'react';
import { es } from 'react-day-picker/locale';

function EventIndicator({
  event,
  className,
  ...props
}: React.ComponentProps<'div'> & { event: CalendarEvent }) {
  const color =
    event.color ??
    eventCategories.find((c) => c.slug === event.category)?.color;

  return (
    <div
      className={cn(
        'rounded-full relative size-3 after:absolute after:inset-0 after:scale-30 after:bg-white after:rounded-full',
        className
      )}
      style={{ backgroundColor: color ?? 'var(--color-primary-500)' }}
      {...props}
    />
  );
}

function EventItem({
  event,
  className,
  ...props
}: React.ComponentProps<'div'> & { event: CalendarEvent }) {
  return (
    <div className={cn('space-y-1', className)} {...props}>
      <div className="flex flex-wrap items-center gap-4 font-semibold text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <EventIndicator event={event} />
          <p>
            {event.startTime && event.endTime ? (
              `${event.startTime} - ${event.endTime}`
            ) : (
              <em>(Por definir)</em>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="size-3 text-primary-500" />
          <p>{event.location}</p>
        </div>
      </div>
      <h3 className="font-semibold text-sm">{event.title}</h3>
    </div>
  );
}

function EventList({
  items,
  caption,
}: {
  items: CalendarEvent[];
  caption?: React.ReactNode;
}) {
  const dates = [...new Set(items.map((e) => e.date))];

  return (
    <section className="space-y-6 px-2">
      {caption && (
        <h2 className="font-semibold text-gray-500 mb-4">{caption}</h2>
      )}
      {dates.length ? (
        dates.map((date) => (
          <div key={date} className="space-y-4">
            <h3 className="font-semibold">
              {parse(date, 'yyyy-MM-dd', new Date()).toLocaleString('es', {
                month: 'long',
                day: 'numeric',
              })}
            </h3>
            {items
              .filter((e) => e.date === date)
              .map((event) => (
                <EventItem key={event.id} event={event} />
              ))}
          </div>
        ))
      ) : (
        <p className="font-semibold text-sm text-gray-500">
          No hay eventos todavía.
        </p>
      )}
    </section>
  );
}

function SelectedDayEventList({ selectedDate }: { selectedDate: Date }) {
  const eventsForSelectedDate = events.filter(
    (e) => e.date === format(selectedDate, 'yyyy-MM-dd')
  );

  return <EventList items={eventsForSelectedDate} />;
}

function UpcomingEventList() {
  const upcomingEvents = events.filter((e) => {
    const date = parse(e.date, 'yyyy-MM-dd', new Date());
    return e.date === format(new Date(), 'yyyy-MM-dd') || new Date() < date;
  });

  return <EventList items={upcomingEvents} caption="Próximos eventos" />;
}

export function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  return (
    <div className="space-y-6">
      <Calendar
        locale={es}
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="w-full"
        components={{
          MonthCaption: ({
            calendarMonth,
            className,
            displayIndex: _,
            ...props
          }) => (
            <div className={cn(className, 'flex-col')} {...props}>
              <span className="font-medium text-lg leading-snug">
                {toTitleCase(
                  calendarMonth.date.toLocaleString('es', {
                    month: 'long',
                  })
                )}
              </span>
              <span className="text-xs text-gray-500">
                {calendarMonth.date.toLocaleString('es', {
                  year: 'numeric',
                })}
              </span>
            </div>
          ),
          DayButton: ({ modifiers, day, ...props }) => (
            <div className="flex flex-col items-center gap-0.5">
              <CalendarDayButton
                day={day}
                locale={es}
                modifiers={modifiers}
                {...props}
              />
              <div className="flex items-center gap-0.5 min-h-2 min-w-2">
                {events
                  .filter((e) => e.date === format(day.date, 'yyyy-MM-dd'))
                  .map((e) => (
                    <EventIndicator key={e.id} className="size-2" event={e} />
                  ))}
              </div>
            </div>
          ),
        }}
      />

      {selectedDate && <SelectedDayEventList selectedDate={selectedDate} />}

      <Separator className="data-[orientation=horizontal]:w-12 data-[orientation=horizontal]:h-1 mx-auto rounded-full" />

      <UpcomingEventList />
    </div>
  );
}
