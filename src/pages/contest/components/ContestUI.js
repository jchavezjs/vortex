import {useEffect} from 'react';
import {Row, Col, Spin, Modal, Input, Form, Button} from 'antd';
import moment from 'moment';
import cx from 'classnames';
import {ReactComponent as Logo} from '../../../assets/logos/logo.svg';
import {ReactComponent as YellowStroke} from '../../../assets/forms/yellowStroke.svg';
import {ReactComponent as PurpleSemicircle} from '../../../assets/forms/purpleSemicircle.svg';
import {ReactComponent as YellowStar} from '../../../assets/forms/yellowStar.svg';
import {ReactComponent as DarkPurpleStar} from '../../../assets/forms/darkPurpleStar.svg';
import {ReactComponent as PurpleMiniStar} from '../../../assets/forms/purpleMiniStar.svg';
import {ReactComponent as GreenStar} from '../../../assets/forms/greenStar.svg';
import {ReactComponent as GreenStroke} from '../../../assets/forms/greenStroke.svg';
import {ReactComponent as Spirals} from '../../../assets/forms/spirals.svg';
import Xumm from '../../../assets/logos/xumm.png';
import Auth from '../../../components/Auth';
import Timer from './Timer';
import styles from '../styles/ContestUI.module.css';

const ContestUI = props => {
  const {
    loading,
    campaign,
    connectVisible,
    handleConnectVisible,
    form,
    getAddressByQR,
    sending,
    addPlayer,
    hasWinner,
  } = props;

  const {title, description, image} = campaign;

  useEffect(() => {
    if (!loading) {
      const card = document.querySelector(".card");
      card.addEventListener('mousemove', rotate);
      card.addEventListener('mouseleave', clearRotate);
  
      function rotate(e){
        const cardItem = this.querySelector(".card-item");
        const force = 5;
        const offsetY = -(e.offsetY - cardItem.offsetHeight/2)/force;
        const offsetX = (e.offsetX - cardItem.offsetWidth/2)/force;
        cardItem.style.transform = 'rotateX(' + offsetY + 'deg) rotateY(' + offsetX + 'deg)';
      }
  
      function clearRotate(e){
        if(e.target.classList.contains("card")){
          const cardItem = this.querySelector(".card-item");
          cardItem.style.transform = 'rotateX(0) rotateY(0)';
        }
      }
    }
  }, [loading])

  if (loading) {
    return (
      <div className="main-loader">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.contest}>
      <div className={styles.content}>
        {hasWinner && (
          <Row>
            <Col span={24}>
              <div className={styles.winnerInfo}>
                <Logo className={styles.logo} />
                <span className={styles.owner}>Owner</span>
                <span className={styles.winnerAddress}>{campaign.winner}</span>
              </div>
            </Col>
          </Row>
        )}
        <Row>
          {!hasWinner && (
            <Col lg={12} xl={10}>
              <div className={styles.mainForm}>
                <Logo className={styles.logo} />
                <div className={styles.titles}>
                  <h1>{title}</h1>
                  <h2>{description}</h2>
                </div>
              {moment().isSameOrBefore(campaign.end_date) ? (
                  <div className={styles.form}>
                    <Timer endDate={campaign.end_date} />
                    <button
                      onClick={() => handleConnectVisible(true)}
                      className={styles.submit}>
                      <span>Connect with your Xuum Wallet</span>
                      <img src={Xumm} alt="" />
                    </button>
                    <Form
                      form={form}
                      onFinish={addPlayer}
                    >
                      <Form.Item
                        name="address"
                        rules={[{ required: true, message: 'Input a valid address' }]}
                      >
                        <Input
                          bordered={false}
                          size="large"
                          className={styles.input}
                          placeholder="Enter XRP Address"
                        />
                      </Form.Item>
                      <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Name is required' }]}
                      >
                        <Input
                          bordered={false}
                          size="large"
                          className={styles.input}
                          placeholder="Enter Your Name"
                        />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Email is required' }]}
                      >
                        <Input
                          bordered={false}
                          size="large"
                          type="email"
                          className={styles.input}
                          placeholder="Email Address"
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          htmlType="submit"
                          loading={sending}
                          className={styles.submitInfo}>
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                ) : (
                  <div className={styles.closed}>
                    <span>This contest is <span className={styles.strong}>closed</span>.
                    Comeback later to discover who is the <span className={styles.strong}>winner</span>.</span>
                  </div>
                )}
              </div>
            </Col>
          )}
          <Col lg={!hasWinner ? 12 : 24} xl={!hasWinner ? 14 : 24}>
            <div className={cx(styles.wrapperImage, {[styles.winnerImage]: hasWinner})}>
              <div className="card">
                <div className="card-item">
                  <img src={image} className={styles.photo} alt="" />
                </div>
              </div>
              <Spirals className={styles.spirals} />
              <YellowStar className={styles.yellowStar} />
              <PurpleMiniStar className={styles.purpleMiniStar} />
            </div>
          </Col>
        </Row>
      </div>
      <Modal
        destroyOnClose
        width={450}
        footer={false}
        onCancel={() => handleConnectVisible(false)}
        visible={connectVisible}>
        <Auth player getAddressByQR={getAddressByQR} close={() => handleConnectVisible(false)} />
      </Modal>
      <YellowStroke className={styles.yellowStroke} />
      <PurpleSemicircle className={styles.purpleSemicircle} />
      <DarkPurpleStar className={styles.purpleStar} />
      <GreenStar className={styles.greenStar} />
      <GreenStroke className={styles.greenStroke} />
    </div>
  );
};

export default ContestUI;
