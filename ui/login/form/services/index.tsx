import axios from 'axios';
import { RequestLogin } from '../effects/models';

/**
 * Authenticate the user
 * @param request RequestLogin
 * @return Promise
 */
function loginUser(request: RequestLogin) {
  return axios.post('/api/login', request);
}

export { loginUser };
