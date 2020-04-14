import { Component, OnInit } from '@angular/core';
import { AuthorizationService, CurrentUser } from '../authorization/authorization.service';
import { Store, select } from '@ngrx/store';
import { State, Template } from '@models/*';
import { TemplateActions } from '@actions/*';
import { allTemplates } from 'src/app/app-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  currentUser: CurrentUser;
  departmentId: number;
  templates: Template[] = [];

  constructor(
    private authSevice: AuthorizationService,
    private store: Store<State>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.store.pipe(
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
        this.selectDepartment({ value: user.departments[0].departmentId })
      });

  }

  selectDepartment({ value }) {
    this.departmentId = value;
    this.store.dispatch(TemplateActions.getTemplates({ departmentId: value }));
  }
  editTemplate(event) {
    const template = JSON.parse(JSON.stringify(this.templates.find(i => i.templateId === event)));
    this.store.dispatch(TemplateActions.setEditingTemplate({ template }));
    this.router.navigate(['configuration/templates/' + event])
  }
  addTemplate() {
    const _departmentId = this.departmentId;
    this.store.dispatch(TemplateActions.setEditingTemplate({ template: <Template>{ _departmentId } }));
    this.router.navigate(['configuration/templates/' + 'new'])
  }
}
