async function getFileFromUrl(
  url: string,
  name: string,
  defaultType = 'image/jpeg'
) {
  const response = await fetch(`${url}?cacheblock=true`);
  const data = await response.blob();

  return new File([data], name, {
    type: defaultType
  });
}

export async function convertListOfUrlsToFiles(
  urls: string[],
  setter: Function
) {
  urls.forEach(async (url: string) => {
    const [name] = url.split('/files/').reverse();

    const convertedFile = await getFileFromUrl(url, name);

    setter((prev: any) => {
      if (prev.some((f: File) => f.name === name)) {
        return [...prev];
      }
      return [...prev, convertedFile];
    });
  });
}

export default getFileFromUrl;
