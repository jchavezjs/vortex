import instance from './Request';

export const getCampigns = async account => {
  const request = await instance();
  let data = await request
    .get(`/user/${account}/campaign`)
    .catch((error) => {
      return {
        error,
      };
    });
  return data;
};

export const getCampignsPlayer = async account => {
  const request = await instance();
  let data = await request
    .get(`/player/${account}`)
    .catch((error) => {
      return {
        error,
      };
    });
  return data;
};

export const getDetails = async (account, id) => {
  const request = await instance();
  let data = await request
    .get(`/user/${account}/campaign/${id}`)
    .catch((error) => {
      return {
        error,
      };
    });
  return data;
};

export const createCampaign = async campaign => {
  const request = await instance(true);
  let data = await request
    .post('/campaign/create', campaign)
    .catch((error) => {
      return {
        error,
      };
    });
  return data;
};

export const addPlayer = async info => {
  const request = await instance();
  let data = await request
    .post('/campaign/player', info)
    .catch((error) => {
      return {
        error,
      };
    });
  return data;
};

export const selectWinner = async (campaign, account) => {
  const request = await instance();
  let data = await request
    .post('/campaign/winner', {campaign, account})
    .catch((error) => {
      return {
        error,
      };
    });
  return data;
};

export const qrOffer = async (account, index) => {
  const request = await instance();
  let data = await request
    .post('/campaign/accept-offer', {account, index})
    .catch((error) => {
      return {
        error,
      };
    });
  return data;
};

export const nftTransfered = async (account, campaign) => {
  const request = await instance();
  let data = await request
    .post('/player/nft-transfered', {account, campaign})
    .catch((error) => {
      return {
        error,
      };
    });
  return data;
};

