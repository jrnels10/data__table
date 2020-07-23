import React, { Component } from 'react';
import { Insert, Download, PencilSquare, GeoLocate, TrashCan } from './../Images/IconsSVG';




export default class Footer extends Component {
    render() {
        const { selectedRows } = this.props;

        const children = React.Children.map(this.props.children, (child, idx) => {
            return React.cloneElement(child, {
                selectedRows: selectedRows
            })
        });
        return (
            <div className='table__footer__container'>
                {children}
            </div>
        )
    }
}


export class FooterButton extends Component {
    state = { active: false }
    render() {
        const { initial, set, children, name, disable } = this.props;
        return <button className={`
        footer__button
         footer__button__${name}
          footer__button--${initial && disable ? 'disabled' : 'not-disabled'}
           footer__button--${this.state.active ? 'active' : 'default'} `}
            onClick={initial ? null : set}
            onMouseDown={() => this.setState({ active: true })}
            onMouseUp={() => this.setState({ active: false })}
        >
            {children}
            {name}
        </button>
    }
}


export class InsertRow extends Component {
    state = {
        newRecord: false,
        newRow: false
    }
    render() {
        const { insertRow, add } = this.props;
        return (
            <button
                className={`footer__button footer__button--${add ? 'disabled' : 'not-disabled'} footer__button--${this.state.newRecord ? 'active' : 'default'} `}
                onClick={() => add ? null : insertRow()}
                onMouseDown={() => this.setState({ newRecord: true })}
                onMouseUp={() => this.setState({ newRecord: false })}
            >
                <Insert color='#253255' />
               New row
            </button>
        )
    }
}

