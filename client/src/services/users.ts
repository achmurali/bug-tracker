import axios from '../http/axios';

import { backendUrl } from '../utils/config';
import { setConfig } from '../controllers/auth';

const baseUrl = `${backendUrl}/users`;

const getUsers = async () => {
  const response = await axios.get(baseUrl, setConfig());
  console.log("++++++"+response)
  return response.data;
};

const userService = { getUsers };

export default userService;
