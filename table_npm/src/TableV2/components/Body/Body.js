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
            const cleanedObj = this.props.tableFunctions.selectRowValues();
            this.props.editCallBack(cleanedObj, rowIndex);
        }
        else {
            this.props.editCallBack({ rowObj: null, cleanedObj: null }, rowIndex)
        }
    }

    setSaveAdd = (approved, rowIndex) => {
        if (approved) {
            const cleanedObj = this.props.tableFunctions.selectRowValues();
            this.props.addCallBack(cleanedObj, rowIndex);
        }
        else {
            this.props.addCallBack({ rowObj: null, cleanedObj: null }, rowIndex);
        }
    }

    render() {
        const { dataForBody, columnSelect, selectRow, fields, edit, selectedRows, tableFunctions, add, tableUpdate, config, selectActive } = this.props;
        return <tbody>
            {dataForBody.length > 0 ? dataForBody.map((item, idx) => {
                const editRows = edit ? selectedRows.filter(selected => selected === idx) : false;
                const addRows = add ? selectedRows.filter(selected => selected === idx) : false;
                if (item === null) {
                    debugger
                }
                return <TableBodyRow
                    key={idx}
                    keyItem={idx}
                    item={item}
                    fields={fields}
                    columnSelect={columnSelect}
                    rowSelected={selectedRows.find(selected => selected === idx)}
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
                                : field.title === 'Options' && selectActive ?
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