import {createSlice} from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import {getQRCode, getUser, getInfo, login} from '../../api/User';

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

export const getUserDetails = (account, type) => async dispatch => {
  try {
    const response = await getInfo(account);
    if (!response.error && response.status === 200) {
      const {Account} = response.data.user.result.account_data;
      dispatch(setInfo({account: Account, type}));
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

export const signIn = (email, password) => async dispatch => {
  try {
    const response = await login(email, password);
    if (!response.error && response.status === 200) {
      if (response.data.token) {
        const {token} = response.data;
        const {wallet} = jwt_decode(token);
        const info = {account: wallet.classicAddress, type: 'brand'};
        await localStorage.setItem('vortex_user', JSON.stringify(info));
        dispatch(setInfo(info));
        return {
          status: 'success',
        };
      }
      return {
        status: 'error',
        type: 'not-found'
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
