import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import {
  ProjectState,
  ProjectSortValues
} from '../../models/projects';

interface InitialProjectsState {
  projects: ProjectState[];
  sortBy: ProjectSortValues;
}

const initialState: InitialProjectsState = {
  projects: [],
  sortBy: 'newest',
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<ProjectState[]>) => {
      state.projects = action.payload;
    },
    addProject: (state, action: PayloadAction<ProjectState>) => {
      state.projects.push(action.payload);
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },
    updateProjectName: (
      state,
      action: PayloadAction<{
        data: { name: string; updatedAt: Date };
        projectId: string;
      }>
    ) => {
      state.projects = state.projects.map((p) =>
        p.id === action.payload.projectId ? { ...p, ...action.payload.data } : p
      );
    },
    addMembers: (
      state,
      action: PayloadAction< { projectId: string }>
    ) => {
      state.projects = state.projects.map((p) => 
        p.id === action.payload.projectId
        ? { ...p, members: (+p.members + 1).toString() }
        : p
      );
    },
    removeMember: (
      state,
      action: PayloadAction<{ memberId: string; projectId: string }>
    ) => {
      const project = state.projects.find(
        (p) => p.id === action.payload.projectId
      );

      if (project) {
        state.projects = state.projects.map((p) =>
          p.id === action.payload.projectId
            ? { ...p, members: (+p.members - 1).toString() }
            : p
        );
      }
    },
    sortProjectsBy: (state, action: PayloadAction<ProjectSortValues>) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  setProjects,
  addProject,
  removeProject,
  updateProjectName,
  addMembers,
  removeMember,
  sortProjectsBy,
} = projectsSlice.actions;

export const selectProjectsState = (state: RootState) => state.projects;

export const selectProjectById = (state: RootState, projectId: string) => {
  return state.projects.projects.find((p) => p.id === projectId);
};

export default projectsSlice.reducer;
