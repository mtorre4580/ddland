import * as DefaultValues from './properties';
import axios from 'axios';

interface LandingRequest {
  path?: string;
  title: string;
  blocks: object[];
}

/**
 * Retrieve the current elements to generate the web
 * @return object[]
 */
function getBlocks() {
  return [
    { id: 'Footer', description: 'Contenido que va en la parte inferior de tu página' },
    { id: 'Header', description: 'Contenido que va en la parte superior de tu página' },
    { id: 'Image', description: 'Agrega cualquier imagen ya sea por url o subiendola' },
    { id: 'Link', description: 'Agrega un hipervinculo a tu página' },
    { id: 'Paragraph', description: 'Agrega un parráfo con texto básico' },
    { id: 'Title', description: 'Agregá un título a tu página' },
    { id: 'Video', description: 'Agregá un video de diferentes sitios' },
  ];
}

/**
 * Retrieve the current properties avalaibles for the Element
 * @param type string
 * @return object
 */
function getDefaultValues(id: string) {
  return (DefaultValues as any)[id];
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

export { getBlocks, getDefaultValues, saveLanding, updateLanding };
