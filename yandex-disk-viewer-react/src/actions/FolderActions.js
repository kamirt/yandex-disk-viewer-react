export function getFolders(folder) {
  return {
    type: 'GET_FOLDERS',
    payload: {
      client: 'default',
      request:{
        url:'dir/' + folder,
      }
    }
  };
}

export function removeFolders() {
  return {
    type: 'REMOVE_FOLDERS',
  };
}
