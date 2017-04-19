
 const initialState = {
     warehouses: {
         shouldFetchWarehouses: true,
         isFetching: false,
         data: null,
     }
 };

 /**
  * Reducer responsible for easily manageable common data throughout the site
  */
 export default function commonReducer(state = initialState, action){
     switch(action.type){
         case "REQUEST_WAREHOUSES": {
             return {
                 ...state,
                 warehouses: {
                     ...state.warehouses,
                     shouldFetchWarehouses: false,
                     isFetching: true
                 }
             };
             break;
         }
         case "RECEIVE_WAREHOUSES": {
             return {
                 ...state,
                 warehouses: {
                     ...state.warehouses,
                     shouldFetchWarehouses: false,
                     isFetching: false,
                     data: action.payload.data
                 }
             };
             break;
         }
         default: {
             break;
         }
     }
     return state;
 }
