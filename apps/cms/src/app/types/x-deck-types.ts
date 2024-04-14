export type Item = {
  name: string;
  displayName?: string | null;
  description?: string | null;
  cmd?: string | null;
  img?: string | null;
  //folderlike
  path?: string | null;
  items?: Item[] | null;
};
