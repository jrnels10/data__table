import React, { Component } from 'react';
import Table2, { TableTab } from './Table';
import { ESRITableObj, ADWRTableObj, ESRITableObj_Edit, ADWRTableObj_Edit } from './TableV2/TableDataBuilder';
import { loadModules } from 'esri-loader';
// import wellsData from './data/wells55.json';
// import adwr from './data/adwrData.json';
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
    return <button onClick={() => console.log(selectRow)}>Open</button>
}
const config = {
    // Options: {
    //     header: '',
    //     body: CustomOption
    // },
    OBJECTID: {
        header: 'test',
        width: '350px'
    },
    WELL_TYPE: {
        header: 'test',
        body: CustomInput
    },
    RGR_PUMP_DATA: {
        header: 'test',
        body: CustomSelect
    },
    BASIN_NAME: {
        width: '250px'
    },
}
const aisDatacleaned = JSON.parse(JSON.stringify(aisData));
aisDatacleaned.filter(item => item).filter(ais => Object.keys(ais).filter((fieldItem, idx) => {
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


const simpleData = [
    {
        name: 'Mouse'
    },
    {
        name: 'Dog'
    },
    {
        name: 'Cat'
    },
    {
        name: 'Pig'
    },
    {
        name: 'Bear'
    }, {
        name: 'Bunny'
    }
]


export default class Scratch extends Component {
    state = { tableData: null }
    async componentDidMount() {
        // const wells55 = new ESRITableObj_Edit('Wells55', wellsData, 'OBJECTID');
        const ais2 = new ADWRTableObj_Edit('AIS test', aisDatacleaned)
        // const ADWR = new ADWRTableObj_Edit('ADWR', adwr);
        this.setState({ tableData: [] });
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
    select = (item) => {
        debugger
    }
    updateData = () => {
        debugger
        const newData = aisDatacleaned.filter((item, idx) => idx < aisDatacleaned.length - 3);
        const ais2 = new ADWRTableObj_Edit('AIS test', newData);
        this.setState({ tableData: [ais2] });

    }
    render() {
        console.log(this.state.tableData)
        return this.state.tableData ? (
            <React.Fragment>
                <div style={{ height: '40vh', width: '100%', position: 'absolute', top: '0' }}>
                    <button onClick={() => this.updateData()}>deleteOne</button>
                    {/* <ESRImap value={value} portal={portal} setView={this.setView.bind(this)} /> */}
                </div>
                <div style={{ height: '60vh', width: '100vw', position: 'absolute', bottom: '0' }}>
                    <Table2
                        data={this.state.tableData}
                    >

                        <TableTab
                            config={config}
                            sort={true}
                            multipleSelect={true}
                            selectAction={{
                                selectCallBack: item => console.log(item),
                            }}
                            name='AIS test' sort={true} />
                    </Table2>
                </div>
            </React.Fragment>
        ) : null
    }
}