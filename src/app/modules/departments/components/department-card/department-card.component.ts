import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Department } from '@models/*';

@Component({
  selector: 'app-department-card',
  templateUrl: './department-card.component.html',
  styleUrls: ['./department-card.component.scss']
})
export class DepartmentCardComponent implements OnInit {
  @Input() department: Department;
  @Output() clickEdit = new EventEmitter<number>()
  @Output() clickDelete = new EventEmitter<number>()
  
  constructor() { }

  ngOnInit(): void {
  }
  delete() {
    // this.clickDelete.emit(this.plant.plantId)
  }
  edit() {
    // this.clickEdit.emit(this.plant.plantId)
  }

}
