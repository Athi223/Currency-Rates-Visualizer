import React from 'react';

export default function Scale(props) {
    return(
        <select className="custom-select" id={props.id} onChange={props.onChange}>
            <option value="log" defaultValue>Logarithmic</option>
            <option value="linear">Linear</option>
        </select>
    )
}