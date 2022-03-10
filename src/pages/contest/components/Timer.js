import { useEffect, useState } from 'react';
import moment from 'moment';
import styles from '../styles/Timer.module.css';

const Timer = ({endDate}) => {
  const [days, handleDays] = useState('00');
  const [hours, handleHours] = useState('00');
  const [minutes, handleMinutes] = useState('00');
  const [seconds, handleSeconds] = useState('00');

  useEffect(() => {
    const getTime = () => {
      const today = moment();
      const end = moment(endDate);
      const duration = moment.duration(end.diff(today));
      const daysTime = duration.days();
      const hoursTime = duration.hours();
      const minutesTime = duration.minutes();
      const secondsTime = duration.seconds();

      const formatTime = time => time < 10 ? `0${time}` : time;

      if (daysTime > 0 || hoursTime > 0 || minutesTime > 0 || secondsTime > 0) {
        handleDays(formatTime(daysTime));
        handleHours(formatTime(hoursTime));
        handleMinutes(formatTime(minutesTime));
        handleSeconds(formatTime(secondsTime));
      } else {
        handleDays('00');
        handleHours('00');
        handleMinutes('00');
        handleSeconds('00');
      }
    };

    const countup = setInterval(getTime, 1000);

    return () => {
      clearInterval(countup);
    };
  });

  return (
    <div className={styles.timeWrapper}>
      <div className={styles.timeItem}>
        <span className={styles.timeValue}>{days}</span>
        <span className={styles.timeLabel}>DAYS</span>
      </div>
      <div className={styles.timeItem}>
        <span className={styles.timeValue}>{hours}</span>
        <span className={styles.timeLabel}>HOURS</span>
      </div>
      <div className={styles.timeItem}>
        <span className={styles.timeValue}>{minutes}</span>
        <span className={styles.timeLabel}>MINUTES</span>
      </div>
      <div className={styles.timeItem}>
        <span className={styles.timeValue}>{seconds}</span>
        <span className={styles.timeLabel}>SECONDS</span>
      </div>
    </div>
  );
};

export default Timer;
