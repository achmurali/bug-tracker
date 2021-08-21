import { backendUrl } from '../utils/config';
import http from '../http/axios';
import { setConfig } from '../controllers/auth';

const createNote = async (projectId:string,bugId:string,note:string) => {
    const result = await http.post(`${backendUrl}/projects/${projectId}/bugs/${bugId}/notes`,{ note },setConfig());
    return result.data;
}

const deleteNote = async (projectId:string,bugId:string,noteId:string) => {
    const result = await http.httpDelete(`${backendUrl}/projects/${projectId}/bugs/${bugId}/notes/${noteId}`,setConfig());
    return result.data;
}

const editNote = async (projectId:string,bugId:string,noteId:string, note:string) => {
    const result = await http.put(`${backendUrl}/projects/${projectId}/bugs/${bugId}/notes/${noteId}`,{note}, setConfig());
    return result.data;
}

const getNotes = async (projectId:string,bugId:string) => {
    const result = await http.get(`${backendUrl}/projects/${projectId}/bugs/${bugId}/notes`, setConfig());
    return result.data;
}


const notesService = {
    createNote,
    deleteNote,
    editNote,
    getNotes
}

export default notesService;