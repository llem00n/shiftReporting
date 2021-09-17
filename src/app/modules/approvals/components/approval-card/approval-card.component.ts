import { DepartmentActions, TemplateActions } from '@actions/*';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataEntry, Department, State, Template } from '@models/*';
import { ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { userDepartments, isSmallScreen, allTemplates } from 'src/app/app-store';
import { OidcClientService } from 'src/app/modules/authorization/oidc-client.service';
import { MessageService } from 'src/app/modules/message/sevices/message.service';

@Component({
  selector: 'app-approval-card',
  templateUrl: './approval-card.component.html',
  styleUrls: ['./approval-card.component.scss']
})
export class ApprovalCardComponent implements OnInit {

  @Input() dataEntry: DataEntry;
  @Output() clickCheck = new EventEmitter<number>();

  isSmallScreen: boolean;
  department: Department;
  
  constructor(
    private store: Store<State>,
    private messageService: MessageService,
    private authService: OidcClientService,
  ) { }

  ngOnInit(): void {   

    this.store.select(isSmallScreen)
      .subscribe(small => this.isSmallScreen = small);
  }

  get submitDate() {
    return new Date(this.dataEntry.submitDate).toLocaleString()
  }

  check() {
    this.clickCheck.emit(this.dataEntry.dataEntryId);
  }
}



