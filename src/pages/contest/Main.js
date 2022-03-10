import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {message, Form} from 'antd';
import {campaignDetails, selectCampaign, newPlayer} from '../../redux/slices/campaigns';
import ContestUI from './components/ContestUI';

const Contest = () => {
  const [loading, handleLoading] = useState(true);
  const [connectVisible, handleConnectVisible] = useState(false);
  const [sending, handleSending] = useState(false);
  const campaign =  useSelector(selectCampaign);
  const [form] = Form.useForm();
  const params = useParams();
  const hasWinner = campaign.winner?.length > 0;
  const dispatch = useDispatch();

  useEffect(() => {
    const initialFetch = async () => {
      const response = await dispatch(campaignDetails(params.owner, params.id));
      if (response.status !== 'success') {
        message.error('Try again later');
      }
      handleLoading(false);
    };
  
    initialFetch();
  }, [dispatch, params.id, params.owner]);

  const getAddressByQR = address => {
    form.setFieldsValue({address});
    message.success('XUUM address added');
  };

  const addPlayer = async () => {
    handleSending(true);
    const {address, name, email} = await form.validateFields();
    const data = {
      account: address,
      campaign: params.id,
      name,
      email,
    };
    const response_player = await dispatch(newPlayer(data));
    if (response_player.status !== 'success') {
      message.error('Try again later!');
    } else {
      message.success('You have been added to the contest! :)');
      form.resetFields();
    }
    handleSending(false);
  };

  return (
    <ContestUI
      loading={loading}
      campaign={campaign}
      sending={sending}
      handleConnectVisible={handleConnectVisible}
      connectVisible={connectVisible}
      form={form}
      getAddressByQR={getAddressByQR}
      addPlayer={addPlayer}
      hasWinner={hasWinner}
    />
  );
};

export default Contest;
