import type { CalendarDateProps, CalendarMultiProps, CalendarRangeProps } from 'cally';
export const DateKey = ['min', 'max', 'today', 'focusedDate'] as const;
export const RangeDateKey = [...DateKey, 'tentative'] as const;
export type KeyType = (typeof DateKey)[number];
export type RangeKeyType = (typeof RangeDateKey)[number];
export type DatedCalendarDateProps = Omit<CalendarDateProps, 'value' | KeyType> &
  Partial<Record<KeyType, Date>>;
export type DatedCalendarMultiProps = Omit<CalendarMultiProps, 'value' | KeyType> &
  Partial<Record<KeyType, Date>>;
export type DatedCalendarRangeProps = Omit<CalendarRangeProps, 'value' | RangeKeyType> &
  Partial<Record<RangeKeyType, Date>>;
