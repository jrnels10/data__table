import React, { Component, useState, useRef, useEffect, createRef } from 'react'

export const Body = ({ dataForBody, findOnMap, columnSelect, editRow }) => {
    const [cellMenu, setcellMenu] = useState([null, null]);

    const editedRow = (item, value, field) => {
        let row = item;
        row[field] = value;
        editRow(row);
    }

    return <tbody >
        {dataForBody.length > 0 ? dataForBody.map((item, idx) => {
            let tdArray = [];
            Object.keys(item).forEach(function (key, keyIndex) {
                return key === 'TABLE_ID' ? null :
                    tdArray.push(<RowCell
                        key={key}
                        cell={{ columnSelect, keyIndex, idx, key, item }}
                        editRow={editRow ? editedRow : false}
                        cellMenu={cellMenu}
                        setcellMenu={setcellMenu}
                    />)
            });
            return <tr
                key={idx}
                onClick={() => findOnMap ? findOnMap(item.TABLE_ID) : null}
            >
                {tdArray.map(item => {
                    return item;
                })}
            </tr>
        }) : null}
    </tbody>
};


const RowCell = ({ cell, editRow, cellMenu, setcellMenu }) => {
    const { columnSelect, keyIndex, key, idx, item } = cell;
    const cellAction = (e, key) => {
        setcellMenu([key, idx])
        e.preventDefault()
    }
    return <td
        className={`custom-cell-width column__select--${columnSelect === keyIndex}`}
        // onClick={() => setrowMenu(idx)}
        onContextMenu={e => cellAction(e, key)}
        key={key}
    >
        {editRow !== false & cellMenu[0] === key & cellMenu[1] === idx ?
            <CellEdit item={item} field={key} setcellMenu={setcellMenu} editRow={editRow} /> :
            item[key]
        }
    </td>
}



class CellEdit extends Component {
    EditCell = createRef();
    state = { value: this.props.item[this.props.field] }

    componentDidMount() {
        this.EditCell.current.focus();
    };

    keyPress = (e) => {
        if (e.keyCode == 13) {
            this.props.editRow(this.props.item, this.state.value, this.props.field)
            this.props.setcellMenu([null, null]);
        }
        else if (e.keyCode == 27) {
            this.props.setcellMenu([null, null]);
        }
    };

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    };

    render() {
        return <input ref={this.EditCell} value={this.state.value} onKeyDown={this.keyPress} onChange={this.handleChange} />
    }
}


