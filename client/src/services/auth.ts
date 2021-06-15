import axios from 'axios';

import { backendUrl, backendUrl as url } from '../utils/config';
import { ICredentials } from '../models/auth';

type Token = string | null;

let token: Token = null;

const setToken = (newToken: string) => {
  token = newToken;
};

const setConfig = () => {
  return {
    headers: { 'x-auth-token': token },
  };
};

const login = async (credentials : ICredentials) => {
    const result = await axios.post(`${backendUrl}/login`,credentials);
    return result.data;
}

const signup = async (credentials : ICredentials) => {
    const result = await axios.post(`${backendUrl}/signup`,credentials);
    return result.data;
}

const authService = { login, signup, setToken, setConfig };

export default authService;

