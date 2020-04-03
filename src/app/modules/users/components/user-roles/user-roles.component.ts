import { Component, OnInit } from '@angular/core';
import { State, Role } from '@models/*';
import { Store, select } from '@ngrx/store';
import { roles, userRoles } from 'src/app/app-store';
import { UserActions } from '@actions/*';
import { DialogService } from 'src/app/modules/dialog/dialog.service';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {
  roles: Role[];
  userRoles: Role[];
  userId: string;
  title = "Set user's roles";
  constructor(
    private store: Store<State>,
    private dialogService: DialogService,

  ) { }

  ngOnInit(): void {
    this.getData()
  }
  ngOnDestroy(): void {
    this.store.dispatch(UserActions.getUserRolesSuccess({ roles: [] }))
  }
  getData() {
    const userId = this.dialogService.getData();
    this.userId = userId;
    this.getRoles();
    this.store.dispatch(UserActions.getUserRoles({ userId }))
    this.getUserRoles();

  }
  getRoles() {
    let respCount = 0;
    this.store.pipe(
      select(roles),
    ).subscribe((roles: Role[]) => {
      if (roles.length === 0 && respCount === 0) {
        ++respCount;
        this.store.dispatch(UserActions.getRoles());
        return
      };
      this.roles = roles;
    })
  }
  getUserRoles() {
    this.store.pipe(
      select(userRoles)
    ).subscribe(userRoles => {
      this.userRoles = userRoles;
    })
  }

  close() {
    this.dialogService.dismiss()
  }
  getChecked(role: Role): boolean {
    return this.userRoles?.map(i => i.roleId).includes(role.roleId)
  }
  toggleRole(role) {
    const payload = {
      userId: this.userId,
      roleId: role.roleId
    }
    if (this.userRoles?.map(i => i.roleId).includes(role.roleId)) {
      this.store.dispatch(UserActions.deleteUserRole(payload))
    } else {
      this.store.dispatch(UserActions.addUserRole(payload))
    }
  }
}
