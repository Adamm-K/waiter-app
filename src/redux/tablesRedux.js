import shortid from 'shortid';
import {API_URL} from '../config.js';

// selectors
export const getAllTables = ({ tables }) => tables;
export const getTableById = ({ tables }, tableId) => tables.find(table => table.id === tableId);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const EDIT_TABLE = createActionName('EDIT_TABLE');
const UPDATE_TABLES = createActionName('UPDATE_TABLES'); 
const ADD_TABLE = createActionName('ADD_TABLE');
const REMOVE_TABLE = createActionName('REMOVE_TABLE');

// action creators
export const editTable = payload => ({ type: EDIT_TABLE, payload });
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const addTable = payload => ({ type: ADD_TABLE, payload });
export const removeTable = payload => ({ type: REMOVE_TABLE, payload })

export const fetchData = () => {
  return (dispatch) => {
    fetch(API_URL + '/tables')
      .then(res => res.json())
      .then(tables => dispatch(updateTables(tables)))  
  }
};

export const updateTableRequest = (updatedTable) => {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTable),
    };

    fetch(API_URL + '/tables/' + updatedTable.id, options)
      .then(() => dispatch(editTable(updatedTable)))

  }
};

export const addTableRequest = (newTable) => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTable)
    };

    fetch(API_URL + '/tables/', options)
      .then(() => dispatch(addTable(newTable)))
      .then (() => fetchData());
      }
    };

export const deleteTableRequest = (tableId) => {
  return (dispatch) => {
    const options = {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      },      
    };

    fetch('http://localhost:3131/api/tables/' + tableId, options)
      .then(() => dispatch(removeTable(tableId)))    

  }
};

const tablesReducer = (statePart = [], action) => {
    switch (action.type) {
        case EDIT_TABLE:
            return statePart.map(table => (table.id === action.payload.id ? { ...table, ...action.payload } : table));
        case UPDATE_TABLES:
            return [...action.payload];
        case ADD_TABLE:
          return [ ...statePart, { ...action.payload, id: shortid() }]
        case REMOVE_TABLE:
          return statePart.filter(table => table.id !== action.payload);
        default:
            return statePart; 
    };
};
export default tablesReducer;