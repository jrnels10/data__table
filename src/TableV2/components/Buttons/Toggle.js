import React from 'react'
import './Toggle.css';

export const ToggleButton = ({ toggleState, toggling }) => {
    return (
        <label className="toggle-control" id='close-window'>
            <input type="checkbox" checked={toggleState} onChange={() => toggling()} />
            <span className="control"></span>
        </label>
    )
}