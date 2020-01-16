import { FormGroup } from '@angular/forms';
import { DynControl } from '.';

export interface ControlOptions {
    form: FormGroup,
    control: DynControl
};