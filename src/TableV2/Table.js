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
                data: this.props.data.filter(item => item.tab === child.props.name),
                value: this.props.value,
                portal: this.props.portal
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

    findOnMap = async (id) => {
        const { tableGeometry, uniqueId } = this.data;
        const { view } = this.props.value;
        const itemGeometry = await tableGeometry.find(item => item.TABLE_ID === id);
        this.tableFunctions.findOnMap(view, itemGeometry);
    }

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
                    findOnMap={this.findOnMap}
                />
            </table>
        )
    }
}


export class ESRITableObj {
    constructor(tab, data, uniqueId) {
        this.tab = tab;
        this.rawData = data;
        this.tableGeometry = data.features.map(item => Object.assign(item, { TABLE_ID: item.attributes[uniqueId] }));
        this.tableFields = data.fields.map((field, idx) => {
            return { title: field.name, dataIndex: field.name, key: idx }
        });
        this.uniquieId = uniqueId;
        this.tableData = data.features.map(gis => Object.assign(gis.attributes, { TABLE_ID: gis.attributes[uniqueId] }));
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
