import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from './user.model';
import * as UserActions from './user.actions';
import { Role } from './role.model';

export const usersFeatureKey = 'users';

export interface State extends EntityState<User> {
  // additional entities state properties
  roles: Role[];
  userRoles: Role[];
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (model: User) => model.userId
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  roles: [],
  userRoles: null,
});

const userReducer = createReducer(
  initialState,

  on(UserActions.addUserSuccess,
    (state, action) => adapter.addOne(action.user, state)
  ),
  on(UserActions.updateUserSuccess,
    (state, action) => adapter.updateOne(action.user, state)
  ),

  on(UserActions.getRolesSuccess,
    (state, { roles }) => ({ ...state, roles })
  ),
  on(UserActions.getUserRolesSuccess,
    (state, { roles }) => ({ ...state, userRoles: roles })
  ),

  // on(UserActions.upsertUser,
  //   (state, action) => adapter.upsertOne(action.user, state)
  // ),
  // on(UserActions.addUsers,
  //   (state, action) => adapter.addMany(action.users, state)
  // ),
  // on(UserActions.upsertUsers,
  //   (state, action) => adapter.upsertMany(action.users, state)
  // ),
  // on(UserActions.updateUsers,
  //   (state, action) => adapter.updateMany(action.users, state)
  // ),
  // on(UserActions.deleteUser,
  //   (state, action) => adapter.removeOne(action.id, state)
  // ),
  // on(UserActions.deleteUsers,
  //   (state, action) => adapter.removeMany(action.ids, state)
  // ),
  on(UserActions.getAllUsersSuccess,
    (state, action) => adapter.setAll(action.users, state)
  ),
  // on(UserActions.clearUsers,
  //   state => adapter.removeAll(state)
  // ),
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
