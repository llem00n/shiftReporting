import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { User } from './user.model';
import { Role } from './role.model';

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
  props<{ user: User }>()
)
export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: Update<User> }>()
)
export const addUserRole = createAction(
  '[User] Add User Role',
  props<{ userId: number, roleId: number }>()
)
export const addUserRoleSuccess = createAction(
  '[User] Add User Role Success',
  props<{ userId: number, roleId: number }>()
)
export const deleteUserRole = createAction(
  '[User] Delete UserRole',
  props<{ userId: number, roleId: number }>()
)
export const deleteUserRoleSuccess = createAction(
  '[User] Delete UserRole Success',
  props<{ userId: number, roleId: number }>()
)
export const addUserDepartment = createAction(
  '[User] Add User Department',
  props<{ userId: number, departmentId: number }>()
)
export const addUserDepartmentSuccess = createAction(
  '[User] Add UserDepartment Success',
  props<{ userId: number, departmentId: number }>()
)
export const deleteUserDepartment = createAction(
  '[User] Delete UserDepartment',
  props<{ userId: number, departmentId: number }>()
)
export const deleteUserDepartmentSuccess = createAction(
  '[User] Delete UserDepartment Success',
  props<{ userId: number, departmentId: number }>()
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
  props<{ userId: number }>()
)
export const getUserRolesSuccess = createAction(
  '[User] Get UserRoles Success',
  props<{ roles: Role[] }>()
)