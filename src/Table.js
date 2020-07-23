import React, { Component } from 'react'
import { TableFunctions } from './TableV2/TableFunctions';
import './Table.css';
import { Headers } from './TableV2/components/Header';
import { Body } from './TableV2/components/Body/Body';
import Footer, { FooterButton } from './TableV2/components/Footer/Footer';
import { PencilSquare, TrashCan, GeoLocate, Download, Insert } from './TableV2/components/Images/IconsSVG';

export default class Table extends Component {
    state = {
        tableActive: 0,
        tabCount: []
    }
    setTabCount = (tabCounts) => {
        this.setState({ tabCount: [...tabCounts] })
    }
    componentDidMount() {
        let tabCount = [];
        React.Children.map(this.props.children, (child) => {
            const individualData = this.props.data.filter(item => item.tab === child.props.name)
            tabCount.push(individualData[0].tableData.length);
        })
        this.setState({ tabCount: [...tabCount] })
    };

    render() {
        if (window.Cypress) {
            window.__store__ = this.state;
        }
        const { tabCount } = this.state;
        const children = React.Children.map(this.props.children, (child, idx) => {
            const individualData = this.props.data.filter(item => item.tab === child.props.name);
            return React.cloneElement(child, {
                data: individualData,
                setTabCount: this.setTabCount.bind(this),
                tabCount: tabCount,
                tabIndex: idx
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
        newItem: null,
        edit: false,
        add: false,
        selectedRows: []
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.tabCount.length > 0) {

            if (prevProps.tabCount[prevProps.tabIndex] !== this.state.tableData.length) {
                const tabCounts = this.props.tabCount;
                tabCounts[prevProps.tabIndex] = this.state.tableData.length;
                this.props.setTabCount(tabCounts);
            }
        }
    }

    selectRow = (item, rowIndex) => {
        const foundRow = this.state.selectedRows.find(row => row === rowIndex);
        if (foundRow) {
            this.setState({ selectedRows: [...this.state.selectedRows.filter(row => row !== rowIndex)] })
        } else {
            this.setState({ selectedRows: [...this.state.selectedRows, rowIndex] })
        }
    }

    editCallBack = (rowObj, cleanedObj, rowIndex) => {
        let filteredResults = this.state.tableData;
        const editRowsRemaining = this.state.selectedRows.filter(row => row !== rowIndex);
        if (cleanedObj) {
            filteredResults = this.tableFunctions.replaceRow(rowObj, rowIndex);
            this.props.editAction.editCallBack(cleanedObj);
        }
        this.setState({
            selectedRows: [...editRowsRemaining],
            edit: editRowsRemaining.length > 0,
            tableData: filteredResults,
            sorted: null
        });
    }

    addCallBack = (rowObj, cleanedObj, rowIndex) => {
        let filteredResults;
        if (cleanedObj) {
            filteredResults = this.tableFunctions.replaceRow(rowObj, rowIndex);
            this.props.addAction.addCallBack(cleanedObj);
        } else {
            filteredResults = this.tableFunctions.removeRow(0);
        }
        this.setState({
            selectedRows: [],
            add: false,
            tableData: filteredResults,
            sorted: null
        });
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

    deleteRow = () => {
        const rowsDeleted = this.state.tableData.filter((item, idx) => this.state.selectedRows.indexOf(idx) > -1);
        const rowsRemaing = this.state.tableData.filter((item, idx) => this.state.selectedRows.indexOf(idx) === -1);
        this.props.deleteAction.deleteCallBack(rowsDeleted);
        this.setState({ selectedRows: [], tableData: rowsRemaing })
    }

    insertRow = () => {
        const newTableRow = this.tableFunctions.insertRow();
        let newItem = this.tableFunctions.newObject();
        this.setState({ selectedRows: [0], add: true, tableData: newTableRow, newItem, tableUpdate: false });
    }
    tableUpdate = () => {
        this.setState({ tableUpdate: true })
    }

    findOnMap() {
        let tableItems = [];
        this.state.tableData.filter((item, idx) => {
            if (this.state.selectedRows.indexOf(idx) > -1) {
                return tableItems.push(item.TABLE_ID);
            }
        });
        const geoData = this.tableFunctions.data.tableGeometry.filter(item => tableItems.indexOf(item.TABLE_ID) > -1);
        this.props.locate(geoData)
    }
    render() {
        const { name, config } = this.props;
        const { tableData, columnSelect, selectedRows, edit, add } = this.state;
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
                        fields={this.data.tableFields}
                        editCallBack={this.editCallBack.bind(this)}
                        addCallBack={this.addCallBack.bind(this)}
                        columnSelect={columnSelect}
                        edit={edit}
                        add={add}
                        tableFunctions={this.tableFunctions}
                        selectRow={this.selectRow}
                        selectedRows={selectedRows}
                    />
                </table>
                <Footer selectedRows={selectedRows}>
                    <FooterButton name='Insert' initial={add} set={this.insertRow} disable={true}>
                        <Insert color='#253255' />
                    </FooterButton>
                    <FooterButton name='Edit' initial={edit} set={selectedRows.length > 0 ? () => this.setState({ edit: !this.state.edit }) : null} disable={false}>
                        <PencilSquare color='#253255' />
                    </FooterButton>
                    <FooterButton name='Delete' initial={false} set={this.deleteRow} disable={false}>
                        <TrashCan color='#253255' />
                    </FooterButton>
                    <FooterButton name='Locate' initial={false} set={() => this.findOnMap()} disable={false}>
                        <GeoLocate color='#253255' />
                    </FooterButton>
                    <FooterButton name='Download' initial={false} set={() => null} disable={false}>
                        <Download color='#253255' />
                    </FooterButton>
                </Footer>
            </div>
        )
    }
}