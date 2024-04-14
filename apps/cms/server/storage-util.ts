// import storage from './storage.json';
import fs from 'fs';

type Item = {
  name: string;
  displayName?: string | null;
  description?: string | null;
  cmd?: string | null;
  img?: string | null;
  //folderlike
  path?: string | null;
  items?: Item[] | null;
};

const STORAGE = 'apps/cms/server/storage.json';

export function findObjectByKeyValue(
  obj: any,
  key: string,
  value: string
): any {
  // If the current object has the key and its value matches the provided value, return it
  if (obj[key] === value) {
    return obj;
  }

  // Check if the current value is an object or an array, then recurse into it
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop) && typeof obj[prop] === 'object') {
      const result = findObjectByKeyValue(obj[prop], key, value);
      if (result) {
        return result;
      }
    }
  }

  // If no matching object was found in any of the branches, return null
  return null;
}

export function getStorage() {
  const rawData = fs.readFileSync(STORAGE, 'utf8');
  const jsonData = JSON.parse(rawData);
  if (!jsonData) {
    throw new Error('Storage file is empty');
  }
  return jsonData;
}

export function getItem(itemId: string) {
  if (itemId === '') {
    throw new Error('Item ID cannot be empty');
  }

  const root = getStorage();

  const item = findObjectByKeyValue(root, 'name', itemId);
  if (!item) {
    throw new Error(`Item not found: ${itemId}`);
  }

  console.log(item);

  return item;
}

export function updateItem(item: Item) {
  const root = getStorage();

  const itemToUpdate = findObjectByKeyValue(root, 'name', item.name);
  if (!itemToUpdate) {
    throw new Error(`Item not found: ${item.name}`);
  }

  itemToUpdate.displayName = item.displayName;
  itemToUpdate.cmd = item.cmd;
  itemToUpdate.img = item.img;
  itemToUpdate.path = item.path;
  itemToUpdate.items = item.items;

  fs.writeFileSync(STORAGE, JSON.stringify(root));

  return itemToUpdate;
}

export function createItem(item: Item) {
  const root = getStorage();

  const existingItem = findObjectByKeyValue(root, 'name', item.name);
  if (existingItem) {
    throw new Error(`Item already exists: ${item.name}`);
  }

  root.items.push(item);

  fs.writeFileSync(STORAGE, JSON.stringify(root));

  return item;
}

function filterOutItem(item: Item, nameToRemove: string) {
  if (item.items) {
    item.items = item.items
      .filter((subItem) => subItem.name !== nameToRemove)
      .map((subItem) => filterOutItem(subItem, nameToRemove));
  }

  // Return the item, which will be used in the map operation above
  return item;
}

export function deleteItem(item: Item) {
  const root: Item = getStorage();
  if (!root) {
    throw new Error(`Item not found: ${item.name}`);
  }

  // Filter out the item to delete
  const updatedItems = filterOutItem(root, item.name);
  fs.writeFileSync(STORAGE, JSON.stringify(updatedItems));
  return updatedItems;
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
