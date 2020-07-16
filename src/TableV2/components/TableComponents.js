import React, { Component, useEffect, useState, useRef } from 'react';

export const Headers = ({ dataForHeaders, sort, filterData, tableData }) => {
    const [headerOptions, setheaderOptions] = useState(null)
    const openHeader = (e) => {
        const index = parseInt(e.target.id.split('-')[1]);
        setheaderOptions(index);
    }
    return <thead>
        <tr>
            {dataForHeaders.map((item, idx) => {
                let fieldType
                if (tableData.length > 0) {
                    fieldType = Number(tableData[0][item.title]) ? 'number' :
                        typeof tableData[0][item.title] === "boolean" ? "boolean" : 'string';
                }
                return dataForHeaders.length === idx ? null : <th
                    key={idx}
                // onClick={() => sort ? sort(item.dataIndex) : null}
                >
                    <div className='custom-cell-width-header custom-cell-width'>
                        {headerOptions === idx ? <HeaderOptions
                            filterData={filterData}
                            field={item.title}
                            fieldType={fieldType}
                        /> : null}
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

const HeaderOptions = ({ filterData, field, fieldType }) => {
    const filterRef = useRef('');
    const [filterParams, setfilterParams] = useState('equalTo')
    useEffect(() => {
        filterRef.current.focus();
    }, []);
    return <div className='custom__header__options'>
        <HeaderNumbers fieldType={fieldType} setfilterParams={setfilterParams} />
        <input ref={filterRef} type={fieldType === 'number' ? 'number' : "text"} onChange={e => filterData(e.target.value, field, fieldType, filterParams)} />
    </div>
}

const HeaderNumbers = ({ fieldType, setfilterParams }) => {
    const [filterNumberBy, setfilterNumberBy] = useState('equalTo');
    return fieldType === 'number' ? <select
        name="filterNumberBy"
        value={filterNumberBy}
        onChange={e => {
            setfilterParams(e.target.value);
            return setfilterNumberBy(e.target.value)
        }}
    >
        <option value={'greaterThan'}>greaterThan</option>
        <option value={'lessThan'}>lessThan</option>
        <option value={'equalTo'}>equalTo</option>
    </select> : null
}

export const Body = ({ dataForBody, findOnMap }) => {
    return <tbody >
        {dataForBody.length > 0 ? dataForBody.map((item, idx) => {
            let tdArray = [];
            Object.keys(item).forEach(function (key) {
                return key === 'TABLE_ID' ? null : tdArray.push(<td className="custom-cell-width" key={key}>{item[key]}</td>)
            });
            return <tr key={idx} onClick={() => findOnMap ? findOnMap(item.TABLE_ID) : null}>
                {tdArray.map(item => {
                    return item;
                })}
            </tr>
        }) : null}
    </tbody>
}