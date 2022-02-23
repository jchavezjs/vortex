import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Spin, message} from 'antd';
import {getUserDetails, logout, selectUser} from './redux/slices/user';
import Dashboard from './pages/dashboard/Main';
import Login from './pages/login/Main';

const App = () => {
  const [loading, handleLoading] = useState(true);
  const dispatch = useDispatch();
  const user = localStorage.getItem('vortex_user');
  const userInfo = useSelector(selectUser);

  useEffect(() => {
    const initialFetch = async () => {
      if (user) {
        const response = await dispatch(getUserDetails(user));
        if (response.status !== 'success') {
          message.warning('Your session has expired!');
          dispatch(logout());
        }
      }
      handleLoading(false);
    };
    initialFetch();
  }, []);

  if (loading) {
    return (
      <div className="main-loader">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/*" element={userInfo ? <Dashboard /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
