import { NewSort } from "./components/Newsort";

export async function sortArray(data, name) {

    let sortedData = data;
    let sortedDataNew = [];
    let loopsRun = 0;
    let nullArray = [];
    let cadSort = name === 'CADASTRAL';
    let date = name === 'DRILL_DATE' || name === 'LASTWLDATE';
    const type = data.find(item => {
        if (item[name] !== null) {
            if (Number(item[name])) {
                return isNaN(Number(item[name]))
            }
            else if (item[name].trim() !== '') {
                return isNaN(Number(item[name]))
            }
        }
    });
    let longestItem = data
        .map(item => item[name])
        .filter(item => {
            if (item !== null || item !== undefined) {
                return item
            }
        })
        .reduce((a, b) => {
            if (type) {
                return a.length < b.length ? b : a
            } else {
                return a < b ? b : a
            }
        }).toString().length;
    console.log(longestItem)
    function Looping(loop) {
        let buckets = []


        for (let i = 0; i < (type && !cadSort ? 128 : 10); i++) {
            buckets.push([])
        }
        buckets.map((bucket, idx, array) => {
            if (!type) {
                sortedData.map((item) => {
                    let value = item[name] ? item[name].toString().replace('.', '').split('/').join('') : "0";
                    let char = value.charAt(value.length - loop);
                    return Number(char) === idx ? bucket.push(item) :
                        char === undefined ? array[0].push(item) : null;
                });
            } else if (date) {
                sortedData.map((item) => {
                    let value = item[name] ? item[name].toString().replace('.', '').split('/').join('') : "0";
                    let char = value.charAt(value.length - loop);
                    return Number(char) === idx ? bucket.push(item) :
                        char === undefined ? array[0].push(item) : null;
                });
            } else if (cadSort) {
                sortedData.map((item) => {
                    let value = item[name] ? item[name] : 0;
                    let char = value.toString().charAt((longestItem - 1) - loop) === "A" ? 0 :
                        value.toString().charAt((longestItem - 1) - loop) === "B" ? 1 :
                            value.toString().charAt((longestItem - 1) - loop) === "C" ? 2 :
                                value.toString().charAt((longestItem - 1) - loop) === "D" ? 3 :
                                    value.toString().charAt((longestItem - 1) - loop)
                    if (Number(char) === idx) {
                        bucket.push(item)
                    }
                    return null;
                });
            } else {
                nullArray = [];
                data.filter((item) => {
                    let value = item[name] || item[name] !== null ? item[name].toLowerCase().trim().replace('/,|-|.|"  *"/', '') : '';
                    let char = value.charCodeAt(loop);
                    return value === '' ? nullArray.push(item) :
                        Number(char) === idx ? bucket.push(item) : null;
                })
                bucket.sort(function (a, b) {
                    var x = a[name].toLowerCase().trim().replace('/,|-|.|"  *"/', '');
                    var y = b[name].toLowerCase().trim().replace('/,|-|.|"  *"/', '');
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                });
                return bucket
            }
            return null;
        })
        buckets.map(type => {
            return type.map(item => {
                return sortedDataNew.push(item)
            })
        })

        sortedData = nullArray.length > 0 ? [...sortedDataNew, ...nullArray] : [...sortedDataNew];
    }

    if (type && !cadSort && !date) {
        while (loopsRun < 1) {
            Looping(loopsRun)
            ++loopsRun
        }
        //console.log(sortedData.length)
        return sortedData;
        // } else if (date) {
        //     while (loopsRun < 5) {
        //         Looping(loopsRun)
        //         ++loopsRun
        //     }
        //     //console.log(sortedData.length)
        //     return sortedData;
    } else {
        while (loopsRun < longestItem + 1) {
            Looping(loopsRun)
            ++loopsRun
        }
        //console.log(sortedData.length)
        return sortedData;
    }
}



export class TableFunctions2 {
    constructor(data) {
        this.data = data;
        this.unfiltered = data;
        this.pageCount = 50
        this.pageinatedData = this.pageinate(this.pageCount, this.data.tableData);
        this.recordCount = this.countRecords();
    }
    updateData(data) {
        this.data = data;
        this.unfiltered = data;
        this.pageinatedData = this.pageinate(this.pageCount, data.tableData);
        this.recordCount = this.countRecords();
    }
    countRecords() {
        let count = 0;
        this.pageinatedData.map(page => {
            return count = count + page.length
        });
        return this.recordCount = count;
    }

