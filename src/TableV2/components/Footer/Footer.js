import React, { Component } from 'react';
import { Insert, Download, PencilSquare, GeoLocate, TrashCan } from './../Images/IconsSVG';
import './Footer.css'



export default class Footer extends Component {
    render() {
        const { selectedRows, active } = this.props;

        const children = React.Children.map(this.props.children, (child, idx) => {
            return child !== null ? React.cloneElement(child, {
                selectedRows: selectedRows
            }) : null
        });
        return (
            <div className='table__footer__container' >
                {children}
            </div>
        )
    }
}


export class FooterButton extends Component {
    state = { active: false }
    render() {
        const { initial, set, children, name, disable, active } = this.props;
        return <div className='footer__button__container'>
            <button className={`
        footer__button
        footer__button__${name}
        footer__button__${active ? 'independent' : 'grouped'}
        footer__button--${initial && disable || active ? 'disabled' : 'not-disabled'}
        footer__button--${this.state.active ? 'active' : 'default'} `}
                onClick={initial && disable || active ? null : set}
                onMouseDown={() => this.setState({ active: true })}
                onMouseUp={() => this.setState({ active: false })}
            >
                {children}
                <label style={{ fontSize: name.length > 9 ? '.65rem' : '.85rem' }}>{name}</label>
            </button>
        </div>
    }
}


// export class InsertRow extends Component {
//     state = {
//         newRecord: false,
//         newRow: false
//     }
//     render() {
//         const { insertRow, add } = this.props;
//         return (
//             <button
//                 className={`footer__button footer__button--${add ? 'disabled' : 'not-disabled'} footer__button--${this.state.newRecord ? 'active' : 'default'} `}
//                 onClick={() => add ? null : insertRow()}
//                 onMouseDown={() => this.setState({ newRecord: true })}
//                 onMouseUp={() => this.setState({ newRecord: false })}
//             >
//                 <Insert color='#253255' />
//                New row
//             </button>
//         )
//     }
// }

