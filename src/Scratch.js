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

export async function query(where, featureLayer, maxResults) {
    return loadModules(["esri/tasks/QueryTask",
        "esri/tasks/support/Query"])
        .then(async ([QueryTask, Query]) => {
            var query = new Query();
            var queryTask = new QueryTask({
                url: featureLayer
            });
            query.where = where;
            if (maxResults > 0) {
                query.start = 0;
                query.num = maxResults;
            }
            query.outSpatialReference = { wkid: 102100 };
            query.returnGeometry = true;
            query.outFields = ["*"];
            return queryTask.execute(query)
        })
};

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
        // custom: CustomInput

    }
}

export default class Scratch extends Component {
    state = { tableData: null }
    async componentDidMount() {
        const { portal } = this.props;
        // const adwrData = await getADWRData(null, '2020-05-01T07:00:00.000Z,2020-05-08T07:00:00.000Z');
        const sampleData = await query("REGISTRY_ID LIKE ('%50059%')", portal.wells55);
        // const sampleGWSIData = await query("SITE_ID LIKE ('%3350%')", 'https://gisweb3.azwater.gov/arcgis/rest/services/Wells/GWSI/MapServer/2');
        // const adwr = new ADWRTableObj('ADWR', adwrData.data);
        // debugger
        // console.log(JSON.stringify(sampleData))
        const wells55 = new ESRITableObj_Edit('Wells55', sampleData, 'OBJECTID');
        const GWSI = new ESRITableObj_Edit('GWSI', gwsiData, 'OBJECTID');
        const ADWR = new ADWRTableObj('ADWR', adwr);
        const CWS = new ADWRTableObj_Edit('CWS', cws.ReportDetails);
        this.setState({ tableData: [wells55, GWSI, ADWR, CWS] });
    }

    locateOnMap = async (item) => {
        await this.props.value.view.goTo({ target: item }, {
            duration: 1000,
            easing: 'ease-in-out'
        });
        // const featureItem = await feature(this.state.view, item);
        // this.state.view.popup.open({ location: this.state.view.center, features: [featureItem] });
    }
    setView = (view) => {
        this.setState({ view })
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
                        <TableTab
                            name='Wells55'
                            config={config}
                            sort={true}
                            locate={this.locateOnMap}
                            roundTo={2}
                            editAction={{ edit: true, editCallBack: this.editedData }}
                            addAction={{ addCallBack: this.addRow }}
                            deleteAction={{ deleteCallBack: this.deleteRow }}
                        />
                        <TableTab name='GWSI' sort={true} deleteAction={{ deleteCallBack: this.deleteRow }} locate={this.locateOnMap} roundTo={2} />
                        <TableTab name='ADWR' sort={true} roundTo={2} />
                        <TableTab name='CWS' sort={true} roundTo={2} editAction={{ edit: true, editCallBack: this.editedData }} />
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