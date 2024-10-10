import React from 'react';
import { Link } from 'react-router-dom';

interface StudentCardProps {
    studentId: string;
    studentName: string;
    rollNo: string;
    gender: string;
    joinedDate: string;
    status: string;
    avatar: string;
    classInfo: string;
    routes: {
        studentDetail: string;
        editStudent: string;
        studentPromotion: string;
    };
}

const StudentCard: React.FC<StudentCardProps> = ({
    studentId,
    studentName,
    rollNo,
    gender,
    joinedDate,
    status,
    avatar,
    classInfo,
    routes,
}) => {
    return (
        <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
            <div className="card flex-fill">
                <div className="card-header d-flex align-items-center justify-content-between">
                    <Link to={routes.studentDetail} className="link-primary">
                        {studentId}
                    </Link>
                    <div className="d-flex align-items-center">
                        <span className={`badge badge-soft-${status === 'Active' ? 'success' : 'danger'} d-inline-flex align-items-center me-1`}>
                            <i className="ti ti-circle-filled fs-5 me-1" />
                            {status}
                        </span>
                        <div className="dropdown">
                            <Link
                                to="#"
                                className="btn btn-white btn-icon btn-sm d-flex align-items-center justify-content-center rounded-circle p-0"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="ti ti-dots-vertical fs-14" />
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-right p-3">
                                <li>
                                    <Link className="dropdown-item rounded-1" to={routes.studentDetail}>
                                        <i className="ti ti-menu me-2" />
                                        Voir Etudiant
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item rounded-1" to={routes.editStudent}>
                                        <i className="ti ti-edit-circle me-2" />
                                        Modifier
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item rounded-1" to={routes.studentPromotion}>
                                        <i className="ti ti-arrow-ramp-right-2 me-2" />
                                        Promouvoir
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-item rounded-1"
                                        to="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#delete-modal"
                                    >
                                        <i className="ti ti-trash-x me-2" />
                                        supprimer
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="bg-light-300 rounded-2 p-3 mb-3">
                        <div className="d-flex align-items-center">
                            <Link to={routes.studentDetail} className="avatar avatar-lg flex-shrink-0">
                                <img
                                    src={avatar}
                                    className="img-fluid rounded-circle"
                                    alt="Student avatar"
                                />
                            </Link>
                            <div className="ms-2">
                                <h5 className="mb-0">
                                    <Link to={routes.studentDetail}>{studentName}</Link>
                                </h5>
                                <p>{classInfo}</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between gx-2">
                        <div>
                            <p className="mb-0">Roll No</p>
                            <p className="text-dark">{rollNo}</p>
                        </div>
                        <div>
                            <p className="mb-0">Genre</p>
                            <p className="text-dark">{gender}</p>
                        </div>
                        <div>
                            <p className="mb-0">Arriver</p>
                            <p className="text-dark">{joinedDate}</p>
                        </div>
                    </div>
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <Link
                            to="#"
                            className="btn btn-outline-light bg-white btn-icon d-flex align-items-center justify-content-center rounded-circle p-0 me-2"
                        >
                            <i className="ti ti-brand-hipchat" />
                        </Link>
                        <Link
                            to="#"
                            className="btn btn-outline-light bg-white btn-icon d-flex align-items-center justify-content-center rounded-circle p-0 me-2"
                        >
                            <i className="ti ti-phone" />
                        </Link>
                        <Link
                            to="#"
                            className="btn btn-outline-light bg-white btn-icon d-flex align-items-center justify-content-center rounded-circle p-0 me-3"
                        >
                            <i className="ti ti-mail" />
                        </Link>
                    </div>
                    <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#add_fees_collect"
                        className="btn btn-light btn-sm fw-semibold"
                    >
                        Ajouter des frais
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StudentCard;
