import React, { Component } from 'react'
import { Insert } from './../Images/IconsSVG';

export default class Footer extends Component {
    state = {
        newRecord: false
    }
    render() {
        const { insertRow, value: { newRow } } = this.props;
        return (
            <div className='table__footer__container'>
                <button
                    className={`insert__button insert__button--${this.state.newRecord ? 'active' : 'default'}`}
                    onClick={() => newRow ? null : insertRow()}
                    onMouseDown={() => this.setState({ newRecord: true })}
                    onMouseUp={() => this.setState({ newRecord: false })}
                >
                    <Insert color='#253255' />
                       New row
                    </button>
            </div>
        )
    }
}
