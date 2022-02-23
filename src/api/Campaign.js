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
