export interface BasicDatePickerProps {
  date?: string | undefined;
}

export interface DateGridProps {
  currentDate: DateType;
  date: number | string;
}

export type DateType = {
  year: number;
  month: number;
  date: number;
};
