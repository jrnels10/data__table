import React, { Component } from 'react';
import Table2, { TableTab } from './Table';
import { ESRITableObj, ADWRTableObj, ESRITableObj_Edit, ADWRTableObj_Edit } from './TableV2/TableDataBuilder';
import { loadModules } from 'esri-loader';
import wellsData from './data/wells55.json';
import adwr from './data/adwrData.json';
import aisData from './data/aisData.json';


const CustomInput = ({ customRef, value, handleChange }) => {
    return <input ref={customRef} value={value} onChange={handleChange} />
}
const CustomSelect = ({ customRef, value, handleChange }) => {
    return <select className="custom-select"
        ref={customRef}
        name="value"
        value={value}
        onChange={handleChange}>
        <option value='one'>one</option>
        <option value='two'>two</option>
        <option value='three'>three</option>
    </select>
}
const CustomOption = ({ selectRow }) => {
    return <button onClick={() => console.log(selectRow)}>Manage</button>
}
const config = {
    Options: CustomOption,
    WELL_TYPE: CustomInput,
    RGR_PUMP_DATA: CustomSelect
}
const aisDatacleaned = JSON.parse(JSON.stringify(aisData));
aisDatacleaned.filter(ais => Object.keys(ais).filter((fieldItem, idx) => {
    const excludeFields = [
        'Coordinates',
        'HasProposedWaterRightUse',
        'Latitude',
        'Longitude',
        'MapType',
        'Owner',
        'PCC',
        'Cadastral',
        'Type',
        'Shared',
        'ContactName',
        'ContactPhone',
        'PolygonJson',
    ];
    const foundField = excludeFields.indexOf(fieldItem) > -1
    if (foundField) {
        return delete ais[fieldItem]
    }
}))
export default class Scratch extends Component {
    state = { tableData: null }
    async componentDidMount() {
        const wells55 = new ESRITableObj_Edit('Wells55', wellsData, 'OBJECTID');
        const ais2 = new ADWRTableObj_Edit('AIS', aisDatacleaned)
        const ADWR = new ADWRTableObj_Edit('ADWR', adwr);
        this.setState({ tableData: [wells55, ADWR, ais2] });
    }

    locateOnMap = async (item) => {
        await this.props.value.view.goTo({ target: item }, {
            duration: 1000,
            easing: 'ease-in-out'
        });
    }
    setView = (view) => {
        this.setState({ view })
    }
    y
    editedData = (row) => {
        debugger
    };

    deleteRow = (row) => {
        debugger
    };

    addRow = (row) => {
        debugger
    };
    select = () => {
        // debugger
    }
    render() {

        return this.state.tableData ? (
            <React.Fragment>
                <div style={{ height: '40vh', width: '100%', position: 'absolute', top: '0' }}>
                    {/* <ESRImap value={value} portal={portal} setView={this.setView.bind(this)} /> */}
                </div>
                <div style={{ height: '60vh', width: '100vw', position: 'absolute', bottom: '0' }}>
                    <Table2
                        data={this.state.tableData}
                    >
                        <TableTab
                            name='Wells55'
                            config={config}
                            selectAction={{ selectCallBack: this.select }}
                            sort={true}
                            multipleSelect={false}
                            addAction={{
                                addCallBack: () => console.log("row was added to table"),
                            }}
                            editAction={{
                                editCallBack: () => console.log("row was added to table"),
                            }}
                            deleteAction={{ deleteCallBack: this.deleteRow }}
                        />
                        <TableTab
                            // config={config}
                            sort={true}
                            multipleSelect={true}
                            selectAction={{
                                selectCallBack: item => console.log(`${item} was selected!`),
                            }}
                            // editAction={{
                            //     editCallBack: () => this.updateDataBase(),
                            // }}
                            // addAction={{
                            //     addCallBack: () => console.log("row was added to table"),
                            // }}
                            // deleteAction={{
                            //     deleteCallBack: () => console.log("row was deleted from table"),
                            // }}
                            name='ADWR' sort={true} />
                    </Table2>
                </div>
            </React.Fragment>
        ) : null
    }
}