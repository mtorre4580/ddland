import * as DefaultValues from './properties';
import axios from 'axios';

interface LandingRequest {
  path?: string;
  title: string;
  blocks: object[];
}

const blocks = {
  es: [
    { id: 'Footer', description: 'Contenido que va en la parte inferior de tu página' },
    { id: 'Header', description: 'Contenido que va en la parte superior de tu página' },
    { id: 'Image', description: 'Agrega cualquier imagen ya sea por url o subiendola' },
    { id: 'Link', description: 'Agrega un hipervinculo a tu página' },
    { id: 'Paragraph', description: 'Agrega un parráfo con texto básico' },
    { id: 'Title', description: 'Agrega un título a tu página' },
    { id: 'Video', description: 'Agrega un video de diferentes sitios' },
    { id: 'Items', description: 'Agrega 3 items en una fila' },
    { id: 'Carousel', description: 'Agrega un carousel de imágenes' },
  ],
  en: [
    { id: 'Footer', description: 'Content that goes at the bottom of your page' },
    { id: 'Header', description: 'Content that goes to the top of your page' },
    { id: 'Image', description: 'Add any image either by url or by uploading it' },
    { id: 'Link', description: 'Add a link to your page' },
    { id: 'Paragraph', description: 'Add a paragraph with basic text' },
    { id: 'Title', description: 'Add a title to your page' },
    { id: 'Video', description: 'Add a video from different sites' },
    { id: 'Items', description: 'Add 3 items in a row' },
    { id: 'Carousel', description: 'Add an image carousel' },
  ],
};

/**
 * Retrieve the current elements to generate the web
 * @param locale string
 * @return object[]
 */
function getBlocks(locale: string = 'es') {
  // @ts-ignore
  return blocks[locale];
}

/**
 * Retrieve the current properties avalaibles for the Element
 * @param type string
 * @return object
 */
function getDefaultValues(id: string, locale: string) {
  return (DefaultValues as any)[id][locale];
}

/**
 * Save a new landing for the current user
 * @param request LandingRequest
 * @return Promise
 */
function saveLanding(request: LandingRequest) {
  return axios.post('/api/landings', request);
}

/**
 * Upate the current landing
 * @param path string
 * @param request object
 * @return Promise
 */
function updateLanding(path: string, request: LandingRequest) {
  return axios.put(`/api/landings${path}`, request);
}

/**
 * Retrieve if exits any landing with the current path
 * @param path string
 * @return Promise
 */
function getLandingWithPath(path: string) {
  return axios.get('/api/landings', { params: { path } });
}

/**
 * Upload any image to the api pictures
 * @param file File
 * @return Promise
 */
function uploadImage(file: File) {
  const request = new FormData();
  request.append('image', file);
  return axios.post('/api/pictures', request, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export { getBlocks, getDefaultValues, saveLanding, updateLanding, getLandingWithPath, uploadImage };
