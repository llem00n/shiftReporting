import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Plant } from '@models/*';

@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss']
})
export class PlantCardComponent implements OnInit {
  @Input() plant: Plant;
  @Output() clickEdit = new EventEmitter<number>()
  @Output() clickDelete = new EventEmitter<number>()
  constructor() { }

  ngOnInit(): void {
  }

  get name() {
    return this.plant.name;
  }
  get code() {
    return this.plant.code
  }
  get address() {
    return this.plant.address
  }
  delete() {
    this.clickDelete.emit(this.plant.plantId)
  }
  edit() {
    this.clickEdit.emit(this.plant.plantId)
  }
}
