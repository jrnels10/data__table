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
    editsValue = (cellField, cellValue) => {

        // let rowObj = this.props.item;
        // rowObj[cellField] = cellValue;
        // this.props.tableFunctions.replaceRow(rowObj, this.props.keyItem);
        // const cleanedObj = this.props.tableFunctions.rowDataCleanUp(rowObj);
        // this.props.editAction.editCallBack(cleanedObj);
    }

    selectRow = (rowIndex, item) => {
        return rowIndex === this.state.rowSelected ?
            this.setState({ rowSelected: null, rowItem: null }) :
            this.setState({ rowSelected: rowIndex, rowItem: item });
    };

    setSaveEdits = () => {
        const table = document.getElementsByClassName('table')[0]
        let rowObj = this.props.tableFunctions.newObject();
        let dataRes = table.children[1].getElementsByTagName("input");
        for (let i = 0; i < dataRes.length; i++) {
            rowObj[this.props.fields[i + 1]] = dataRes[i].value
        }
        this.props.tableFunctions.replaceRow(rowObj, this.props.keyItem);
        const cleanedObj = this.props.tableFunctions.rowDataCleanUp(rowObj);
        this.props.editAction.editCallBack(cleanedObj);
        this.setState({ rowSelected: null, rowItem: null, saveEdits: true });
        this.props.tableUpdate()
    };

    discard = (item) => {

        this.setState({ rowSelected: null, rowItem: null })
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.newRow !== this.props.newRow) {
            this.setState({ rowSelected: 0 })
        }
        // if (this.state.saveEdits) {
        //     this.setState({ saveEdits: false })
        // }
    };

    render() {
        const { keyItem, item, columnSelect, value, portal } = this.props;
        const children = React.Children.map(this.props.children, (child, idx) => {
            return React.cloneElement(child, {
                value: value,
                portal: portal,
                optionsRow: idx === 0 ? this.optionsRow.bind(this) : null,
                item: item,
                rowIndex: keyItem,
                setSaveEdits: idx === 0 ? () => this.setSaveEdits() : null,
                discardEdits: idx === 0 ? () => this.discard() : null,
                selectRow: idx === 0 ? this.selectRow.bind(this) : null,
                rowSelected: this.state.rowSelected === keyItem,
                columnSelect: columnSelect,
                saveEdits: this.state.saveEdits,
                editsValue: this.editsValue
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
    config = this.props.config ? this.props.config : null;
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
    delete = async () => {
        alert("Press a button!").then(res => console.log(res))
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
                    onClick={() => discardEdits(this.props.item)}
                ><Discard color='#dc3545' /></div>
            </div>
            : <div className='cell__options__editordelete'>
                <div className='cell__options__edit' onClick={this.options.bind(this)}>
                    <Gear color={'#3d5188'} />
                </div>
                <div className='cell__options__delete' onClick={this.delete.bind(this)}>
                    <TrashCan color='#dc3545' />
                </div>
            </div>
            }
        </td>
    }
}


// ==============================================
//  =======   Table Cell Edit   ============
// ==============================================
export class TableBodyCellEdit extends TableBodyCell {
    cellValue = this.props.item[this.props.field];
    config = this.props.config ? this.props.config[this.props.field] : null;
    state = {
        value: this.props.item[this.props.field],
        updatedCell: false
    }

    setCellValue = (value) => {
        this.cellValue = value;
        this.setState({ value });
    };



    render() {
        const { item, field, rowSelected, fieldIndex } = this.props;
        const columnSelect = this.props.fieldIndex === this.props.columnSelect;
        this.cellValue = this.props.item[this.props.field]
        return <td
            className={`custom-cell-width column__select--${columnSelect}`}
        >
            {rowSelected ? <CellEdit config={this.config} fieldIndex={fieldIndex} item={item} field={field} setCellValue={this.setCellValue.bind(this)} /> :
                this.cellValue}
        </td>

    }
}


// ==============================================
//  =======   Cell Edit   ============
// ==============================================

class CellEdit extends Component {
    config = this.props.config ? this.props.config : null;
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
        const { config, } = this;
        return config && config.type === 'select' ?
            <select className="custom-select"
                name="value"
                value={this.state.value}
                onChange={this.handleChange.bind(this)}>
                {config.values.map((item) => {
                    return <option key={item}>{item}</option>
                })}
            </select> :
            config && config.type === 'input' ?
                <input type={config.inputType} ref={this.EditCell} value={this.state.value} onChange={this.handleChange} /> :
                <input ref={this.EditCell} value={this.state.value} onChange={this.handleChange} />
    }
}