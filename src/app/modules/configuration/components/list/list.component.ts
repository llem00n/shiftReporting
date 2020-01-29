import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() data: Array<{}>;

  head: string[];


  constructor() { }

  ngOnInit() {
    // this.data && Object.keys(this.data[0]).map(i)
    console.log(this.data);
    this.head = Object.keys(this.data[0])
    console.log(this.head);
    
  }

}
