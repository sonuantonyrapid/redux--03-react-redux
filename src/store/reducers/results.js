import * as actionTypes from '../actions';

const initialState = {
    results:[]
}

const reducer = (state = initialState, action) => {

    if (action.type === actionTypes.STORE_RESULT) {
        console.log(action.counter);
        return {
            ...state,
            results:state.results.concat({id:new Date(),value:action.counter})
        }
    }

    if (action.type === actionTypes.DELETE_RESULT) {


        const id = action.id;

        const updateResult = [...state.results];

        updateResult.map((item,index)=>{

            if(id == item.id){

                updateResult.splice(index,1);

            }

        })

        return {
            ...state,
            results:updateResult
        }
    }

    return state;
};

export default reducer;