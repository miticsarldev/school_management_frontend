import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';

// Déclaration du composant FeesCollectionCard
const FeesCollectionCard = ({
  title,
  feesChartOptions,
  feesChartData,
}: {
  title: string; // Titre de la carte
  feesChartOptions: any; // Options pour le graphique
  feesChartData: any; // Données pour le graphique
}) => {
  return (
    <div className="col-xxl-8 col-xl-6 d-flex">
      <div className="card flex-fill">
        {/* En-tête de la carte */}
        <div className="card-header d-flex align-items-center justify-content-between">
          <h4 className="card-title">{title}</h4> {/* Affichage du titre */}
          <div className="dropdown">
            <Link
              to="#"
              className="bg-white dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <i className="ti ti-calendar me-2" />
              Last 8 Quarter {/* Texte de la période sélectionnée */}
            </Link>
            <ul className="dropdown-menu mt-2 p-3">
              {/* Liste déroulante des périodes */}
              <li><Link to="#" className="dropdown-item rounded-1">This Month</Link></li>
              <li><Link to="#" className="dropdown-item rounded-1">This Year</Link></li>
              <li><Link to="#" className="dropdown-item rounded-1">Last 12 Quarter</Link></li>
              <li><Link to="#" className="dropdown-item rounded-1">Last 16 Quarter</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Corps de la carte contenant le graphique */}
        <div className="card-body pb-0">
          <ReactApexChart
            id="fees-chart"
            options={feesChartOptions} // Options pour le graphique
            series={feesChartData.series} // Données pour le graphique
            type="bar" // Type de graphique
            height={270} // Hauteur du graphique
          />
        </div>
      </div>
    </div>
  );
};

export default FeesCollectionCard;
