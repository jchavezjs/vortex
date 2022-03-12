import {useState, useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {getQRApp, getUserLogin, getUserDetails} from '../redux/slices/user';
import {getQRTransfer, verifyTransfer} from '../redux/slices/campaigns';
import {Spin, message} from 'antd';
import styles from './styles/Auth.module.css';

let socket;

const Auth = ({player, transfer, campaign, getAddressByQR, close, user}) => {
  const [loading, handleLoading] = useState(true);
  const [ws, handleWs] = useState(null);
  const [qr, handleQr] = useState('');
  const dispatch = useDispatch();

  const getUser = useCallback(async user => {
    const response = await dispatch(getUserLogin(user));
    if (response.status === 'success') {
      if (player) {
        getAddressByQR(response.address);
        close();
      } else if (transfer) {
        getQRTransfer(response.address);
        close();
        const response_transfer = await dispatch(verifyTransfer(user.account, campaign.id));
        if (response_transfer.status !== 'success') {
          message.error('Try again later!');
          close();
        } else {
          message.success('NFT transfered to your account');
          close();
        }
      } else {
        await localStorage.setItem('vortex_user', JSON.stringify({account: response.address, type: 'player'}));
        const response_user = await dispatch(getUserDetails(response.address, 'player'));
        if (response_user.status !== 'success') {
          message.error('Try again later!');
        }
      }
    } else {
      message.error('Try again later!');
    }
  }, [close, dispatch, getAddressByQR, player, transfer]);

  useEffect(() => {
    const initialFetch = async () => {
      console.log(campaign)
      const response = await dispatch(!transfer ? getQRApp() : getQRTransfer(user.account, campaign.nftSellOffers.result.offers[0].index));
      if (response.status === 'success') {
        const {websocket_status, qr_png} = response.data.data.refs;
        handleQr(qr_png);
        handleWs(websocket_status);
      }
      handleLoading(false);
    };
    initialFetch();
  }, [dispatch]);

  useEffect(() => {
    if (ws) {
      socket = new WebSocket(ws);

      socket.onopen = () => {
        socket.send("Hello!");
      };

      socket.onmessage = (response) => {
        const data = JSON.parse(response.data);
        const {signed, payload_uuidv4} = data;
        if (signed) {
          getUser(payload_uuidv4);
        }
      };
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [getUser, ws]);

  return (
    <div className={styles.wrapper}>
      {!loading ? (
        <>
          <img className={styles.qr} src={qr} alt="" />
          <div className={styles.indications}>
            <span>Scan the QR code with Xumm to proceed</span>
            <Spin />
          </div>
        </>
      ) : (
        <div className={styles.loader}>
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default Auth;
