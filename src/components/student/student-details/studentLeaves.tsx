import { Link, useParams } from "react-router-dom";
import StudentModals from "../studentModals/StudentModals";
import StudentSidebar from "./studentSidebar";
import StudentBreadcrumb from "./studentBreadcrumb";
import Table from "../Datatable/index";
import { TableData } from "../data/interface/index";
import ProfilNav from "./ProfilNav";
import { useEffect, useState } from "react";
import axios from "axios";
import AttendanceZone from "./AttendanceZone";

const StudentLeaves = () => {

  

  const [users, setUsers] = useState<any[]>([]);
  const [selectUser, setSelectUser] = useState<Record<string, any>>({});
  const [leaves, setLeaves] = useState<any[]>([]);
  const [absenceTotals, setAbsenceTotals] = useState<{ [key: string]: number }>({
    congé: 0,
    absence: 0,
    medical: 0,
  });

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
        const response = await axios.get('http://localhost:4444/api/users'); // Remplacez par votre URL API
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
      fetchLeaves(studentId);
      console.log("Users list:", users); // Après la récupération des utilisateurs
      console.log("Selected user state:", selectUser); // Après la mise à jour de selectUser

    }
  }, [users, studentId]);


  //recuperer les leaves d'un etudiant par son id
  const fetchLeaves = async (studentId: string) => {
    try {
      const response = await axios.get(`http://localhost:4444/api/leaves-user/${studentId}`);
      console.log(response.data);
      setLeaves(response.data)
      calculateAbsenceTotals();
    } catch (error: any) {
      console.log("Error fetching leave:", error.message);
    }

  }

  // Fonction pour formater les heures en "hh h mm - hh h mm" (ex: 10h 00 - 15h 00)
  function formatHeure(startTimeStr: string, endTimeStr: string): string {
    const startTime = new Date(startTimeStr);
    const endTime = new Date(endTimeStr);

    const formatTime = (time: Date): string => {
      return `${time.getUTCHours()}h ${String(time.getUTCMinutes()).padStart(2, '0')}`;
    };

    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  }

  // Fonction pour transformer les données brutes en un tableau
  function transformLeaveData(rawData: any[]): any[] {
    return rawData.map((item: any) => {
      const type = item.type;
      const status = item.status;
      const timetable = item.timetable_id;

      // Récupération de la date et des heures depuis timetable_id
      const date = formatDate(timetable.day);
      const heure = formatHeure(timetable.start_time, timetable.end_time);

      return {
        type,
        date,
        heure,
        status,
      };
    });
  }

  //fonction pour calculer les total par type 
  const calculateAbsenceTotals = () => {
    const totals = { congé: 0, absence: 0, medical: 0 };

    leaves.forEach((leave) => {
      if (leave.type === "congé") {
        totals.congé++;
      } else if (leave.type === "absence") {
        totals.absence++;
      } else if (leave.type === "medical") {
        totals.medical++;
      }
    });

    setAbsenceTotals(totals);
  };


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

  const transformedData = transformLeaveData(leaves);



  const columns = [
    {
      title: "type",
      dataIndex: "type",
      sorter: (a: TableData, b: TableData) =>
        a.leaveType.length - b.leaveType.length,
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a: TableData, b: TableData) =>
        a.leaveDate.length - b.leaveDate.length,
    },
    {
      title: "Heure ",
      dataIndex: "heure",
      sorter: (a: TableData, b: TableData) =>
        a.leaveDate.length - b.leaveDate.length,
    },
    {
      title: "date d'application",
      dataIndex: "date",
      sorter: (a: TableData, b: TableData) =>
        a.appliedOn.length - b.appliedOn.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <>
          {text === "validate" ? (
            <span className="badge badge-soft-success d-inline-flex align-items-center">
              <i className="ti ti-circle-filled fs-5 me-1"></i>
              {text}
            </span>
          ) : text === "pending" ? (
            <span className="badge badge-soft-pending d-inline-flex align-items-center">
              <i className="ti ti-circle-filled fs-5 me-1"></i>
              {text}
            </span>
          ) : text === "cancel" ? (
            <span className="badge badge-soft-danger d-inline-flex align-items-center">
              <i className="ti ti-circle-filled fs-5 me-1"></i>
              {text}
            </span>
          ) : null}

        </>
      ),
      sorter: (a: TableData, b: TableData) => a.status.length - b.status.length,
    },
  ];
  // danger
  
  return (
    <>
      {/* Page Wrapper */}
      <div className="">
        <div className="content">
          <div className="row">
            {/* Page Header */}
            <StudentBreadcrumb />
            {/* /Page Header */}
          </div>
          <div className="row">
            {/* Student Information */}
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
            {/* /Student Information */}
            <div className="col-xxl-9 col-xl-8">
              <div className="row">
                <div className="col-md-12">
                  {/* List */}
                  <ul className="nav nav-tabs nav-tabs-bottom mb-4">
                    <li>
                      <Link to={`/dashboard/studentDetail/${studentId}`} className="nav-link">
                        <i className="ti ti-school me-2" />
                        deatils Etudiant
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
                        className="nav-link active"
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
                  {/* /List */}
                  {/* Leave Nav*/}
                  <div className="card">
                    <div className="card-body pb-1">
                      <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded-fill">
                        <li className="me-3 mb-3">
                          <Link
                            to="#"
                            className="nav-link active rounded fs-12 fw-semibold"
                            data-bs-toggle="tab"
                            data-bs-target="#leave"
                          >
                            Leaves
                          </Link>
                        </li>
                        <li className="mb-3">
                          <Link
                            to="#"
                            className="nav-link rounded fs-12 fw-semibold"
                            data-bs-toggle="tab"
                            data-bs-target="#attendance"
                          >
                            Attendance
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /Leave Nav*/}
                  <div className="tab-content">
                    {/* Leave */}
                    <div className="tab-pane fade show active" id="leave">
                      <div className="row gx-3">
                        <div className="col-lg-6 col-xxl-3 d-flex">
                          <div className="card flex-fill">
                            <div className="card-body">
                              <h5 className="mb-2">nombre de conge</h5>
                              <div className="d-flex align-items-center flex-wrap">
                                
                                <p className="mb-0">{absenceTotals.congé}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-xxl-3 d-flex">
                          <div className="card flex-fill">
                            <div className="card-body">
                              <h5 className="mb-2">Conge cause Medical</h5>
                              <div className="d-flex align-items-center flex-wrap">
                                <p className="mb-0">{absenceTotals.medical}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-xxl-3 d-flex">
                          <div className="card flex-fill">
                            <div className="card-body">
                              <h5 className="mb-2">Absence</h5>
                              <div className="d-flex align-items-center flex-wrap">
                               
                                <p className="mb-0">{absenceTotals.absence}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
                          <h4 className="mb-3">Absence</h4>
                          <Link
                            to="#"
                            data-bs-target="#apply_leave"
                            data-bs-toggle="modal"
                            className="btn btn-primary d-inline-flex align-items-center mb-3"
                          >
                            <i className="ti ti-calendar-event me-2" />
                            Demande d'abscence
                          </Link>
                        </div>
                        {/* Leaves List */}
                        <div className="card-body p-0 py-3">
                          {
                            transformedData && transformedData.length > 0 && (
                              <Table
                                dataSource={transformedData}
                                columns={columns}
                                Selection={false}
                              />
                            )
                          }
                        </div>
                        {/* /Leaves List */}
                      </div>
                    </div>
                    {/* /Leave */}
                    {/* Attendance */}
                    <AttendanceZone/>
                    {/* /Attendance */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      <StudentModals />
    </>
  );
};

export default StudentLeaves;
