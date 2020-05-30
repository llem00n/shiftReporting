import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { PiafAttribute } from './models';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PiafHttpService } from './piaf-http.service';
import { catchError, tap } from 'rxjs/operators';

export declare type PIAFSelector = 'server-database-template' | 'server-database' | 'server-database-attribute' | 'attribute';
@Component({
  selector: 'app-piaf',
  templateUrl: './piaf.component.html',
  styleUrls: ['./piaf.component.scss']
})
export class PiafComponent implements OnInit {

  servers: Array<string> = [];
  databases: Array<string>;
  piefTemplates: Array<string>;
  selectedServer: string;
  selectedDatabase: string;
  selectedAttribute: PiafAttribute;
  selectedPiefTemplateName: string;
  selectedPiefTemplate;

  steps = {
    server: false,
    database: false,
    attribute: false,
    template: false
  }

  isSaveDisabled: boolean = true;

  @ViewChild('stepper', { static: false }) stepper: MatHorizontalStepper;

  constructor(
    public dialogRef: MatDialogRef<PiafComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: PIAFSelector, allowedTypes: string[] },
    private pis: PiafHttpService,
  ) { }


  ngOnInit() {
    this.initial(this.data);

    this.steps.server && this.pis.getServers()
      .subscribe(servers => this.servers = servers);
  }
  initial(data) {
    this.selectedServer = data?.initialData?.serverName;
    this.selectedDatabase = data?.initialData?.databaseName;
    data.type.split('-').map(i => this.steps[i] = true);
  }


  onNoClick(): void {
    this.dialogRef.close(null);
  }

  reset(type?) {
    this.selectedAttribute = null;
    this.selectedPiefTemplateName = null;
    this.selectedPiefTemplate = null;
    if (type === 'database') return;
    this.databases = null;
    this.selectedDatabase = null;
    if (type === 'server') return;
    this.selectedServer = null;
  }

  selectServer(serverName) {
    this.selectedServer = serverName;
    this.reset('server')
    this.pis.getDatabases(serverName)
      .pipe(
        tap(_ => setTimeout(() => { this.stepper.next(); }, 100)),
      )
      .subscribe(databases => this.databases = databases);
  }

  selectDatabase(databaseName) {
    this.selectedDatabase = databaseName;
    this.reset('database')
    if (this.data.type === 'server-database') return;
    if (this.data.type === 'server-database-template') {
      this.pis.getDatabaseEventFrameTemplates({
        serverName: this.selectedServer,
        databaseName: this.selectedDatabase
      })
        .pipe(
          tap(_ => setTimeout(() => { this.stepper.next(); }, 100)),
        )
        .subscribe(piefTemplates => this.piefTemplates = piefTemplates);
    }
  }

  selectPiefTemplate(templateName) {
    this.selectedPiefTemplateName = templateName;
  }

  selectAttribute(piafAttribute: PiafAttribute) {
    this.selectedAttribute = { ...piafAttribute };
  }

  returnFunc() {
    switch (this.data.type) {
      case 'server-database-attribute':
      case 'attribute':
        return this.selectedAttribute;
      case 'server-database-template':
        return {
          serverName: this.selectedServer,
          databaseName: this.selectedDatabase,
          eventFrameTemplateName: this.selectedPiefTemplateName
        };
      case 'server-database':
        return {
          serverName: this.selectedServer,
          databaseName: this.selectedDatabase,
        }
    }
  }
  disabledSave(): boolean {
    switch (this.data.type) {
      case 'server-database-attribute':
        if (this.selectedAttribute) return false
        return true;
      case 'server-database-template':
        if (this.selectedPiefTemplateName) return false
        return true;
      case 'server-database':
        if (this.selectedDatabase) return false
        return true;
    }
  }
}

