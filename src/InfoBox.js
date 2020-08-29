import React from 'react';

export default function InfoBox(props) {
    return (
        <div className="input-group-prepend">
            <label className="input-group-text" htmlFor={props.htmlFor} style={{ fontWeight: "bold" }}>{props.content}</label>
        </div>
    )
}