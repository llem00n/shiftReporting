import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-db',
  templateUrl: './settings-db.component.html',
  styleUrls: ['./settings-db.component.scss']
})
export class SettingsDBComponent {
  form: FormGroup = new FormGroup({
    connectionString: new FormControl('', [Validators.required]),
    tableName: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<SettingsDBComponent>,
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
