import {Row, Col, Input, Modal, Spin} from 'antd';
import {Link} from 'react-router-dom';
import Campaign from './Campaign';
import Auth from '../../../components/Auth';
// import Empty from '../assets/emtpy.png';
import styles from '../styles/CampaignsUI.module.css';

const CampaignsUI = props => {
  const {
    campaigns,
    loading,
    searchVal,
    searchCampaign,
    isPlayer,
    openTransferQr,
    closeTransferQr,
    selectedCampaign,
    trasnferVisible,
    user,
  } = props;
  const getContent = () => {
    if (loading) {
      return (
        <div className={styles.loader}>
          <Spin size="large" />
        </div>
      );
    } /* else if (!campaigns.length) {
      return (
        <div className={styles.loader}>
          <span className={styles.emptyTitle}>
            Empty campaigns
          </span>
          <span className={styles.emptyDescription}>
            Create a new campaign
          </span>
        </div>
      );
    } */
    return (
      <div className={styles.campaignsList}>
        <Row gutter={[20, 20]}>
          {campaigns.map(campaign => (
            <Col xs={24} md={12} lg={6} key={campaign.id}>
              <Campaign campaign={campaign} isPlayer={isPlayer} openTransferQr={openTransferQr} />
            </Col>
          ))}
        </Row>
      </div>
    );
  };
  return (
    <div className={styles.campaigns}>
      <div className={styles.header}>
        <div className={styles.titles}>
          <h1 className={styles.title}>{isPlayer ? 'My NFTs' : 'Campaigns'}</h1>
          {!isPlayer ? (
            <span className={styles.description}>
              The future of functional NFTs it's here, create a<br />
              campaign and share the link to your audience
            </span>
          ) : (
            <span className={styles.description}>
              Check every NFT you have won in previous contests.
            </span>
          )}
        </div>
        {!isPlayer && (
          <Link
            to="/campaigns/new"
            className={styles.newCampaign}
          >
            Create New Campaign
            <span className="material-icons-round">
              add
            </span>
          </Link>
        )}
      </div>
      <div className={styles.searchWrap}>
        <Input
          placeholder={isPlayer ? 'Search NFT' : 'Search campaign'}
          size="large"
          className={styles.input}
          value={searchVal}
          onChange={searchCampaign}
          prefix={
            <span className="material-icons-round">
              search
            </span>
          }
        />
      </div>
      {getContent()}
      <span className={styles.disclaimer}>Made with ❤️ in <span className={styles.strong}>El Salvador</span>.</span>
      <Modal
        destroyOnClose
        width={450}
        footer={false}
        onCancel={closeTransferQr}
        visible={trasnferVisible}>
        <Auth transfer campaign={selectedCampaign} close={closeTransferQr} user={user} />
      </Modal>
    </div>
  );
};

export default CampaignsUI;
