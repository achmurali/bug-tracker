import { AppThunk } from "../redux/store";
import { History } from "history";
import projectService from "../services/projects";
import {
  setProjects,
  addProject,
  removeProject,
  updateProjectName,
  addMembers,
  removeMember,
} from "../redux/slices/projectsSlice";
import { setLoading } from "../redux/slices/loadingSlice";
import { addError, removeError } from "../redux/slices/errorSlice";
import { ProjectPayload } from "../models/projects";
import notify from "./notification";

export const fetchProjects = (): AppThunk => {
  return async (dispatch) => {
    try {
      console.log("TESTTTT")
      dispatch(setLoading({ isLoading: true }));
      dispatch(removeError());
      const allProjects = await projectService.getProjects();
      console.log(allProjects)
      dispatch(setProjects(allProjects));
    } catch (e) {
      setError(e, dispatch);
    } finally {
      dispatch(setLoading({ isLoading: false }));
    }
  };
};

export const createNewProject = (
  projectData: ProjectPayload,
  closeDialog?: () => void
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setLoading({ isLoading: true }));
      dispatch(removeError());
      const newProject = await projectService.createProject(projectData);
      dispatch(addProject(newProject));
      dispatch(notify("New project added!", "success"));
      closeDialog && closeDialog();
    } catch (e) {
      setError(e, dispatch);
    } finally {
      setLoading({ isLoading: false });
    }
  };
};

export const deleteProject = (
  projectId: string,
  history: History
): AppThunk => {
  return async (dispatch) => {
    try {
      await projectService.deleteProject(projectId);
      history.push("/");
      dispatch(removeProject(projectId));
      dispatch(notify("Deleted the project.", "success"));
    } catch (e) {
      setError(e, dispatch);
    } finally {
      setLoading({ isLoading: false });
    }
  };
};

export const editProjectName = (
  projectId: string,
  name: string,
  closeDialog?: () => void
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setLoading({ isLoading: true }));
      const updatedProject = await projectService.editProject(
        projectId,
        name,
        "name"
      );
      dispatch(
        updateProjectName({
          data: {
            name: updatedProject.name,
            updatedAt: updatedProject.updatedAt,
          },
          projectId,
        })
      );
      dispatch(notify("Edited the project's name!", "success"));
      closeDialog && closeDialog();
    } catch (e) {
      setError(e, dispatch);
    } finally {
      setLoading({ isLoading: false });
    }
  };
};

export const addProjectMembers = (
  projectId: string,
  members: string[],
  closeDialog?: () => void
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setLoading({ isLoading: true }));
      const updatedMembers = await projectService.editProject(projectId, members,"member");
      dispatch(addMembers({ projectId }));
      dispatch(notify("New member(s) added to the project!", "success"));
      closeDialog && closeDialog();
    } catch (e) {
      setError(e, dispatch);
    } finally {
      setLoading({ isLoading: false });
    }
  };
};

export const removeProjectMember = (
  projectId: string,
  memberId: string
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setLoading({ isLoading: true }));
      await projectService.editProject(projectId, undefined, "delete");
      dispatch(removeMember({ memberId, projectId }));
      dispatch(notify("Removed the project member.", "success"));
    } catch (e) {
      setError(e, dispatch);
    } finally{
      setLoading({ isLoading: false });
    }
  };
};

export const leaveProjectMembership = (
  projectId: string,
  history: History
): AppThunk => {
  return async (dispatch) => {
    try {
      //await memberService.leaveProject(projectId);
      history.push("/");
      dispatch(removeProject(projectId));
      dispatch(notify("Successfully left the project membership!", "success"));
    } catch (e) {
      setError(e, dispatch);
    }
  };
};

const setError = (err: any, dispatch: any) => {
  dispatch(addError({ message: err.message, additionalInfo: err.stack }));
  dispatch(notify(err.message, "error"));
};
