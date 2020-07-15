import React, { Component } from 'react'

export const Headers = ({ dataForHeaders, sort }) => {
    return <thead>
        <tr>
            {dataForHeaders.map((item, idx) => {
                return <th key={idx} onClick={() => sort ? sort(item.dataIndex) : null}>
                    <div className='custom-cell-width-header custom-cell-width'>
                        <label>
                            {item.title.replace(/_/g, " ")}
                        </label>
                    </div>
                </th>
            })}
        </tr>
    </thead>
}

export const Body = ({ dataForBody, locationData }) => {
    return <tbody >
        {dataForBody.map((item, idx) => {
            let tdArray = []
            Object.keys(item).forEach(function (key) {
                return tdArray.push(<td className="custom-cell-width" key={key}>{item[key]}</td>)
            });
            return <tr key={idx} >
                {tdArray.map(item => {
                    return item;
                })}
            </tr>
        })}
    </tbody>
}