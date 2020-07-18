import React, { Component, createRef } from "react";

// ==============================================
//  ============    Table Row    ===============
// ==============================================
export class TableBodyRow extends Component {
    constructor(props) {
        super(props);
        this.item = props.item;
        this.findOnMap = props.findOnMap;
        this.edit = props.editRow.edit;

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
    render() {
        const childCell = React.Children.map(this.props.children, (child, idx) => {
            return React.cloneElement(child, {
                index: this.props.keyItem,
                item: this.props.item,
                optionsRow: this.optionsRow,
                option: this.state.option,
                row: this.state.row
                // value: this.props.value,
                // portal: this.props.portal
            })
        });
        return <tr
            className={`body__row body__row--${this.state.row === this.props.keyItem ? 'active' : 'default'}`}
        // onClick={() => findOnMap ? findOnMap(item.TABLE_ID) : null}
        >
            {childCell}
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
        this.setState({ active: !this.state.active })
    }
    render() {
        const { item, field } = this.props;
        const columnSelect = this.props.fieldIndex === this.props.columnSelect;
        return <td
            className={`custom-cell-width column__select--${columnSelect}`}
            onClick={this.options.bind(this)}
        >{this.state.active ? 'Save Edits' : item[field]}</td>
    }
}


// ==============================================
//  =======   Table Cell Edit   ============
// ==============================================
export class TableBodyCellEdit extends TableBodyCell {

    render() {
        const { item, row, field, index, fieldIndex } = this.props;
        const columnSelect = this.props.fieldIndex === this.props.columnSelect;
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
    state = { value: this.props.item[this.props.field] === null ? '' : this.props.item[this.props.field] }

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
    componentWillUnmount() {
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