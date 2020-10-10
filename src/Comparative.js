import React from 'react';
import $ from 'jquery';
import logo from './logo.svg';
import './App.css';
import CurrencyList from './CurrencyList';
import InfoBox from './InfoBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class Comparative extends React.Component {
    constructor() {
        super();
        this.state = {
			data: [],
			active: null,
        }
    }
    render() {
		if(this.state.active)
			return(
				<div className="Comparative container py-4">
					<div className="input-group input-group-lg mb-4">
						<InfoBox htmlFor="baseCurrency" content="Base Currency:" />
						<CurrencyList id="baseCurrency" onChange={this.updateChart} disabled={false} />
						<InfoBox htmlFor="indexCurrency" content="Index Currency:" />
						<CurrencyList id="indexCurrency" onChange={this.updateChart} disabled={false} />
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
		else
			return (
				<div className="Comparative mx-4 py-4">
					<div className="input-group input-group-lg mb-4">
						<InfoBox htmlFor="baseCurrency" content="Base Currency:" />
						<CurrencyList id="baseCurrency" onChange={this.updateChart} disabled={true} />
						<InfoBox htmlFor="indexCurrency" content="Index Currency:" />
						<CurrencyList id="indexCurrency" onChange={this.updateChart} disabled={true} />
					</div>
					<div>
						<img src={logo} className="App-logo" alt="logo" />
					</div>
				</div>
			)
    }
    componentDidMount() {
        document.title = 'Comparative Rate Visualizer';
		this.updateChart();
    }
    updateChart = () => {
		this.setState({ active: false });
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
						active: true,
					})
				}
			}
		);
	}
}