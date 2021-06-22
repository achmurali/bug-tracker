import axios from '../http/axios';

import { backendUrl } from '../utils/config';
import { setConfig } from '../controllers/auth';
import { ProjectPayload } from '../models/projects';

const baseUrl = `${backendUrl}/projects`;

const getProjects = async () => {
  const response = await axios.get(baseUrl, setConfig());
  return response.data;
};

const createProject = async (projectData: ProjectPayload) => {
  const response = await axios.post(baseUrl, projectData, setConfig());
  return response.data;
};

const deleteProject = async (projectId: string) => {
  const response = await axios.httpDelete(`${baseUrl}/${projectId}`, setConfig());
  return response.data;
};

const editProject = async (projectId: string, data: string | string[] | undefined, condition:string) => {
  const response = await axios.put(
    `${baseUrl}/${projectId}?condition=${condition}`,
    { name: data },
    setConfig()
  );
  return response.data;
};


const projectService = {
  getProjects,
  createProject,
  deleteProject,
  editProject,
};

export default projectService;
