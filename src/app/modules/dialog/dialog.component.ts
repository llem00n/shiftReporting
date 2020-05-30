import { Component, OnInit, Injector, Injectable } from '@angular/core';
import { DialogService } from './dialog.service';

@Injectable()
class Data {
  data: any
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  dialogs = [];

  constructor(
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.dialogService.getDialogs().subscribe(dialogs => this.dialogs = dialogs)
  }

}
