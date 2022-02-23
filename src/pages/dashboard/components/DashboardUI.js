import {Row, Col} from 'antd';
import {Routes, Route} from 'react-router-dom';
import {ReactComponent as Logo} from '../../../assets/logos/logo.svg';
import {ReactComponent as YellowStroke} from '../../../assets/forms/yellowStroke.svg';
import {ReactComponent as PurpleStar} from '../../../assets/forms/purpleStar.svg';
import {ReactComponent as YellowStar} from '../../../assets/forms/yellowStar.svg';
import Campaigns from '../../campaigns/Main';
import Editor from '../../editor/Main';
import styles from '../styles/DashboardUI.module.css';

const DashboardUI = props => {
  const {
    closeSession,
    user,
  } = props;

  const account = user?.account ? user.account.toString() : null;

  return (
    <div className={styles.dashboard}>
      <Row style={{zIndex: 20}}>
        <Col span={24}>
          <div className={styles.header}>
            <Logo className={styles.logo} />
            <span>{user.balance / 1000000 || 0} XRP</span>
            <div className={styles.accountWrap}>
              <span className={styles.address}>
                {`${account.substring(0, 4)}...${account.substring(account.length, account.length - 4)}`}
              </span>
              <span onClick={closeSession} className={styles.account}>
                Log Out
                <span className="material-icons-round">
                  logout
                </span>
              </span>
            </div>
          </div>
        </Col>
      </Row>
      <div className={styles.rowBody}>
        <Routes>
          <Route path="/" element={<Campaigns />} />
          <Route path="campaigns/:id" element={<Editor />} />
        </Routes>
      </div>
      <YellowStroke className={styles.yellowStroke} />
      <PurpleStar className={styles.purpleStar} />
      <YellowStar className={styles.yellowStar} />
    </div>
  );
};

export default DashboardUI;
