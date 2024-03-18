// import storage from './storage.json';
import fs from 'fs';

type Item = {
  name?: string | null;
  displayName: string | null;
  cmd?: string | null;
  img?: string | null;
  //folderlike
  path?: string | null;
  items?: Item[] | null;
};

export function getStorage() {
  const rawData = fs.readFileSync('apps/cms/server/storage.json', 'utf8');
  const jsonData = JSON.parse(rawData);
  return jsonData;
}

export function getItems(pathSegments: string[]) {
  if (
    pathSegments.length === 0 ||
    (pathSegments.length === 1 && pathSegments[0] === '')
  ) {
    return getStorage();
  }

  const itemName = pathSegments[pathSegments.length - 1];

  let subItem: Item | undefined = getStorage();

  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];

    if (!subItem || (i !== pathSegments.length - 1 && !subItem.items)) {
      throw new Error(`Path does not exist: ${pathSegments.join('/')}`);
    }

    if (i === pathSegments.length - 1 && subItem.name === itemName) {
      return subItem; // Return the final item if it's what we're looking for
    }

    subItem = subItem.items?.find((item) => item.name === segment);

    if (!subItem) {
      throw new Error(`Path does not exist: ${pathSegments.join('/')}`);
    }
  }

  return subItem;
}
