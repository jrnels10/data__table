import React, { Component } from 'react';
import Table2, { TableTab } from './Table';
import { ESRITableObj, ADWRTableObj, ESRITableObj_Edit, ADWRTableObj_Edit } from './TableV2/TableDataBuilder';
import axios from 'axios';
import { loadModules } from 'esri-loader';
import ESRImap from './esri/ESRImap';
import wellsData from './data/wells55.json'
import gwsiData from './data/gwsi.json'
import adwr from './data/adwrData.json'
import cws from './data/cwsAR.json'


const CustomInput = ({ customRef, value, handleChange }) => {
    return <input ref={customRef} value={value} onChange={handleChange} />
}

const config = {
    REGISTRY_ID: {
        type: 'input',
        inputType: 'number',
        maxLength: 6,
        nullValues: false,
        validation: e => console.log(e.target.value),
        custom: CustomInput
    },
    RGR_PUMP_DATA: {
        type: 'select',
        values: ['YES', 'NO'],
        id: 'id',
        multiple: false,
        required: true,
        size: 1,
    }
}

export default class Scratch extends Component {
    state = { tableData: null }
    async componentDidMount() {
        const wells55 = new ESRITableObj_Edit('Wells55', wellsData, 'OBJECTID');
        const GWSI = new ESRITableObj_Edit('GWSI', gwsiData, 'OBJECTID');
        const ADWR = new ADWRTableObj_Edit('ADWR', adwr);
        const CWS = new ADWRTableObj_Edit('CWS', cws.ReportDetails);
        this.setState({ tableData: [wells55, GWSI, ADWR, CWS] });
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
    updateDataBase = () => {
        console.log('updated database')
    }
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
        const { value, portal } = this.props;
        return this.state.tableData ? (
            <React.Fragment>
                <div style={{ height: '40vh', width: '100%', position: 'absolute', top: '0' }}>
                    <ESRImap value={value} portal={portal} setView={this.setView.bind(this)} />
                </div>
                <div style={{ height: '60vh', width: '100vw', position: 'absolute', bottom: '0' }}>
                    <Table2
                        data={this.state.tableData}
                    >
                        {/* <TableTab
                            name='Wells55'
                            config={config}
                            selectAction={{ selectCallBack: this.select }}
                            sort={true}
                            editAction={{ edit: true, editCallBack: this.editedData }}
                            addAction={{ addCallBack: this.addRow }}
                            deleteAction={{ deleteCallBack: this.deleteRow }}
                            docushare={true}
                            report={true}
                        />
                    <TableTab name='CWS' sort={true} roundTo={2} editAction={{ edit: true, editCallBack: this.editedData }} /> */}
                        <TableTab
                            name='GWSI'
                            sort={true}
                            multipleSelect={false}
                            addAction={{
                                addCallBack: () => console.log("row was added to table"),
                            }}
                            editAction={{
                                editCallBack: () => this.updateDataBase(),
                            }}
                            deleteAction={{ deleteCallBack: this.deleteRow }}
                            roundTo={2} />
                        <TableTab
                            multipleSelect={false}
                            selectAction={{
                                selectCallBack: () => console.log("row was selected from table"),
                            }}
                            editAction={{
                                editCallBack: () => this.updateDataBase(),
                            }}
                            addAction={{
                                addCallBack: () => console.log("row was added to table"),
                            }}
                            deleteAction={{
                                deleteCallBack: () => console.log("row was deleted from table"),
                            }}
                            name='ADWR' sort={true} roundTo={2} />
                    </Table2>
                </div>
            </React.Fragment>
        ) : null
    }
}

async function feature(item) {
    var template = {
        title: "{OBJECTID}",
        content: [
            {
                type: "fields",
                fieldInfos: [
                    {
                        fieldName: "OBJECTID",
                        label: "OBJECTID"
                    }
                ]
            }
        ]
    };
    return loadModules(["esri/Graphic"])
        .then(async ([Graphic]) => {
            return new Graphic({
                attributes: item.attributes,
                geometry: item.geometry,
                popupTemplate: template,
            });
        });
}