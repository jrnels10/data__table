import React, { Component } from 'react';
import Table2, { TableTab } from './TableV2/Table';
import { ESRITableObj, ADWRTableObj, ESRITableObj_Edit, ADWRTableObj_Edit } from './TableV2/TableObj';
import axios from 'axios';
import { loadModules } from 'esri-loader';
import ESRImap from './esri/ESRImap';
import wellsData from './data/wells55.json'
import gwsiData from './data/gwsi.json'
import adwr from './data/adwrData.json'
import cws from './data/cwsAR.json'

async function query(where, featureLayer, maxResults) {
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


const config = {
    REGISTRY_ID: {
        type: 'input',
        inputType: 'number',
        maxLength: 6,
        nullValues: false,
        validation: e => console.log(e.target.value)
    },
    RGR_PUMP_DATA: {
        type: 'select',
        values: ['YES', 'NO']
    }
}


export default class Scratch extends Component {
    state = { tableData: null }
    async componentDidMount() {
        const { portal } = this.props;
        // const adwrData = await getADWRData(null, '2020-05-01T07:00:00.000Z,2020-05-08T07:00:00.000Z');
        // const sampleData = await query("REGISTRY_ID LIKE ('%50059%')", portal.wells55);
        // const sampleGWSIData = await query("SITE_ID LIKE ('%3350%')", 'https://gisweb3.azwater.gov/arcgis/rest/services/Wells/GWSI/MapServer/2');
        // const adwr = new ADWRTableObj('ADWR', adwrData.data);
        const wells55 = new ESRITableObj_Edit('Wells55', wellsData, 'OBJECTID');
        const GWSI = new ESRITableObj('GWSI', gwsiData, 'OBJECTID');
        const ADWR = new ADWRTableObj('ADWR', adwr);
        const CWS = new ADWRTableObj_Edit('CWS', cws.ReportDetails);
        this.setState({ tableData: [wells55, GWSI, ADWR, CWS] });
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
                    <ESRImap value={value} portal={portal} />
                </div>
                <div style={{ height: '60vh', width: '100vw', position: 'absolute', bottom: '0' }}>
                    <Table2
                        value={value}
                        portal={portal}
                        data={this.state.tableData}
                    >
                        <TableTab name='Wells55' config={config} sort={true} locate={true} roundTo={2} editAction={{ edit: true, editCallBack: this.editedData, deleteCallBack: this.deleteRow, addCallBack: this.addRow }} />
                        <TableTab name='GWSI' sort={true} locate={true} roundTo={2} />
                        <TableTab name='ADWR' sort={true} locate={false} roundTo={2} />
                        <TableTab name='CWS' sort={true} locate={false} roundTo={2} editAction={{ edit: true, editCallBack: this.editedData }} />
                    </Table2>
                </div>
            </React.Fragment>
        ) : null
    }
}

