import { Component, OnInit, Input, ViewChild, Directive, ElementRef, Output, EventEmitter, AfterViewChecked, OnChanges } from '@angular/core';
import { State, DataEntry, CurrentDataEntry } from '@models/*';
import { Store, select } from '@ngrx/store';
import { Template } from '@models/';
import { allTemplates, dataEntriesOnDate } from 'src/app/app-store';
import { Router } from '@angular/router';
import { tap, mergeMap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DateService } from 'src/app/services/date/date.service';
import { DataEntryActions } from '@actions/*';
import { MessageService } from 'src/app/modules/message/sevices/message.service';


@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss']
})
export class TemplatesListComponent implements OnInit, OnChanges {
  @Input() day;
  @Input() shift;
  @Input() calendarHight: number;
  @Output() clickShowMore = new EventEmitter();

  // @ViewChild('shiftEl') shiftEl: ElementRef;
  // @ViewChild('templateListEl') templateListEl: ElementRef;
  style = {
    lock: { name: "lock", styleSvg: { width: '1rem', height: '1rem' }, styleClass: 'text-gray-500 bg-gray-100' },
    submited: { name: "check-circle-outline", styleSvg: { fill: 'green', width: '1rem', height: '1rem' }, styleClass: 'bg-green-100 text-green-500' },
    missed: { name: "alert-circle-outline", styleSvg: { fill: 'red', width: '1rem', height: '1rem' }, styleClass: 'bg-red-100 text-red-500' },
    open: { name: "circle-outline", styleSvg: { width: '1rem', height: '1rem' }, styleClass: 'bg-orange-100 text-orange-500' },
  }

  templates;
  dataEntries: DataEntry[];
  data$: Subscription
  dataEntries$: Subscription
  // listHeight: number;
  // shiftHeight: number;
  isShowMore: boolean = true;
  showedTemplates = [];
  hiddenTemplates = [];

  constructor(
    private store: Store<State>,
    private router: Router,
    private dateService: DateService,
    private messageService: MessageService
  ) { }
  ngOnChanges(): void {
    this.calendarHight && this.templates && this.splitTemplates();
  }
  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.data$.unsubscribe();
  }
  getData() {
    this.data$ = this.store.pipe(
      select(dataEntriesOnDate),
      mergeMap(dataEntries => this.store.select(allTemplates).pipe(
        map(templates => {
          return {
            templates,
            dataEntries
          }
        })
      )),
      tap(data => this.createData(data)),
    ).subscribe()
  }

  createData(data: { templates: Template[], dataEntries: DataEntry[] }) {
    let startDate = new Date(this.dateService.dateLocalJSON(this.day.value.date).slice(0, 11) + this.shift.schedule.startTime);
    let endDate = new Date(this.dateService.dateLocalJSON(this.day.value.date).slice(0, 11) + this.shift.schedule.endTime);
    if (this.shift.part === 1) endDate = new Date(endDate.setDate(endDate.getDate() + 1));
    if (this.shift.part === 2) startDate = new Date(startDate.setDate(endDate.getDate() - 1));

    const templates = data.templates.map((template: Template) => {
      let dataEntry: DataEntry = null;
      // let svgIcon = this.svgIcon.missed;
      data.dataEntries.map((item: DataEntry) => {
        if ((item.template.templateId === template.templateId) && this.dateService.isBetween(item.createDate, startDate, endDate)) dataEntry = item
      });
      const getStyle = () => {
        if (new Date() < startDate) return this.style.lock;
        if (!dataEntry) return this.style.missed;
        if (dataEntry.submitDate) return this.style.submited;
        return this.style.open;
      }

      return {
        style: getStyle(),
        template,
        dataEntry,
        startDate,
        endDate,
      };
    })
    this.templates = templates;
    this.calendarHight && this.templates && this.splitTemplates();
  }

  splitTemplates() {
    let index = this.shift.templNum;
    if (index < this.templates.length) index = this.shift.templNum - 1;
    this.showedTemplates = [...this.templates];
    this.hiddenTemplates = this.showedTemplates.splice(index);
  }


  /* 
  174.22
  30.165
  23.395
    getTemplates() {
      this.templates$ = this.store.pipe(
        select(allTemplates),
        tap(list => this.templates = list)
      ).subscribe()
    }
   
    getDataEntries() {
      this.dataEntries$ = this.store.pipe(
        select(dataEntriesOnDate),
        tap(dataEntries => this.dataEntries = dataEntries),
      ).subscribe()
    }
   */
  deadlineMins = 24 * 60;
  clickTemplate(item) {
    const deadline = new Date(item.endDate.getTime() + this.deadlineMins * 60000);
    const currentDataEntry = <CurrentDataEntry>{
      endDate: item.endDate,
      startDate: item.startDate,
      deadline,
    };
    if (!item.dataEntry && new Date() > deadline) {
      this.messageService.alertMessage('data is missing')
      return;
    }
    if (item.dataEntry) {
      currentDataEntry.dataEntry = new DataEntry(item.dataEntry)
    } else {
      currentDataEntry.dataEntry = new DataEntry({
        scheduleId: this.shift.schedule.scheduleId,
        template: item.template,
        templateId: item.template.templateId,
      });
    }
    this.store.dispatch(DataEntryActions.setCurrentDataEntry({ currentDataEntry }))
    this.router.navigate(['dataentry'])
  }
  showMore() {
    // const shiftHeight = this.shiftHeight;
    const templLength = this.templates.length;
    this.clickShowMore.emit({ templLength })
  }
}
