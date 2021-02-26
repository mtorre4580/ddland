import axios from 'axios';
import { RequestUser } from '../effects/models';

/**
 * Authenticate the user
 * @param request RequestUser
 * @return Promise
 */
function loginUser(request: RequestUser) {
  return axios.post('/api/login', request);
}

export { loginUser };
