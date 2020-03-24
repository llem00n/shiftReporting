export class Schedule {
  scheduleId?: number = null;
  departmentId: number = null;
  shiftId: number = null;
  startTime: string = null;
  endTime: string = null;
  recurEveryWeeks: number = 1;
  monday: boolean = false;
  tuesday: boolean = false;
  wednesday: boolean = false;
  thursday: boolean = false;
  friday: boolean = false;
  saturday: boolean = false;
  sunday: boolean = false;
  shiftName: string = null;
  shiftDescription: string = null;
  validFromDate: string = null;
  validToDate: string = null;

  constructor(opt: {} = {}) {
    Object.keys(opt).map(key => {
      if (Object.keys(this).includes(key)) {
        this[key] = opt[key]
      }
    })
  }
}