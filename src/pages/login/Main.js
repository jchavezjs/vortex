import {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Form, message} from 'antd';
import {useDispatch} from 'react-redux';
import {signIn} from '../../redux/slices/user';
import LoginUI from './components/LoginUI';

const Login = () => {
  const [sending, handleSending] = useState(false);
  const [connectVisible, handleConnectVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== '/') {
      navigate('/');
    }
  }, []);

  const login = async () => {
    handleSending(true);
    try {
      const {email, password} = await form.validateFields();
      if (email.length && password.length) {
        const response = await dispatch(signIn(email, password));
        if (response.status === 'success') {
        } else if (response.type === 'not-found') {
          message.error('Wrong credentials');
        } else {
          message.error('Try again later!');
        }
      } else {
        message.error('Fill every field required');
      }
    } catch (errorInfo) {
      message.error('Try again later!');
    }
    handleSending(false);
  };

  return (
    <LoginUI
      connectVisible={connectVisible}
      handleConnectVisible={handleConnectVisible}
      form={form}
      sending={sending}
      login={login}
    />
  );
}

export default Login;
