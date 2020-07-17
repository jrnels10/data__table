import React, { Component } from 'react';
import Table2, { TableTab } from './TableV2/Table';
import { ESRITableObj, ADWRTableObj } from './TableV2/TableObj';
import axios from 'axios';
import { loadModules } from 'esri-loader';
import ESRImap from './esri/ESRImap';


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





export default class Scratch extends Component {
    state = { tableData: null }
    async componentDidMount() {
        const { portal } = this.props;
        const adwrData = await getADWRData(null, '2020-05-01T07:00:00.000Z,2020-05-08T07:00:00.000Z');
        const sampleData = await query("REGISTRY_ID LIKE ('%50059%')", portal.wells55);
        const sampleGWSIData = await query("SITE_ID LIKE ('%3350%')", 'https://gisweb3.azwater.gov/arcgis/rest/services/Wells/GWSI/MapServer/2');
        const adwr = new ADWRTableObj('ADWR', adwrData.data);
        const wells55 = new ESRITableObj('Wells55', sampleData, 'OBJECTID');
        const GWSI = new ESRITableObj('GWSI', sampleGWSIData, 'OBJECTID');
        this.setState({ tableData: [wells55, GWSI, adwr] });
    }

    editedData = (row) => {
        debugger
    }
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
                        <TableTab name='Wells55' sort={true} locate={true} roundTo={2} editRow={this.editedData} />
                        <TableTab name='GWSI' sort={true} locate={false} roundTo={2} />
                        <TableTab name='ADWR' sort={true} locate={false} roundTo={2} />
                    </Table2>
                </div>
            </React.Fragment>
        ) : null
    }
}


function getADWRData(appName, dateRange, environment) {
    try {
        return axios.post(`https://localhost:44304/api/analytics/getdailygisdata?appName=&dateRange=2020-05-01T07:00:00.000Z,2020-05-08T07:00:00.000Z&environment=test`);
    } catch (error) {
        // return errorUtils(error, 'getGISData function in API.js', appName)
    }
}