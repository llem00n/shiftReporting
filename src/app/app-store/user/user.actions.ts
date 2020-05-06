import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { User } from './user.model';
import { Role } from './role.model';
import { Department } from '../department/department.model';

export const addUser = createAction(
  '[User] Add User',
  props<{ user: User }>()
)
export const addUserSuccess = createAction(
  '[User] Add User Success',
  props<{ user: User }>()
)
export const updateUser = createAction(
  '[User] Update User',
  props<{ user: User, oldDep: Department[], isCurrent?: boolean }>()
)
export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: Update<User> }>()
)
export const addUserRole = createAction(
  '[User] Add User Role',
  props<{ userId: string, roleId: number }>()
)
export const addUserRoleSuccess = createAction(
  '[User] Add User Role Success',
  props<{ userId: string, roleId: number }>()
)
export const deleteUserRole = createAction(
  '[User] Delete UserRole',
  props<{ userId: string, roleId: number }>()
)
export const deleteUserRoleSuccess = createAction(
  '[User] Delete UserRole Success',
  props<{ userId: string, roleId: number }>()
)
export const addUserDepartments = createAction(
  '[User] Add User Departments',
  props<{ userId: string, departmentId: number[] }>()
)
export const addUserDepartmentsSuccess = createAction(
  '[User] Add UserDepartments Success',
  props<{ userId: string, departmentId: number[] }>()
)
export const deleteUserDepartments = createAction(
  '[User] Delete UserDepartments',
  props<{ userId: string, departmentId: number[] }>()
)
export const deleteUserDepartmentsSuccess = createAction(
  '[User] Delete UserDepartments Success',
  props<{ userId: string, departmentId: number[] }>()
)
export const getRoles = createAction(
  '[User] Get Roles',
)
export const getRolesSuccess = createAction(
  '[User] Get Roles Success',
  props<{ roles: Role[] }>()
)
export const getAllUsers = createAction(
  '[User] Get All Users'
)
export const getAllUsersSuccess = createAction(
  '[User] Get All Users Success',
  props<{ users: User[] }>()
)
export const getDepartmentUsers = createAction(
  '[User] Get DepartmentUsers',
  props<{ departmentId: number }>()
)
export const getDepartmentUsersSuccess = createAction(
  '[User] Get DepartmentUsers Success',
  props<{ users: User[] }>()
)
export const getUserRoles = createAction(
  '[User] Get UserRoles',
  props<{ userId: string }>()
)
export const getUserRolesSuccess = createAction(
  '[User] Get UserRoles Success',
  props<{ roles: Role[] }>()
)