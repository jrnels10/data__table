import React, { Component } from 'react'
import { TableFunctions } from './TableV2/TableFunctions';
import './Table.css';
import { Headers } from './TableV2/components/Header';
import { Body } from './TableV2/components/Body/Body';
import Footer from './TableV2/components/Footer/Footer';
import { InsertRow, DownloadButton } from './TableV2/components/Footer/FooterButtons';

export default class Table extends Component {
    state = {
        tableActive: 0
    }


    render() {
        let tabCount = [];
        if (window.Cypress) {
            window.__store__ = this.state;
        }
        const children = React.Children.map(this.props.children, (child, idx) => {
            const individualData = this.props.data.filter(item => item.tab === child.props.name)
            tabCount.push(individualData[0].tableData.length);
            return React.cloneElement(child, {
                data: individualData,
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
        tableData: this.tableFunctions.data.tableData,
        newRow: false,
        tableUpdate: true,
        newItem: null
    }

    buildTable() {
        this.tableFunctions.pageinate();
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

    filterData = (term, field, fieldType, filterParams) => {
        const filteredResults = this.tableFunctions.filter(term, field, fieldType, filterParams);
        this.setState({ tableData: filteredResults })
    };

    columnSelect = (idx) => {
        this.setState({ columnSelect: idx })
    }

    insertRow = () => {
        const newTableRow = this.tableFunctions.insertRow();
        let newItem = this.tableFunctions.newObject();
        this.setState({ tableData: newTableRow, newItem, tableUpdate: false, newRow: true });
    }
    tableUpdate = () => {
        this.setState({ tableUpdate: true })
    }
    render() {
        const { name, locate, config, deleteAction, addAction } = this.props;
        const { tableData, columnSelect, newRow } = this.state;
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
                        editAction={this.editAction}
                        tableFunctions={this.tableFunctions}
                    />
                    <Body
                        config={config}
                        dataForBody={tableData}
                        locate={locate ? this.locate : null}
                        columnSelect={columnSelect}
                        editAction={this.editAction}
                        tableFunctions={this.tableFunctions}
                        tableUpdate={this.tableUpdate}
                        newRow={newRow}
                        addAction={addAction}
                        deleteAction={deleteAction}
                    />
                </table>
                <Footer>
                    <InsertRow tableUpdate={this.state.tableUpdate}
                        insertRow={this.insertRow} />
                    <DownloadButton />
                </Footer>

            </div>
        )
    }
}