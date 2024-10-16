import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { Link } from "react-router-dom";

const TuitionFeeChart = () => {
    const [feesBar, setFeesBar] = useState<any>({
        chart: {
            height: 275,
            type: 'bar',
            stacked: true,
            toolbar: {
                show: false,
            }
        },
        legend: {
            show: true,
            horizontalAlign: 'left',
            position: 'top',
            fontSize: '14px',
            labels: {
                colors: '#5D6369',
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                endingShape: 'rounded'
            },
        },
        colors: ['#3D5EE1', '#E9EDF4'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        grid: {
            padding: {
                left: -8,
            },
        },
        series: [
            { name: 'Collected Fee', data: [] }, // Collected Fee data will go here
            { name: 'Total Fee', data: [] }, // Total Fee data will go here
        ],
        xaxis: {
            categories: ['Q1: 2023', 'Q2: 2023', 'Q3: 2023', 'Q4: 2023'], // Initial categories for quarters
        },
        yaxis: {
            tickAmount: 3,
            labels: {
                offsetX: -15
            },
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            // y: {
            //     formatter: function (val: any) {
            //         return "$ " + val + " thousands";
            //     }
            // }
        }
    });

    useEffect(() => {
        const fetchTuitionFees = async () => {
            try {
                const response = await axios.get('http://localhost:4444/api/tuition-fees');
                const tuitionFees = response.data;
                console.log(tuitionFees);

                // Initialiser les montants collectés et totaux par mois
                const monthlyCollected = Array(12).fill(0);
                const monthlyTotal = Array(12).fill(0);

                // Parcourir chaque paiement
                tuitionFees.forEach((fee: any) => {
                    const month = new Date(fee.createdAt).getMonth(); // Obtenir le mois
                    const totalAmount = fee.amount; // Montant total dû
                    let collectedAmount = 0; 
                    if (fee.status == "paid") {
                     collectedAmount += totalAmount;  // Montant collecté
                    }

                    // Ajouter les montants aux bons mois
                    monthlyCollected[month] += collectedAmount;
                    monthlyTotal[month] += totalAmount;
                });

                // Grouper par trimestre (3 mois par trimestre)
                const quarterlyCollected = [
                    monthlyCollected.slice(0, 3).reduce((a, b) => a + b, 0), // Q1
                    monthlyCollected.slice(3, 6).reduce((a, b) => a + b, 0), // Q2
                    monthlyCollected.slice(6, 9).reduce((a, b) => a + b, 0), // Q3
                    monthlyCollected.slice(9, 12).reduce((a, b) => a + b, 0), // Q4
                ];

                const quarterlyTotal = [
                    monthlyTotal.slice(0, 3).reduce((a, b) => a + b, 0), // Q1
                    monthlyTotal.slice(3, 6).reduce((a, b) => a + b, 0), // Q2
                    monthlyTotal.slice(6, 9).reduce((a, b) => a + b, 0), // Q3
                    monthlyTotal.slice(9, 12).reduce((a, b) => a + b, 0), // Q4
                ];

                // Mettre à jour l'état avec les données trimestrielles
                setFeesBar((prevState: any) => ({
                    ...prevState,
                    series: [
                        { name: 'Collected Fee', data: quarterlyCollected },
                        { name: 'Total Fee', data: quarterlyTotal }
                    ],
                    xaxis: {
                        categories: ['Q1: 2023', 'Q2: 2023', 'Q3: 2023', 'Q4: 2023'], // Labels des trimestres
                    },
                }));
            } catch (error) {
                console.error("Erreur lors de la récupération des frais :", error);
            }
        };

        fetchTuitionFees();
    }, []);

    return (
        <div className="col-xxl-8 col-xl-6 d-flex">
            <div className="card flex-fill">
                <div className="card-header d-flex align-items-center justify-content-between">
                    <h4 className="card-title">Fees Collection</h4>
                    <div className="dropdown">
                        <Link to="#" className="bg-white dropdown-toggle" data-bs-toggle="dropdown">
                            <i className="ti ti-calendar me-2" />
                            Last 8 Quarter
                        </Link>
                        <ul className="dropdown-menu mt-2 p-3">
                            <li><Link to="#" className="dropdown-item rounded-1">This Month</Link></li>
                            <li><Link to="#" className="dropdown-item rounded-1">This Year</Link></li>
                            <li><Link to="#" className="dropdown-item rounded-1">Last 12 Quarter</Link></li>
                            <li><Link to="#" className="dropdown-item rounded-1">Last 16 Quarter</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="card-body pb-0">
                    <ReactApexChart
                        id="fees-chart"
                        options={feesBar}
                        series={feesBar.series}
                        type="bar"
                        height={270}
                    />
                </div>
            </div>
        </div>
    );
};

export default TuitionFeeChart;
