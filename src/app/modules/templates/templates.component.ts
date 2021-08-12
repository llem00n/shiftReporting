import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization/authorization.service';
import { Store, select } from '@ngrx/store';
import { State, Template, User } from '@models/*';
import { TemplateActions } from '@actions/*';
import { allTemplates, userDepartments } from 'src/app/app-store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TemplateCopyComponent } from './components/template-copy/template-copy.component';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  currentUser: User;
  departmentId: number;
  templates: Template[] = [];
  templates$: Subscription;

  constructor(
    private authSevice: AuthorizationService,
    private store: Store<State>,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
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
  editTemplate(event) {
    const template = JSON.parse(JSON.stringify(this.templates.find(i => i.templateId === event)));
    this.store.dispatch(TemplateActions.setEditingTemplate({ template }));
    this.router.navigate(['configuration/templates/' + event])
  }
  delete(id) {
    this.store.dispatch(TemplateActions.deleteTemplate({ id }))
  }

  addTemplate() {
    const _departmentId = this.departmentId;
    this.store.dispatch(TemplateActions.setEditingTemplate({ template: <Template>{ _departmentId } }));
    this.router.navigate(['configuration/templates/' + 'new'])
  }

  copy(id:number){

    const templateToCopy = JSON.parse(JSON.stringify(this.templates.find(i => i.templateId === id)));
    this.dialog.open(TemplateCopyComponent,{data: {
      templateName:templateToCopy.name,
      departmentsAvailable:this.currentUser.departments,
      currentDepartmentId:this.departmentId 
    }}).afterClosed().subscribe(
      result => { // result = {departmentId:number,name:string}
        if(result){
          templateToCopy._departmentId = result.departmentId;
          templateToCopy.name = result.name;//the user is asked to change the name if he copies the template in the same department
          this.store.dispatch(TemplateActions.addTemplate({departmentId:templateToCopy._departmentId,template:templateToCopy}));
        }
      }
    )
  }
}
