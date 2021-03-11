import axios, { AxiosResponse } from 'axios';
import { RequestUser } from '../effects/models';

/**
 * Authenticate the user
 * @param {RequestUser} request
 * @return {Promise}
 */
function loginUser(request: RequestUser): Promise<AxiosResponse> {
  return axios.post('/api/login', request);
}

export { loginUser };
