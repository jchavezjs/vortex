import {useState, useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {getQRApp, getUserLogin, getUserDetails} from '../redux/slices/user';
import {Spin, message} from 'antd';
import styles from './styles/Auth.module.css';

let socket;

const Auth = () => {
  const [loading, handleLoading] = useState(true);
  const [ws, handleWs] = useState(null);
  const [qr, handleQr] = useState('');
  const dispatch = useDispatch();

  const getUser = useCallback(async user => {
    const response = await dispatch(getUserLogin(user));
    if (response.status === 'success') {
      await localStorage.setItem('vortex_user', response.address);
      const response_user = await dispatch(getUserDetails(response.address));
      if (response_user.status !== 'success') {
        message.error('Try again later!');
      }
    } else {
      message.error('Try again later!');
    }
  }, [dispatch]);

  useEffect(() => {
    const initialFetch = async () => {
      const response = await dispatch(getQRApp());
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
