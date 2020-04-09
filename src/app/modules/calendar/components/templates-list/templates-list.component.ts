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
  svgIcon = {
    lock: { name: "lock", style: { fill: 'grey', width: '1rem', height: '1rem' } },
    submited: { name: "check-circle-outline", style: { fill: 'green', width: '1rem', height: '1rem' } },
    missed: { name: "checkbox-blank-circle", style: { fill: 'red', width: '1rem', height: '1rem' } },
    open: { name: "checkbox-blank-circle-outline", style: { fill: 'red', width: '1rem', height: '1rem' } },
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

      const getSvgIcon = () => {
        if (new Date() < startDate) return this.svgIcon.lock;
        if (!dataEntry) return this.svgIcon.missed;
        if (dataEntry.submitDate) return this.svgIcon.submited;
        return this.svgIcon.open;
      }

      return {
        svgIcon: getSvgIcon(),
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
