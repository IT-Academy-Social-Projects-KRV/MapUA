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
