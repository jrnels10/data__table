import React, { Component } from 'react';
import Table2, { TableTab } from './Table';
import { ESRITableObj, ADWRTableObj, ESRITableObj_Edit, ADWRTableObj_Edit } from './TableV2/TableDataBuilder';
import { loadModules } from 'esri-loader';
import axios from 'axios';

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

async function getPlaceofUse(id = '') {
    console.log(`POU: ${id} called from db`)
    return axios.get(`http://localhost:64403/adj/getpou/${id}`).catch((error) => { });
};

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
        const pou = await getPlaceofUse();
        const ais = new ADWRTableObj_Edit('AIS test', pou.data)
        const ais2 = new ADWRTableObj_Edit('AIS test2', aisDatacleaned)
        this.setState({ tableData: [ais2, [], []] });
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
        this.setState({ selectedRows: [...this.state.selectedRows, item] })
    }
    updateData = () => {
        debugger
        const newData = aisDatacleaned.filter((item, idx) => idx < aisDatacleaned.length - 3);
        const ais2 = new ADWRTableObj_Edit('AIS test', newData);
        this.setState({ tableData: [ais2] });

    }
    queryData = async (tableIndex) => {
        if (tableIndex == 1) {
            const pou = await getPlaceofUse();
            const ais = new ADWRTableObj_Edit('AIS test', pou.data);
            const tableData = [...this.state.tableData];
            tableData.splice(tableIndex, 0, ais)
            this.setState({ tableData });
        }
    }
    render() {
        console.log(this.state.tableData)
        return this.state.tableData ? (
            <React.Fragment>
                <div style={{ height: '40vh', width: '100%', position: 'absolute', top: '0' }}>
                    <button onClick={() => this.updateData()}>deleteOne</button>
                </div>
                <div style={{ height: '60vh', width: '100vw', position: 'absolute', bottom: '0' }}>
                    <Table2
                        newTabSelected={table => this.queryData(table)}
                        data={this.state.tableData}
                        loader='loader'
                    >

                        <TableTab
                            config={config}
                            sort={true}
                            multipleSelect={true}
                            // selectedRows={this.state.selectedRows}
                            selectAction={{
                                selectCallBack: item => console.log(item),
                            }}
                            name='AIS test2' sort={true} />
                        <TableTab
                            data={this.state.tableData[1]}
                            config={config}
                            sort={true}
                            multipleSelect={true}
                            selectAction={{
                                selectCallBack: item => console.log(item),
                            }}
                            name='AIS test' sort={true} />
                        <TableTab
                            data={this.state.tableData[2]}
                            config={config}
                            sort={true}
                            multipleSelect={true}
                            selectAction={{
                                selectCallBack: item => console.log(item),
                            }}
                            name='ADWR' sort={true} />
                    </Table2>
                </div>
            </React.Fragment>
        ) : null
    }
}