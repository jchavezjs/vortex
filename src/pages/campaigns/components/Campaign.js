import {Link} from 'react-router-dom';
import cx from 'classnames';
import styles from '../styles/Campaign.module.css';

const Campaign = ({campaign, isPlayer, openTransferQr}) => {
  const isActive = campaign.active;

  const getLabel = () => {
    if (isPlayer) {
      return campaign.transfered ? 'TRANSFERED' : 'UNCLAIMED';
    }
    return isActive ? 'ACTIVE' : 'CLOSED';
  };

  const getIpfsUri = () => {
    const arr = campaign.nft_detail.URI.split('//');
    return `https://ipfs.io/ipfs/${arr[1]}`;
  };

  return (
    <div className={styles.campaign}>
      <div className={styles.photo} style={{backgroundImage: `url(${campaign.image})`}} />
      <div className={styles.infoWrap}>
        <span className={styles.title}>{campaign.title}</span>
        <div className={styles.description}>
          {campaign.description}
        </div>
        <div className={styles.actions}>
          {!isPlayer ? (
            <div className={styles.players}>
              <span className={styles.playersLabel}>PLAYERS</span>
              <span className={styles.playersNumber}>
                {!isPlayer ? campaign.players.length : '-'}
              </span>
            </div>
          ) : (
            <a className={cx(styles.detail, styles.ipfs)} href={getIpfsUri()} target="_blank" rel="noreferrer">
              IPFS
            </a>
          )}
          {!isPlayer ? (
            <Link className={styles.detail} to={`/campaigns/${campaign.id}`}>
              Detail
            </Link>
          ) : (
            <button className={styles.detail} onClick={() => openTransferQr(campaign)}>
              Reclaim
            </button>
          )}
        </div>
      </div>
      <span className={cx(styles.active, {[styles.closed]: isPlayer ? campaign.transfered : !isActive})}>
        {getLabel()}
      </span>
    </div>
  );
};

export default Campaign;