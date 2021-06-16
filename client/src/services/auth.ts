import axios from 'axios';

import { backendUrl, backendUrl as url } from '../utils/config';
import { ICredentials } from '../models/auth';

const login = async (credentials : ICredentials) => {
    const result = await axios.post(`${backendUrl}/login`,credentials);
    return result.data;
}

const signup = async (credentials : ICredentials) => {
    const result = await axios.post(`${backendUrl}/signup`,credentials);
    //@ts-ignore
    if(result.data.success)
      return result.data;
    else
      //@ts-ignore
      throw new Error(result.message);
}

const authService = { login, signup };

export default authService;

