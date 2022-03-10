import instance from './Request';

export const getUser = async payload => {
  const request = await instance();
  let data = await request
    .get(`/account/${payload}`)
    .catch((error) => {
      return {
        error,
      };
    });
  return data;
};

export const getInfo = async account => {
  const request = await instance();
  let data = await request
    .get(`/user/${account}`)
    .catch((error) => {
      return {
        error,
      };
    });
  return data;
};

export const getQRCode = async () => {
  const request = await instance();
  let data = await request
    .get('/auth')
    .catch((error) => {
      return {
        error,
      };
    });
  return data;
};

export const login = async (email, password) => {
  const request = await instance();
  let data = await request
    .post('/login', {
      email,
      password,
    })
    .catch((error) => {
      return {
        error,
      };
    });
  return data;
};