    pageinate(number, data) {
        const numberPerPage = parseInt(number);
        let pageCount = 0;
        if (numberPerPage) {
            const numberOfPages = Math.ceil(data.length / numberPerPage);
            const recordsPerPage = [];
            while (pageCount < numberOfPages) {
                data.map((item, idx) => {
                    if (idx === numberPerPage) {
                        recordsPerPage.push(data.slice(0, numberPerPage));
                        data = data.filter((item, idx) => idx >= numberPerPage)
                    }
                });
                ++pageCount
            }
            if (data.length < numberPerPage) {
                recordsPerPage.push(data)
            }
            if (numberOfPages === 0) {
                recordsPerPage.push([])
            }
            return this.pages = recordsPerPage;
        } else {
            const numberOfPages = Math.ceil(data.length / data.length);
            const recordsPerPage = [];
            while (pageCount < numberOfPages) {
                data.map((item, idx) => {
                    if (idx === data.length - 1) {
                        recordsPerPage.push(data.slice(0, data.length - 1));
                        data = data.filter((item, idx) => idx >= data.length - 1)
                    }
                });
                ++pageCount
            }
            return this.pages = recordsPerPage;
        }
    };



    async filter(pageCount, filteredFields) {
        if (filteredFields[0] && filteredFields[0].term.length > 0) {
            let data = this.data.tableData;
            let filteredData = [];
            filteredFields.map(field => {
                let newdata = [];
                debugger
                data.filter(async item => {
                    if (item[field.field] && item[field.field] !== "") {
                        return item[field.field].toString().toUpperCase().indexOf(field.term.toString().toUpperCase()) > -1 ? newdata.push(item) : null
                    }
                })
                console.log(newdata.length)
                data = newdata;
                filteredData = newdata;
            })

            // console.log(filteredData);
            this.pageinatedData = this.pageinate(pageCount, filteredData);
            this.countRecords()
            return this.pageinatedData;
        }
        else {
            this.pageinatedData = this.pageinate(pageCount, this.data.tableData);
            this.countRecords()
            return this.pageinatedData;
        }
    };

    newObject() {
        const obj = this.pageinatedData[0][0];
        let newItem = { ...obj };
        for (const property in newItem) {
            if (property === "Options") {
                newItem[property] = "Options"
            } else {
                newItem[property] = null
            }
        };
        return newItem;
    };

    async sortData(columnName) {
        const sorted = await NewSort(this.data.tableData, columnName);

        this.data.tableData = sorted;
        console.log(`sorted ${sorted.length} records`);
        this.pageinatedData = this.pageinate(this.pageCount, this.data.tableData);
        this.countRecords()
        return this.pageinatedData;
    };

    insertRow() {
        const newItem = this.newObject()
        this.data.tableData.unshift(newItem);
        this.pageinatedData = this.pageinate(this.pageCount, this.data.tableData);

        this.countRecords()
        return this.pageinatedData;
    };

    removeRow(rowIndex) {
        const filteredTable = this.data.tableData.filter((row, idx) => idx !== rowIndex);
        this.data.tableData = filteredTable;
        this.pageinatedData = this.pageinate(this.pageCount, this.data.tableData);
        this.countRecords()
        debugger
        return this.pageinatedData;
    };

    replaceRow(item, row) {
        this.data.tableData[row] = item;
        this.pageinatedData = this.pageinate(this.pageCount, this.data.tableData);
        this.countRecords()
        return this.pageinatedData;
    };

    selectRowValues() {
        const cellEditRow = document.getElementsByClassName('cell__edit');
        let rowObj = this.newObject();
        for (let i = 0; i < cellEditRow.length; i++) {
            rowObj[this.data.tableFields[i + 1].title] = cellEditRow[i].firstChild.value
        }
        const cleanedObj = this.rowDataCleanUp(rowObj);
        return { rowObj, cleanedObj }
    };

    rowDataCleanUp(rowData) {
        let rowObj = {};
        for (const property in rowData) {
            if (property === "Options") {

            } else if (property === "TABLE_ID") {
            } else {
                Object.assign(rowObj, { [property]: rowData[property] })
            }
        }
        return rowObj
    };
}
