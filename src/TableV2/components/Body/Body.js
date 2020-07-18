import React, { Component, useState, useRef, useEffect, createRef } from 'react'
import { TableFunctions } from '../../TableFunctions';
import { TableBodyCell, TableBodyRow, TableBodyCellEdit, TableBodyCellOptions } from './TBodyComponents';

import './Body.css';

export class Body extends Component {
    state = {
        cellMenu: [null, null],
        rows: [],
        updated: false
    }
    editedRow = (item, value, field) => {
        let row = item;
        row[field] = value;
        this.props.editRow.editCallBack(row);
    }


    render() {
        const { dataForBody, findOnMap, columnSelect, editRow } = this.props;
        return <tbody>
            {dataForBody.length > 0 ? dataForBody.map((item, idx) => {
                // console.log(dataForBody)
                let fields = [];
                Object.keys(item).forEach(function (key, keyIndex) {
                    fields.push(key);
                });
                return <TableBodyRow editRow={editRow} key={idx} keyItem={idx} item={item} findOnMap={findOnMap}>
                    {/* {fields.map(field => <TableBodyCell field={field} fieldIndex={fields.indexOf(field)} columnSelect={columnSelect} />)} */}
                    {fields.map(field => {
                        return field === 'Options' ?
                            <TableBodyCellOptions key={field} field={field} fieldIndex={fields.indexOf(field)} columnSelect={columnSelect} /> :
                            editRow.edit ?
                                <TableBodyCellEdit key={field} field={field} fieldIndex={fields.indexOf(field)} columnSelect={columnSelect} editedRow={this.editedRow.bind(this)} /> :
                                <TableBodyCell key={field} field={field} fieldIndex={fields.indexOf(field)} columnSelect={columnSelect} />
                    })}
                </TableBodyRow>
            }) : null}
        </tbody>
    }
}