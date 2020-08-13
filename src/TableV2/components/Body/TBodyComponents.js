import React, { Component, createRef } from "react";
import { Discard, Check, Square, CheckedSquare, TrashCan, Disk } from "../Images/IconsSVG";

// ==============================================
//  ============    Table Row    ===============
// ==============================================
export class TableBodyRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rowSelected: null
        }
    }

    render() {
        const { keyItem, item, columnSelect, rowSelected } = this.props;
        // console.log(rowSelected)
        const children = React.Children.map(this.props.children, (child, idx) => {
            return React.cloneElement(child, {
                item: item,
                columnSelect: columnSelect,
                keyItem: keyItem
            })
        });
        return <tr className={`body__row body__row--${rowSelected ? 'active' : 'default'}`} onClick={e => e.stopPropagation()}>
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
        const columnSelected = this.props.fieldIndex === this.props.columnSelect;

        return <td
            className={`custom-cell-width column__select--${columnSelected}`}
        >{item[field]}</td>
    }
}

export const SaveOrDiscard = ({ setSave, rowIndex, deleteCallBack }) => {
    return <td >
        <div className='cell__options__saveordiscard'>
            <div
                className="cell__options cell__options--save"
                onClick={() => setSave(true, rowIndex)}
            >
                <Disk color='#28a745' />
            </div>
            <div
                className="cell__options cell__options--discard"
                onClick={() => setSave(false, rowIndex)}
            >
                <Discard color='#f8961eff' />
            </div>
            <div
                className="cell__options cell__options--delete"
                onClick={() => deleteCallBack(rowIndex)}
            >
                <TrashCan color='#f94144ff' />
            </div>
        </div>
    </td>
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
        const { keyItem, item } = this.props;
        this.setState({ active: !this.state.active });
        this.props.selectRow(item, keyItem);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tableId !== this.props.tableId) {
            this.setState({ active: false })
        }
    }
    render() {
        const { active } = this.state;
        const { multipleSelected, selectedRows, keyItem, config, item } = this.props;
        const disableSelect = multipleSelected === false ? 'disable' : 'active';
        const unCheck = multipleSelected === false && selectedRows.indexOf(keyItem) > -1;
        const CustomOptComp = config && config['Options'] ? config['Options'] : null;
        return <td
            className={`custom-option-width column__select--${false}`}
        >
            <div
                className={`cell__options__actions cell__options__actions--${disableSelect}`}
                onClick={multipleSelected === false && unCheck === false ? null : this.options}>
                {CustomOptComp ?
                    <CustomOptComp selectRow={item} /> :
                    !active ? <Square color={'#3d5188'} /> : <Check color={'#28a745'} />}
            </div>
        </td>
    }
}




// ==============================================
//  =======   Cell Edit   ============
// ==============================================

export class CellEdit extends Component {
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
            // this.props.setCellValue(this.state.value);

        }
    }
    handleChange = (e) => {
        this.setState({ value: e.target.value });
    };

    render() {
        const { config, } = this;
        const columnSelected = this.props.fieldIndex === this.props.columnSelect;
        const CustomComp = config && config[this.props.field] ? config[this.props.field] : null;

        return <td
            className={`custom-option-width column__select--${columnSelected} cell__edit cell__edit--${this.props.columnSelect}`}
        >
            {CustomComp ? <CustomComp customRef={this.EditCell} value={this.state.value} handleChange={this.handleChange} /> : <input ref={this.EditCell} value={this.state.value} onChange={this.handleChange} />}
        </td>
    }
}