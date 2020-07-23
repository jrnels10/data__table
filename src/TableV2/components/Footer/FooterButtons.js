import React, { Component } from 'react';
import { Insert, Download } from './../Images/IconsSVG';

export class InsertRow extends Component {
    state = {
        newRecord: false,
        newRow: false
    }
    render() {
        const { insertRow, tableUpdate } = this.props;
        return (
            <button
                className={`insert__button insert__button--${tableUpdate === false ? 'disabled' : 'not-disabled'} insert__button--${this.state.newRecord ? 'active' : 'default'} `}
                onClick={() => tableUpdate === false ? null : insertRow()}
                onMouseDown={() => this.setState({ newRecord: true })}
                onMouseUp={() => this.setState({ newRecord: false })}
            >
                <Insert color='#253255' />
               New row
            </button>
        )
    }
}


export class DownloadButton extends Component {
    render() {
        return (
            <button
                className={`download__button `}
            >
                <Download color='#253255' />
            </button>
        )
    }
}

