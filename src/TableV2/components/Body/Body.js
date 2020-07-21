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

    render() {
        const { dataForBody, columnSelect, editAction, findOnMap, tableFunctions, newRow, value, portal } = this.props;
        return <tbody>
            {dataForBody.length > 0 ? dataForBody.map((item, idx) => {
                let fields = [];
                Object.keys(item).forEach(function (key, keyIndex) {
                    fields.push(key);
                });
                return <TableBodyRow
                    key={idx}
                    keyItem={idx}
                    item={item}
                    columnSelect={columnSelect}
                    findOnMap={findOnMap}
                    newRow={newRow}
                    value={value}
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
                                    tableFunctions={tableFunctions}
                                    editAction={editAction}
                                /> :
                                <TableBodyCell key={field}
                                    field={field}
                                    tableFunctions={tableFunctions}
                                    fieldIndex={fields.indexOf(field)} />
                    })
                    }
                </TableBodyRow>
            }) : null}
        </tbody>
    }
}