import { loadModules } from "esri-loader";

export class TableFunctions {
    constructor(data, type, value) {
        this.data = data
        this.filteredData = data.tableData
        this.type = type;
        this.pages = null
    }

    async pageinate(number) {
        const numberPerPage = parseInt(number);
        let data = this.data.tableData;
        let pageCount = 0;
        if (numberPerPage) {
            const numberOfPages = Math.ceil(this.data.tableData.length / numberPerPage);
            const recordsPerPage = [];
            while (pageCount < numberOfPages) {
                this.data.tableData.map((item, idx) => {
                    if (idx === numberPerPage) {
                        recordsPerPage.push(data.slice(0, numberPerPage));
                        data = data.filter((item, idx) => idx >= numberPerPage)
                    }
                });
                ++pageCount
            }
            return this.pages = recordsPerPage;
        } else {
            const numberOfPages = Math.ceil(this.data.tableData.length / this.data.tableData.length);
            const recordsPerPage = [];
            while (pageCount < numberOfPages) {
                this.data.tableData.map((item, idx) => {
                    if (idx === this.data.tableData.length - 1) {
                        recordsPerPage.push(data.slice(0, this.data.tableData.length - 1));
                        data = data.filter((item, idx) => idx >= this.data.tableData.length - 1)
                    }
                });
                ++pageCount
            }
            return this.pages = recordsPerPage;
        }
    }

    async sortData(columnName) {
        const sorted = await sortArray(this.filteredData, columnName);
        this.data.tableData = sorted;
        console.log(`sorted ${sorted.length} records`);
        return sorted;
    }



    filter(term, field, fieldType, filterParams) {
        if (term.length === 0) {
            this.filteredData = this.data.tableData;
            return this.filteredData;

        }
        else {
            const filteredData = this.filteredData.filter(item => {
                const dataType = fieldType === 'number';

                if (dataType & filterParams === 'greaterThan') {
                    return item[field] > parseInt(term);
                }
                else if (dataType & filterParams === 'lessThan') {
                    return item[field] < parseInt(term);
                }
                else if (dataType & filterParams === 'equalTo') {
                    return item[field] === parseInt(term);
                }
                else if (!dataType) {
                    return item[field].indexOf(term.toUpperCase()) > -1;
                }
                return null;
            });
            this.filteredData = filteredData;
            return filteredData;
        }
    };
    deleteRow(item) {
        const filteredData = this.filteredData.filter(rowItem => rowItem.TABLE_ID !== item.TABLE_ID);
        this.data.tableData = filteredData;
        this.data.filteredData = filteredData;
        return this.data.tableData;
    }

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

    removeRow(rowIndex) {
        const filteredTable = this.data.tableData.filter((row, idx) => idx !== rowIndex);
        this.data.tableData = filteredTable;
        return this.data.tableData;
    };

    replaceRow(item, row) {
        this.filteredData[row] = item;
        return this.filteredData
    }
    newObject() {
        const obj = this.data.tableData[0];
        let newItem = { ...obj };
        for (const property in newItem) {
            if (property === "Options") {
                newItem[property] = "Options"
            } else {
                newItem[property] = null
            }
        };
        return newItem;
    }
    insertRow() {
        const newItem = this.newObject()
        this.data.tableData.unshift(newItem);
        return this.data.tableData;
    };

    selectRowValues() {
        const cellEditRow = document.getElementsByClassName('cell__edit');
        let rowObj = this.newObject();
        for (let i = 0; i < cellEditRow.length; i++) {
            rowObj[this.data.tableFields[i].title] = cellEditRow[i].firstChild.value
        }
        const cleanedObj = this.rowDataCleanUp(rowObj);
        return { rowObj, cleanedObj }
    }
}





export async function sortArray(data, name) {

    let sortedData = data;
    let loopsRun = 0;
    let nullArray = [];
    let cadSort = name === 'CADASTRAL';
    let date = name === 'DRILL_DATE' || name === 'LASTWLDATE';
    const type = isNaN(Number(data[0][name]));
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
                    let value = item[name] || item[name] !== null ? item[name].toLowerCase().trim().replace('/,|-|.|" "/', '') : '';
                    let char = value.charCodeAt(loop);
                    return value === '' ? nullArray.push(item) :
                        Number(char) === idx ? bucket.push(item) : null;
                })
                bucket.sort(function (a, b) {
                    var x = a[name].toLowerCase().trim().replace('/,|-|.|" "/', '');
                    var y = b[name].toLowerCase().trim().replace('/,|-|.|" "/', '');
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                });
                return bucket
            }
            return null;
        })
        sortedData = nullArray.length > 0 ? [...nullArray] : [];
        buckets.map(type => {
            return type.map(item => {
                return sortedData.push(item)
            })
        })
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