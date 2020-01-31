import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Department } from './department.model';

export const loadDepartments = createAction(
  '[Department/API] Load Departments',
  props<{ plantId: number }>()
);
export const loadDepartmentsSuccess = createAction(
  '[Department/API] Load Departments Success',
  props<{ departments: Department[] }>()
);

export const addDepartment = createAction(
  '[Department/API] Add Department',
  props<{ department: Department }>()
);
export const addDepartmentSucces = createAction(
  '[Department/API] Add Department Succes',
  props<{ department: Department }>()
);

// export const upsertDepartment = createAction(
//   '[Department/API] Upsert Department',
//   props<{ department: Department }>()
// );

// export const addDepartments = createAction(
//   '[Department/API] Add Departments',
//   props<{ departments: Department[] }>()
// );

// export const upsertDepartments = createAction(
//   '[Department/API] Upsert Departments',
//   props<{ departments: Department[] }>()
// );

export const updateDepartment = createAction(
  '[Department/API] Update Department',
  props<{ department: Department }>()
);
export const updateDepartmentSuccess = createAction(
  '[Department/API] Update Department Success',
  props<{ department: Update<Department> }>()
);

// export const updateDepartments = createAction(
//   '[Department/API] Update Departments',
//   props<{ departments: Update<Department>[] }>()
// );

export const deleteDepartment = createAction(
  '[Department/API] Delete Department',
  props<{ id: number }>()
);
export const deleteDepartmentSucces = createAction(
  '[Department/API] Delete Department Succes',
  props<{ id: number }>()
);

// export const deleteDepartments = createAction(
//   '[Department/API] Delete Departments',
//   props<{ ids: string[] }>()
// );

export const clearDepartments = createAction(
  '[Department/API] Clear Departments'
);
