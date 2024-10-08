import { Link } from 'react-router-dom';

const ClassRoutine = ({ routines }: { routines: any[] }) => {
  return (
    <div className="card flex-fill">
      {/* En-tête de la carte */}
      <div className="card-header d-flex align-items-center justify-content-between">
        <h4 className="card-title">Routine de cours</h4>
        <Link
          to="#"
          className="link-primary fw-medium"
          data-bs-toggle="modal"
          data-bs-target="#add_class_routine"
        >
          <i className="ti ti-square-plus me-1" />
          Ajouter
        </Link>
      </div>

      {/* Corps de la carte contenant les routines dynamiques */}
      <div className="card-body">
        {/* Boucle à travers chaque routine */}
        {routines.map((routine, index) => (
          <div className="d-flex align-items-center rounded border p-3 mb-3" key={index}>
            {/* Affichage de l'image de l'enseignant */}
            <span className="avatar avatar-md flex-shrink-0 border rounded me-2">
              <img
                src={routine.imageUrl}
                className="rounded"
                alt="Profile"
              />
            </span>
            
            {/* Informations sur la routine */}
            <div className="w-100">
              <p className="mb-1">{routine.month}</p>
              
              {/* Barre de progression avec des styles dynamiques */}
              <div className="progress progress-xs  flex-grow-1 mb-1">
                <div
                  className={`progress-bar progress-bar-striped progress-bar-animated ${routine.progressColor} rounded`}
                  role="progressbar"
                  style={{ width: `${routine.progress}%` }}
                  aria-valuenow={routine.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassRoutine;
