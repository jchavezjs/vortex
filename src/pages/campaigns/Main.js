import {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {message} from 'antd';
import {selectUser} from '../../redux/slices/user';
import {myCampaigns, selectCampaigns} from '../../redux/slices/campaigns';
import CampaignsUI from './components/CampaignsUI';

const Campaigns = () => {
  const [loading, handleLoading] = useState(true);
  const [results, handleResults] = useState([]);
  const [searchVal, handleSearchVal] = useState('');
  const campaigns = useSelector(selectCampaigns);
  const user =  useSelector(selectUser);
  const dispatch = useDispatch();

  const initialFetch = useCallback(async () => {
    // const response = await dispatch(myCampaigns(user.account));
    const response = await dispatch(myCampaigns(user.account));
    if (response.status === 'success') {
      handleResults(response.campaigns);
    } else {
      message.error('Try again later');
    }
    handleLoading(false);
  }, [dispatch, user.account]);

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);
/* 
  useEffect(() => {
    handleResults(campaigns);
    handleSearchVal('');
  }, [campaigns]); */

  function slugify(str) {
    const map = {
      a: 'á|à|ã|â|À|Á|Ã|Â',
      e: 'é|è|ê|É|È|Ê',
      i: 'í|ì|î|Í|Ì|Î',
      o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
      u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
      c: 'ç|Ç',
      n: 'ñ|Ñ',
    };
  
    // eslint-disable-next-line no-param-reassign
    str = str.toLowerCase();
  
    for (let pattern in map) {
      str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    }
  
    return str;
  }

  const searchCampaign = e => {
    const search = e.target.value;
    if (search !== '') {
      const newResults = [];
      campaigns.map(item => {
        const evaluar = slugify(item.title).indexOf(slugify(search));
        if (evaluar >= 0) {
          newResults.push(item);
        }
      });
      handleResults(newResults);
    } else {
      handleResults(campaigns);
    }
    handleSearchVal(search);
  };

  return (
    <CampaignsUI
      campaigns={results}
      loading={loading}
      searchVal={searchVal}
      searchCampaign={searchCampaign}
    />
  );
};

export default Campaigns;
