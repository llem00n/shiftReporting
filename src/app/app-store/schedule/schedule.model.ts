export interface Schedule {

  scheduleId: number;
  departmentId: number;
  shiftId: number;
  startTime: string;
  endTime: string;
  recurEveryWeeks: number;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  shiftName: string;
  shiftDescription: string;

}
