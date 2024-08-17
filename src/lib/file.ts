export const getFileDetail = (file: File) => {
  const name = file.name;
  const ext = name.split('.').pop() ?? '';
  const type = 'file';
  return { type, name, ext };
};
