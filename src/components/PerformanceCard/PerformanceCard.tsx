import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';

// Déclaration du composant Performance
const PerformanceCard = ({ className, performanceData, classDonutChart }: { 
  className: string; // Le nom de la classe
  performanceData: { top: number; average: number; belowAvg: number }; // Données de performance
  classDonutChart: any; // Options pour le graphique
}) => {
  return (
    <div className="card flex-fill">
      {/* En-tête de la carte */}
      <div className="card-header d-flex align-items-center justify-content-between">
        <h4 className="card-title">Performance</h4>
        <div className="dropdown">
          <Link
            to="#"
            className="bg-white dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <i className="ti ti-school-bell me-2" />
            {className} {/* Affichage du nom de la classe */}
          </Link>
          <ul className="dropdown-menu mt-2 p-3">
            {/* Liste déroulante des classes */}
            <li><Link to="#" className="dropdown-item rounded-1">Class I</Link></li>
            <li><Link to="#" className="dropdown-item rounded-1">Class II</Link></li>
            <li><Link to="#" className="dropdown-item rounded-1">Class III</Link></li>
            <li><Link to="#" className="dropdown-item rounded-1">Class IV</Link></li>
          </ul>
        </div>
      </div>
      
      {/* Corps de la carte contenant les performances et le graphique */}
      <div className="card-body">
        <div className="d-md-flex align-items-center justify-content-between">
          <div className="me-md-3 mb-3 mb-md-0 w-100">
            {/* Affichage des performances */}
            <div className="border border-dashed p-3 rounded d-flex align-items-center justify-content-between mb-1">
              <p className="mb-0 me-2">
                <i className="ti ti-arrow-badge-down-filled me-2 text-primary" />
                Bon
              </p>
              <h5>{performanceData.top}</h5>
            </div>
            <div className="border border-dashed p-3 rounded d-flex align-items-center justify-content-between mb-1">
              <p className="mb-0 me-2">
                <i className="ti ti-arrow-badge-down-filled me-2 text-warning" />
                Moyenne
              </p>
              <h5>{performanceData.average}</h5>
            </div>
            <div className="border border-dashed p-3 rounded d-flex align-items-center justify-content-between mb-0">
              <p className="mb-0 me-2">
                <i className="ti ti-arrow-badge-down-filled me-2 text-danger" />
                En dessous de la moyenne
              </p>
              <h5>{performanceData.belowAvg}</h5>
            </div>
          </div>

          {/* Graphique en anneau affiché à droite */}
          <ReactApexChart
            id="class-chart"
            className="text-center text-md-left"
            options={classDonutChart} // Options pour le graphique
            series={classDonutChart.series} // Séries de données
            type="donut" // Type de graphique
          />
        </div>
      </div>
    </div>
  );
};

export default PerformanceCard;
