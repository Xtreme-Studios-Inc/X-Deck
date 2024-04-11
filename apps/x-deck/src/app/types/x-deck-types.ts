export type Item = {
  name?: string | null;
  displayName: string | null;
  cmd?: string | null;
  img?: string | null;
  //folderlike
  path?: string | null;
  items?: Item[] | null;
};
