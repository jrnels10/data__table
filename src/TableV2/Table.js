import React, { Component } from 'react'
import { TableFunctions } from './TableFunctions';
import './Table.css';
import { Headers } from './components/Header';
import { Body } from './components/Body/Body';
import { Loader } from './components/Loader/Loader';
import Footer from './components/Footer/Footer';

export default class Table2 extends Component {
    state = {
        tableActive: 0
    }


    render() {
        let tabCount = [];

        const children = React.Children.map(this.props.children, (child, idx) => {
            const individualData = this.props.data.filter(item => item.tab === child.props.name)
            tabCount.push(individualData[0].tableData.length);
            return React.cloneElement(child, {
                data: individualData,
                value: this.props.value,
                portal: this.props.portal
            })
        });
        return (
            <div className='data-table'>
                <hr />
                <div className='table__tabs'>
                    {children.map((tab, idx) =>
                        <div className={`tab tab--${idx === this.state.tableActive ? 'active' : 'default'}`} key={idx} onClick={() => this.setState({ tableActive: idx })}>
                            <button className={`tab__button tab__button--${idx === this.state.tableActive ? 'active' : 'default'}`}>{tab.props.name}</button>
                            <div className='count'>{tabCount[idx]}</div>
                        </div>)}
                </div>
                {children[this.state.tableActive]}
            </div >
        )
    }
}

export class TableTab extends Component {
    data = this.props.data[0];
    sort = this.props.sort;
    locate = this.props.locate;
    editAction = this.props.editAction ? this.props.editAction : false;
    tableFunctions = new TableFunctions(this.data);

    state = {
        tableData: this.data.tableData,
        newRow: false
    }

    buildTable() {
        this.data.map(item => item)
    };

    sortTable = async (columnName) => {
        let sortedData;
        const { sorted, tableData } = this.state;
        if (columnName === sorted) {
            sortedData = tableData.reverse()
        } else {
            sortedData = await this.tableFunctions.sortData(columnName);
        }
        this.setState({ tableData: sortedData, sorted: columnName });
    };

    findOnMap = async (id) => {
        const { tableGeometry } = this.data;
        const { view } = this.props.value;
        const itemGeometry = await tableGeometry.find(item => item.TABLE_ID === id);
        this.tableFunctions.findOnMap(view, itemGeometry);
    }

    filterData = (term, field, fieldType, filterParams) => {
        const filteredResults = this.tableFunctions.filter(term, field, fieldType, filterParams);
        this.setState({ tableData: filteredResults })
    };

    columnSelect = (idx) => {
        this.setState({ columnSelect: idx })
    }

    insertRow = () => {
        const newTable = this.tableFunctions.insertRow();
        this.props.value.dispatch({ type: 'NEW_ROW', newRow: true })
        this.setState({ tableData: newTable, newRow: true });
    }

    render() {
        const { name, locate, roundTo, value, portal } = this.props;
        const { tableData, columnSelect, newRow } = this.state;
        return (
            <div className="table__container">
                <table className="table" id={`table_${name}`}>
                    <Headers
                        value={value}
                        portal={portal}
                        sort={this.sort ? this.sortTable : null}
                        dataForHeaders={this.data.tableFields}
                        filterData={this.filterData}
                        tableData={tableData}
                        columnSelect={columnSelect}
                        setColumnSelect={this.columnSelect.bind(this)}
                        editAction={this.editAction}
                        tableFunctions={this.tableFunctions}
                    />
                    <Body
                        value={value}
                        portal={portal}
                        dataForBody={tableData}
                        findOnMap={locate ? this.findOnMap : null}
                        columnSelect={columnSelect}
                        editAction={this.editAction}
                        tableFunctions={this.tableFunctions}
                        newRow={newRow}
                    />
                </table>
                <Footer
                    value={value}
                    portal={portal}
                    insertRow={this.insertRow} />
            </div>
        )
    }
}