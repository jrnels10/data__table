import React, { Component } from 'react'
import { TableFunctions } from './TableFunctions';
import './Table.css';
import { Headers } from './components/Header';
import { Body } from './components/Body';

export default class Table2 extends Component {
    state = {
        tableActive: 0
    }


    render() {
        const children = React.Children.map(this.props.children, (child, idx) => {
            return React.cloneElement(child, {
                data: this.props.data.filter(item => item.tab === child.props.name),
                value: this.props.value,
                portal: this.props.portal
            })
        })
        return (
            <div className='data-table'>
                <div className='table__tabs'>
                    {children.map((tab, idx) => <button key={idx} onClick={() => this.setState({ tableActive: idx })}>{tab.props.name}</button>)}
                </div>
                {children[this.state.tableActive]}
            </div>
        )
    }
}

export class TableTab extends Component {
    data = this.props.data[0];
    sort = this.props.sort;
    locate = this.props.locate;
    editRow = this.props.editRow ? this.props.editRow : false;
    tableFunctions = new TableFunctions(this.data);

    state = {
        tableData: this.data.tableData
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
    }

    columnSelect = (idx) => {
        this.setState({ columnSelect: idx })
    }

    render() {
        const { name, locate, roundTo } = this.props;
        const { tableData, columnSelect } = this.state;
        return (
            <div className="table__container">
                <table className="table" id={`table_${name}`}>
                    <Headers
                        sort={this.sort ? this.sortTable : null}
                        dataForHeaders={this.data.tableFields}
                        filterData={this.filterData}
                        tableData={tableData}
                        columnSelect={columnSelect}
                        setColumnSelect={this.columnSelect.bind(this)}
                    />
                    <Body
                        dataForBody={tableData}
                        findOnMap={locate ? this.findOnMap : null}
                        columnSelect={columnSelect}
                        editRow={this.editRow}
                    />
                </table>
            </div>
        )
    }
}