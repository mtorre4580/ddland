import React, { useContext, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ILanding from '../../../../repository/models/web/landing';
import { I18nContext } from '../../../shared/i18n-provider';
import Searchbox from '../../../shared/searchbox';
import i18n from './i18n';
import styles from './table.module.scss';

type onRemoveCallback = (path: string, index: number) => void;
type onShareCallback = (path: string) => void;

interface LandingsTableProps {
  landings: ILanding[];
  onRemove: onRemoveCallback;
  onShare: onShareCallback;
}

export default React.memo(function LandingsTable({ landings, onRemove, onShare }: LandingsTableProps) {
  const locale = useContext(I18nContext);
  const texts = i18n[locale];
  const [landingsByUser, setLandingsByUser] = useState(landings);

  /**
   * Format the current Dates to show the user
   * @param {Date} date
   */
  const formatDate = (date: Date) => new Date(date).toLocaleDateString();

  /**
   * Handle the current search by the user and filter the results
   * @param {string} search
   */
  const handleOnSearch = (search: string) => {
    if (search === '') {
      setLandingsByUser(landings);
    } else {
      const searchResults = landingsByUser.filter(landing => landing.path.includes(search) || landing.title.includes(search));
      setLandingsByUser(searchResults);
    }
  };

  return (
    <>
      <div className="container">
        <Searchbox onSearch={handleOnSearch} placeholder={texts.search} />
      </div>
      <Table responsive hover striped variant="dark" className={styles.table}>
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
          {landingsByUser?.length > 0 && landingsByUser.map((landing: ILanding, index: number) => {
            return (
              <tr key={index}>
                <td>{landing.path}</td>
                <td>{landing.title}</td>
                <td>{formatDate(landing.created_at)}</td>
                <td>{landing.updated_at ? formatDate(landing.updated_at) : texts.noModifications}</td>
                <td className={styles.actions}>
                  <Button href={`/dashboard?path=${landing.path}`} variant="outline-light" className={styles.actionButton}>
                    {texts.edit}
                  </Button>
                  <Button className={styles.actionButton} variant="outline-light" onClick={() => onRemove(landing.path, index)}>
                    {texts.delete}
                  </Button>
                  <Button href={landing.path} target="_blank" variant="outline-light" className={styles.actionButton}>
                    {texts.preview}
                  </Button>
                  <Button className={styles.actionButton} variant="outline-light" onClick={() => onShare(landing.path)}>
                    {texts.share}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {landingsByUser?.length === 0 && <p className={styles.noResults}>{texts.noResults}</p>}
    </>
  );
});
