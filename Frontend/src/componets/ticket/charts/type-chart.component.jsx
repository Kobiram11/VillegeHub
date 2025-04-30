import React, { Component } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components
Chart.register(ArcElement, Tooltip, Legend);

const backgroundColor = ['aquamarine', 'burlywood', 'firebrick', 'gray'];
const labels = ['Bug/Error', 'Feature Request', 'Security', 'Other'];
const options = {
    maintainAspectRatio: false,
    responsive: true,
}

export default class TypeChart extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            tickets: [],
            data: {
                labels: labels,
                datasets: [{
                    data: [0, 0, 0, 0],
                    backgroundColor: backgroundColor
                }],
            }
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8070/tickets/')
            .then(res => {
                const tickets = res.data;
                let bug = 0, feature = 0, security = 0, other = 0;

                // Count tickets based on type
                tickets.forEach(ticket => {
                    if (ticket.status !== 'Resolved') {
                        switch (ticket.type) {
                            case 'Bug/Error':
                                bug++;
                                break;
                            case 'Feature Request':
                                feature++;
                                break;
                            case 'Security':
                                security++;
                                break;
                            case 'Other':
                                other++;
                                break;
                            default:
                                break; // Optional: Handle unexpected type values
                        }
                    }
                });

                // Update state with ticket counts
                this.setState({
                    tickets,
                    data: {
                        labels: labels,
                        datasets: [{
                            data: [bug, feature, security, other],
                            backgroundColor: backgroundColor
                        }],
                    }
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <Doughnut 
                    data={this.state.data}
                    options={options}
                    height={300}
                    width={500} 
                />
            </div>
        );
    }
}
