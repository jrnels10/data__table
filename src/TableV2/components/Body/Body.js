import React, { Component } from 'react';
import { TableBodyCell, TableBodyRow, TableBodyCellEdit, TableBodyCellOptions, NewTableBodyRow, NewTableBodyCell, SaveOrDiscard } from './TBodyComponents';

import './Body.css';

export class Body extends Component {
    state = {
        cellMenu: [null, null],
        rows: [],
        update: false,
        discard: null
    }
    addNewItem = () => {
        debugger
        const table = document.getElementsByClassName('table')[0]
        let rowObj = this.props.tableFunctions.newObject();
        let dataRes = table.children[1].children[0].children;
        for (let i = 0; i < dataRes.length; i++) {
            rowObj[this.props.fields[i]] = dataRes[i].firstChild.value
        }
        const cleanedObj = this.props.tableFunctions.rowDataCleanUp(rowObj);
        this.props.addAction.addCallBack(cleanedObj)
    }
    render() {
        const { dataForBody, columnSelect, editAction, locate, newItem, addAction, tableFunctions, newRow, tableUpdate, config, deleteAction } = this.props;
        return <tbody>
            {dataForBody.length > 0 ? dataForBody.map((item, idx) => {
                let fields = [];
                Object.keys(item).forEach(function (key) {
                    fields.push(key);
                });

                // newRow && idx === 0 ?
                //     <NewTableBodyRow
                //         key={idx}
                //         fields={fields}
                //         addAction={addAction}
                //         tableFunctions={tableFunctions}
                //     >
                //         {fields.map(field => {
                //             return field === 'Options' ?
                //                 <SaveOrDiscard setSaveEdits={this.addNewItem} /> :
                //                 <NewTableBodyCell
                //                     config={config}
                //                     key={field}
                //                     field={field}
                //                     item={newItem}
                //                     fieldIndex={fields.indexOf(field)} />
                //         })
                //         }
                //     </NewTableBodyRow> :
                return <TableBodyRow
                    key={idx}
                    keyItem={idx}
                    item={item}
                    fields={fields}
                    columnSelect={columnSelect}
                    locate={locate}
                    newRow={newRow}
                    editAction={editAction}
                    addAction={addAction}
                    tableFunctions={tableFunctions}
                    tableUpdate={tableUpdate}
                    deleteAction={deleteAction}
                >
                    {fields.map(field => {
                        return field === 'Options' ?
                            <TableBodyCellOptions key={field}
                                field={field}
                                fieldIndex={fields.indexOf(field)}
                                edit={editAction}
                                deleteAction={deleteAction}
                                geo={locate}
                            /> :
                            editAction.edit ?
                                <TableBodyCellEdit key={field}
                                    field={field}
                                    fieldIndex={fields.indexOf(field)}
                                    config={config}
                                /> :
                                <TableBodyCell key={field}
                                    field={field}
                                    tableFunctions={tableFunctions}
                                    config={config}
                                    fieldIndex={fields.indexOf(field)} />
                    })
                    }
                </TableBodyRow>
            }) : null}
        </tbody>
    }
}