import { useEffect, useState } from "react";
import axios from "axios";

const TuitionFeesSummary = () => {
    interface Summary {
        totalCollected: number;
        totalPaid: number;
        unpaidStudents: number;
        totalOutstanding: number;
    }

    const [summary, setSummary] = useState<Summary>({
        totalCollected: 0,
        totalPaid: 0,
        unpaidStudents: 0,
        totalOutstanding: 0,
    });

    useEffect(() => {
        const fetchTuitionFeesSummary = async () => {
            try {
                const response = await axios.get('http://localhost:4444/api/tuition-fees'); // URL de ton API
                const tuitionFees: any[] = response.data;
                console.log("tution1");

                console.log(tuitionFees);
                // Utilisation de 'any' pour le type

                let totalCollected = 0;
                let totalPaid = 0;
                let unpaidStudents = 0;
                let totalOutstanding = 0;

                tuitionFees.forEach((fee) => {
                    if (fee.status === "paid") {
                        totalPaid += fee.amount;
                    } else if (fee.status === "unpaid") {
                        unpaidStudents += 1;
                        totalOutstanding += fee.amount;
                    }
                    totalCollected += fee.amount; // Somme de tous les frais
                });

                setSummary({
                    totalCollected,
                    totalPaid,
                    unpaidStudents,
                    totalOutstanding,
                });
            } catch (error) {
                console.error("Erreur lors de la récupération des frais :", error);
            }
        };

        fetchTuitionFeesSummary();
    }, []);

    const { totalCollected, totalPaid, unpaidStudents, totalOutstanding } = summary;

    // Calcul des pourcentages
    const paidPercentage = totalCollected > 0 ? ((totalPaid / totalCollected) * 100).toFixed(1) : 0;
    const outstandingPercentage = totalPaid > 0 ? ((totalOutstanding / totalPaid) * 100).toFixed(1) : 0;
    const unpaidPercentage = totalPaid > 0 ? ((totalOutstanding / totalPaid) * 100).toFixed(1) : 0;

    // alert(totalCollected)

    return (
        <div className="col-xxl-3 col-xl-6 order-2 order-xxl-3 d-flex flex-column">
            <div className="card flex-fill mb-2">
                <div className="card-body">
                    <p className="mb-2">Total des frais</p>
                    <div className="d-flex align-items-end justify-content-between">
                        
                        <h4>FCFA {totalCollected}</h4>
                        <span className="badge badge-soft-success">
                            <i className="ti ti-chart-line me-1" />
                            {paidPercentage}%
                        </span>
                    </div>
                </div>
            </div>
            <div className="card flex-fill mb-2">
                <div className="card-body">
                    <p className="mb-2">Frais perçus à ce jour</p>
                    <div className="d-flex align-items-end justify-content-between">
                        <h4>FCFA {totalPaid.toFixed(2)}</h4>
                        <span className="badge badge-soft-danger">
                            <i className="ti ti-chart-line me-1" />
                            {outstandingPercentage}%
                        </span>
                    </div>
                </div>
            </div>
            <div className="card flex-fill mb-2">
                <div className="card-body">
                    <p className="mb-2">Étudiants non payés</p>
                    <div className="d-flex align-items-end justify-content-between">
                        <h4>{unpaidStudents}</h4>
                        <span className="badge badge-soft-info">
                            <i className="ti ti-chart-line me-1" />
                            {unpaidPercentage}%
                        </span>
                    </div>
                </div>
            </div>
            <div className="card flex-fill mb-4">
                <div className="card-body">
                    <p className="mb-2">Total des encours</p>
                    <div className="d-flex align-items-end justify-content-between">
                        <h4>FCFA {totalOutstanding.toFixed(2)}</h4>
                        <span className="badge badge-soft-danger">
                            <i className="ti ti-chart-line me-1" />
                            {((totalOutstanding / totalCollected) * 100).toFixed(1)}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TuitionFeesSummary;
