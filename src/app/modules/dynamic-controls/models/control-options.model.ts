import { FormGroup } from '@angular/forms';
import { DynControl } from '.';
import { DynInput } from '../components/input/input.model';
import { Select } from '../components/select/select.model';

export interface ControlOptions {
    form: FormGroup,
    control: any
};