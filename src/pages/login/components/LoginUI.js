import {Row, Col, Modal} from 'antd';
import {ReactComponent as Logo} from '../../../assets/logos/logo.svg';
import {ReactComponent as Twitter} from '../../../assets/social/twitter.svg';
import {ReactComponent as YellowStroke} from '../../../assets/forms/yellowStroke.svg';
import {ReactComponent as PurpleSemicircle} from '../../../assets/forms/purpleSemicircle.svg';
import {ReactComponent as YellowStar} from '../../../assets/forms/yellowStar.svg';
import {ReactComponent as DarkPurpleStar} from '../../../assets/forms/darkPurpleStar.svg';
import {ReactComponent as GreenStar} from '../../../assets/forms/greenStar.svg';
import {ReactComponent as GreenStroke} from '../../../assets/forms/greenStroke.svg';
import Auth from '../../../components/Auth';
import Xumm from '../../../assets/logos/xumm.png';
import styles from '../styles/LoginUI.module.css';

const LoginUI = ({connectVisible, handleConnectVisible}) => (
  <div className={styles.login}>
    <Row>
      <Col lg={13}>
        <div className={styles.formWrap}>
          <div className={styles.form}>
            <Logo className={styles.logo} />
            <span className={styles.description}>
              The Web 3.0 way to create contests for influencers and brands.
            </span>
            <button
              onClick={() => handleConnectVisible(true)}
              className={styles.submit}>
              <span>Connect with your Xuum Wallet</span>
              <img src={Xumm} alt="" />
            </button>
            <div className={styles.social}>
              <a
                href="https://twitter.com/appvortex"
                target="_blank"
                rel="noopener noreferrer">
                <Twitter />
              </a>
            </div>
          </div>
        </div>
      </Col>
      <Col xs={0} lg={11}>
        <div className={styles.sideWrap}>
          <div className={styles.mainInfo}>
            <span className={styles.infoTitles}>
              Create <span className={styles.bold}>contests,<br />promotions and<br />give rewards</span> with<br />NTFs
            </span>
            <span className={styles.infoDescription}>
              Vortex it’s the first platform that allows you to create
              custom contests, promotion, give rewards and mint an
              NFT directly on the <span className={styles.bold}>XRP Ledger.</span>
            </span>
          </div>
          <YellowStroke className={styles.yellowStroke} />
          <YellowStar className={styles.yellowStar} />
          <PurpleSemicircle className={styles.purpleSemicircle} />
          <DarkPurpleStar className={styles.purpleStar} />
          <GreenStar className={styles.greenStar} />
          <GreenStroke className={styles.greenStroke} />
        </div>
      </Col>
    </Row>
    <Modal
      destroyOnClose
      width={450}
      footer={false}
      onCancel={() => handleConnectVisible(false)}
      visible={connectVisible}>
      <Auth />
    </Modal>
  </div>
);

export default LoginUI;
