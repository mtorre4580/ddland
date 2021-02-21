/**
 * Retrieve the current elements to generate the web
 * @return {Object[]}
 */
function getBlocks() {
  return [
    { id: 'Footer', name: 'Pie de página', description: 'Contenido que va en la parte inferior de tu página' },
    { id: 'Header', name: 'Encabezado', description: 'Contenido que va en la parte superior de tu página' },
    { id: 'Image', name: 'Imagen', description: 'Agrega cualquier imagen ya sea por url o subiendola' },
    { id: 'Link', name: 'Link', description: 'Agrega un hipervinculo a tu página' },
    { id: 'Paragraph', name: 'Parráfo', description: 'Agrega un parráfo con texto básico' },
    { id: 'Title', name: 'Título', description: 'Agregá un título a tu página' },
    { id: 'Video', name: 'Video', description: 'Agregá un video de diferentes sitios' },
  ];
}

export { getBlocks };
