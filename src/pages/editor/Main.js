import {useState, useEffect, useCallback} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {message, Form, Modal} from 'antd';
import moment from 'moment';
import {selectUser} from '../../redux/slices/user';
import {campaignDetails, selectCampaign, newCampaign} from '../../redux/slices/campaigns';
import EditorUI from './components/EditorUI';

const Editor = () => {
  const [loading, handleLoading] = useState(true);
  const [sending, handleSending] = useState(false);
  const [preview, handlePreview] = useState(null);
  const [selectWinnerVisible, setSelectionVisible] = useState(null);
  const params = useParams();
  const isNew = params.id === 'new';
  const user =  useSelector(selectUser);
  const campaign =  useSelector(selectCampaign);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFetch = useCallback(async () => {
    // const response = await dispatch(myCampaigns(user.account));
    const response = await dispatch(campaignDetails(user.account, params.id));
    if (response.status !== 'success') {
      message.error('Try again later');
    }
    handleLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    if (!isNew) {
      initialFetch();
    } else {
      handleLoading(false);
    }
  }, [initialFetch, isNew]);

  useEffect(() => {
    if (!isNew && !loading) {
      const values = Object.assign({}, campaign, {end_date: moment(campaign.end_date)});
      /* form.setFieldsValue({
        title: campaign.title,
        description: campaign.description,
        prize: campaign.prize,
        winners: campaign.winners,
      }); */
      form.setFieldsValue(values);
      handlePreview(campaign.image);
    }
  }, [campaign, form, isNew, loading]);

  const save = async () => {
    try {
      handleSending(true);
      const values = await form.validateFields();
      if (preview && preview.length) {
        const info = new FormData();
        info.append('account', user.account);
        // info.append('account', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
        info.append('title', values.title);
        info.append('description', values.description);
        info.append('prize', values.prize);
        info.append('winners', 1);
        info.append('end_date', values.end_date.format('YYYY-MM-DD HH:mm:ss'));
        info.append('active', 1);
        info.append('file', values.image?.length ? values.image[0]?.originFileObj : preview);
        const response = await dispatch(newCampaign(info));
        if (response.status === 'success') {
          message.success('Campaign created successfully!');
          handleLoading(true);
          navigate(`/campaigns/${response.id}`);
        } else {
          message.error('Try again later!');
        }
      } else {
        message.error('The image is required!');
      }
      handleSending(false);
    } catch (e) {
      message.error('Try again later!');
      console.log(e);
    }
  };

  const share = () => {
    navigator.clipboard.writeText(`http://localhost:3000/contest/${user.account}/${params.id}`);
    message.success('URL copied to clipboard');
  };

  const validateSelectWinner = () => {
    if (moment().isSameOrBefore(campaign.end_date)) {
      message.error('You can not select a winner until the contest is over');
    } else if (!campaign.players.length) {
      message.error('There are no players for this contest :(');
    } else {
      Modal.confirm({
        title: 'Are you sure you want to select the winner now?',
        content: 'This action can\'t be undone.',
        onOk() {
          setSelectionVisible(true);
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  };

  const closeModal = () => {
    setSelectionVisible(false);
  };

  return (
    <EditorUI
      isNew={isNew}
      preview={preview}
      handlePreview={handlePreview}
      loading={loading}
      campaign={campaign}
      form={form}
      save={save}
      sending={sending}
      share={share}
      selectWinnerVisible={selectWinnerVisible}
      validateSelectWinner={validateSelectWinner}
      closeModal={closeModal}
    />
  );
};

export default Editor;
