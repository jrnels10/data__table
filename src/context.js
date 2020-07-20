import React, { Component } from 'react';

const Context = React.createContext();

const reducer = (state, action) => {

    switch (action.type) {
        case 'NEW_ROW':
            // must be structured with keys type and item
            // type: determines the tab that the data is loaded under
            // results:{type:'GWSI', item:feature[0]}
            return {
                ...state,
                newRow: action.newRow
            }

        default:
            return state;
    }
}


export class Provider extends Component {
    state = {
        newRow: false,
        dispatch: action => {
            if (action.length > 0) {
                action.map(item => {
                    return this.setState(state => reducer(state, item))
                });
            }
            else {
                return this.setState(state => reducer(state, action))
            }
        }
    }
    render() {
        if (window.Cypress) {
            window.__store__ = this.state;
        }
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;