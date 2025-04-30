import React, { Component } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components
Chart.register(ArcElement, Tooltip, Legend);

const labels = ['Open', 'In Progress', 'Resolved'];
const backgroundColor = ['gold', 'cornflowerblue', 'darkslategray'];

const options = {
    maintainAspectRatio: false,
    responsive: true,
}

export default class StatusChart extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            tickets: [],
            data: {
                datasets: [{
                    data: [0, 0, 0],
                    backgroundColor: backgroundColor
                }],
                labels: labels
            }
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8070/tickets/')
            .then(res => {
                const tickets = res.data;
                let open = 0, progress = 0, resolved = 0;

                // Count tickets based on status
                tickets.forEach(ticket => {
                    switch (ticket.status) {
                        case 'Open':
                            open++;
                            break;
                        case 'In Progress':
                            progress++;
                            break;
                        case 'Resolved':
                            resolved++;
                            break;
                        default:
                            break; // Optional: Handle unexpected status values
                    }
                });

                // Update state with ticket counts
                this.setState({
                    tickets,
                    data: {
                        datasets: [{
                            data: [open, progress, resolved],
                            backgroundColor: backgroundColor
                        }],
                        labels: labels
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
