import { useState } from "react";
import { useSelector } from "react-redux";
import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale, 
    LinearScale,
    BarElement, 
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


function BarGraph(){

    const companyData = useSelector(state => state.admin.companyData);

    const [filters, setFilters] = useState({
        company : '',
        dateRange : { start : '', end : '' },
        communicationMethod : '',
    });

    const filterData = () => {

        let filtered = companyData;

        if(filters.company) 
            filtered = filtered.filter(company => company.name === filters.company);
        

        if(filters.dateRange.start && filters.dateRange.end){
            
            const start = new Date(filters.dateRange.start);
            const end = new Date(filters.dateRange.end);

            filtered = filtered.map(company => ({
                ...company,
                communications : company.communications.filter(
                    (comm) => new Date(comm.date) >= start && new Date(comm.date) <= end
                ),
            }));
        }

        if(filters.communicationMethod){
            filtered = filtered.map((company) => ({
                ...company,
                communications : company.communications.filter(
                    (comm) => comm.type === filters.communicationMethod
                ),
            }));
        }

        return filtered;

    };

    const getFrequencyData = () => {

        const data = filterData();

        const frequency = data.reduce((acc, company) => {
            company.communications.forEach((comm) => {
                acc[comm.type] = (acc[comm.type] || 0) + 1;
            });
            return acc;
        }, {});

        return frequency;

    };

    const frequency = getFrequencyData();

    const chartData = {

        labels : Object.keys(frequency),
        datasets : [
            {
                label : 'Communication Frequency',
                data : Object.values(frequency),
                backgroundColor : ['#007bff', '#ffc107', '#28a745', '#dc3545', '#6c757d'],
            },
        ],

    };

    return (
        <div className="analytics-container">

            <h2>Bar Graph</h2>

            <div className="filter-section">

                <div>
                    <label>Filter by Company:</label>
                    <select value={filters.company} onChange={(e) => setFilters({ ...filters, company : e.target.value })} >
                        <option value="">All Companies</option>
                        {companyData.map((company, index) => (
                            <option key={index} value={company.name}>
                                {company.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Date Range:</label>
                    <input type="date" value={filters.dateRange.start} onChange={(e) => setFilters({ ...filters, dateRange : { ...filters.dateRange, start : e.target.value } })} />
                    <input type="date" value={filters.dateRange.end} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end : e.target.value } })} />
                </div>

                <div>
                    <label>Communication Method:</label>
                    <select value={filters.communicationMethod} onChange={(e) => setFilters({ ...filters, communicationMethod: e.target.value })} >
                        <option value="">All Methods</option>
                        {['LinkedIn Post', 'LinkedIn Message', 'Email', 'Phone Call', 'Other'].map((method, index) => (
                            <option key={index} value={method}>
                                {method}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="chart-container">
                <Bar data={chartData} />
            </div>

        </div>
    )
}

export default BarGraph;