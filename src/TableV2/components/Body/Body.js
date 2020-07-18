import React, { Component, useState, useRef, useEffect, createRef } from 'react'
import { TableFunctions } from '../../TableFunctions';
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
        const { dataForBody, findOnMap, columnSelect, editRow } = this.props;
        return <tbody>
            {dataForBody.length > 0 ? dataForBody.map((item, idx) => {
                return <TableBodyRow editRow={editRow} key={idx} keyItem={idx} item={item} findOnMap={findOnMap} props={this.props} />
            }) : null}
        </tbody>
    }
}