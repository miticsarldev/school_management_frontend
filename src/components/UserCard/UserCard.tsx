import React from 'react';
import CountUp from 'react-countup';
import ImageWithBasePath from '../ImageWithBasePath/ImageWithBasePath';

interface UserCardProps {
    total: number; // Nombre total d'utilisateurs
    active: number; // Nombre d'utilisateurs actifs
    inactive: number; // Nombre d'utilisateurs inactifs
    percentageChange: number; // Pourcentage de changement
    userType: string; // Type d'utilisateur (ex. "Students", "Teachers", etc.)
    iconPath: string; // Chemin de l'icône à afficher
}

const UserCard: React.FC<UserCardProps> = ({ total, active, inactive, percentageChange, userType, iconPath }) => {
    return (
        <div className="col-xxl-3 col-sm-6 d-flex">
            <div className="card flex-fill animate-card border-0">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <div className="avatar avatar-xl bg-danger-transparent me-2 p-1">
                            <ImageWithBasePath
                                src={iconPath}
                                alt={`${userType} icon`}
                            />
                        </div>
                        <div className="overflow-hidden flex-fill">
                            <div className="d-flex align-items-center justify-content-between">
                                <h2 className="counter">
                                    <CountUp end={total} />
                                </h2>
                                <span className={`badge ${percentageChange > 0 ? 'bg-success' : 'bg-danger'}`}>
                                    {percentageChange}%
                                </span>
                            </div>
                            <p>Total {userType}</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-top mt-3 pt-3">
                        <p className="mb-0">
                            Active :{" "}
                            <span className="text-dark fw-semibold">{active}</span>
                        </p>
                        <span className="text-light">|</span>
                        <p>
                            Inactive :{" "}
                            <span className="text-dark fw-semibold">{inactive}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
