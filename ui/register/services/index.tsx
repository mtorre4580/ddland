import axios from 'axios';
import { RequestUser } from '../../login/effects/models';

/**
 * Register the user
 * @param request RequestUser
 * @return Promise
 */
function registerUser(request: RequestUser) {
  return axios.post('/api/users', request);
}

export { registerUser };
