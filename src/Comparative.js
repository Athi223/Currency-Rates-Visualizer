import React from 'react';
import $ from 'jquery';
import CurrencyList from './CurrencyList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class Comparative extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
        }
    }
    render() {
        return(
            <div className="Comparative mx-4 py-4">
                <div className="input-group input-group-lg mb-4">
					<div className="input-group-prepend">
						<label className="input-group-text" htmlFor="baseCurrency" style={{ fontWeight: "bold" }}>Base Currency:</label>
					</div>
					<CurrencyList id="baseCurrency" onChange={this.updateChart} />
                    <div className="input-group-prepend ml-4">
						<label className="input-group-text" htmlFor="indexCurrency" style={{ fontWeight: "bold" }}>Index Currency:</label>
					</div>
					<CurrencyList id="indexCurrency" onChange={this.updateChart} />
				</div>
                <ResponsiveContainer height="95%">
                    <LineChart width={730} height={250} data={this.state.data} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis label={{ value: 'Equivalent of 1 ' + $('#baseCurrency').val(), angle: -90, position: 'insideLeft', fontSize: 20, fontWeight: "bold" }} />
                        <Tooltip />
						<Legend verticalAlign="top" iconSize={20} height={30} />
                        <Line type="monotone" dataKey={$('#indexCurrency').val()} stroke="#7d3ac1"  dot={{ stroke: 'red', strokeWidth: 2 }}  activeDot={{ stroke: 'red', strokeWidth: 2, r: 7 }} />
                    </LineChart>
				</ResponsiveContainer>
            </div>
        )
    }
    componentDidMount() {
        document.title = 'Comparative Rate Visualizer';
		this.updateChart();
    }
    updateChart = () => {
		this.getDataFromAPI();
	}
	getDataFromAPI(dataPoints=[], counter=10) {
		let base = $('#baseCurrency').val(), index = $('#indexCurrency').val(), today = new Date();
		let year = today.getFullYear(), month = today.getMonth(), day = today.getDate();
		const current = (parseInt(year)-counter).toString();
		$.get(
			'https://api.exchangeratesapi.io/'+ current + '-' + month + '-' + day +'?base=' + base + '&symbols=' + index,
			(data) => {
				dataPoints.push({
					year: current,
					[index]: data.rates[index]
				});
				if(counter > 0)
				{
					this.getDataFromAPI(dataPoints, counter-1)
				}
				else
				{
					this.setState({
						data: dataPoints,
					})
				}
			}
		);
	}
}