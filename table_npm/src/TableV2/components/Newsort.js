export async function NewSort(data, name) {
    let loopsRun = 0;
    const nullArray = data.filter(item => item[name] === ' ' || item[name] === undefined || item[name] === null);
    const isNumber = !isNaN(Number(data.find(item => item[name])[name]));
    let sortedData = data.filter(item => item[name] !== ' ' && item[name]).map(item => {
        item[name] = item[name].toString();
        return item;
    });

    const longestItem = sortedData.map(item => item[name]).reduce((a, b) => a.length < b.length ? b : a).toString().length
    function Looping(loop) {
        let buckets = []

        for (let i = 0; i < (isNumber ? 10 : 128); i++) {
            buckets.push([])
        }

        buckets.map((bucket, idx) => {
            sortedData.map(item => {
                if (isNumber) {
                    let char = item[name].charAt(item[name].length - (loop + 1));
                    return Number(char) === idx ? bucket.push(item) : null;
                } else {
                    let value = item[name] || item[name] !== null ? item[name].toLowerCase().replace(/\s+/g, "").trim() : '';
                    let char = value.charAt(longestItem - (loop + 1));
                    let charCode = char.charCodeAt(0)
                    if (charCode === idx) {
                        bucket.push(item)
                    } else if (isNaN(charCode) && idx === buckets.length - 1) {
                        buckets[buckets.length - 1].push(item)
                    }
                }
            })
        });
        sortedData = [];
        buckets.map(type => type.map(item => sortedData.push(item)));
        ++loopsRun;
        return sortedData
    }
    while (loopsRun < longestItem) {
        Looping(loopsRun);
    };
    if (isNumber) {
        sortedData.map(item => {
            item[name] = Number(item[name])
            return item;
        })
    }
    sortedData.push(...nullArray);
    return sortedData;
}