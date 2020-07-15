import React, { Component } from 'react'
import { TableFunctions } from './TableFunctions';
import './Table.css';
import { Headers, Body } from './components/TableComponents';

export default class Table2 extends Component {
    state = {
        tableActive: 0
    }


    render() {
        const children = React.Children.map(this.props.children, (child, idx) => {
            return React.cloneElement(child, {
                data: this.props.data.filter(item => item.tab === child.props.name)
            })
        })
        return (
            <div className='table__container'>
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

    render() {
        const { name } = this.props;
        const { tableData } = this.state;
        return (
            <table className="table" id={`table_${name}`}>
                <Headers
                    sort={this.sort ? this.sortTable : null}
                    dataForHeaders={this.data.tableFields}
                />
                <Body
                    dataForBody={tableData}
                    locationData={this.data.tableGeometry}
                />
            </table>
        )
    }
}


export class ESRITableObj {
    constructor(tab, data) {
        this.tab = tab;
        this.rawData = data;
        this.tableGeometry = data.geometryType ? data.features : null;
        this.tableFields = data.fields.map((field, idx) => {
            return { title: field.name, dataIndex: field.name, key: idx }
        });
        this.tableData = data.features.map(gis => gis.attributes);
    }
};

export class ADWRTableObj {
    constructor(tab, data) {
        this.tab = tab;
        this.rawData = data;
        this.tableGeometry = null;
        this.tableFields = Object.keys(data[0]).map((fieldItem, idx) => {
            return { title: fieldItem, dataIndex: fieldItem, key: idx }
        });
        this.tableData = data
    }
}
