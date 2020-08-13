import { TableFunctions2 } from "./TableFunctions";
import data from './../data/adwrData.json'
import { ADWRTableObj_Edit } from "../Table";
const tableObj = new ADWRTableObj_Edit('ADWR', data)
let tableFunctions;
describe('Table Functions -- filter', () => {
    let filteredCount = 0
    beforeEach(() => {
        tableFunctions = new TableFunctions2(tableObj)
        filteredCount = 0
    })
    it('Filter should begin filtering on the first character entered', () => {
        expect(tableFunctions.data.tableData.length).equal(105);
        tableFunctions.filter('A', 'APPLICATION_NAME', 'string', null, 50);
        tableFunctions.pageinatedData.map(page => {
            return filteredCount = filteredCount + page.length
        });
        expect(filteredCount).equal(92);
    });

    it('Should continue filtering after every character entered', () => {
        expect(tableFunctions.data.tableData.length).equal(105);
        tableFunctions.filter('B', 'APPLICATION_NAME', 'string', null, 50);
        tableFunctions.pageinatedData.map(page => {
            return filteredCount = filteredCount + page.length
        });
        expect(filteredCount).equal(58);
    });

    it('Should unfilter if character is removed', () => {
        expect(tableFunctions.data.tableData.length).equal(105);
        tableFunctions.filter('u', 'APPLICATION_NAME', 'string', null, 50);
        tableFunctions.pageinatedData.map(page => {
            return filteredCount = filteredCount + page.length
        });
        expect(filteredCount).equal(60);
        filteredCount = 0
        tableFunctions.filter('ur', 'APPLICATION_NAME', 'string', null, 50);
        tableFunctions.pageinatedData.map(page => {
            return filteredCount = filteredCount + page.length
        });
        expect(filteredCount).equal(47);
        filteredCount = 0
        tableFunctions.filter('u', 'APPLICATION_NAME', 'string', null, 50);
        tableFunctions.pageinatedData.map(page => {
            return filteredCount = filteredCount + page.length
        });
        expect(filteredCount).equal(60);
        filteredCount = 0
        tableFunctions.filter('', 'APPLICATION_NAME', 'string', null, 50);
        tableFunctions.pageinatedData.map(page => {
            return filteredCount = filteredCount + page.length
        });
        expect(filteredCount).equal(105);
    });
});
