import axios from 'axios';

export async function fetchData(option: any) {
  let data: any = null;
  try {
    data = await axios(option);
  } catch (e) {
    console.error('Error has occurred: ', e);
  }
  return data;
}

export const axiosHeaders = {
  headers: {
    'Accept-Language': localStorage.getItem('i18nextLng') || ''
  }
};
