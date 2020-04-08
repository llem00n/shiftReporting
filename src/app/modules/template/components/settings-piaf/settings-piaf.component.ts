import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService, AppHttpRequest, AppHttpResponse } from 'src/app/services/http/http.service';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PiafHttpService } from 'src/app/modules/piaf/piaf-http.service';

@Component({
  selector: 'app-settings-piaf',
  templateUrl: './settings-piaf.component.html',
  styleUrls: ['./settings-piaf.component.scss']
})
export class SettingsPiafComponent implements OnInit {
  servers: string[] = [];
  databases: string[] = [];

  form: FormGroup = new FormGroup({
    setting1: new FormControl('', [Validators.required]),
    setting2: new FormControl('', [Validators.required]),
  });

  constructor(
    private piafHttpService: PiafHttpService,
    private httpService: HttpService,
    public dialogRef: MatDialogRef<SettingsPiafComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
  }
  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.form.get('setting2').disable();
    this.piafHttpService.getServers()
      .pipe(
        switchMap(servers => {
          this.servers = servers;
          this.form.get('setting1').enable();
          return this.form.get('setting1').valueChanges;
        }),
        tap(_ => this.form.get('setting2').setValue(null)),
        switchMap(serverName => this.piafHttpService.getDatabases(serverName)),
        map(databases => {
          this.databases = databases;
          this.form.get('setting2').enable();
        })
      ).subscribe()
  }

  // getServers(): Observable<string[]> {
  //   const options: AppHttpRequest = {
  //     url: 'piaf/getServers',
  //     loadingMsg: 'Loading servers ...',
  //   }
  //   return this.httpService.post<AppHttpResponse>(options)
  //     .pipe(
  //       filter(resp => resp && resp.status === 200),
  //       map(resp => resp.body),
  //     )
  // }

  // getDatabases(serverName: string): Observable<string[]> {
  //   const options: AppHttpRequest = {
  //     url: 'piaf/GetDatabases',
  //     loadingMsg: 'Loading databases ...',
  //     payload: { serverName }
  //   }
  //   return this.httpService.post<AppHttpResponse>(options)
  //     .pipe(
  //       filter(resp => resp && resp.status === 200),
  //       map(resp => resp.body)
  //     )
  // }

}