

import { loadModules } from "esri-loader";


export async function Highlight(results, view, type, graphicId, fill, outLineColor, size, layerName, popupTemplate) {
    try {
        return loadModules([
            "esri/Graphic",
            "esri/layers/GraphicsLayer",
            "esri/layers/GroupLayer",
        ]).then(async ([Graphic, GraphicsLayer, GroupLayer]) => {
            return view.when(async () => {
                const generalLayer = new GraphicsLayer({ id: "generalLayer" });

                await highLight.graphics.items.filter((layer) => {
                    return layer.id === graphicId;
                }).map(layer => {
                    return highLight.graphics.remove(layer)
                });
                if (results === null) {
                    return 'All highlight graphics removed'
                } else {
                    results.map(item => {
                        const selectedLayer = new Graphic({
                            attributes: item.attributes,
                            id: graphicId,
                            geometry: item.geometry,
                            popupTemplate: popupTemplate ? popupTemplate : null,
                            symbol: {
                                type: type,
                                outline: { width: 1.5, color: outLineColor ? outLineColor : [253, 164, 1, 1] },
                                color: fill ? fill : [56, 168, 0, 0]
                            }
                        });
                        if (size) {
                            selectedLayer.symbol.size = size
                        }
                        highLight.add(selectedLayer);
                        return highLight;
                    });
                    return highLight;
                }
            });
        }).catch(error => {
            errorUtils(error, "Highlight in Tools.js", { result: results, type: type })
        });

    } catch (error) {
        errorUtils(error, "Highlight in Tools.js", { result: results, type: type })
    }
}

export async function sortArray(data, name) {
    let sortedData = data;
    let loopsRun = 0;
    let longestItem = 1
    let cadSort = name === 'CADASTRAL';
    let date = name === 'DRILL_DATE' || name === 'LASTWLDATE';
    const type = isNaN(Number(data[0][name]));
    function Looping(loop) {
        let buckets = []
        for (let i = 0; i < (type && !cadSort ? 128 : 10); i++) {
            buckets.push([])
        }
        buckets.map((bucket, idx, array) => {
            if (!type && !date) {
                sortedData.map((item) => {
                    let value = item[name] ? item[name].toString().replace('.', '').split('/').join('') : "0";
                    let number = value.length;
                    let char = value.charAt((number) - loop);
                    if (value.length > longestItem) {
                        longestItem = number
                    }
                    if (Number(char) === idx) {
                        bucket.push(item)
                    } else if (char === undefined) {
                        array[0].push(item);
                    }
                    return null;
                })
            } else if (date) {
                sortedData.map((item) => {
                    let value = item[name] ? item[name].toString().replace('.', '').split('/').join('') : "0";
                    let number = value.length;
                    let char = value.charAt(number - loop);
                    if (value.length > longestItem) {
                        longestItem = number
                    }
                    if (Number(char) === idx) {
                        bucket.push(item)
                    } else if (char === undefined) {
                        array[0].push(item);
                    }
                    return null;
                })
            } else if (cadSort) {
                sortedData.map((item) => {
                    let value = item[name] ? item[name] : 0;
                    longestItem = value.toString().length;
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
                data.filter((item) => {
                    let value = item[name] ? item[name].toLowerCase().trim().replace('/,|-|.|" "/', '') : '';
                    let char = value.charCodeAt(loop);
                    if (value.length > longestItem) {
                        longestItem = value.length
                    }
                    return Number(char) === idx ? bucket.push(item) : null;
                })
                bucket.sort(function (a, b) {
                    var x = a[name].toLowerCase().trim().replace('/,|-|.|" "/', '');
                    var y = b[name].toLowerCase().trim().replace('/,|-|.|" "/', '');
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                })
                return null;
            }
            return null;
        })
        sortedData = [];
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
    } else if (date) {
        while (loopsRun < 5) {
            Looping(loopsRun)
            ++loopsRun
        }
        //console.log(sortedData.length)
        return sortedData;
    } else {
        while (loopsRun < longestItem + 1) {
            Looping(loopsRun)
            ++loopsRun
        }
        //console.log(sortedData.length)
        return sortedData;
    }
}