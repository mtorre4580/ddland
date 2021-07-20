import * as DefaultValues from './properties';
import axios, { AxiosResponse } from 'axios';

interface LandingRequest {
  path?: string;
  title: string;
  blocks: any[];
}

const blocks: { [key: string]: any } = {
  es: [
    { id: 'Footer', description: 'Contenido que va en la parte inferior de tu página', label: 'Pie de página' },
    { id: 'Header', description: 'Contenido que va en la parte superior de tu página', label: 'Encabezado' },
    { id: 'Image', description: 'Agrega cualquier imagen ya sea por link o subiendola', label: 'Imagen', },
    { id: 'Link', description: 'Agrega un hipervínculo a tu página' },
    { id: 'Paragraph', description: 'Agrega un parráfo con texto básico', label: 'Parráfo' },
    { id: 'Title', description: 'Agrega un título a tu página' , label: 'Título' },
    { id: 'Video', description: 'Agrega un video de diferentes sitios' },
    { id: 'Items', description: 'Agrega 3 items en una fila' },
    { id: 'Carousel', description: 'Agrega un carousel de imágenes' },
    { id: 'Whatsapp', description: 'Agrega un botón de whatsapp para que puedan contactarte', label: 'Contacto' },
    { id: 'List', description: 'Agrega una lista', label: 'Lista' },
    { id: 'Form', description: 'Agrega un formulario de contacto', label: 'Formulario' },
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
    { id: 'Whatsapp', description: 'Add a whatsapp button so they can contact you' },
    { id: 'List', description: 'Add a list' },
    { id: 'Form', description: 'Agrega un formulario de contacto' },
  ],
};

/**
 * Retrieve the current elements to generate the web
 * @param {string} locale
 * @return {object[]}
 */
function getBlocks(locale = 'es') {
  return blocks[locale];
}

/**
 * Retrieve the current properties avalaibles for the Element
 * @param {string} id
 * @param {string} locale
 * @return {object}
 */
function getDefaultValues(id: string, locale: string) {
  return (DefaultValues as any)[id][locale];
}

/**
 * Save a new landing for the current user
 * @param {LandingRequest} request
 * @return {Promise}
 */
function saveLanding(request: LandingRequest): Promise<AxiosResponse> {
  return axios.post('/api/landings', request);
}

/**
 * Upate the current landing
 * @param {string} path
 * @param {LandingRequest} request
 * @return {Promise}
 */
function updateLanding(path: string, request: LandingRequest): Promise<AxiosResponse> {
  return axios.put(`/api/landings${path}`, request);
}

/**
 * Retrieve if exits any landing with the current path
 * @param {string} path
 * @return {Promise}
 */
function getLandingWithPath(path: string): Promise<AxiosResponse> {
  return axios.get('/api/landings', { params: { path } });
}

/**
 * Upload any image to the api pictures
 * @param {File} file
 * @return {Promise}
 */
function uploadImage(file: File): Promise<AxiosResponse> {
  const request = new FormData();
  request.append('image', file);
  return axios.post('/api/pictures', request, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export { getBlocks, getDefaultValues, saveLanding, updateLanding, getLandingWithPath, uploadImage };
