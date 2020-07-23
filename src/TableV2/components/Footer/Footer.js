import React, { Component } from 'react'

export default class Footer extends Component {



    render() {
        return (
            <div className='table__footer__container'>
                {this.props.children}
            </div>
        )
    }
}
