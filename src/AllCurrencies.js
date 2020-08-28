import React from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import CurrencyList from './CurrencyList';
import { BarChart, Bar, Cell, XAxis, YAxis, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';

export default class AllCurrencies extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			date: (new Date()).toISOString().substr(0,10),
		}
	}
	render() {
		const colors = ['#ef7e32', '#7d3ac1', '#eb548c', '#e7e34e', '#6df0d2', '#c02323', '#af48ce', '#1ac9e6']
		return(
			<div className="AllCurrencies mx-4 py-4">
				<div className="input-group input-group-lg mb-4">
					<div className="input-group-prepend">
						<label className="input-group-text" htmlFor="baseCurrency" style={{ fontWeight: "bold" }}>Base Currency:</label>
					</div>
					<CurrencyList id="baseCurrency" onChange={this.updateChart} />
					<div className="input-group-prepend">
						<label className="input-group-text" htmlFor="datePicker" style={{ fontWeight: "bold" }}>Date:</label>
					</div>
					<input className="custom-input" type="date" id="datePicker" defaultValue={this.state.date} onChange={this.updateChart} min="2010-01-01" max={(new Date()).toISOString().substr(0,10)} />
				</div>
				<ResponsiveContainer height="95%">
					<BarChart data={this.state.data}>
						<CartesianGrid strokeDasharray="20 10" />
						<XAxis dataKey="currency" label={{ value: 'Currencies', position: "insideBottom", offset: 0, fontSize: 20, fontWeight: "bold" }} />
						<YAxis label={{ value: 'Equivalent of 1 ' + $('select').val(), angle: -90, position: 'insideLeft', fontSize: 20, fontWeight: "bold" }} />
						<Bar dataKey="value">
						<LabelList dataKey="value" position="top" fill="#000" />
							{
								this.state.data.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={colors[index]} />
								))
							}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		)
	}
	componentDidMount(){
		document.title = 'Currency Rates Visualizer';
		this.updateChart();
	}
	updateChart = () => {
		let base = $('#baseCurrency').val(), dataPoints = [], symbols = ['USD','EUR','JPY','GBP','RUB','INR','SGD','CNY','AUD' ].filter(x => x !== base);
		$.get(
			'https://api.exchangeratesapi.io/' + $('#datePicker').val() +'?base=' + base + '&symbols=' + symbols.join(),
			(data) => {
				for (const key in data.rates) {
					dataPoints.push({
						currency: key,
						value: data.rates[key]
					});
				}
				this.setState({
					data: dataPoints,
				})
			}
		);
	}
}