import { loadModules } from 'esri-loader';
import WellsJson from './../data/wells55.json'
import { ESRITableObj } from './TableDataBuilder';

describe('Create class objects based on data origin', () => {
    it('Data received from ESRI REST service', async () => {
        const esriTableObj = new ESRITableObj('Wells55', WellsJson, 'OBJECTID');
        expect(esriTableObj.options).equal(false);
        expect(esriTableObj.tab).equal('Wells55');
        expect(esriTableObj.rawData.features).to.have.lengthOf(WellsJson.features.length);
        expect(esriTableObj.tableData).to.have.lengthOf(WellsJson.features.length);
        expect(esriTableObj.tableFields).to.have.lengthOf(WellsJson.fields.length);
        expect(esriTableObj.tableGeometry).to.have.lengthOf(WellsJson.features.length);
        expect(esriTableObj.uniquieId).equal('OBJECTID');
    });
});