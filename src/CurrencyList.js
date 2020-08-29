import React from 'react';

export default function CurrencyList(props) {
    return (
        <select className="custom-select" id={props.id} onChange={props.onChange} disabled={props.disabled} >
            <option value="USD" defaultValue>US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="INR">Indian Rupee</option>
            <option value="JPY">Japanese Yen</option>
            <option value="RUB">Russian Ruble</option>
            <option value="GBP">Pounds Sterling</option>
            <option value="SGD">Singapore Dollar</option>
            <option value="CNY">Chinese Yuan</option>
            <option value="AUD">Australian Dollar</option>
        </select>
    )
}