import axios, { AxiosResponse } from 'axios';

/**
 * Logout the current user and destroy the session
 * @return {Promise}
 */
function logoutUser(): Promise<AxiosResponse> {
  return axios.get('/api/logout');
}

/**
 * Modify the current password for the user logged
 * @param {string} oldPassword
 * @param {string} newPassword
 * @return {Promise}
 */
function changePasswordUser(
  request: { oldPassword: string; newPassword: string },
  email: string,
): Promise<AxiosResponse> {
  return axios.put(`/api/users/${email}`, request);
}

export { logoutUser, changePasswordUser };
