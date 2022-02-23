import {Link} from 'react-router-dom';
import cx from 'classnames';
import styles from '../styles/Campaign.module.css';

const Campaign = ({campaign}) => {
  return (
    <div className={styles.campaign}>
      <div className={styles.photo} style={{backgroundImage: `url(${campaign.image})`}} />
      <div className={styles.infoWrap}>
        <span className={styles.title}>{campaign.title}</span>
        <div className={styles.description}>
          {campaign.description}
          {campaign.description}
        </div>
        <div className={styles.actions}>
          <div className={styles.players}>
            <span className={styles.playersLabel}>PLAYERS</span>
            <span className={styles.playersNumber}>
              {campaign.players.length}
            </span>
          </div>
          <Link className={styles.detail} to={`/campaigns/${campaign.id}`}>
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Campaign;