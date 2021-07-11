import { backendUrl } from '../utils/config';
import { ICredentials } from '../models/auth';
import http from '../http/axios';

const login = async (credentials : ICredentials) => {
  const result = await http.post(`${backendUrl}/login`, credentials);
  delete result.success;
  return result;
}

const signup = async (credentials : ICredentials) => {
  const result = await http.post(`${backendUrl}/signup`, credentials);
  delete result.success;
  return result;
}

const authService = { login, signup };

export default authService;

