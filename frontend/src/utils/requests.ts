export async function fetchData(url: string, option?: any) {
  let status = 0;
  let data = null;
  try {
    data = await fetch(url, option)
      .then((res: any) => {
        status = res.status;
        return res;
      })
      .then((res: any) => res.json())
      .catch((e: any) => {
        console.error('Error has occurred: ', e);
      });
  } catch (e) {
    console.log(e);
  }
  return { status, data };
}
