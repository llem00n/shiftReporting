import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  form = new FormGroup({
    first: new FormControl('first'),
    second: new FormControl('second')
  })

  myFormTask = [
    {
      control: { key: 'first', value: 'first' },
      form: this.form
    },
    {
      control: { key: 'second', value: 'second' },
      form: this.form
    }
  ]

  title = 'shiftReporting';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.form.valueChanges.subscribe(console.log)
  }
}
