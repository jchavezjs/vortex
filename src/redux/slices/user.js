import {createSlice} from '@reduxjs/toolkit';
import {getQRCode, getUser, getInfo} from '../../api/User';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: null,
  },
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setInfo} = userSlice.actions;

export const getQRApp = () => async () => {
  try {
    const response = await getQRCode();
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

export const getUserLogin = user => async dispatch => {
  try {
    const response = await getUser(user);
    if (!response.error && response.status === 200) {
      return {
        status: 'success',
        address: response.data.address,
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

export const getUserDetails = account => async dispatch => {
  try {
    const response = await getInfo(account);
    if (!response.error && response.status === 200) {
      const {Account, Balance} = response.data.user.result.account_data;
      dispatch(setInfo({account: Account, balance: Balance}));
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

export const logout = () => dispatch => {
  localStorage.removeItem('vortex_user');
  dispatch(setInfo(null));
};

export const selectUser = state => state.user.info;

export default userSlice.reducer;
