import { backendUrl } from '../utils/config';
import http from '../http/axios';
import { setConfig } from '../controllers/auth';

const addBug = async (projectId:string,payload:any) => {
    const result = await http.post(`${backendUrl}/projects/${projectId}/bugs`,payload,setConfig());
    return result.bug;
}

const editBug = async (projectId:string,bugId:string,payload:any) => {
    const result = await http.put(`${backendUrl}/projects/${projectId}/bugs/${bugId}`,payload,setConfig());
    return result.data;
}

const deleteBug = async (projectId:string,bugId:string) => {
    const result = await http.httpDelete(`${backendUrl}/projects/${projectId}/bugs/${bugId}`,setConfig());
    return result.data;
}

const getBug = async (projectId:string,bugId:string) => {
    const result = await http.get(`${backendUrl}/projects/${projectId}/bugs/${bugId}`,setConfig());
    return result.data;
}

const bugsService = {
    addBug,
    editBug,
    deleteBug,
    getBug
};

export default bugsService;