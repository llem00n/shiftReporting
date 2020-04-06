import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-file',
  templateUrl: './settings-file.component.html',
  styleUrls: ['./settings-file.component.scss']
})
export class SettingsFileComponent {

  form: FormGroup = new FormGroup({
    setting1: new FormControl('', [Validators.required]),
    setting2: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<SettingsFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true
    console.log(data);
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
