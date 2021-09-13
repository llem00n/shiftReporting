import { Component, OnInit, Output, OnDestroy} from '@angular/core';
import { ControlsLocalService } from '../../services/controls-local.service';
import { ControlOptions } from '../../models/control-options.model';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-input-f',
  templateUrl: './input-f.component.html',
  styleUrls: ['./input-f.component.scss']
})
export class InputFComponent implements OnInit {

  url: string = "";
  file!: File | undefined; // Variable to store file
  validFileTypes = ['PNG', 'JPG', 'JPEG'];
  error: boolean = false;
  imageuploaded!: string;
  fileName: string;

  options: ControlOptions;

  formurl = new FormGroup({
    urlcoded: new FormControl(),
  });

  constructor(
    private clService: ControlsLocalService
  ) { }

  ngOnInit() {
    this.clService.getData().subscribe(options => {
      this.options = options
    })
  }

  onSelectFile(event: Event) {
    this.file = (event.target as HTMLInputElement).files![0];
    // console.log(event);
    this.fileName = this.file.name;
    const fileExtension = this.fileName.split('.')!.pop().toUpperCase();
    if (this.validFileTypes.indexOf(fileExtension) <= -1) {
      this.error = true
      this.fileName = "";
    }
    else {
    this.error = false
    var reader = new FileReader();
    reader.readAsDataURL(this.file); // read file as data url
    reader.onload = (eventconvert) => { // called once readAsDataURL is completed
      this.imageuploaded = eventconvert.target!.result as string;

    }
  }
}

}
