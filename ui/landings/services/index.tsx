import axios from 'axios';

/**
 * Delete the current landing by the path if user is the admin
 * @param path string
 * @return Promise
 */
function removeLanding(path: string) {
  return axios.delete(`/api/landings${path}`);
}

/**
 * Retrieve the .html for download
 * @param path string
 * @return Promise
 */
async function getHTML(path: string) {
  const { data } = await axios.get(path, {
    responseType: 'blob',
  });
  return data;
}

export { removeLanding, getHTML };
