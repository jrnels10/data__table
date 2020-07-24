import React, { Component } from 'react'
import { ArrowLeftSquare, ArrowRightSquare } from '../Images/IconsSVG';

export default class Pageinate extends Component {
    constructor(props) {
        super(props)
        const { currentPage, pages } = props;
        this.state = {
            currentPage,
            pages
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.pages.length !== this.props.pages.length) {
            const { currentPage, pages } = this.props;
            this.setState({ currentPage, pages })
        } else if (prevProps.numberPerPage !== this.props.numberPerPage) {
            this.setState({ filterNumberBy: this.props.numberPerPage })
        }
    }
    setfilterNumberBy = (value) => {
        this.setState({ filterNumberBy: value });
        this.props.setNumberPerPage(value)
    }

    render() {
        const { currentPage, pages, filterNumberBy } = this.state;
        console.log(currentPage, pages)
        return pages ? (
            <div className='pageinate__container'>
                <div className='container'>
                    <select
                        className='page__count'
                        name="filterNumberBy"
                        value={filterNumberBy}
                        onChange={e => this.setfilterNumberBy(e.target.value)}
                    >
                        <option value="0">All</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <button className={`page__arrow page__arrow__left`}>
                        <ArrowLeftSquare color='#253255' />
                    </button>
                    <div className='page__container'>
                        {pages.map((page, idx) => (
                            <div className={`page page--${idx === currentPage ? 'active' : 'default'}`} key={idx}>{idx + 1}</div>
                        ))}
                    </div>
                    <button className={`page__arrow page__arrow__right`}>
                        <ArrowRightSquare color='#253255' />
                    </button>
                </div>
            </div>
        ) : null
    }
}
