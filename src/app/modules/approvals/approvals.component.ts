import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization/authorization.service';
import { Store, select } from '@ngrx/store';
import { State, Template, User } from '@models/*';
import { TemplateActions, FontActions } from '@actions/*';
import { allTemplates, connectionStatus, isSmallScreen, userDepartments } from 'src/app/app-store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DateService } from 'src/app/services/date/date.service';
import { FontFamily, FontSize } from 'src/app/app-store/font/font.model';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss']
})
export class ApprovalsComponent implements OnInit {

  currentUser: User;
  departmentId: number;
  templates: Template[] = [];
  templates$: Subscription;
  isConnected: boolean;
  search = new FormControl('');
  isSmallScreen: boolean;

  constructor(
    private authSevice: AuthorizationService,
    private store: Store<State>,
    private dateService: DateService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.store.select(isSmallScreen)
      .subscribe(small => this.isSmallScreen = small);
    this.store.select(connectionStatus)
      .subscribe(status => this.isConnected = status)

    this.store.dispatch(FontActions.getFontFamilies());
    this.store.dispatch(FontActions.getFontSizes());
    
    this.templates$ = this.store.pipe(
      select(allTemplates)
    ).subscribe(templates => {
      this.templates = templates;
      // autostart first template
      // templates.length && this.editTemplate(templates[0].templateId)
    }
    );

    this.authSevice.getCurrentUser()
      .subscribe(user => {
        if (!user) {
          this.currentUser = null;
          return;
        }
        this.currentUser = user;
        // this.selectDepartment({ value: user.departments[0].departmentId })
      });

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.templates$.unsubscribe();
  }

  selectDepartment({ departmentId }) {
    this.departmentId = departmentId;
    this.store.dispatch(TemplateActions.getTemplates({ departmentId }));
  }
  
  approveTemplate(templateId:number){
    alert(templateId);
  }
  
    
}
