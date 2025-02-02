export interface BasicDatePickerProps {
  date?: string | undefined;
}

export interface WeekAndDaysGridLayoutProps {
  selectedDate: DateType | undefined;
  onDateSelect: (val: DateType) => void;
}

export interface DateGridProps extends WeekAndDaysGridLayoutProps {
  currentDate: DateType;
  date: number | string;
}

export type DateType = {
  year: number;
  month: number;
  date: number;
};
