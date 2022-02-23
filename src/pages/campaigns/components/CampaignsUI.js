import {Row, Col, Input, Button, Spin} from 'antd';
import {Link} from 'react-router-dom';
import Campaign from './Campaign';
// import Empty from '../assets/emtpy.png';
import styles from '../styles/CampaignsUI.module.css';

const CampaignsUI = props => {
  const {
    campaigns,
    loading,
    searchVal,
    searchCampaign,
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
              <Campaign campaign={campaign} />
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
          <h1 className={styles.title}>Campaigns</h1>
          <span className={styles.description}>
            The future of functional NFTs it's here, create a<br />
            campaign and share the link to your audience
          </span>
        </div>
        <Link
          to="/campaigns/new"
          className={styles.newCampaign}
        >
          Create New Campaign
          <span className="material-icons-round">
            add
          </span>
        </Link>
      </div>
      <div className={styles.searchWrap}>
        <Input
          placeholder="Search campaign"
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
    </div>
  );
};

export default CampaignsUI;
