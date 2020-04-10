import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-button-line',
  templateUrl: './button-line.component.html',
  styleUrls: ['./button-line.component.scss']
})
export class ButtonLineComponent implements OnChanges {
  @Input() buttonSettings: string;
  @Output() buttonClick: EventEmitter<string> = new EventEmitter<string>();

  buttons = [
    {
      key: 'B',
      name: 'Back',
      status: 'visible',
      icon: 'arrow_back',
      buttonPos: 'left',
    },
    {
      key: 'N',
      name: 'Next',
      icon: 'arrow_forward',
      buttonPos: 'left',
      status: 'visible',
    },
    {
      key: 'R',
      name: 'Reset',
      icon: 'first_page',
      buttonPos: 'left',
      status: 'visible',
    },
    {
      key: 'C',
      name: 'Cancel',
      icon: 'cancel',
      buttonPos: 'right',
      status: 'visible',
    },
    {
      key: 'O',
      name: 'Ok',
      icon: 'done',
      buttonPos: 'right',
      status: 'visible',
    },
  ];
  ngOnChanges() {
    this.setButtons();
  }

  getButtonsByPos(pos: string) {
    return this.buttons.filter(i => i.buttonPos === pos);
  }

  setButtons() {
    if (this.buttonSettings) {
      for (let i = 0; i < this.buttonSettings.length; i += 2) {
        const index = this.buttons.findIndex(item => item.key === this.buttonSettings[i]);
        switch (this.buttonSettings[i + 1]) {
          case 'i':
            this.buttons[index].status = 'invisible';
            break;
          case 'd':
            this.buttons[index].status = 'disabled';
            break;
          case 'v':
            this.buttons[index].status = 'visible';
            break;
        }
      }
    }
  }

  isVisible(name: string) {
    return this.buttons.find(item => item.name === name).status !== 'invisible' ? true : false;
  }
  isDisabled(name: string) {
    return this.buttons.find(item => item.name === name).status === 'disabled' ? true : false;
  }
}
