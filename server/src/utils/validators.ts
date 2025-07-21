export const isFileValid = (mimetype: string): boolean => {
  // TODO also validate the file size
  const validMimetypes = ["video/webm", "video/mp4"];
  return validMimetypes.includes(mimetype);
};
