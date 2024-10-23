import { Link, useParams } from 'react-router-dom';
import ImageWithBasePath from '@/components/ImageWithBasePath/ImageWithBasePath';
import StudentModals from '../studentModals/StudentModals';
import StudentSidebar from './studentSidebar';
import StudentBreadcrumb from './studentBreadcrumb';
import ProfilNav from './ProfilNav';
import { useEffect, useState } from 'react';
import axios from 'axios';

const StudentDetails = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectUser, setSelectUser] = useState<Record<string, any>>({});

  const routes = [
    { path: '/dashboard/studentDetail/:studentId', label: 'Student Details', icon: 'ti-school' },
    { path: '/dashboard/studentTimeTable', label: 'Time Table', icon: 'ti-table-options' },
    { path: '/dashboard/studentLeaves', label: 'Leave & Attendance', icon: 'ti-calendar-due' },
    { path: '/dashboard/studentFees', label: 'Fees', icon: 'ti-report-money' },
    { path: '/dashboard/studentResult', label: 'Exam & Results', icon: 'ti-bookmark-edit' },
  ];

  const { studentId } = useParams(); // Récupère l'ID de l'étudiant à partir des paramètres
  console.log('Student ID:', studentId); // Vérification de l'ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4444/api/users');
        console.log('Fetched users:', response.data); // Vérification des données récupérées
        setUsers(response.data);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (studentId) {
      findUserById(studentId);
      console.log("Users list:", users); // Après la récupération des utilisateurs
      console.log("Selected user state:", selectUser); // Après la mise à jour de selectUser

    }
  }, [users, studentId]);

  const findUserById = (userId: string) => {
    const user = users.find((u) => u._id === userId);
    if (user) {
      setSelectUser(user);
    } else {
      console.error("User not found with ID:", userId); // Message d'erreur si l'utilisateur n'est pas trouvé
    }
  };

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  }

  return (
    <>
      <div className="">
        <div className="content">
          <div className="row">
            <StudentBreadcrumb />
          </div>
          <div className="row">
            <StudentSidebar
              avatar={selectUser.image}
              name={selectUser.firstname}
              studentId={selectUser.studentId || "AD1256589"}
              rollNo={selectUser.rollNo || "35013"}
              gender={selectUser.gender}
              dob={formatDate(selectUser.birthdate)}
              bloodGroup={selectUser.country}
              region={selectUser.city}
              caste="Catholic"
              category="OBC"
              motherTongue="English"
              languages={["English", "Spanish"]}
              phoneNumber={selectUser.telephone}
              email={selectUser.email}
            />
            <div className="col-xxl-9 col-xl-8">
              <div className="row">
                <div className="col-md-12">
                  <ul className="nav nav-tabs nav-tabs-bottom mb-4">
                    <li>
                      <Link to={`/dashboard/studentDetail/${studentId}`} className="nav-link active">
                        <i className="ti ti-school me-2" />
                        details Etudiant
                      </Link>
                    </li>
                    <li>
                      <Link to={`/dashboard/studentTimeTable/${studentId}`} className="nav-link">
                        <i className="ti ti-table-options me-2" />
                        Emploie du temps
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/dashboard/studentLeave/${studentId}`}
                        className="nav-link"
                      >
                        <i className="ti ti-calendar-due me-2" />
                        Absence &amp; Presence
                      </Link>
                    </li>
                    <li>
                      <Link to={`/dashboard/studentFees/${studentId}`} className="nav-link">
                        <i className="ti ti-report-money me-2" />
                        Payement frais
                      </Link>
                    </li>
                  </ul>
                  {/* <ProfilNav routes={routes} /> */}
                  <div className="card">
                    <div className="card-header">
                      <h5>Information du Parent</h5>
                    </div>
                    {/* <div className="card-body">
                      <div className="border rounded p-3 pb-0 mb-3">
                        <div className="row">
                          <div className="col-sm-6 col-lg-4">
                            <div className="d-flex align-items-center mb-3">
                              <span className="avatar avatar-lg flex-shrink-0">
                                {selectUser?.parent?.image ? (
                                  <ImageWithBasePath
                                    src={selectUser.parent.image}
                                    className="img-fluid rounded"
                                    alt="Parent's image"
                                  />
                                ) : (
                                  <p>No image available</p>
                                )}
                              </span>
                              <div className="ms-2 overflow-hidden">
                                <h6 className="text-truncate">
                                  {selectUser?.parent
                                    ? `${selectUser.parent.firstname || "Nom non disponible"} ${selectUser.parent.lastname || ""}`
                                    : "Nom indisponible"}
                                </h6>
                                <p className="text-primary">Parent</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="col-sm-6 col-lg-4">
                            <div className="mb-3">
                              <p className="text-dark fw-medium mb-1">Numero</p>
                              <p>
                                {selectUser?.parent?.telephone || "Numéro de téléphone indisponible"}
                              </p>
                            </div>
                          </div>
                          <div className="col-sm-6 col-lg-4">
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="mb-3 overflow-hidden me-3">
                                <p className="text-dark fw-medium mb-1">Email</p>
                                <p className="text-truncate">
                                  {selectUser?.parent?.email || "Email indisponible"}
                                </p>
                              </div>
                              <Link
                                to="#"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                aria-label="Reset Password"
                                className="btn btn-dark btn-icon btn-sm mb-3"
                              >
                                <i className="ti ti-lock-x" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div className="card-body">
                      {selectUser?.parent ? ( // Vérifie si les informations du parent existent
                        <div className="border rounded p-3 pb-0 mb-3">
                          <div className="row">
                            <div className="col-sm-6 col-lg-4">
                              <div className="d-flex align-items-center mb-3">
                                <span className="avatar avatar-lg flex-shrink-0">
                                  {selectUser.parent.image ? (
                                    <ImageWithBasePath
                                      src={selectUser.parent.image}
                                      className="img-fluid rounded"
                                      alt="Parent's image"
                                    />
                                  ) : (
                                    <p>No image available</p>
                                  )}
                                </span>
                                <div className="ms-2 overflow-hidden">
                                  <h6 className="text-truncate">
                                    {`${selectUser.parent.firstname || "Nom non disponible"} ${selectUser.parent.lastname || ""}`}
                                  </h6>
                                  <p className="text-primary">Parent</p>
                                </div>
                              </div>
                            </div>

                            <div className="col-sm-6 col-lg-4">
                              <div className="mb-3">
                                <p className="text-dark fw-medium mb-1">Numéro</p>
                                <p>
                                  {selectUser.parent.telephone || "Numéro de téléphone indisponible"}
                                </p>
                              </div>
                            </div>

                            <div className="col-sm-6 col-lg-4">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="mb-3 overflow-hidden me-3">
                                  <p className="text-dark fw-medium mb-1">Email</p>
                                  <p className="text-truncate">
                                    {selectUser.parent.email || "Email indisponible"}
                                  </p>
                                </div>
                                <Link
                                  to="#"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  aria-label="Reset Password"
                                  className="btn btn-dark btn-icon btn-sm mb-3"
                                >
                                  <i className="ti ti-lock-x" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p>Aucune information sur le parent disponible</p> // Message lorsque les infos sont indisponibles
                      )}
                    </div>
                  </div>


                  <div className='col-xxl-12 d-flex justify-between'>
                    <div className="col-xxl-6 d-flex">
                      <div className="card flex-fill">
                        <div className="card-header">
                          <h5>Adresse</h5>
                        </div>
                        <div className="card-body">
                          {selectUser?.quarter || selectUser?.street || selectUser?.door ? ( // Vérification si les informations d'adresse sont disponibles
                            <div className="d-flex align-items-center mb-3">
                              <span className="avatar avatar-md bg-light-300 rounded me-2 flex-shrink-0 text-default">
                                <i className="ti ti-map-pin-up" />
                              </span>
                              <div>
                                <p className="text-dark fw-medium mb-1">Adresse</p>
                                <p className="text-truncate">
                                  {`${selectUser.quarter || ""}, ${selectUser.street || ""}, P ${selectUser.door || ""}`}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <p>Adresse indisponible</p> // Message à afficher si l'adresse est indisponible
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-xxl-5 d-flex">
                      <div className="card flex-fill">
                        <div className="card-header">
                          <h5>Documents</h5>
                        </div>
                        <div className="card-body">
                          <div className="bg-light-300 border rounded d-flex align-items-center justify-content-between mb-3 p-2">
                            <div className="d-flex align-items-center overflow-hidden">
                              <span className="avatar avatar-md bg-white rounded flex-shrink-0 text-default">
                                <i className="ti ti-pdf fs-15" />
                              </span>
                              <div className="ms-2">
                                <p className="text-truncate fw-medium text-dark">
                                  BirthCertificate.pdf
                                </p>
                              </div>
                            </div>
                            <Link to="#" className="btn btn-dark btn-icon btn-sm">
                              <i className="ti ti-download" />
                            </Link>
                          </div>
                          <div className="bg-light-300 border rounded d-flex align-items-center justify-content-between p-2">
                            <div className="d-flex align-items-center overflow-hidden">
                              <span className="avatar avatar-md bg-white rounded flex-shrink-0 text-default">
                                <i className="ti ti-pdf fs-15" />
                              </span>
                              <div className="ms-2">
                                <p className="text-truncate fw-medium text-dark">
                                  Transfer Certificate.pdf
                                </p>
                              </div>
                            </div>
                            <Link to="#" className="btn btn-dark btn-icon btn-sm">
                              <i className="ti ti-download" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>



                  <div className="col-xxl-12 d-flex">
                    <div className="card flex-fill">
                      <div className="card-header">
                        <h5>Autres Infos</h5>
                      </div>
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <span className="avatar avatar-md bg-light-300 rounded me-2 flex-shrink-0 text-default">
                            <i className="ti ti-info-circle" />
                          </span>
                          <div>
                            <p className="text-dark fw-medium mb-1">Données Autres</p>
                            <p>{selectUser?.otherInfo || "Pas d'autres infos disponibles"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <StudentModals />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDetails;
