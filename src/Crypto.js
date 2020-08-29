import React from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import InfoBox from './InfoBox';
import Scale from './Scale';
import CurrencyList from './CurrencyList';
import { BarChart, Bar, Cell, XAxis, YAxis, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';

export default class Crypto extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            scale: 'log',
        }
    }
    render() {
        const colors = ['#ff9a00', '#eb548c', '#bd00ff', '#6df0d2', '#e7e34e']
        console.log(this.state.data)
        return(
            <div className="Crypto mx-4 py-4">
				<div className="input-group input-group-lg mb-4">
					<InfoBox htmlFor="baseCurrency" content="Base Currency:" />
					<CurrencyList id="baseCurrency" onChange={this.updateChart} disabled={false} />
                    <InfoBox htmlFor="scale" content="Scale:" />
					<Scale id="scale" onChange={this.updateScale} />
				</div>
				<ResponsiveContainer height="95%">
					<BarChart data={this.state.data}>
						<CartesianGrid strokeDasharray="20 10" />
						<XAxis dataKey="currency" label={{ value: 'Currencies', position: "insideBottom", offset: 0, fontSize: 20, fontWeight: "bold" }} />
						<YAxis scale={this.state.scale} domain={['auto', 'auto']} label={{value: $('#baseCurrency').val(), angle: -90, position: 'insideLeft', fontSize: 20, fontWeight: "bold" }} />
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
		document.title = 'Cryptocurrency Rates Visualizer';
		this.updateChart();
    }
    
	updateScale = () => {
		const scale = $('#scale').val();
		this.setState({
			scale: scale,
		})
	}
	updateChart = () => {
		let base = $('#baseCurrency').val().toLowerCase(), dataPoints = [];
		$.get(
			'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Clitecoin%2Cripple%2Cstellar&vs_currencies=' + base,
			(data) => {
				for (const key in data) {
					dataPoints.push({
						currency: key.toUpperCase(),
						value: data[key][base]
					});
				}
				this.setState({
					data: dataPoints,
				})
			}
		);
	}
}