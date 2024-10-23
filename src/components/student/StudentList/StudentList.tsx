import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import StudentModals from "../studentModals/StudentModals";
import Table from "../Datatable/index";
import {
  allClass,
  allSection,
  gender,
  names,
  status,
} from "./selectoption";
import CommonSelect from "../commonSelect/CommonSelect";
import TooltipOption from "../tooltipOption/TooltipOption";
import { useGetAllUsersQuery } from "@/redux/features/authSlice"; // Assuming this uses React Query

const StudentList = () => {
  const { data: usersData, isLoading } = useGetAllUsersQuery(); // Utilisation de React Query pour la gestion des requêtes
  const [classroomStudentData, setClassroomStudentData] = useState<any[]>([]); // Utilisation du type any[] pour éviter les erreurs de typage
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // État pour stocker l'ID de l'utilisateur selectionner

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId); // Mettre à jour l'état avec l'ID de l'utilisateur
  };

  useEffect(() => {
    // Fonction pour récupérer les données via axios
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4444/api/classroom_etudiants'); // Remplacez par votre URL API

        setClassroomStudentData(response.data); // Stocker les données dans l'état

      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData(); // Appel de la fonction
  }, []); // Le tableau vide signifie que l'effet s'exécute une seule fois après le montage

// Fonction pour trouver le nom de la classe d'un étudiant
function getClassroomNameByStudentId(studentId: string | null): string {
  // Vérifier si studentId est null
  if (!studentId) {
    return "aucune classe"; // Retourner "aucune classe" si l'ID est null
  }

  // Parcourir le tableau pour trouver l'étudiant correspondant
  const studentClass = classroomStudentData.find(cs => 
    cs.student_id?._id === studentId && cs.classroom_id?.name !== undefined
  );

  // Si une classe est trouvée, retourner son nom, sinon retourner "aucune classe"
  return studentClass ? studentClass.classroom_id.name : "aucune classe";
}



  // Filtrer uniquement les étudiants
  const students = usersData?.filter((user) => user.role === "etudiant") || [];
  console.log(students);
  

  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);

  const handleApplyClick = () => {
    if (dropdownMenuRef.current) {
      dropdownMenuRef.current.classList.remove("show");
    }
};

  // Fonction pour formater la date
  function formatDate(dateString: string): string {
    // Convertir la chaîne de caractères en objet Date
    const date = new Date(dateString);

    // Options pour le formatage
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };

    // Retourner la date formatée
    return date.toLocaleDateString('fr-FR', options);
  }


  const columns = [
    {
      title: "Nom",
      dataIndex: "firstname",
      render: (text: string, record: any) => (
        <div className="d-flex align-items-center">
          {/* <Link to="#" className="avatar avatar-md">
            <ImageWithBasePath
              src={record.imgSrc}
              className="img-fluid rounded-circle"
              alt="img"
            />
          </Link> */}
          <div className="ms-2">
            <p className="text-dark mb-0">
              <Link to="#">{text}</Link>
            </p>
          </div>
        </div>
      ),
      // sorter: (a, b) => a.firstname.localeCompare(b.firstname),
    },
    {
      title: "Classe",
      dataIndex: "_id",
      render: (text: string) => (
        <div className="d-flex align-items-center">
          <div className="ms-2">
            <p className="text-dark mb-0">
              {getClassroomNameByStudentId(text)}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Genre",
      dataIndex: "gender",
      // sorter: (a, b) => a.gender.localeCompare(b.gender),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <>
          {text === "actif" ? (
            <span className="badge badge-soft-success d-inline-flex align-items-center">
              <i className="ti ti-circle-filled fs-5 me-1"></i>
              {text}
            </span>
          ) : (
            <span className="badge badge-soft-danger d-inline-flex align-items-center">
              <i className="ti ti-circle-filled fs-5 me-1"></i>
              {text}
            </span>
          )}
        </>
      ),
      // sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Date arriver",
      dataIndex: "createdAt",
      render: (text: string, record: any) => (
        <div className="d-flex align-items-center">
          <div className="ms-2">
            <p className="text-dark mb-0">
              {formatDate(text)}
            </p>
          </div>
        </div>
      )
      // sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Date Naissance",
      dataIndex: "birthdate",
      render: (text: string, record: any) => (
        <div className="d-flex align-items-center">
          <div className="ms-2">
            <p className="text-dark mb-0">
              {formatDate(text)}
            </p>
          </div>
        </div>
      )
      // sorter: (a, b) => new Date(a.birthdate).getTime() - new Date(b.birthdate).getTime(),
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (text: string) => (
        <div className="d-flex align-items-center">
          <Link
            to="#"
            data-bs-toggle="modal"
            data-bs-target="#add_fees_collect"
            className="btn btn-light fs-12 fw-semibold me-3"
          >
            Collect Fees
          </Link>
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
                <Link className="dropdown-item rounded-1" to={`/dashboard/studentDetail/${text}`}>
                  <i className="ti ti-menu me-2" />
                  Voir etudiant
                </Link>
              </li>
              <li>
                <Link className="dropdown-item rounded-1" to="{routes.editStudent}">
                  <i className="ti ti-edit-circle me-2" />
                  Modifier
                </Link>
              </li>
              <li>
                <Link className="dropdown-item rounded-1" to="student-promotion">
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
                  onClick={() => handleSelectUser(text)}
                >
                  <i className="ti ti-trash-x me-2" />
                  Supprimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div>
        <div className="content">
          <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
            <div className="my-auto mb-2">
              <h3 className="page-title mb-1">Students List</h3>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="{routes.adminDashboard}">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">Students</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    All Students
                  </li>
                </ol>
              </nav>
            </div>
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
              <TooltipOption />
              <div className="mb-2">
                <Link to="{routes.addStudent}" className="btn btn-primary d-flex align-items-center">
                  <i className="ti ti-square-rounded-plus me-2" />
                  Add Student
                </Link>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
              <h4 className="mb-3">Students List</h4>
              <div className="d-flex align-items-center flex-wrap">
                <div className="dropdown mb-3 me-2">
                  <Link
                    to="#"
                    className="btn btn-outline-light bg-white dropdown-toggle"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    <i className="ti ti-filter me-2" />
                    Filter
                  </Link>
                  <div className="dropdown-menu drop-width" ref={dropdownMenuRef}>
                    <form>
                      <div className="d-flex align-items-center border-bottom p-3">
                        <h4>Filter</h4>
                      </div>
                      <div className="p-3 pb-0 border-bottom">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Class</label>
                              <CommonSelect
                                className="select"
                                options={allClass}
                                defaultValue={allClass[0]}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Section</label>
                              <CommonSelect
                                className="select"
                                options={allSection}
                                defaultValue={allSection[0]}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">Student Name</label>
                              <CommonSelect
                                className="select"
                                options={names}
                                defaultValue={names[0]}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Gender</label>
                              <CommonSelect
                                className="select"
                                options={gender}
                                defaultValue={gender[0]}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Status</label>
                              <CommonSelect
                                className="select"
                                options={status}
                                defaultValue={status[0]}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 d-flex justify-content-end gap-2">
                        <button
                          type="reset"
                          className="btn btn-outline-danger btn-pill"
                          data-bs-dismiss="modal"
                        >
                          Clear
                        </button>
                        <button type="submit" className="btn btn-primary btn-pill" onClick={handleApplyClick}>
                          Apply
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              {isLoading ? (
                <div>Chargement en cours...</div>
              ) : (
                <Table columns={columns} dataSource={students} />
              )}
            </div>
          </div>
        </div>
        <StudentModals idStudent={selectedUserId? selectedUserId : ""}/>
      </div>
    </>
  );
};

export default StudentList;
