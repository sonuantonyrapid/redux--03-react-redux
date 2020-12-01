import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {

        let liContent = [];

        this.props.results.forEach(item => {

            liContent = liContent.concat(<li key={item.id} onClick={()=>this.props.onDeleteResult(item.id)}>{item.value}</li>);

        });

        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
                <button onClick={()=>this.props.onStoreResult(this.props.ctr)}>Store Results</button>
                <ul>
                    {liContent}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.counter.counter,
        results:state.results.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}),
        onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
        onAddCounter: () => dispatch({type: actionTypes.ADD,value:5}),
        onSubtractCounter: () => dispatch({type: actionTypes.SUBTRACT,value:5}),
        onStoreResult: (counter) => dispatch({type: actionTypes.STORE_RESULT,counter:counter}),
        onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT,id:id}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);