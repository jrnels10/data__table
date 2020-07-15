import React, { Component } from 'react';

const Context = React.createContext();

const reducer = (state, action) => {

    switch (action.type) {
        case 'QUERY_RESULTS':
            // must be structured with keys type and item
            // type: determines the tab that the data is loaded under
            // results:{type:'GWSI', item:feature[0]}
            return {
                ...state,
                queryResults: action.payload.results,
                exceededQueryParams: action.payload.exceededQueryParams,
                tableShow: action.payload.results.length > 0,
                loader: false
            }
        case 'INSTRUCTIONS':
            return {
                ...state,
                instructions: action.payload.instructions,
                instructionsPage: action.payload.page ? action.payload.page : 0
            }
        case 'LOADER':
            return {
                ...state,
                loader: action.payload.loader,
                loaderMessage: action.payload.loaderMessage ? action.payload.loaderMessage : ""
            }
        case 'ADD_VIEW':
            return {
                ...state,
                view: action.payload.view,
                map: action.payload.map
            }
        case 'ADD_AMA':
            return {
                ...state,
                AMA: action.payload.AMA
            }
        case 'SIDENAV':
            return {
                ...state,
                sideNav: action.payload.sideNav,
                buttonSelected: action.payload.buttonSelected,
                editActive: action.payload.editActive
            }
        case 'TABLE_SHOW':
            return {
                ...state,
                tableShow: action.payload.tableShow
            }
        case 'HUBQA':
            let hubData = state;
            hubData.wellsHubQA = action.payload;
            return {
                ...state
            }
        default:
            return state;
    }
}


export class Provider extends Component {
    state = {
        sideNav: false,
        instructions: false,
        instructionsPage: 0,
        buttonSelected: '',
        wellsHubQA: {},
        loader: true,
        editActive: false,
        editMessage: '',
        loaderMessage: "",
        tableShow: false,
        view: null,
        map: null,
        exceededQueryParams: false,
        queryResults: [],
        AMA: '',
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