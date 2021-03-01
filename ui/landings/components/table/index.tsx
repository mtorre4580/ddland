import React, { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ILanding from '../../../../repository/models/web/landing';
import { I18nContext } from '../../../shared/i18n-provider';
import i18n from './i18n';
import styles from './table.module.scss';

interface LandingsTableProps {
  landings: ILanding[];
  onRemove: Function;
  onShare: Function;
}

export default React.memo(function LandingsTable({ landings, onRemove, onShare }: LandingsTableProps) {
  const locale = useContext(I18nContext);
  // @ts-ignore
  const texts = i18n[locale];

  /**
   * Format the current Dates to show the user
   * @param date Date
   */
  const formatDate = (date: Date) => new Date(date).toLocaleDateString();

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>{texts.url}</th>
          <th>{texts.title}</th>
          <th>{texts.created}</th>
          <th>{texts.lastModify}</th>
          <th>{texts.actions}</th>
        </tr>
      </thead>
      <tbody>
        {landings.map((landing: ILanding, index: number) => {
          return (
            <tr key={index}>
              <td>{landing.path}</td>
              <td>{landing.title}</td>
              <td>{formatDate(landing.created_at)}</td>
              <td>{landing.updated_at ? formatDate(landing.updated_at) : texts.noModifications}</td>
              <td className={styles.actions}>
                <Button href={`/dashboard?path=${landing.path}`} className={styles.actionButton} variant="link">
                  {texts.edit}
                </Button>
                <Button className={styles.actionButton} variant="link" onClick={() => onRemove(landing.path, index)}>
                  {texts.delete}
                </Button>
                <Button href={landing.path} target="_blank" className={styles.actionButton} variant="link">
                  {texts.preview}
                </Button>
                <Button className={styles.actionButton} variant="link" onClick={() => onShare(landing.path)}>
                  {texts.share}
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
});
