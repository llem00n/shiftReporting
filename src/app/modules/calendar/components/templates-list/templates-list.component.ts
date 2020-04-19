import { Component, OnInit, Input } from '@angular/core';
import { State, DataEntry } from '@models/*';
import { Store, select } from '@ngrx/store';
import { Template } from '@models/';
import { allTemplates, dataEntriesOnDate } from 'src/app/app-store';
import { Router } from '@angular/router';
import { tap, mergeMap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DateService } from 'src/app/services/date/date.service';
import { DataEntryActions } from '@actions/*';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss']
})
export class TemplatesListComponent implements OnInit {
  @Input() day;
  @Input() shift;

  // svgSrc = "check-circle-outline"
  style = {
    lock: { name: "lock", styleSvg: { width: '1rem', height: '1rem' }, styleClass: 'text-gray-600 bg-gray-100' },
    submited: { name: "check-circle-outline", styleSvg: { fill: 'green', width: '1rem', height: '1rem' }, styleClass: 'bg-green-100 text-green-600' },
    missed: { name: "alert-circle", styleSvg: { fill: 'red', width: '1rem', height: '1rem' }, styleClass: 'bg-red-100 text-red-600' },
    open: { name: "alert-circle-outline", styleSvg: { fill: 'red', width: '1rem', height: '1rem' }, styleClass: 'bg-red-100 text-red-600' },
  }
  
  templates;
  dataEntries: DataEntry[];

  data$: Subscription
  dataEntries$: Subscription

  constructor(
    private store: Store<State>,
    private router: Router,
    private dateService: DateService,
  ) { }

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
      };
    })
    this.templates = templates;
  }

  /* 
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
  clickTemplate(item) {
    let dataEntry: DataEntry;
    if (item.dataEntry) {
      dataEntry = new DataEntry(item.dataEntry)
    } else {
      dataEntry = new DataEntry({
        scheduleId: this.shift.schedule.scheduleId,
        template: item.template,
      });
    }
    this.store.dispatch(DataEntryActions.setCurrentDataEntry({ dataEntry }))
    this.router.navigate(['dataentry'])
  }
}
