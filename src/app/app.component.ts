import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
  ) { }

  controls1 = [
    { key: 'key_First', value: 'val_First', placeholder: 'pl_First', label: 'Label First' },
    { key: 'key_Second', value: 'val_Second', placeholder: 'pl_Second', label: 'Label Second' },
    { key: 'key_Third', value: 'val_Third', placeholder: 'pl_Third', label: 'Label Third' },
    { key: 'key_Fourth', value: 'val_Fourth', placeholder: 'pl_Fourth', label: 'Label Fourth' },
  ]
  controls2 = [
    { key: 'key_First', value: 'val_First', placeholder: 'pl_First', label: 'Label First' },
    { key: 'key_Second', value: 'val_Second', placeholder: 'pl_Second', label: 'Label Second' },
    { key: 'key_Third', value: 'val_Third', placeholder: 'pl_Third', label: 'Label Third' },
    { key: 'key_Fourth', value: 'val_Fourth', placeholder: 'pl_Fourth', label: 'Label Fourth' },
  ]



  title = 'shiftReporting';

  ngOnInit(): void {
  }
}
