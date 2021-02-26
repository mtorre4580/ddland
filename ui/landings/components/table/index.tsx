import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ILanding from '../../../../repository/models/web/landing';
import styles from './table.module.scss';

interface LandingsTableProps {
  landings: ILanding[];
  onRemove: Function;
}

export default React.memo(function LandingsTable({ landings, onRemove }: LandingsTableProps) {
  /**
   * Format the current Dates to show the user
   * @param date Date
   */
  const formatDate = (date: Date) => new Date(date).toLocaleDateString();

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>URL</th>
          <th>Título</th>
          <th>Fecha de creación</th>
          <th>Última modificación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {landings.map((landing: ILanding, index: number) => {
          return (
            <tr key={index}>
              <td>{landing.path}</td>
              <td>{landing.title}</td>
              <td>{formatDate(landing.created_at)}</td>
              <td>{landing.updated_at ? formatDate(landing.updated_at) : 'Sin modificaciones'}</td>
              <td className={styles.actions}>
                <Button href={`/dashboard?path=${landing.path}`} className={styles.actionButton} variant="link">
                  Editar
                </Button>
                <Button className={styles.actionButton} variant="link" onClick={() => onRemove(landing.path, index)}>
                  Eliminar
                </Button>
                <Button href={landing.path} target="_blank" className={styles.actionButton} variant="link">
                  Visualizar
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
});
