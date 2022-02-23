import {useState} from 'react';
import LoginUI from './components/LoginUI';

const Login = () => {
  const [connectVisible, handleConnectVisible] = useState(false);

  return (
    <LoginUI
      connectVisible={connectVisible}
      handleConnectVisible={handleConnectVisible}
    />
  );
}

export default Login;
