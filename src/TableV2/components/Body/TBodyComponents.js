import React, { Component, createRef } from "react";
import { Gear, Discard, Check, TrashCan, GeoLocate } from "../Images/IconsSVG";

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

    returnGeometry = (item) => {
        const { TABLE_ID } = item;
        const geoLocationItem = this.props.tableFunctions.data.tableGeometry.find(geoItem => geoItem.TABLE_ID === TABLE_ID);
        this.props.locate(geoLocationItem)
    }

    selectRow = (rowIndex, item) => {
        return rowIndex === this.state.rowSelected ?
            this.setState({ rowSelected: null, rowItem: null }) :
            this.setState({ rowSelected: rowIndex, rowItem: item });
    };

    setSaveEdits = (approved) => {
        if (approved) {
            const table = document.getElementsByClassName('table')[0]
            let rowObj = this.props.tableFunctions.newObject();
            let dataRes = table.children[1].children[this.props.keyItem].children;
            for (let i = 0; i < dataRes.length; i++) {
                rowObj[this.props.fields[i]] = dataRes[i].firstChild.value
            }
            this.props.tableFunctions.replaceRow(rowObj, this.props.keyItem);
            const cleanedObj = this.props.tableFunctions.rowDataCleanUp(rowObj);
            if (this.props.newRow) {
                debugger
                this.props.addAction.addCallBack(cleanedObj);
            }
            else {
                this.props.editAction.editCallBack(cleanedObj);
            }
        }
        this.setState({ rowSelected: null, rowItem: null });
        this.props.tableUpdate();
    };


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.newRow !== this.props.newRow) {
            this.setState({ rowSelected: 0 })
        }
    };

    render() {
        const { keyItem, item, columnSelect, locate, deleteRow } = this.props;
        const children = React.Children.map(this.props.children, (child, idx) => {
            return React.cloneElement(child, {
                locate: idx === 0 && locate ? this.returnGeometry : null,
                item: item,
                setSaveEdits: idx === 0 ? this.setSaveEdits : null,
                deleteRow: idx === 0 ? deleteRow : null,
                selectRow: idx === 0 ? () => this.selectRow(keyItem, item) : null,
                rowSelected: this.state.rowSelected === keyItem,
                columnSelect: columnSelect,
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

export const SaveOrDiscard = ({ setSaveEdits }) => {
    console.log(setSaveEdits)
    return <div className='cell__options__saveordiscard'>
        <div
            className="cell__options cell__options--save"
            onClick={() => setSaveEdits(true)}
        ><Check color='#28a745' /></div>
        <div
            className="cell__options cell__options--discard"
            onClick={() => setSaveEdits(false)}
        ><Discard color='#dc3545' /></div>
    </div>
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
        this.props.selectRow();
    }

    render() {
        const { rowSelected, setSaveEdits, locate, item, deleteRow, edit, deleteAction, geo } = this.props;
        const columnSelect = this.props.fieldIndex === this.props.columnSelect;
        return <td
            className={`custom-option-width column__select--${columnSelect}`}
        >{rowSelected && edit ?
            <SaveOrDiscard setSaveEdits={setSaveEdits} />
            : <div className='cell__options__actions'>
                {edit ? <div className='cell__options__edit' onClick={this.options.bind(this)}>
                    <Gear color={'#3d5188'} />
                </div> : null}
                {deleteAction ? <div className='cell__options__delete' onClick={() => deleteRow(item)}>
                    <TrashCan color='#940c0f' />
                </div> : null}
                {
                    geo ? <div className='cell__options__delete' onClick={() => locate(item)}>
                        <GeoLocate color='#fda402' />
                    </div> : null
                }
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
        return config && config.custom ?
            <config.custom customRef={this.EditCell} value={this.state.value} handleChange={this.handleChange} /> :
            config && config.type === 'select' ?
                <select className="custom-select"
                    name="value"
                    value={this.state.value}
                    multiple={config.multiple ? config.multiple : false}
                    required={config.required ? config.required : false}
                    size={config.size ? config.size : null}
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


export class NewTableBodyRow extends Component {
    setSaveEdits = (approved) => {
        if (approved) {
            const table = document.getElementsByClassName('table')[0]
            let rowObj = this.props.tableFunctions.newObject();
            let dataRes = table.children[1].children[this.props.keyItem].children;
            for (let i = 0; i < dataRes.length; i++) {
                rowObj[this.props.fields[i]] = dataRes[i].firstChild.value
            }
            this.props.tableFunctions.replaceRow(rowObj, this.props.keyItem);
            const cleanedObj = this.props.tableFunctions.rowDataCleanUp(rowObj);
            this.props.addAction.addCallBack(cleanedObj);
        }
        this.setState({ rowSelected: null, rowItem: null });
        this.props.tableUpdate();
    };
    render() {
        const children = React.Children.map(this.props.children, (child, idx) => {
            return React.cloneElement(child, {
                setSaveEdits: idx === 0 ? this.setSaveEdits : null,
            })
        });
        return <tr className={`body__row body__row--active`} >
            {children}
        </tr >
    }
}

export class NewTableBodyCell extends Component {
    config = this.props.config ? this.props.config : null;
    NewCell = createRef();
    state = {
        originalValue: '',
        value: ''
    }

    componentDidMount() {
        return this.props.fieldIndex === 1 ? this.NewCell.current.focus() : null;
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
        const { field } = this.props;
        const config = this.config[field];
        return <td
            className={`custom-cell-width column__select--false`}
        >
            {config && config.custom ?
                <config.custom customRef={this.NewCell} value={this.state.value} handleChange={this.handleChange} /> :
                config && config.type === 'select' ?
                    <select className="custom-select"
                        name="value"
                        value={this.state.value}
                        multiple={config.multiple ? config.multiple : false}
                        required={config.required ? config.required : false}
                        size={config.size ? config.size : null}
                        onChange={this.handleChange.bind(this)}>
                        {config.values.map((item) => {
                            return <option key={item}>{item}</option>
                        })}
                    </select> :
                    config && config.type === 'input' ?
                        <input type={config.inputType} ref={this.EditCell} value={this.state.value} onChange={this.handleChange} /> :
                        <input ref={this.NewCell} value={this.state.value} onChange={this.handleChange} />
            }
        </td>
    }
};