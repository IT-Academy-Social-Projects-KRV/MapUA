export async function fetchData(url: string, option?: any) {
  let status = 0;

  const data = await fetch(url, option)
    .then((res: any) => {
      status = res.status;
      return res;
    })
    .then((res: any) => res.json())
    .catch((e: any) => {
      console.error('Error has occurred: ', e);
    });

  return { status, data };
}
