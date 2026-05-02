import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from 'react-day-picker';

import { cn } from '@/utils/cn';
import { Button, variantClass } from '@/common/Button';
import { useCallback } from 'react';
import { toTitleCase } from '@/utils/string';

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'outline',
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'group/calendar bg-background [--cell-radius:var(--radius-lg)] [--cell-size:--spacing(8)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          toTitleCase(date.toLocaleString(locale?.code, { month: 'short' })),
        formatWeekdayName: (weekday) =>
          toTitleCase(
            weekday.toLocaleDateString(locale?.code, { weekday: 'short' })
          ),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn(
          'relative flex flex-col gap-4 md:flex-row',
          defaultClassNames.months
        ),
        month: cn('flex w-full flex-col gap-4', defaultClassNames.month),
        nav: cn(
          'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1 px-3',
          defaultClassNames.nav
        ),
        button_previous: cn(
          'flex items-center justify-center rounded-(--cell-radius) transition-all',
          variantClass[buttonVariant],
          'text-black size-(--cell-size) p-0 select-none aria-disabled:opacity-50',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          'flex items-center justify-center rounded-(--cell-radius) transition-all',
          variantClass[buttonVariant],
          'text-black size-(--cell-size) p-0 select-none aria-disabled:opacity-50',
          defaultClassNames.button_next
        ),
        month_caption: cn(
          'flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)',
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          'flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium',
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          'cn-calendar-dropdown-root relative rounded-(--cell-radius)',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          'absolute inset-0 bg-popover opacity-0',
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          'font-medium select-none',
          captionLayout === 'label'
            ? 'text-sm'
            : 'cn-calendar-caption-label flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-black/50',
          defaultClassNames.caption_label
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'flex-1 rounded-(--cell-radius) text-[0.8rem] font-medium text-black/50 select-none',
          defaultClassNames.weekday
        ),
        week: cn('mt-2 flex w-full', defaultClassNames.week),
        week_number_header: cn(
          'w-(--cell-size) select-none',
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          'text-[0.8rem] text-black/50 select-none',
          defaultClassNames.week_number
        ),
        day: cn(
          'group/day relative h-full w-full rounded-(--cell-radius) p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)',
          props.showWeekNumber
            ? '[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)'
            : '[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)',
          defaultClassNames.day
        ),
        range_start: cn('relative isolate z-0', defaultClassNames.range_start),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('relative isolate z-0', defaultClassNames.range_end),
        today: cn('text-black', defaultClassNames.today),
        outside: cn(
          'text-black/50 aria-selected:text-black/50',
          defaultClassNames.outside
        ),
        disabled: cn('text-black/50 opacity-50', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeftIcon
                className={cn('cn-rtl-flip size-5', className)}
                {...props}
              />
            );
          }

          if (orientation === 'right') {
            return (
              <ChevronRightIcon
                className={cn('cn-rtl-flip size-5', className)}
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon className={cn('size-4', className)} {...props} />
          );
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

export function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames();
  const { ref: refFromPicker, ...restProps } = props as typeof props & {
    ref?: React.Ref<HTMLButtonElement | null>;
  };

  const setButtonRef = useCallback(
    (node: HTMLButtonElement | null) => {
      if (typeof refFromPicker === 'function') {
        refFromPicker(node);
      } else if (refFromPicker) {
        (refFromPicker as React.RefObject<HTMLButtonElement | null>).current =
          node;
      }
      if (node && modifiers.focused) {
        requestAnimationFrame(() => {
          node.focus();
        });
      }
    },
    [modifiers.focused, refFromPicker]
  );

  return (
    <Button
      ref={setButtonRef}
      variant="ghost"
      size="icon-sm"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'rounded-(--cell-radius) size-9 text-sm isolate z-10 flex-col gap-1 outline-none leading-none group-data-[today=true]/day:bg-black/10 data-[range-end=true]:rounded-none data-[range-end=true]:rounded-r-(--cell-radius) data-[range-end=true]:bg-primary-500 data-[range-end=true]:text-white data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-black/10 data-[range-middle=true]:text-black data-[range-start=true]:rounded-none data-[range-start=true]:rounded-l-(--cell-radius) data-[range-start=true]:bg-primary-500 data-[range-start=true]:text-white data-[selected-single=true]:bg-primary-500 data-[selected-single=true]:text-white [&>span]:text-xs [&>span]:opacity-70 after:absolute after:inset-0',
        defaultClassNames.day,
        className
      )}
      {...restProps}
    />
  );
}
