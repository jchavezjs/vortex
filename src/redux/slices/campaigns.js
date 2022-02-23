import {createSlice} from '@reduxjs/toolkit';
import {
  getCampigns,
} from '../../api/Campaign';

export const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState: {
    campaigns: [],
  },
  reducers: {
    setCampaigns: (state, action) => {
      state.campaigns = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setCampaigns} = campaignsSlice.actions;

export const myCampaigns = account => async dispatch => {
  try {
    const response = await getCampigns(account);
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

export const selectCampaigns = state => state.campaigns.campaigns;

export default campaignsSlice.reducer;
