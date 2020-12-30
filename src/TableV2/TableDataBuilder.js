


export class ESRITableObj {
    constructor(tab, data, uniqueId) {
        this.options = false;
        this.tab = tab;
        this.rawData = data;
        this.initialData = data.features.map(gis => Object.assign(gis.attributes, { TABLE_ID: gis.attributes[uniqueId] }));
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
        this.initialData = data
        this.tableGeometry = null;
        this.tableFields = Object.keys(data[0]).map((fieldItem, idx) => {
            return { title: fieldItem, dataIndex: fieldItem, key: idx }
        });
        this.tableData = data
    }
};

export class ADWRTableObj_Edit extends ADWRTableObj {
    editField = { title: 'Options', dataIndex: 'Options', key: 0 }
    constructor(tab, data) {
        super(tab, data)
        this.tab = tab;
        this.rawData = data;
        this.initialData = data.map(item => Object.assign({ Options: 'Edit' }, item))
        this.tableGeometry = null;
        this.tableFields = [this.editField, ...Object.keys(data[0]).map((fieldItem, idx) => {
            return { title: fieldItem, dataIndex: fieldItem, key: idx }
        })];
        this.tableData = data.map(item => Object.assign({ Options: 'Edit' }, item))
    }
};

export class ESRITableObj_Edit extends ESRITableObj {
    editField = { title: 'Options', dataIndex: 'Options', key: 0 }
    constructor(tab, data, uniqueId) {
        super(tab, data, uniqueId)
        this.options = true;
        this.initialData = data.features.map(gis => Object.assign({ Options: 'Edit' }, gis.attributes, { TABLE_ID: gis.attributes[uniqueId] }));
        this.tableFields = [this.editField, ...data.fields.map((field, idx) => {
            return { title: field.name, dataIndex: field.name, key: idx }
        })];
        this.tableData = data.features.map(gis => Object.assign({ Options: 'Edit' }, gis.attributes, { TABLE_ID: gis.attributes[uniqueId] }));
    }
};

