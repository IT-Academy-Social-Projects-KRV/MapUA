import axios from 'axios';

export async function fetchData(option: any) {
  // let status = 0;
  let data: any = null;
  try {
    data = await axios(option).catch((e: any) => {
      console.error('Error has occurred: ', e);
    });
  } catch (e) {
    console.log(e);
  }
  return data;
}
