import React, { Component } from 'react'
import { TableFunctions2 } from './TableV2/TableFunctions';
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
    // tableFunctions = new TableFunctions(this.data);
    TableFunctions2 = new TableFunctions2(this.data)

    state = {
        tableData: this.TableFunctions2.pageinatedData,
        newRow: false,
        newItem: null,
        edit: false,
        add: false,
        selectedRows: [],
        currentPage: 0,
        numberPerPage: 50,
        pages: []
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.tabCount.length > 0) {
            if (prevProps.tabCount[prevProps.tabIndex] !== this.TableFunctions2.recordCount) {
                const tabCounts = this.props.tabCount;
                tabCounts[prevProps.tabIndex] = this.TableFunctions2.recordCount;
                this.props.setTabCount(tabCounts);
            } else if (prevState.numberPerPage !== this.state.numberPerPage) {
                const data = []
                this.state.tableData.map(page => page.map(item => data.push(item)));
                const pages = this.TableFunctions2.pageinate(this.state.numberPerPage, data);
                this.setState({ pages, tableData: pages });
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
            updatedTableData = this.TableFunctions2.replaceRow(rowObj, rowIndex);
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
            updatedTableData = this.TableFunctions2.replaceRow(rowObj, rowIndex);
            this.props.addAction.addCallBack(cleanedObj);
        } else {
            updatedTableData = this.TableFunctions2.removeRow(0);
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
            const reversed = tableData.map(page => page.reverse());
            sortedData = reversed.reverse();
        } else {
            sortedData = await this.TableFunctions2.sortData(columnName);
        }
        this.setState({ tableData: sortedData, sorted: columnName, numberPerPage: 0 });
    };

    filterData = (term, field, fieldType, filterParams) => {
        const filteredResults = this.TableFunctions2.filter(term, field, fieldType, filterParams, this.state.numberPerPage);
        this.setState({ tableData: filteredResults });
    };

    columnSelect = (idx) => {
        this.setState({ columnSelect: idx })
    }

    deleteRow = () => {
        const { selectedRows } = this.state;
        const updatedTable = this.TableFunctions2.removeRow(selectedRows[0])
        this.props.deleteAction.deleteCallBack(selectedRows[0]);
        this.setState({
            selectedRows: [],
            tableData: updatedTable,
            newRow: false,
            newItem: null,
            edit: false,
            add: false,
            selectedRows: []
        })
    }

    insertRow = () => {
        const newTableRow = this.TableFunctions2.insertRow();
        this.setState({ selectedRows: [0], add: true, tableData: newTableRow });
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
        const { tableData, columnSelect, selectedRows, edit, add, currentPage } = this.state;
        if (window.Cypress) {
            window.__tableTab__ = this.state;
        }
        return (
            <div className="table__container">
                <table className="table__custom" id={`table_${name}`}>
                    <Headers
                        sort={this.sort ? this.sortTable : null}
                        dataForHeaders={this.data.tableFields}
                        filterData={this.filterData}
                        tableData={tableData}
                        columnSelect={columnSelect}
                        setColumnSelect={this.columnSelect.bind(this)}
                        editAction={this.editAction}
                        tableFunctions={this.TableFunctions2}
                    />

                    <Body
                        config={config}
                        dataForBody={tableData[currentPage]}
                        multipleSelect={multipleSelect}
                        fields={this.data.tableFields}
                        deleteCallBack={this.deleteRow.bind(this)}
                        columnSelect={columnSelect}
                        rowAction={add && addAction ? this.addCallBack.bind(this) : editAction ? this.editCallBack.bind(this) : null}
                        tableFunctions={this.TableFunctions2}
                        selectRow={this.selectRow}
                        selectedRows={selectedRows}
                    />
                </table>
                <Footer selectedRows={selectedRows} active={add || edit}>
                    {addAction ?
                        <FooterButton name='New Record' initial={add} set={this.insertRow} disable={true} active={add || edit}>
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
                    <Pageinate currentPage={currentPage} changePage={pageNum => this.setState({ currentPage: pageNum })} pages={tableData} numberPerPage={this.state.numberPerPage} setNumberPerPage={number => this.setState({ numberPerPage: number })} />
                </Footer>
            </div>
        )
    }
}





export class ESRITableObj {
    constructor(tab, data, uniqueId) {
        this.options = false;
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
};

export class ADWRTableObj_Edit extends ADWRTableObj {
    editField = { title: 'Options', dataIndex: 'Options', key: 0 }
    constructor(tab, data) {
        super(tab, data)
        this.tab = tab;
        this.rawData = data;
        this.tableGeometry = null;
        this.tableFields = [this.editField, ...Object.keys(data[0]).map((fieldItem, idx) => {
            return { title: fieldItem, dataIndex: fieldItem, key: idx }
        })];
        this.tableData = data.map(item => Object.assign({ Options: 'Edit' }, item))
    }
};

export class ESRITableObj_Edit extends ESRITableObj {
    editField = { title: 'Options', dataIndex: 'Options', key: 0 }
    constructor(tab, data, uniqueId) {
        super(tab, data, uniqueId)
        this.options = true;
        this.tableFields = [this.editField, ...data.fields.map((field, idx) => {
            return { title: field.name, dataIndex: field.name, key: idx }
        })];
        this.tableData = data.features.map(gis => Object.assign({ Options: 'Edit' }, gis.attributes, { TABLE_ID: gis.attributes[uniqueId] }));
    }
};

