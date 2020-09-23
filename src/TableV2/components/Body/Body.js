import React, { Component } from 'react';
import { TableBodyCell, TableBodyRow, TableBodyCellEdit, TableBodyCellOptions, NewTableBodyRow, NewTableBodyCell, SaveOrDiscard, CellEdit } from './TBodyComponents';

import './Body.css';

export class Body extends Component {

    setSave = (approved, rowIndex) => {
        const { rowAction } = this.props;
        if (approved) {
            const cleanedObj = this.props.tableFunctions.selectRowValues();
            rowAction(cleanedObj, rowIndex);
        }
        else {
            rowAction({ rowObj: null, cleanedObj: null }, rowIndex);
        }
    };

    render() {
        const { dataForBody, columnSelect, selectRow, fields, selectedRows, tableFunctions, rowAction, config, deleteCallBack, multipleSelect } = this.props;
        // console.log(config)
        return <tbody>
            {dataForBody.length > 0 ? dataForBody.map((item, idx) => {
                const actionRow = rowAction ? selectedRows.filter(selected => selected === idx) : false;
                const tableFields = fields.filter(field => field.title !== 'Options');
                return <TableBodyRow
                    key={idx}
                    keyItem={idx}
                    item={item}
                    fields={fields}
                    columnSelect={columnSelect}
                    rowSelected={selectedRows.find(selected => selected === idx)}
                >
                    {
                        actionRow.length ?
                            <SaveOrDiscard
                                key={fields[0].title}
                                rowIndex={idx}
                                deleteCallBack={deleteCallBack}
                                setSave={this.setSave.bind(this)} /> :
                            <TableBodyCellOptions key={fields[0].title}
                                config={config}
                                field={fields[0].title}
                                tableId={item.TABLE_ID}
                                multipleSelect={multipleSelect}
                                fieldIndex={fields.indexOf(fields[0])}
                                selectRow={selectRow}
                                selectedRows={selectedRows}
                            />
                    }

                    {tableFields.map(field => {
                        return actionRow.length ?
                            <CellEdit key={field.title}
                                field={field.title}
                                config={config}
                                fieldIndex={fields.indexOf(field)} /> :
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