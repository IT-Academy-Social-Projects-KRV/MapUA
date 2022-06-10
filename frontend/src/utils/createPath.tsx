export const getPath = (userID: string, authorId: string | undefined) => {
  if (userID === authorId) {
    return `/profile`;
  }
  return `/profile/${authorId}`;
};
