import {createSlice} from '@reduxjs/toolkit';
import {
  getCampigns,
  getDetails,
  createCampaign,
  addPlayer,
  selectWinner,
  getCampignsPlayer,
  qrOffer,
  nftTransfered,
} from '../../api/Campaign';

export const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState: {
    campaigns: [],
    campaign: {},
  },
  reducers: {
    setCampaigns: (state, action) => {
      state.campaigns = action.payload;
    },
    setCampaign: (state, action) => {
      state.campaign = action.payload;
    },
    setCampaignWinner: (state, action) => {
      state.campaign.winner = action.payload;
    },
    setCampaignTransfered: (state, action) => {
      const index = state.campaigns.findIndex(el => el.id === action.payload);
      state.campaigns[index].transfered = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setCampaigns, setCampaign, setCampaignWinner, setCampaignTransfered} = campaignsSlice.actions;

export const myCampaigns = (account, isPlayer) => async dispatch => {
  try {
    let response;
    if (isPlayer) {
      response = await getCampignsPlayer(account);
    } else {
      response = await getCampigns(account);
    }
    if (!response.error && response.status === 200) {
      const {campaigns} = response.data;
      dispatch(setCampaigns(campaigns));
      return {
        status: 'success',
        campaigns:  campaigns || [],
      };
    }
    return {
      status: 'error',
      type: 'unkown'
    };
  } catch (e) {
    return {
      status: 'error',
      type: 'unknown',
    };
  }
};

export const campaignDetails = (account, id) => async dispatch => {
  try {
    const response = await getDetails(account, id);
    if (!response.error && response.status === 200) {
      const {campaign} = response.data;
      dispatch(setCampaign(campaign));
      return {
        status: 'success',
      };
    }
    return {
      status: 'error',
      type: 'unkown'
    };
  } catch (e) {
    return {
      status: 'error',
      type: 'unknown',
    };
  }
};

export const newCampaign = campaign => async () => {
  try {
    const response = await createCampaign(campaign);
    if (!response.error && response.status === 200) {
      return {
        status: 'success',
        id: response.data.campaign.id,
      };
    }
    return {
      status: 'error',
      type: 'unkown'
    };
  } catch (e) {
    return {
      status: 'error',
      type: 'unknown',
    };
  }
};

export const newPlayer = data => async () => {
  try {
    const response = await addPlayer(data);
    if (!response.error && response.status === 200) {
      return {
        status: 'success',
      };
    }
    return {
      status: 'error',
      type: 'unkown'
    };
  } catch (e) {
    return {
      status: 'error',
      type: 'unknown',
    };
  }
};

export const campaignWinner = (campaign, account) => async dispatch => {
  try {
    const response = await selectWinner(campaign, account);
    if (!response.error && response.status === 200) {
      dispatch(setCampaignWinner(account));
      return {
        status: 'success',
      };
    }
    return {
      status: 'error',
      type: 'unkown'
    };
  } catch (e) {
    return {
      status: 'error',
      type: 'unknown',
    };
  }
};

export const getQRTransfer = (account, index) => async dispatch => {
  try {
    const response = await qrOffer(account, index);
    if (!response.error && response.status === 200) {
      return {
        status: 'success',
        data: response.data,
      };
    }
    return {
      status: 'error',
      type: 'unkown'
    };
  } catch (e) {
    return {
      status: 'error',
      type: 'unknown',
    };
  }
};

export const verifyTransfer = (account, campaign) => async dispatch => {
  try {
    const response = await nftTransfered(account, campaign);
    if (!response.error && response.status === 200) {
      dispatch(setCampaignTransfered(campaign));
      return {
        status: 'success',
      };
    }
    return {
      status: 'error',
      type: 'unkown'
    };
  } catch (e) {
    return {
      status: 'error',
      type: 'unknown',
    };
  }
};

export const selectCampaigns = state => state.campaigns.campaigns;
export const selectCampaign = state => state.campaigns.campaign;

export default campaignsSlice.reducer;
