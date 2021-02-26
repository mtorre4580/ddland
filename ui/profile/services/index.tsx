import axios from 'axios';

/**
 * Logout the current user and destroy the session
 * @return Promise
 */
function logoutUser() {
  return axios.get('/api/logout');
}

/**
 * Modify the current password for the user logged
 * @param oldPassword string
 * @param newPassword string
 * @return Promise
 */
function changePasswordUser(request: any, email: string) {
  return axios.put(`/api/users/${email}`, request);
}

export { logoutUser, changePasswordUser };
