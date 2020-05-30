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
    filePath: new FormControl('', [Validators.required]),
    fileName: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<SettingsFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    data.value && this.patchValue(data.value);
  }
  patchValue(value) {
    Object.keys(this.data.settings).map(key => {
      const formControl = this.form.get(this.data.settings[key].key);
      if(formControl) formControl.setValue(value[key])
    })
  }
}
