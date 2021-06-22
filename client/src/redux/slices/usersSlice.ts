import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '../../models/auth';

interface InitialBugState {
  users: User[];
}

const initialState: InitialBugState = {
  users: []
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    }
  },
});

export const { setUsers } = usersSlice.actions;

export const selectUsersState = (state: RootState) => state.users;

export default usersSlice.reducer;
