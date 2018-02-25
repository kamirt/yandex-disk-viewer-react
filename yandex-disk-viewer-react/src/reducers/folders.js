const initialState = {
  folders: [],
  loaded: true
};

const getGroupedFolders = (items) => {
  let res = [],
      inRow = 6,
      inCol = 2,
      iter = 0;

  if (!items) return [];
  let itemRow = Math.floor(items.length / inRow) || 1;
  for(let row = 0; row < itemRow; row++){
    res.push([])
    for(let it = 0; it < inRow/inCol; it++) {
      res[row].push([])
      for (let i = 0; i < inCol; i++) {
        if(items[it+iter]){
          res[row][it].push(items[iter])
        }
        iter++
      }
    }
  }
  return res
}

export default function folders(state = initialState, action) {
  switch (action.type) {
    case 'GET_FOLDERS':
      return Object.assign({}, state, {
        loaded: false
      });
    case 'GET_FOLDERS_FAIL':
      return Object.assign({}, state, {
        folders: [],
        loaded: true
      });
    case 'GET_FOLDERS_SUCCESS':
      return Object.assign({}, state, {
        folders: getGroupedFolders(action.payload.data.items),
        loaded: true
      });
    case 'REMOVE_FOLDERS':
      return Object.assign({}, state, {
        folders: []
      });
    default:
      return state;
  }
}
