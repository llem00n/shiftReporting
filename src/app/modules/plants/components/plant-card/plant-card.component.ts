import { Component, OnInit, Input } from '@angular/core';
import { Plant } from '@models/*';

@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss']
})
export class PlantCardComponent implements OnInit {
  @Input() plant: Plant;

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

}
