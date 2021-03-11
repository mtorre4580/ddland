import axios, { AxiosResponse } from 'axios';

/**
 * Delete the current landing by the path if user is the admin
 * @param {string} path
 * @return {Promise}
 */
function removeLanding(path: string): Promise<AxiosResponse> {
  return axios.delete(`/api/landings${path}`);
}

/**
 * Retrieve the .html for download
 * @param {string} path
 * @return {Promise}
 */
async function getHTML(path: string): Promise<AxiosResponse> {
  const { data } = await axios.get(path, {
    responseType: 'blob',
  });
  return data;
}

export { removeLanding, getHTML };
