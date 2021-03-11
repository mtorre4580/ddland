import axios, { AxiosResponse } from 'axios';
import { RequestUser } from '../../login/effects/models';

/**
 * Register the user
 * @param {RequestUser} request
 * @return {Promise}
 */
function registerUser(request: RequestUser): Promise<AxiosResponse> {
  return axios.post('/api/users', request);
}

export { registerUser };
