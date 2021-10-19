import { ChecklistActions } from '@actions/*';
import { Component, OnInit } from '@angular/core';
import { State, User } from '@models/*';
import { select, Store } from '@ngrx/store';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { currentChecklistItems, currentChecklistDataEntry, currentChecklistDataEntryProperties, isSmallScreen } from 'src/app/app-store';
import { ChecklistDataEntry } from 'src/app/app-store/checklist/data-entry.model';
import { Location } from '@angular/common';
import { ChecklistItem } from 'src/app/app-store/checklist/checklist-item.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AuthorizationService } from 'src/app/modules/authorization/authorization.service';
import { MessageService } from 'src/app/modules/message/sevices/message.service';
import { Properties } from 'src/app/app-store/checklist/properties';

@Component({
  selector: 'app-checklist-data-entry',
  templateUrl: './checklist-data-entry.component.html',
  styleUrls: ['./checklist-data-entry.component.scss']
})
export class ChecklistDataEntryComponent implements OnInit {
  dataEntry: ChecklistDataEntry;
  properties: Properties;

  undoneItems: ChecklistItem[] = [];
  doneItems: ChecklistItem[] = [];

  user: User;

  isSmallScreen: boolean;


  constructor(
    private store: Store<State>,
    private location: Location,
    private authService: AuthorizationService,
    private message: MessageService,
  ) { }

  ngOnInit(): void {
    this.store.select(currentChecklistDataEntry)
      .subscribe(dataEntry => {
        this.dataEntry = JSON.parse(JSON.stringify(dataEntry));
        if (dataEntry) {
          this.undoneItems = this.dataEntry.checklist.filter(x => !this.dataEntry.checkedItems.includes(x.id));
          this.dataEntry.checkedItems.forEach(x => this.doneItems.push(this.dataEntry.checklist.find(a => a.id == x)));
        }
      });

    this.store.select(currentChecklistDataEntryProperties)
      .subscribe(properties => this.properties = properties);

    this.authService.getCurrentUser().subscribe(x => this.user = x);

    this.store.select(isSmallScreen)
      .subscribe(x => this.isSmallScreen = x);
  }

  save() {
    if (this.getSavePermission()) {
      this.store.dispatch(ChecklistActions.updateDataEntry({ dataEntry: this.dataEntry }));
      this.location.back();
    }
  }

  cancel() {
    this.store.dispatch(ChecklistActions.setCurrentDataEntry({ dataEntry: null }));
    this.location.back();
  }

  drop(event: CdkDragDrop<ChecklistItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    this.updateCheckedItems();
  }

  updateCheckedItems() {
    this.dataEntry.checkedItems = [];
    this.doneItems.forEach(x => this.dataEntry.checkedItems.push(x.id));
  }

  getSavePermission(): boolean {
    if ((new Date() < this.properties.shiftStartTime) || (this.user.roleId === 4) || (this.user.roleId === 5 && new Date() > this.properties.deadline)) {
      if (this.user.roleId === 3 && new Date() > this.properties.deadline)
        this.message.errorMessage('You cannot submit the checklist after the deadline');
      else if (new Date() < this.properties.shiftStartTime)
        this.message.errorMessage("Can't submit the checklist before the start of the shift");
      else if (this.user.roleId === 5 && new Date() > this.properties.deadline)
        this.message.errorMessage("Can't submit the checklist after the deadline");
      else if (this.user.roleId === 4)
        this.message.errorMessage("You don't have rights for that");
      else
        this.message.errorMessage("Can't submit the checklist");

      return false;
    }

    return true;
  }

  onCheckboxChange(event, item) {
    if (event.checked) {
      this.undoneItems.splice(this.undoneItems.indexOf(item), 1);
      this.doneItems.push(item)
    } else {
      this.doneItems.splice(this.doneItems.indexOf(item), 1);
      this.undoneItems.push(item)
    }
  }
}
