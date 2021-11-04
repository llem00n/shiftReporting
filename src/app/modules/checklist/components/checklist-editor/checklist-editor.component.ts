import { ChecklistActions } from '@actions/*';
import { Component, OnInit } from '@angular/core';
import { State } from '@models/*';
import { Store } from '@ngrx/store';
import { checklistState, currentChecklistItems, currentScheduleForChecklist, isSmallScreen } from 'src/app/app-store';
import { ChecklistItem } from 'src/app/app-store/checklist/checklist-item.model';
import { MessageService } from 'src/app/modules/message/sevices/message.service';
import { Location } from '@angular/common';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-checklist-editor',
  templateUrl: './checklist-editor.component.html',
  styleUrls: ['./checklist-editor.component.scss']
})
export class ChecklistEditorComponent implements OnInit {
  checklistItems: ChecklistItem[] = [];
  editingItems: ChecklistItem[] = [];
  scheduleId: number;
  isSmallScreen: boolean;

  constructor(
    private store: Store<State>,
    private messages: MessageService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.store.select(currentChecklistItems).subscribe(x => {
      this.checklistItems = JSON.parse(JSON.stringify(x))
      this.checklistItems.sort((a, b) => a.order > b.order ? 1 : a.order == b.order ? 0 : -1);
    });
    this.store.select(currentScheduleForChecklist).subscribe(x => this.scheduleId = x);

    this.store.select(isSmallScreen)
      .subscribe(x => this.isSmallScreen = x);
  }

  addItem() {
    this.checklistItems = [...this.checklistItems, {
      id: 0,
      name: '',
      description: '',
      scheduleId: this.scheduleId,
      order: this.checklistItems.length
    }];
  }

  removeItem(x) {
    this.checklistItems = this.checklistItems.filter(a => a != x);
  }

  cancel() {
    this.location.back();
  }

  save() {
    for (let x of this.checklistItems)
      if (!x.name) {
        this.messages.errorMessage('All tasks must have a name');
        return;
      }

    for (let [index, x] of this.checklistItems.entries()) {
      x.order = index;
    }

    this.store.select(currentScheduleForChecklist).subscribe(id => {
      this.store.dispatch(ChecklistActions.updateChecklist({items: this.checklistItems, scheduleId: id}));
    });

    this.location.back();
  }

  drop(event: CdkDragDrop<ChecklistItem[]>): void {
    moveItemInArray(this.checklistItems, event.previousIndex, event.currentIndex);
  }
}
