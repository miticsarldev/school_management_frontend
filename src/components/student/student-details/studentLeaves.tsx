import { Link, useParams } from "react-router-dom";
import StudentModals from "../studentModals/StudentModals";
import StudentSidebar from "./studentSidebar";
import StudentBreadcrumb from "./studentBreadcrumb";
import Table from "../Datatable/index";
import { TableData, status } from '../data/interface/index';
import { useEffect, useState } from "react";
import axios from "axios";



const StudentLeaves = () => {

  const [users, setUsers] = useState<any[]>([]);
  const [selectUser, setSelectUser] = useState<Record<string, any>>({});
  const [leaves, setLeaves] = useState<any[]>([]);
  const [absenceTotals, setAbsenceTotals] = useState<{ [key: string]: number }>({
    congé: 0,
    absence: 0,
    medical: 0,
  });
  const [Attendance, setAttendance] = useState<any[]>([]);
  // État pour stocker le total de présences et d'absences
  const [totals, setTotals] = useState({
    presence: 0,
    absence: 0
  });


  const { studentId } = useParams(); // Récupère l'ID de l'étudiant à partir des paramètres
  console.log('Student ID:', studentId); // Vérification de l'ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4444/api/users'); // Remplacez par votre URL API
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
      fetchAttendance(studentId);
    }
  }, [users, studentId]);


  //recuperer les leaves d'un etudiant par son id
  const fetchLeaves = async (studentId: string) => {
    try {
      const response = await axios.get(`http://localhost:4444/api/leaves-user/${studentId}`);
      setLeaves(response.data)
      calculateAbsenceTotals();
    } catch (error: any) {
      console.log("Error fetching leave:", error.message);
    }

  }

  //recuperer les atttendance d'un etudiant par son id
  const fetchAttendance = async (studentId: string) => {
    try {
      const response = await axios.get(`http://localhost:4444/api/attendance/user/${studentId}`);
      console.log(response.data);
      setAttendance(groupByWeeks(response.data))
      console.log(JSON.stringify(Attendance))
      calculateTotals(response.data)
    } catch (error: any) {
      console.log("Error fetching leave:", error.message);
    }

  }
  //fonction pour grouper les attendes par semaines
  function groupByWeeks(data: any[]): any[] {
    const weeks: any[] = [];

    // Fonction pour obtenir la semaine du mois à partir d'une date
    function getWeekNumber(date: string): number {
      const d = new Date(date);
      const startOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
      const diff = (d.getTime() - startOfMonth.getTime()) / (1000 * 60 * 60 * 24); // Différence en jours
      return Math.floor(diff / 7) + 1;
    }

    // Initialiser la structure d'une semaine
    function initializeWeekStructure(): any {
      return {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
      };
    }

    // Mapper le jour (numérique) au nom de jour
    const daysMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Parcourir les données
    data.forEach((entry: any) => {
      const date = new Date(entry.timetable_id.day);
      const dayOfWeek = daysMap[date.getDay()]; // Nom du jour (e.g. "Monday")
      const weekNumber = getWeekNumber(entry.timetable_id.day); // Numéro de semaine

      // Trouver ou créer la semaine correspondante
      let week = weeks.find(w => w.week === weekNumber);
      if (!week) {
        week = { week: weekNumber, days: initializeWeekStructure() };
        weeks.push(week);
      }

      // Ajouter la présence (true/false) au jour correspondant
      if (dayOfWeek in week.days) {
        week.days[dayOfWeek].push(entry.status);
      }
    });

    return weeks;
  }

  // Méthode pour calculer les totaux
  const calculateTotals = (data: any[]) => {
    let presenceCount = 0;
    let absenceCount = 0;

    data.forEach(entry => {
      if (entry.status) {
        presenceCount += 1;
      } else {
        absenceCount += 1;
      }
    });

    // Mettre à jour l'état avec les nouveaux totaux
    setTotals({
      presence: presenceCount,
      absence: absenceCount
    });
  };

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

  //columns pour leave
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

  // columns pour Attendance
  const columns2 = [
    {
      title: "Semaine",
      dataIndex: "week",
      render: (text: any) => <span>{`Semaine ${text}`}</span>,
      sorter: (a: any, b: any) => a.week - b.week,
    },
    {
      title: "Lundi",
      dataIndex: "days",
      render: (days: any) => (
        <div style={{ display: 'flex', gap: '4px' }}>
          {Array.isArray(days.Monday) && days.Monday.length > 0 ? (
            days.Monday.map((status: boolean, index: number) => (
              <span key={index} className={`attendance-range ${status ? 'bg-success' : 'bg-danger'}`}></span>
            ))
          ) : (
            <span>N/A</span>
          )}
        </div>
      ),
      sorter: (a: any, b: any) => (a.days.Monday?.length || 0) - (b.days.Monday?.length || 0),
    },
    {
      title: "Mardi",
      dataIndex: "days",
      render: (days: any) => (
        <>
          {Array.isArray(days.Tuesday) && days.Tuesday.length > 0 ? (
            days.Tuesday.map((status: boolean, index: number) => (
              <span key={index} className={`attendance-range ${status ? 'bg-success' : 'bg-danger'}`}></span>
            ))
          ) : (
            <span>N/A</span>
          )}
        </>
      ),
      sorter: (a: any, b: any) => (a.days.Tuesday?.length || 0) - (b.days.Tuesday?.length || 0),
    },
    {
      title: "Mercredi",
      dataIndex: "days",
      render: (days: any) => (
        <div style={{ display: 'flex', gap: '4px' }}>
          {Array.isArray(days.Wednesday) && days.Wednesday.length > 0 ? (
            days.Wednesday.map((status: boolean, index: number) => (
              <span key={index} className={`attendance-range ${status ? 'bg-success' : 'bg-danger'}`}></span>
            ))
          ) : (
            <span>N/A</span>
          )}
        </div>
      ),
      sorter: (a: any, b: any) => (a.days.Wednesday?.length || 0) - (b.days.Wednesday?.length || 0),
    },
    {
      title: "Jeudi",
      dataIndex: "days",
      render: (days: any) => (
        <div style={{ display: 'flex', gap: '4px' }}>
          {Array.isArray(days.Thursday) && days.Thursday.length > 0 ? (
            days.Thursday.map((status: boolean, index: number) => (
              <span key={index} className={`attendance-range ${status ? 'bg-success' : 'bg-danger'}`}></span>
            ))
          ) : (
            <span>N/A</span>
          )}
        </div>
      ),
      sorter: (a: any, b: any) => (a.days.Thursday?.length || 0) - (b.days.Thursday?.length || 0),
    },
    {
      title: "Vendredi",
      dataIndex: "days",
      render: (days: any) => (
        <div style={{ display: 'flex', gap: '4px' }}>
          {Array.isArray(days.Friday) && days.Friday.length > 0 ? (
            days.Friday.map((status: boolean, index: number) => (
              <span key={index} className={`attendance-range ${status ? 'bg-success' : 'bg-danger'}`}></span>
            ))
          ) : (
            <span>N/A</span>
          )}
        </div>
      ),
      sorter: (a: any, b: any) => (a.days.Friday?.length || 0) - (b.days.Friday?.length || 0),
    },
  ];

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
                    <div className="tab-pane fade" id="attendance">
                      <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-1">
                          <h4 className="mb-3">Attendance</h4>
                        </div>
                        <div className="card-body pb-1">
                          <div className="row">
                            {/* Total Present */}
                            <div className="col-md-6 col-xxl-3 d-flex">
                              <div className="d-flex align-items-center rounded border p-3 mb-3 flex-fill">
                                <span className="avatar avatar-lg bg-primary-transparent rounded me-2 flex-shrink-0 text-primary">
                                  <i className="ti ti-user-check fs-24" />
                                </span>
                                <div className="ms-2">
                                  <p className="mb-1">Total de Presence</p>
                                  <h5>{totals.presence}</h5>
                                </div>
                              </div>
                            </div>
                            {/* /Total Present */}
                            {/* Total Absent */}
                            <div className="col-md-6 col-xxl-3 d-flex">
                              <div className="d-flex align-items-center rounded border p-3 mb-3 flex-fill">
                                <span className="avatar avatar-lg bg-danger-transparent rounded me-2 flex-shrink-0 text-danger">
                                  <i className="ti ti-user-check fs-24" />

                                </span>
                                <div className="ms-2">
                                  <p className="mb-1">total Absence</p>
                                  <h5>{totals.absence}</h5>
                                </div>
                              </div>
                            </div>
                            {/* /Total Absent */}
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-1">
                          <h4 className="mb-3">Absence et presence</h4>
                        </div>
                        <div className="card-body p-0 py-3">
                          <div className="px-3">
                            <div className="d-flex align-items-center flex-wrap">
                              <div className="d-flex align-items-center bg-white border rounded p-2 me-3 mb-3">
                                <span className="avatar avatar-sm bg-success rounded me-2 flex-shrink-0 ">
                                  <i className="ti ti-checks" />
                                </span>
                                <p className="text-dark">Present</p>
                              </div>
                              <div className="d-flex align-items-center bg-white border rounded p-2 me-3 mb-3">
                                <span className="avatar avatar-sm bg-danger rounded me-2 flex-shrink-0 ">
                                  <i className="ti ti-x" />
                                </span>
                                <p className="text-dark">Absent</p>
                              </div>
                            </div>
                          </div>

                          {Attendance && Attendance.length > 0 ? (
                            <Table
                              dataSource={Attendance}
                              columns={columns2}
                            />
                          ) : (
                            <p>Aucune donnée à afficher</p>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* /Attendance */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      {/* <StudentModals /> */}
    </>
  );
};

export default StudentLeaves;
