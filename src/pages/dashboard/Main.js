import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logout, selectUser} from '../../redux/slices/user';
import DashboardUI from './components/DashboardUI';

const Dashboard = () => {
  const user =  useSelector(selectUser);
  const dispatch = useDispatch();

  const closeSession = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <DashboardUI
      closeSession={closeSession}
      user={user}
    />
  );
}

export default Dashboard;
