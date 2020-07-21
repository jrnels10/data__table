import React, { Component } from 'react';
import { TableBodyCell, TableBodyRow, TableBodyCellEdit, TableBodyCellOptions } from './TBodyComponents';

import './Body.css';

export class Body extends Component {
    state = {
        cellMenu: [null, null],
        rows: [],
        update: false,
        discard: null
    }
    tableUpdate = () => {
        this.setState({ tableUpdate: true })
    }
    render() {
        const { dataForBody, columnSelect, editAction, findOnMap, tableFunctions, newRow, value, portal, config } = this.props;
        return <tbody>
            {dataForBody.length > 0 ? dataForBody.map((item, idx) => {
                let fields = [];
                Object.keys(item).forEach(function (key) {
                    fields.push(key);
                });
                return <TableBodyRow
                    key={idx}
                    keyItem={idx}
                    item={item}
                    fields={fields}
                    columnSelect={columnSelect}
                    findOnMap={findOnMap}
                    newRow={newRow}
                    value={value}
                    editAction={editAction}
                    tableFunctions={tableFunctions}
                    tableUpdate={this.tableUpdate}
                    portal={portal}>
                    {fields.map(field => {
                        return field === 'Options' ?
                            <TableBodyCellOptions key={field}
                                field={field}
                                fieldIndex={fields.indexOf(field)} /> :
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