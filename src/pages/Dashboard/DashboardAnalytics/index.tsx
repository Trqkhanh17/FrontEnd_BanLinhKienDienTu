import LayoutDash from "../Layout";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { toast } from "react-toastify";
import { getDailyStatsAPI } from "../../../api/statisticsAPI";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistics = () => {
    const [dataOverallStats, setData] = useState({
        Đã_Thanh_Toán: 0,
        Chưa_Thanh_Toán: 0,
        Tổng_Doanh_Thu: 0
    });
    const [dataDailyStats, setDataDailyStats] = useState({
        Đã_Thanh_Toán: 0,
        Chưa_Thanh_Toán: 0,
        Tổng_Doanh_Thu: 0
    });
    const [dataMonthlyStats, setDataMonthlyStats] = useState({
        months: [],
        Đã_Thanh_Toán: [],
        Chưa_Thanh_Toán: [],
        Tổng_Doanh_Thu: []
    });
    const [dataYearlyStats, setDataYearlyStats] = useState({
        Đã_Thanh_Toán: 0,
        Chưa_Thanh_Toán: 0,
        Tổng_Doanh_Thu: 0
    });
    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const [date, setDate] = useState(formatDate(new Date()).toString());
    useEffect(() => {
        getOverallStats();
        getDailyStats();
        getMonthlyStats();
        getYearlyStats();
    }, []);

    const getOverallStats = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/stats-overall");
            const result = await response.json();
            if (result && result.data) {
                setData(result.data);
            } else {
                toast.error("Invalid response format from API");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error loading data!");
        }
    };
    const getDailyStats = async () => {
        try {
            const data = formatDate(date.toString());
            console.log(data);
            const response = await getDailyStatsAPI(data);
            if (!response.data.data) {
                toast.error(response.data.message);
            }
            setDataDailyStats(response.data.data);
        } catch (error) {
            console.error(error);
            toast.error("Error loading data!");
        }
    };
    const getMonthlyStats = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/stats-monthly");
            const result = await response.json();
            if (result && result.data) {
                setDataMonthlyStats(result.data);
            } else {
                toast.error("Invalid response format from API");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error loading data!");
        }
    };
    const getYearlyStats = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/stats-yearly");
            const result = await response.json();
            if (result && result.data) {
                setDataYearlyStats(result.data);
            } else {
                toast.error("Invalid response format from API");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error loading data!");
        }
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Thống kê Doanh Thu',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    console.log(dataDailyStats);

    const chartDataOverallStats = {
        labels: ['Đã Thanh Toán', 'Chưa Thanh Toán', 'Tổng Doanh Thu'],
        datasets: [{
            label: 'Doanh Thu',
            data: [dataOverallStats.Đã_Thanh_Toán, dataOverallStats.Chưa_Thanh_Toán, dataOverallStats.Tổng_Doanh_Thu],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 2,
        }],
    };
    const chartDataDailyStats = {
        labels: ['Đã Thanh Toán', 'Chưa Thanh Toán', 'Tổng Doanh Thu'],
        datasets: [{
            label: 'Doanh Thu',
            data: [dataDailyStats.Đã_Thanh_Toán, dataDailyStats.Chưa_Thanh_Toán, dataDailyStats.Tổng_Doanh_Thu],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 2,
        }],
    }
    const chartDataMonthlyStats = {
        labels: ['Đã Thanh Toán', 'Chưa Thanh Toán', 'Tổng Doanh Thu'],
        datasets: [{
            label: 'Doanh Thu',
            data: [dataMonthlyStats.Đã_Thanh_Toán, dataMonthlyStats.Chưa_Thanh_Toán, dataMonthlyStats.Tổng_Doanh_Thu],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 2,
        }],
    };
    const chartDataYearlyStats = {
        labels: ['Đã Thanh Toán', 'Chưa Thanh Toán', 'Tổng Doanh Thu'],
        datasets: [{
            label: 'Doanh Thu',
            data: [dataYearlyStats.Đã_Thanh_Toán, dataYearlyStats.Chưa_Thanh_Toán, dataYearlyStats.Tổng_Doanh_Thu],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 2,
        }],
    };
    return (
        <LayoutDash>
            {/* <div>
                <input type="date" value={date.toString()} onChange={(e) => { setDate(formatDate(e.target.value).toString()), getDailyStats() }} />
            </div> */}
            <h2>Thống kê Tổng Quan</h2>
            {dataOverallStats.Đã_Thanh_Toán ? (
                <Bar data={chartDataOverallStats} options={options} />
            ) : (
                <p>Loading...</p>
            )}
            {/* 
            <h2>Thống kê Theo Ngày</h2>
            {dataDailyStats.Đã_Thanh_Toán ? (
                <Bar data={chartDataDailyStats} options={options} />
            ) : (
                <p>Loading...</p>
            )}

            <h2>Thống kê Theo Tháng</h2>
            {dataMonthlyStats.Đã_Thanh_Toán ? (
                <Bar data={chartDataMonthlyStats} options={options} />
            ) : (
                <p>Loading...</p>
            )}

            <h2>Thống kê Theo Năm</h2>
            {dataYearlyStats.Đã_Thanh_Toán ? (
                <Bar data={chartDataYearlyStats} options={options} />
            ) : (
                <p>Loading...</p>
            )} */}
        </LayoutDash>
    );
};

export default Statistics;
