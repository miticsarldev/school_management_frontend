import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const StudentGradesChart: React.FC = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [examResults, setExamResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [noResults, setNoResults] = useState(false);

    // Fonction pour récupérer les classes
    const fetchClasses = async () => {
        try {
            const response = await axios.get('http://localhost:4444/api/classrooms');
            console.log(response.data);
            setClasses(response.data);
        } catch (err) {
            setError('Échec lors de la récupération des classes');
        }
    };

    // Fonction pour récupérer les résultats d'examens d'une classe
    const fetchExamResults = async (classId: string) => {
        setLoading(true);
        setError('');
        setNoResults(false);  // Réinitialiser les messages d'erreur ou sans résultats
        try {
            const response = await axios.get(`http://localhost:4444/api/exam_results-by-class/${classId}`);
            console.log(response.data);
            if (response.data.length === 0) {
                setNoResults(true); // Si aucun résultat n'est trouvé
            } else {
                setExamResults(response.data);
            }
            setLoading(false);
        } catch (err) {
            setError('Échec lors de la récupération des résultats d\'examen');
            setLoading(false);
        }
    };

    // Charger les classes dès le chargement du composant
    useEffect(() => {
        fetchClasses();
    }, []);

    // Charger les résultats d'examen lorsqu'une classe est sélectionnée
    useEffect(() => {
        if (selectedClass) {
            fetchExamResults(selectedClass);
        }
    }, [selectedClass]);

    // Préparation des données pour le graphique
    const categories = examResults.map((result: any) => result.student_id.firstname || '');

    const gradeMapping: { [key: string]: number } = { A: 4, B: 3, C: 2, D: 1, F: 0 };

    const seriesData = [
        {
            name: 'Notes',
            data: examResults.map((result: any) => gradeMapping[result.grade] || 0), // Convertir les lettres en nombres
        },
    ];

    // Options pour le graphique
    const chartOptions: ApexOptions = {
        chart: {
            height: 350,
            type: 'line',
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' },
        grid: {
            row: {
                colors: ['#f1f2f3', 'transparent'],
                opacity: 0.5,
            },
        },
        xaxis: {
            categories: categories, // Noms des étudiants
        },
        yaxis: {
            title: { text: 'Grade' },
            labels: {
                formatter: (value) => {
                    const reverseMapping: Record<number, string> = { 4: 'A', 3: 'B', 2: 'C', 1: 'D', 0: 'F' };
                    return reverseMapping[value as number] || value.toString();
                },
            },
        },
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">Résultats des examens des étudiants</h5>

                {/* Sélecteur pour choisir une classe */}
                <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                >
                    <option value="">Sélectionnez une classe</option>
                    {classes.map((cls: any) => (
                        <option key={cls._id} value={cls._id}>
                            {cls.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="card-body">
                {/* Si en cours de chargement */}
                {loading && <div>Chargement des résultats...</div>}

                {/* Si aucun résultat pour la classe sélectionnée */}
                {noResults && !loading && <div>Aucun résultat pour cette classe.</div>}

                {/* Si une erreur s'est produite */}
                {error && !loading && <div>{error}</div>}

                {/* Afficher le graphique si les résultats sont disponibles et pas d'erreur */}
                {!loading && !error && examResults.length > 0 && (
                    <ReactApexChart
                        options={chartOptions}
                        series={seriesData}
                        type="line"
                        height={350}
                    />
                )}
            </div>
        </div>
    );
};

export default StudentGradesChart;
