import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { PiafAttribute } from './models';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PiafHttpService } from './piaf-http.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

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

  isSaveDisabled: boolean = true;

  @ViewChild('stepper', { static: false }) stepper: MatHorizontalStepper;

  constructor(
    public dialogRef: MatDialogRef<PiafComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string, allowedTypes: string[] },
    private pis: PiafHttpService,
  ) {
    // data.type = 'EventFrame'
  }

  ngOnInit() {
    this.pis.getServers()
      .subscribe(servers => this.servers = servers);
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
    if (this.data.type === 'server-db') return;
    if (this.data.type === 'server-db-template') {
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
      case 'server-db-attribute':
        return this.selectedAttribute;
      case 'server-db-template':
        return {
          serverName: this.selectedServer,
          databaseName: this.selectedDatabase,
          eventFrameTemplateName: this.selectedPiefTemplateName
        };
      case 'server-db':
        return {
          serverName: this.selectedServer,
          databaseName: this.selectedDatabase,
        }
    }
  }
  disabledSave(): boolean {
    switch (this.data.type) {
      case 'server-db-attribute':
        if (this.selectedAttribute) return false
        return true;
      case 'server-db-template':
        if (this.selectedPiefTemplateName) return false
        return true;
      case 'server-db':
        if (this.selectedDatabase) return false
        return true;
    }
  }
}

