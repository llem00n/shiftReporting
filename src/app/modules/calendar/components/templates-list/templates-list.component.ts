import { Component, OnInit, Input } from '@angular/core';
import { State, DataEntry } from '@models/*';
import { Store, select } from '@ngrx/store';
import { Template } from '@models/';
import { allTemplates, dataEntriesOnDate } from 'src/app/app-store';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss']
})
export class TemplatesListComponent implements OnInit {
  @Input() day;
  @Input() shift;

  templates: Template[];
  dataEntries: DataEntry[];
  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.getTemplates();
    this.getDataEntries();
    console.log(this.day);
    console.log(this.shift);
    
    
  }

  getTemplates() {
    this.store.pipe(
      select(allTemplates)
    ).subscribe(list => {
      this.templates = list;

    })
  }
  getDataEntries() {
    this.store.pipe(
      select(dataEntriesOnDate)
    ).subscribe(dataEntries => {
      this.dataEntries = dataEntries;
    })
  }

  svgSrc() {
    return ''
  }
}
