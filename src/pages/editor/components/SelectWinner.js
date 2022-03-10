import {useState, useEffect} from 'react';
import {message, Spin, Button} from 'antd';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import Lottie from 'lottie-react';
import {campaignWinner} from '../../../redux/slices/campaigns';
import animation from '../../../assets/animation2.json';
import confetti from '../../../assets/confetti.json';
import styles from '../styles/SelectWinner.module.css';

const SelectWinner = ({players, title, close}) => {
  const [loading, handleLoading] = useState(true);
  const [winner, handleWinner] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const timeOut = setTimeout(async () => {
      const index = Math.floor(Math.random() * players.length);
      const selectedWinner = players[index];
      const response = await dispatch(campaignWinner(params.id, selectedWinner.account));
      if (response.status === 'success') {
        handleWinner(selectedWinner);
        handleLoading(false);
      } else {
        message.error('Try again later!');
        close();
      }
    }, 5000);

    return () => {
      clearInterval(timeOut);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <>
          <Lottie animationData={animation} loop autoPlay className={styles.animation} />
          <div className={styles.indications}>
            <span>Selecting winner</span>
            <Spin />
          </div>
        </>
      ) : (
        <>
          <Lottie animationData={confetti} loop autoPlay className={styles.confetti} />
          <span className={styles.congrats}>Congratulations!</span>
          <span className={styles.name}>{winner.name}</span>
          <span className={styles.account}>{winner.account}</span>
          <span className={styles.disclaimer}>You have won the {title}. Check your email for more details.</span>
          <Button
            onClick={close}
            type="primary"
            size="large"
            className={styles.close}>
            Close
          </Button>
        </>
      )}
    </div>
  );
};

export default SelectWinner;
