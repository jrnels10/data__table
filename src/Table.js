import React, { Component } from 'react'
import { TableFunctions } from './TableV2/TableFunctions';
import './Table.css';
import { Headers } from './TableV2/components/Header';
import { Body } from './TableV2/components/Body/Body';
import Footer, { FooterButton } from './TableV2/components/Footer/Footer';
import { PencilSquare, TrashCan, GeoLocate, Download, Insert, ImagedRecords, Report } from './TableV2/components/Images/IconsSVG';
import Pageinate from './TableV2/components/Footer/Pageinate';
import { ToggleButton } from './TableV2/components/Buttons/Toggle';

export default class Table extends Component {
    state = {
        tableActive: 0,
        tabCount: [],
        toggle: true,
        showTabs: !this.props.showTabs && this.props.showTabs !== undefined ? this.props.showTabs : true
    }
    setTabCount = (tabCounts) => {
        this.setState({ tabCount: [...tabCounts] })
    }
    componentDidMount() {
        let tabCount = [];
        React.Children.map(this.props.children, (child) => {
            const individualData = this.props.data.filter(item => item.tab === child.props.name)
            tabCount.push(individualData[0].tableData.length);
        });

        this.setState({ tabCount: [...tabCount] })
    };

    render() {
        if (window.Cypress) {
            window.__store__ = this.state;
        }
        const { tabCount, showTabs } = this.state;
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
                {showTabs ?
                    <React.Fragment>
                        <hr />
                        <div className='table__tabs'>
                            {children ? children.map((tab, idx) =>
                                <div className={`tab tab--${idx === this.state.tableActive ? 'active' : 'default'}`} key={idx} onClick={() => this.setState({ tableActive: idx })}>
                                    <button className={`tab__button tab__button--${idx === this.state.tableActive ? 'active' : 'default'}`}>{tab.props.name}</button>
                                    <div className='count'>{tabCount[idx]}</div>
                                </div>) : null}
                        </div>
                    </React.Fragment>
                    : null}
                {children ? children[this.state.tableActive] : null}
                <div className='toggle__container'>
                    <ToggleButton toggleState={null} toggling={() => null} />
                </div>
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
        newItem: null,
        edit: false,
        add: false,
        selectedRows: [],
        currentPage: 0,
        numberPerPage: 0,
        pages: []
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.tabCount.length > 0) {
            if (prevProps.tabCount[prevProps.tabIndex] !== this.state.tableData.length) {
                const tabCounts = this.props.tabCount;
                tabCounts[prevProps.tabIndex] = this.state.tableData.length;
                this.props.setTabCount(tabCounts);
            } else if (prevState.numberPerPage !== this.state.numberPerPage) {
                const pages = await this.tableFunctions.pageinate(this.state.numberPerPage)
                this.setState({ pages, tableData: pages[0] });
            }
        }
    }

    selectRow = (item, rowIndex) => {
        const foundRow = this.state.selectedRows.find(row => row === rowIndex);
        const { selectAction } = this.props;
        if (foundRow) { // deletes row from selected rows
            this.setState({ selectedRows: [...this.state.selectedRows.filter(row => row !== rowIndex)] })
            return selectAction ? selectAction.selectCallBack([...this.state.selectedRows.filter(row => row !== rowIndex)]) : null;
        } else { // adds row to selected rows
            this.setState({ selectedRows: [...this.state.selectedRows, rowIndex] });
            return selectAction ? selectAction.selectCallBack([...this.state.selectedRows, rowIndex]) : null;
        }
    }

    editCallBack = (objects, rowIndex) => {
        const { rowObj, cleanedObj } = objects
        let updatedTableData = this.state.tableData;;
        if (cleanedObj) {
            updatedTableData = this.tableFunctions.replaceRow(rowObj, rowIndex);
            this.props.editAction.editCallBack(cleanedObj);
        }
        this.setState({
            selectedRows: [],
            edit: false,
            tableData: updatedTableData,
            newRow: false,
            newItem: null,
            add: false,
        });
    }

    addCallBack = (objects, rowIndex) => {
        const { rowObj, cleanedObj } = objects
        let updatedTableData = this.state.tableData;;
        if (cleanedObj) {
            updatedTableData = this.tableFunctions.replaceRow(rowObj, rowIndex);
            this.props.addAction.addCallBack(cleanedObj);
        } else {
            updatedTableData = this.tableFunctions.removeRow(0);
        }
        this.setState({
            selectedRows: [],
            edit: false,
            tableData: updatedTableData,
            newRow: false,
            newItem: null,
            add: false,
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
        this.setState({ tableData: sortedData, sorted: columnName, numberPerPage: 0 });
    };

    filterData = (term, field, fieldType, filterParams) => {
        const filteredResults = this.tableFunctions.filter(term, field, fieldType, filterParams);
        this.setState({ tableData: filteredResults, numberPerPage: 0 });
    };

    columnSelect = (idx) => {
        this.setState({ columnSelect: idx })
    }

    deleteRow = () => {
        const rowsDeleted = this.state.tableData.filter((item, idx) => this.state.selectedRows.indexOf(idx) > -1);
        const rowsRemaing = this.state.tableData.filter((item, idx) => this.state.selectedRows.indexOf(idx) === -1);
        this.props.deleteAction.deleteCallBack(rowsDeleted);
        this.setState({
            selectedRows: [],
            tableData: rowsRemaing,
            newRow: false,
            newItem: null,
            edit: false,
            add: false,
            selectedRows: []
        })
    }

    insertRow = () => {
        const newTableRow = this.tableFunctions.insertRow();
        let newItem = this.tableFunctions.newObject();
        this.setState({ selectedRows: [0], add: true, tableData: newTableRow, newItem });
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
        const { name, config, editAction, addAction, deleteAction, locate, docushare, report, multipleSelect } = this.props;
        const { tableData, columnSelect, selectedRows, edit, add, currentPage, pages } = this.state;
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
                        multipleSelect={multipleSelect}
                        fields={this.data.tableFields}
                        deleteCallBack={this.deleteRow.bind(this)}
                        columnSelect={columnSelect}
                        rowAction={add && addAction ? this.addCallBack.bind(this) : editAction ? this.editCallBack.bind(this) : null}
                        tableFunctions={this.tableFunctions}
                        selectRow={this.selectRow}
                        selectedRows={selectedRows}
                    />
                </table>
                <Footer selectedRows={selectedRows} active={add || edit}>
                    {addAction ?
                        <FooterButton name='Insert' initial={add} set={this.insertRow} disable={true} active={add || edit}>
                            <Insert color='#253255' />
                        </FooterButton>
                        : null}
                    {/* {editAction ?
                        <FooterButton name='Edit' initial={edit} set={selectedRows.length > 0 ? () => this.setState({ edit: !this.state.edit }) : null} disable={false} active={add || edit}>
                            <PencilSquare color='#253255' />
                        </FooterButton>
                        : null}
                    {deleteAction ?
                        <FooterButton name='Delete' initial={false} set={selectedRows.length > 0 ? this.deleteRow : null} disable={false} active={add || edit}>
                            <TrashCan color='#253255' />
                        </FooterButton>
                        : null}
                    {locate ?
                        <FooterButton name='Locate' initial={false} set={() => this.findOnMap()} disable={false} active={add || edit}>
                            <GeoLocate color='#253255' />
                        </FooterButton>
                        : null}
                    <FooterButton name='Download' initial={false} set={() => null} disable={false} active={add || edit}>
                        <Download color='#253255' />
                    </FooterButton>
                    {docushare ?
                        <FooterButton name='Docushare' initial={false} set={() => null} disable={false} active={add || edit}>
                            <ImagedRecords color='#253255' />
                        </FooterButton>
                        : null}
                    {report ?
                        <FooterButton name='Report' initial={false} set={() => null} disable={false} active={add || edit}>
                            <Report color='#253255' />
                        </FooterButton>
                        : null} */}
                    {/* <Pageinate currentPage={currentPage} pages={pages} numberPerPage={this.state.numberPerPage} setNumberPerPage={number => this.setState({ numberPerPage: number })} /> */}
                </Footer>
            </div>
        )
    }
}