import React, { useEffect, useState, useRef } from 'react';
import { ArrowDown, ArrowUp } from './Images/IconsSVG';

export const Headers = ({ dataForHeaders, sort, filterData, tableData, columnSelect, setColumnSelect, config, filteredFields, clearFilteredField }) => {
    const [headerOptions, setheaderOptions] = useState(null)
    const openHeader = (e) => {
        const index = parseInt(e.target.id.split('-')[1]);
        setheaderOptions(headerOptions === index ? null : index);
    }
    return <thead>
        <tr>
            {dataForHeaders.map((item, idx) => {
                let fieldType
                if (tableData.length > 0) {
                    fieldType = Number(tableData[0][item.title]) ? 'number' :
                        typeof tableData[0][item.title] === "boolean" ? "boolean" : 'string';
                }
                const CustomName = config && config[item.title] && config[item.title].header ? config[item.title].header : item.title.replace(/_/g, " ");
                const CustomWidth = config && config[item.title] ? config[item.title].width : null;
                const filteredFieldIndex = filteredFields.findIndex(fieldItem => fieldItem.field === item.title);
                const filteredField = filteredFields[filteredFieldIndex] ?
                    <label className='filtered-header' onClick={() => clearFilteredField(filteredFields[filteredFieldIndex])}> {filteredFields[filteredFieldIndex].term}</label> : null
                return dataForHeaders.length === idx ? null : <th
                    className={`column__select--${columnSelect === idx}`}
                    onClick={() => setColumnSelect(idx)}
                    key={idx}
                >
                    <div className={`custom-cell-width-header custom-cell-width  ${filteredField && headerOptions !== idx ? 'custom-cell-width-filtered' : null} `} style={CustomWidth ? { width: CustomWidth } : null}>
                        {headerOptions === idx ? <HeaderOptions
                            filterData={filterData}
                            field={item.title}
                            fieldType={fieldType}
                            term={filteredFields[filteredFieldIndex]}
                        /> : null}
                        {
                            filteredField && headerOptions !== idx ? filteredField : null
                        }
                        <label
                            className={`custom-cell-header-${headerOptions === idx ? 'small' : 'normal'} ${filteredField && headerOptions !== idx ? 'label-filtered' : 'label-unfiltered'}`}
                            onClick={e => openHeader(e)}
                            title={`header-${item.title}`}
                            id={`header-${idx}`}
                        >
                            {CustomName}
                        </label>
                        {sort ? <Sort sort={sort} item={item} /> : null}
                    </div>
                </th>
            })}
        </tr >
    </thead >
};



const Sort = ({ sort, item }) => {
    const [sorting, setsorting] = useState(false);
    const sortAction = () => {
        setsorting(!sorting);
        return sort(item.dataIndex)
    }
    return <div className={`custom-cell-sort custom-cell-sort`} onClick={() => sortAction()}>
        {sorting ? <ArrowUp /> :
            <ArrowDown />}
    </div >
};



const HeaderOptions = ({ filterData, field, fieldType, term }) => {
    const filterRef = useRef('');
    const [inputValue, setinputValue] = useState(term ? term.term : '');
    const [filterParams, setfilterParams] = useState('equalTo')
    useEffect(() => {
        filterRef.current.focus();
    }, []);
    const setValues = (e) => {
        setinputValue(e.target.value)
        filterData(e.target.value, field, fieldType, filterParams)
    }
    return <div className='custom__header__options'>
        <HeaderNumbers fieldType={fieldType} setfilterParams={setfilterParams} />
        <input ref={filterRef} type={fieldType === 'number' ? 'number' : "text"} value={inputValue} onChange={e => setValues(e)} />
    </div>
};



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
};

