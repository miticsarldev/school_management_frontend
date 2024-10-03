import { Link } from 'react-router-dom';
import ImageWithBasePath from '../ImageWithBasePath/ImageWithBasePath';

// Déclaration du composant LeaveRequestCard
const LeaveRequestCard = ({
  title,
  leaveRequests, // Tableau des demandes de congés
}: {
  title: string; // Titre de la carte
  leaveRequests: Array<{
    id: string; // ID de la demande de congé
    name: string; // Nom de l'employé
    position: string; // Poste de l'employé
    leaveType: string; // Type de congé
    leaveDates: string; // Dates de congé
    applyDate: string; // Date de demande
    avatar: string; // URL de l'avatar
  }>; // Structure des données des demandes de congé
}) => {
  return (
    <div className="col-xxl-4 col-xl-6 d-flex">
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
              <i className="ti ti-calendar-due me-1" />
              Today {/* Texte de la période sélectionnée */}
            </Link>
            <ul className="dropdown-menu mt-2 p-3">
              {/* Liste déroulante des périodes */}
              <li><Link to="#" className="dropdown-item rounded-1">This Week</Link></li>
              <li><Link to="#" className="dropdown-item rounded-1">Last Week</Link></li>
              <li><Link to="#" className="dropdown-item rounded-1">Next Week</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Corps de la carte contenant les demandes de congés */}
        <div className="card-body">
          {leaveRequests.map((request) => (
            <div className="card mb-2" key={request.id}>
              <div className="card-body p-3">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center overflow-hidden me-2">
                    <Link to="#" className="avatar avatar-lg flex-shrink-0 me-2">
                      <ImageWithBasePath src={request.avatar} alt={request.name} />
                    </Link>
                    <div className="overflow-hidden">
                      <h6 className="mb-1 text-truncate">
                        <Link to="#">{request.name}</Link>
                        <span className={`badge badge-soft-${request.leaveType === 'Emergency' ? 'danger' : 'warning'} ms-1`}>
                          {request.leaveType}
                        </span>
                      </h6>
                      <p className="text-truncate">{request.position}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <Link to="#" className="avatar avatar-xs p-0 btn btn-success me-1">
                      <i className="ti ti-checks" /> {/* Bouton pour approuver */}
                    </Link>
                    <Link to="#" className="avatar avatar-xs p-0 btn btn-danger">
                      <i className="ti ti-x" /> {/* Bouton pour refuser */}
                    </Link>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between border-top pt-3">
                  <p className="mb-0">
                    Leave :{" "}
                    <span className="fw-semibold">{request.leaveDates}</span>
                  </p>
                  <p>
                    Apply on :{" "}
                    <span className="fw-semibold">{request.applyDate}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestCard;
