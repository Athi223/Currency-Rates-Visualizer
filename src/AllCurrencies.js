import React from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import CurrencyList from './CurrencyList';
import { BarChart, Bar, Cell, XAxis, YAxis, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';
import Scale from './Scale';
import InfoBox from './InfoBox';

export default class AllCurrencies extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			scale: 'log',
			date: (new Date()).toISOString().substr(0,10),
		}
	}
	render() {
		const colors = ['#ef4e32', '#7d3ac1', '#eb548c', '#e7e34e', '#6df0d2', '#ffa072', '#af48ce', '#1aa9f6']
		return(
			<div className="AllCurrencies container py-4">
				<div className="input-group input-group-lg mb-4">
					<InfoBox htmlFor="baseCurrency" content="Base Currency:" />
					<CurrencyList id="baseCurrency" onChange={this.updateChart} disabled={false} />
					<InfoBox htmlFor="scale" content="Scale:" />
					<Scale id="scale" onChange={this.updateScale} />
					<InfoBox htmlFor="datePicker" content="Date:" />
					<input className="custom-input" type="date" id="datePicker" defaultValue={this.state.date} onChange={this.updateChart} min="2010-01-01" max={(new Date()).toISOString().substr(0,10)} />
				</div>
				<ResponsiveContainer height="95%">
					<BarChart data={this.state.data}>
						<CartesianGrid strokeDasharray="20 10" />
						<XAxis dataKey="currency" label={{ value: 'Currencies', position: "insideBottom", offset: 0, fontSize: 20, fontWeight: "bold" }} />
						<YAxis scale={this.state.scale} domain={['auto', 'auto']} label={{ value: 'Equivalent of 1 ' + $('select').val(), angle: -90, position: 'insideLeft', fontSize: 20, fontWeight: "bold" }} />
						<Bar dataKey="value">
						<LabelList dataKey="value" position="insideBottom" fill="#000" />
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
	updateScale = () => {
		const scale = $('#scale').val();
		this.setState({
			scale: scale,
		})
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