import React, { Component } from 'react';
import { TableBodyCell, TableBodyRow, TableBodyCellEdit, TableBodyCellOptions, NewTableBodyRow, NewTableBodyCell, SaveOrDiscard, CellEdit } from './TBodyComponents';

import './Body.css';

export class Body extends Component {
    state = {
        cellMenu: [null, null],
        rows: [],
        update: false,
        discard: false,
    }

    setSaveEdits = (approved, rowIndex) => {
        if (approved) {
            const table = document.getElementsByClassName('table')[0]
            let rowObj = this.props.tableFunctions.newObject();
            let dataRes = table.children[1].children[rowIndex].children;
            for (let i = 0; i < dataRes.length; i++) {
                rowObj[this.props.fields[i].title] = dataRes[i].firstChild.value
            }
            const cleanedObj = this.props.tableFunctions.rowDataCleanUp(rowObj);
            this.props.editCallBack(rowObj, cleanedObj, rowIndex);
        }
        else {
            this.props.editCallBack(null, null, rowIndex)
        }
    }

    setSaveAdd = (approved, rowIndex) => {
        if (approved) {
            const table = document.getElementsByClassName('table')[0]
            let rowObj = this.props.tableFunctions.newObject();
            let dataRes = table.children[1].children[rowIndex].children;
            for (let i = 0; i < dataRes.length; i++) {
                rowObj[this.props.fields[i].title] = dataRes[i].firstChild.value
            }
            const cleanedObj = this.props.tableFunctions.rowDataCleanUp(rowObj);
            this.props.addCallBack(rowObj, cleanedObj, rowIndex);
        }
        else {
            this.props.addCallBack(null, null, rowIndex);
        }
    }

    render() {
        const { dataForBody, columnSelect, selectRow, fields, edit, selectedRows, tableFunctions, add, tableUpdate, config, deleteAction } = this.props;
        return <tbody>
            {dataForBody.length > 0 ? dataForBody.map((item, idx) => {
                const editRows = edit ? selectedRows.filter(selected => selected === idx) : false;
                const addRows = add ? selectedRows.filter(selected => selected === idx) : false;
                console.log(item)
                if (item === null) {
                    debugger
                }
                return <TableBodyRow
                    key={idx}
                    keyItem={idx}
                    item={item}
                    fields={fields}
                    columnSelect={columnSelect}
                    rowSelected={false}
                >
                    {fields.map(field => {
                        return editRows.length > 0 ?
                            field.title === 'Options' ?
                                <SaveOrDiscard
                                    key={field.title}
                                    rowIndex={idx}
                                    setSave={this.setSaveEdits.bind(this)} /> :
                                <CellEdit key={field.title}
                                    field={field.title}
                                    config={config}
                                    fieldIndex={fields.indexOf(field)} />
                            : addRows.length > 0 ?
                                field.title === 'Options' ?
                                    <SaveOrDiscard
                                        key={field.title}
                                        rowIndex={idx}
                                        setSave={this.setSaveAdd.bind(this)} /> :
                                    <CellEdit key={field.title}
                                        field={field.title}
                                        config={config}
                                        fieldIndex={fields.indexOf(field)} />
                                : field.title === 'Options' ?
                                    <TableBodyCellOptions key={field.title}
                                        field={field.title}
                                        tableId={item.TABLE_ID}
                                        fieldIndex={fields.indexOf(field)}
                                        selectRow={selectRow}
                                    /> :
                                    <TableBodyCell key={field.title}
                                        field={field.title}
                                        tableFunctions={tableFunctions}
                                        config={config}
                                        fieldIndex={fields.indexOf(field)} />
                    })}
                </TableBodyRow>
            }) : null
            }
        </tbody >
    }
}