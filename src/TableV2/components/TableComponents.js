import React, { useEffect, useState, useRef } from 'react'

export const Headers = ({ dataForHeaders, sort, filterData }) => {
    const [headerOptions, setheaderOptions] = useState(null)
    const openHeader = (e) => {
        const index = parseInt(e.target.id.split('-')[1]);
        setheaderOptions(index);
    }
    return <thead>
        <tr>
            {dataForHeaders.map((item, idx) => {
                return <th
                    key={idx}
                // onClick={() => sort ? sort(item.dataIndex) : null}
                >
                    <div className='custom-cell-width-header custom-cell-width'>
                        {headerOptions === idx ? <HeaderOptions filterData={filterData} field={item.title} /> : null}
                        <label
                            className={`custom-cell-header-${headerOptions === idx ? 'small' : 'normal'}`}
                            onClick={e => openHeader(e)}
                            title={`header-${item.title}`}
                            id={`header-${idx}`}
                        >
                            {item.title.replace(/_/g, " ")}
                        </label>
                    </div>
                </th>
            })}
        </tr>
    </thead>
}

const HeaderOptions = ({ filterData, field }) => {
    const filterRef = useRef('');
    useEffect(() => {
        filterRef.current.focus();
    }, []);
    return <div className='custom__header__options'>
        <input ref={filterRef} type="text" onChange={e => filterData(e.target.value, field)} />
    </div>
}

export const Body = ({ dataForBody, findOnMap }) => {
    return <tbody >
        {dataForBody.map((item, idx) => {
            let tdArray = [];
            Object.keys(item).forEach(function (key) {
                return tdArray.push(<td className="custom-cell-width" key={key}>{item[key]}</td>)
            });
            return <tr key={idx} onClick={() => findOnMap ? findOnMap(item.TABLE_ID) : null}>
                {tdArray.map(item => {
                    return item;
                })}
            </tr>
        })}
    </tbody>
}