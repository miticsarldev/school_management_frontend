import React from 'react';
import ReactApexChart from 'react-apexcharts';

// Définir les types pour les props
interface StudentGradesChartProps {
    title: string; // Titre du graphique
    gradesData: {
        categories: string[]; // Catégories (par exemple, mois)
        series: {
            name: string; // Nom de la série (par exemple, "Notes")
            data: number[]; // Données des notes
        }[];
    };
}

// Déclaration du composant StudentGradesChart
const StudentGradesChart: React.FC<StudentGradesChartProps> = ({ title, gradesData }) => {
    // Options pour le graphique
    const [sline] = React.useState<any>({
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth', // Modifiez en "smooth" pour un graphique lisse
        },
        grid: {
            row: {
                colors: ['#f1f2f3', 'transparent'], // Couleurs alternées pour les lignes de grille
                opacity: 0.5,
            },
        },
        xaxis: {
            categories: gradesData.categories, // Utilisation des catégories reçues en props
        },
    });

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">{title}</h5> {/* Utilisation du titre reçu en props */}
            </div>
            <div className="card-body">
                <ReactApexChart
                    options={sline}
                    series={gradesData.series} // Utilisation des données de séries reçues en props
                    type="line" // Correction du type en fonction des options
                    height={350}
                />
            </div>
        </div>
    );
};

export default StudentGradesChart;
