
export class ESRITableObj {
    constructor(tab, data, uniqueId) {
        this.tab = tab;
        this.rawData = data;
        this.tableGeometry = data.features.map(item => Object.assign(item, { TABLE_ID: item.attributes[uniqueId] }));
        this.tableFields = data.fields.map((field, idx) => {
            return { title: field.name, dataIndex: field.name, key: idx }
        });
        this.uniquieId = uniqueId;
        this.tableData = data.features.map(gis => Object.assign(gis.attributes, { TABLE_ID: gis.attributes[uniqueId] }));
    }
};

export class ADWRTableObj {
    constructor(tab, data) {
        this.tab = tab;
        this.rawData = data;
        this.tableGeometry = null;
        this.tableFields = Object.keys(data[0]).map((fieldItem, idx) => {
            return { title: fieldItem, dataIndex: fieldItem, key: idx }
        });
        this.tableData = data
    }
}
