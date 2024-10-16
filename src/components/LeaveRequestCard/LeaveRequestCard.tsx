import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ImageWithBasePath from "../ImageWithBasePath/ImageWithBasePath";

// Fonction pour formater les dates
const formatLeaveDates = (startDate: string, endDate: string): string => {
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  const start = new Date(startDate).toLocaleDateString("fr-FR", options);
  const end = new Date(endDate).toLocaleDateString("fr-FR", options);
  
  // Si les mois sont les mêmes, on affiche juste le jour de début et de fin
  const startMonth = new Date(startDate).getMonth();
  const endMonth = new Date(endDate).getMonth();

  if (startMonth === endMonth) {
    return `${new Date(startDate).getDate()}-${new Date(endDate).getDate()} ${new Date(startDate).toLocaleDateString("fr-FR", { month: "long" })}`;
  }
  
  return `${start} - ${end}`;
};

const LeaveRequestCard = ({ title }: { title: string }) => {
  const [leaveRequests, setLeaveRequests] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les demandes de congés via une requête Axios
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get("http://localhost:4444/api/leaves"); // Remplacez par l'URL de votre API
        const allLeaves = response.data;
        // Filtrer les congés (type 'congé')
        const filteredLeaves = allLeaves.filter((leave: any) => leave.type === "congé");
        console.log(filteredLeaves);
        
        setLeaveRequests(filteredLeaves);

        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des demandes de congé");
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  // Affichage pendant le chargement ou en cas d'erreur
  if (loading) return <p>Chargement des congés...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="col-xxl-4 col-xl-6 d-flex">
      <div className="card flex-fill">
        {/* En-tête de la carte */}
        <div className="card-header d-flex align-items-center justify-content-between">
          <h4 className="card-title">{title}</h4> {/* Affichage du titre */}
          {/* <div className="dropdown">
            <Link
              to="#"
              className="bg-white dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <i className="ti ti-calendar-due me-1" />
              Today 
            </Link>
            <ul className="dropdown-menu mt-2 p-3">
              
              <li><Link to="#" className="dropdown-item rounded-1">This Week</Link></li>
              <li><Link to="#" className="dropdown-item rounded-1">Last Week</Link></li>
              <li><Link to="#" className="dropdown-item rounded-1">Next Week</Link></li>
            </ul>
          </div> */}
        </div>
        
        {/* Corps de la carte contenant les demandes de congés */}
        <div className="card-body">
          {leaveRequests.length > 0 ? (
            leaveRequests.map((request, index) => (
              <div className="card mb-2" key={index}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center overflow-hidden me-2">
                      <Link to="#" className="avatar avatar-lg flex-shrink-0 me-2">
                        <ImageWithBasePath src={request.user_id.image} alt={request.user_id.firstname} />
                      </Link>
                      <div className="overflow-hidden">
                        <h6 className="mb-1 text-truncate">
                          <Link to="#">{request.user_id.firstname + " " + request.user_id.lastname}</Link>
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
                      <span className="fw-semibold">
                        {/* Formatage des dates de début et fin */}
                        {formatLeaveDates(request.dateDebut, request.dateFin)}
                      </span>
                    </p>
                    {/* <p>
                      Apply on :{" "}
                      <span className="fw-semibold">{request.applyDate}</span>
                    </p> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Aucune demande de congé trouvée.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestCard;
