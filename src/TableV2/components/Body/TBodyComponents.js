import React, { Component, createRef } from "react";
import { Gear, Delete, Check } from "../Images/IconsSVG";

// ==============================================
//  ============    Table Row    ===============
// ==============================================
export class TableBodyRow extends Component {
    constructor(props) {
        super(props);
        this.item = props.item;
        this.findOnMap = props.findOnMap;
        // this.edit = props.editRow.edit;

        this.state = {
            option: null,
            row: null
        }
    }
    optionsRow = (option, row) => {
        if (this.state.option === option & this.state.row === row) {
            this.setState({ option: null, row: null });
        } else {
            this.setState({ option, row })
        }
    }

    editedRow = (item, value, field) => {
        let row = item;
        row[field] = value;
        this.props.editRow.editCallBack(row);
    }

    discard = (row) => {
        this.setState({ discard: row })
    }
    render() {
        const { keyItem, item, columnSelect, editRow, findOnMap } = this.props;
        const { row } = this.state;
        let fields = [];
        Object.keys(this.props.item).forEach(function (key, keyIndex) {
            fields.push(key);
        });
        return <tr
            className={`body__row body__row--${this.state.row === this.props.keyItem ? 'active' : 'default'}`}
        // onClick={() => findOnMap ? findOnMap(item.TABLE_ID) : null}
        >
            {fields.map(field => {
                return field === 'Options' ?
                    <TableBodyCellOptions
                        key={field}
                        field={field}
                        index={keyItem}
                        fieldIndex={fields.indexOf(field)}
                        optionsRow={this.optionsRow.bind(this)}
                        update={() => this.setState({ update: !this.state.update })}
                        columnSelect={columnSelect}
                    /> :
                    editRow.edit ?
                        <TableBodyCellEdit key={field} index={keyItem} row={row} field={field} item={item} update={this.state.update} fieldIndex={fields.indexOf(field)} columnSelect={columnSelect} editedRow={this.editedRow.bind(this)} /> :
                        <TableBodyCell key={field} field={field} fieldIndex={fields.indexOf(field)} columnSelect={columnSelect} />
            })}
        </tr>
    }
}

// ==============================================
//  ============    Table Cell    ===============
// ==============================================

export class TableBodyCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnSelect: null
        }
    }

    render() {
        const { item, field } = this.props;
        const columnSelect = this.props.fieldIndex === this.props.columnSelect;
        return <td
            className={`custom-cell-width column__select--${columnSelect}`}
        >{item[field]}</td>
    }
}


// ==============================================
//  =======   Table Cell Options   ============
// ==============================================
export class TableBodyCellOptions extends TableBodyCell {
    constructor(props) {
        super(props);
        this.state = { active: false }
        // console.log(this.state.value)
    }
    options = () => {
        this.props.optionsRow('Edit', this.props.index);
        this.setState({ active: !this.state.active });
    }

    render() {
        // const { item, field } = this.props;
        const columnSelect = this.props.fieldIndex === this.props.columnSelect;
        return <td
            className={`custom-option-width column__select--${columnSelect}`}
            onClick={this.options.bind(this)}
        >{this.state.active ?
            <React.Fragment>
                <div
                    className="cell__options cell__options--save"
                ><Check /></div>
                <div
                    className="cell__options cell__options--discard"
                >Discard</div>
            </React.Fragment>
            : <Gear color={'#3d5188'} />}</td>
    }
}


// ==============================================
//  =======   Table Cell Edit   ============
// ==============================================
export class TableBodyCellEdit extends TableBodyCell {

    render() {
        const { item, row, field, index, update, fieldIndex } = this.props;
        const columnSelect = this.props.fieldIndex === this.props.columnSelect;
        console.log(index, row)
        return <td
            className={`custom-cell-width column__select--${columnSelect}`}
        >{index === row ? <CellEdit fieldIndex={fieldIndex} item={item} field={field} editedRow={this.props.editedRow} /> :
            item[field]}</td>

    }
}


// ==============================================
//  =======   Cell Edit   ============
// ==============================================

class CellEdit extends Component {
    EditCell = createRef();
    state = {
        originalValue: this.props.item[this.props.field] === null ? '' : this.props.item[this.props.field],
        value: this.props.item[this.props.field] === null ? '' : this.props.item[this.props.field]
    }

    componentDidMount() {
        return this.props.fieldIndex === 1 ? this.EditCell.current.focus() : null;
    };

    // keyPress = (e) => {
    //     if (e.keyCode == 13 || e.keyCode == 9) {
    //         // this.props.editRow(this.props.item, this.state.value, this.props.field)
    //         // this.props.setcellMenu([null, null]);
    //     }
    //     else if (e.keyCode == 27) {
    //         // this.props.setcellMenu([null, null]);
    //     }
    // };
    componentWillUpdate() {
        if (this.state.value !== this.props.item[this.props.field] && this.props.item[this.props.field] !== null) {
            this.props.editedRow(this.props.item, this.state.value, this.props.field)
        }

    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    };

    render() {
        return <input ref={this.EditCell} value={this.state.value} onKeyDown={this.keyPress} onChange={this.handleChange} />
    }
}