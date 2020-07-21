import React, { Component, createRef } from "react";
import { Gear, Discard, Check, TrashCan } from "../Images/IconsSVG";

// ==============================================
//  ============    Table Row    ===============
// ==============================================
export class TableBodyRow extends Component {
    constructor(props) {
        super(props);
        this.findOnMap = props.findOnMap;

        this.state = {
            option: null,
            rowSelected: null,
            saveEdits: false
        }
    }

    optionsRow = (option, rowIndex) => {
        if (this.state.option === option & this.state.rowIndex === rowIndex) {
            this.setState({ option: null, rowIndex: null });
        } else {
            this.setState({ option, rowIndex })
        }
    }


    selectRow = (rowIndex, item) => {
        return rowIndex === this.state.rowSelected ?
            this.setState({ rowSelected: null, rowItem: null }) :
            this.setState({ rowSelected: rowIndex, rowItem: item });
    };

    setSaveEdits = () => {
        this.props.value.dispatch({ type: 'NEW_ROW', newRow: false });
        this.setState({ rowSelected: null, rowItem: null, saveEdits: true });

    };

    discard = () => {
        this.props.value.dispatch({ type: 'NEW_ROW', newRow: false });
        this.setState({ rowSelected: null, rowItem: null })
    };
    componentDidUpdate() {
        if (this.state.saveEdits) {
            this.setState({ saveEdits: false })
        }
        if (this.props.value.newRow & this.state.rowSelected !== 0) {
            this.setState({ rowSelected: 0 });
            debugger
        }
    };

    render() {
        const { keyItem, item, columnSelect, value, portal } = this.props;
        const children = React.Children.map(this.props.children, (child, idx) => {
            return React.cloneElement(child, {
                value: value,
                portal: portal,
                optionsRow: idx === 0 ? this.optionsRow.bind(this) : null,
                update: () => this.setState({ update: !this.state.update }),
                item: item,
                rowIndex: keyItem,
                setSaveEdits: idx === 0 ? () => this.setSaveEdits() : null,
                discardEdits: idx === 0 ? () => this.discard() : null,
                selectRow: idx === 0 ? this.selectRow.bind(this) : null,
                rowSelected: this.state.rowSelected === keyItem,
                columnSelect: columnSelect,
                saveEdits: this.state.saveEdits
            })
        });
        return <tr className={`body__row body__row--${this.state.rowSelected === this.props.keyItem ? 'active' : 'default'}`} >
            {children}
        </tr >
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
export class TableBodyCellOptions extends Component {
    constructor(props) {
        super(props);
        this.state = { active: false }
    }
    options = () => {
        this.props.selectRow(this.props.rowIndex, this.props.item);
    }

    render() {
        const { rowSelected, discardEdits, setSaveEdits } = this.props;
        const columnSelect = this.props.fieldIndex === this.props.columnSelect;
        return <td
            className={`custom-option-width column__select--${columnSelect}`}

        >{rowSelected ?
            <div className='cell__options__saveordiscard'>
                <div
                    className="cell__options cell__options--save"
                    onClick={setSaveEdits}
                ><Check color='#28a745' /></div>
                <div
                    className="cell__options cell__options--discard"
                    onClick={discardEdits}
                ><Discard color='#dc3545' /></div>
            </div>
            : <div className='cell__options__editordelete' onClick={this.options.bind(this)}>
                <Gear color={'#3d5188'} />
                <TrashCan color='#dc3545' />
            </div>
            }
        </td>
    }
}


// ==============================================
//  =======   Table Cell Edit   ============
// ==============================================
export class TableBodyCellEdit extends TableBodyCell {
    cellValue = this.props.item[this.props.field]
    state = {
        value: this.props.item[this.props.field]
    }

    setCellValue = (value) => {
        if (this.props.saveEdits) {
            let rowObj = this.props.item;
            rowObj[this.props.field] = value;
            this.cellValue = value;
            this.props.tableFunctions.replaceRow(rowObj, this.props.rowIndex);
            const cleanedObj = this.props.tableFunctions.rowDataCleanUp(rowObj);
            this.props.editAction.editCallBack(cleanedObj);
        }
    };



    render() {
        const { item, field, rowSelected, fieldIndex } = this.props;
        const columnSelect = this.props.fieldIndex === this.props.columnSelect;
        debugger
        this.cellValue = this.props.item[this.props.field]
        return <td
            className={`custom-cell-width column__select--${columnSelect}`}
        >
            {rowSelected ? <CellEdit fieldIndex={fieldIndex} item={item} field={field} setCellValue={this.setCellValue.bind(this)} /> :
                this.cellValue}
        </td>

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

    componentWillUnmount() {
        if (this.state.value !== this.state.originalValue) {
            this.props.setCellValue(this.state.value);

        }
    }
    handleChange = (e) => {
        this.setState({ value: e.target.value });
    };

    render() {
        return <input ref={this.EditCell} value={this.state.value} onChange={this.handleChange} />
    }
}