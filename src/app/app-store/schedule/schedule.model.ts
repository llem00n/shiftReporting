export interface Schedule {
  ScheduleId: number;
  DepartmentId: number;
  ShiftId: number;
  StartTime: string;
  EndTime: string;
  RecurEveryWeeks: number;
  Monday: boolean;
  Tuesday: boolean;
  Wednesday: boolean;
  Thursday: boolean;
  Friday: boolean;
  Saturday: boolean;
  Sunday: boolean;
}
