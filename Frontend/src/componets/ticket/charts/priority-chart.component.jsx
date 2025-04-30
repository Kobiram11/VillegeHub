import React, { Component } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const labels = ['Low', 'Medium', 'High'];
const barPercentage = '0.5';
const backgroundColor = ['lightgreen', 'moccasin', 'crimson'];

const options = {
    plugins: {
        legend: { display: false },
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        y: {
            beginAtZero: true,
        }
    }
}

export default class PriorityChart extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            tickets: [],
            data: {
                labels: labels,
                datasets: [{
                    data: [0, 0, 0],
                    barPercentage: barPercentage,
                    backgroundColor: backgroundColor,
                }],
            }
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8070/tickets/')
            .then(res => {
                const tickets = res.data;
                let low = 0, medium = 0, high = 0;

                // Count tickets based on priority
                tickets.forEach(ticket => {
                    if (ticket.status !== 'Resolved') {
                        switch (ticket.priority) {
                            case 'Low':
                                low++;
                                break;
                            case 'Medium':
                                medium++;
                                break;
                            case 'High':
                                high++;
                                break;
                            default:
                                break; // Optional: Handle unexpected priority values
                        }
                    }
                });

                // Update state with ticket counts
                this.setState({
                    tickets,
                    data: {
                        labels: labels,
                        datasets: [{
                            data: [low, medium, high],
                            barPercentage: barPercentage,
                            backgroundColor: backgroundColor,
                        }],
                    }
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <Bar 
                    data={this.state.data}
                    options={options}
                    height={350}
                    width={500} 
                />
            </div>
        );
    }
}
