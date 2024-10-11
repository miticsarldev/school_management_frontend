import React, { useState } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import ImageWithBasePath from "../core/common/imageWithBasePath";
import ReactApexChart from "react-apexcharts";
import { selectAuth, useGetAllUsersStudentByParentIdQuery } from "@/redux/features/authSlice";
import { useGetAllEventsByUserIdQuery } from "@/redux/features/eventSlice";
import { useAppSelector } from "@/redux/hooks";
import { skipToken } from "@reduxjs/toolkit/query";
const ParentDashboard = () => {
  const routes = all_routes;
  const [activeStudent, setActiveStudent] = useState<string>("student-1");
  const [statistic_chart] = useState<any>({
    chart: {
      type: "line",
      height: 345,
    },
    series: [
      {
        name: "Avg. Exam Score",
        data: [0, 32, 40, 50], // Sample data
      },
      {
        name: "Avg. Attendance",
        data: [0, 35, 43, 34], // Sample data
      },
    ],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return val + "%";
        },
      },
      shared: true,
      intersect: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        return `<div class="apexcharts-tooltip">${w.globals.labels[dataPointIndex]}<br>Exam Score: <span style="color: #1E90FF;">${series[0][dataPointIndex]}%</span><br>Attendance: <span style="color: #00BFFF;">${series[1][dataPointIndex]}%</span></div>`;
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        left: -8,
      },
    },
    yaxis: {
      labels: {
        offsetX: -15,
      },
    },
    markers: {
      size: 0,
      colors: ["#1E90FF", "#00BFFF"],
      strokeColors: "#fff",
      strokeWidth: 1,
      hover: {
        size: 7,
      },
    },
    colors: ["#3D5EE1", "#6FCCD8"], // Color for the lines
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
  });
  const { user } = useAppSelector(selectAuth);
  const parentId = user?._id;
  
  //Vérifier si parentId est défini avant d'appeler le hook
  const { data: children, isLoading } = useGetAllUsersStudentByParentIdQuery(parentId || skipToken);

  // Toujours appeler le hook, mais avec skipToken si singleChild est nul
  const { data: events } = useGetAllEventsByUserIdQuery(parentId || skipToken);
  console.log(events);
  if (isLoading) return <div>Chargement...</div>;
  return (
        <div className="content">
          {/* Page Header */}
          <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
            <div className="my-auto mb-2">
              <h3 className="page-title mb-1">Parent Dashboard</h3>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to={routes.adminDashboard}>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Parent Dashboard
                  </li>
                </ol>
              </nav>
            </div>
            <div className="dash-select-student d-flex align-items-center mb-2">
              <h6 className="mb-0">Select Student</h6>
              <div className="student-active d-flex align-items-center ms-2">
                <Link
                  to="#"
                  onClick={() => setActiveStudent("student-1")}
                  className={`avatar avatar-lg p-1 me-2 ${
                    activeStudent === "student-1" && "active"
                  }`}
                >
                  <ImageWithBasePath
                    src="assets/img/students/student-01.jpg"
                    alt="Profile"
                  />
                </Link>
                <Link
                  to="#"
                  onClick={() => setActiveStudent("student-2")}
                  className={`avatar avatar-lg p-1  ${
                    activeStudent === "student-2" && "active"
                  }`}
                >
                  <ImageWithBasePath
                    src="assets/img/students/student-02.jpg"
                    alt="Profile"
                  />
                </Link>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            {/* Profile */}
            <div className="col-xxl-5 col-xl-12 d-flex">
              <div className="card bg-dark position-relative flex-fill">
                <div className="card-body">
                  <div className="d-flex align-items-center row-gap-3">
                    <div className="avatar avatar-xxl rounded flex-shrink-0 me-3">
                      <ImageWithBasePath
                        src="assets/img/parents/parent-01.jpg"
                        alt="Img"
                      />
                    </div>
                    <div className="d-block">
                      <span className="badge bg-transparent-primary text-primary mb-1">
                      {user?._id}
                      </span>
                      <h4 className="text-truncate text-white mb-1">
                      {user?.firstname} {user?.lastname}
                      </h4>
                      <div className="d-flex align-items-center flex-wrap row-gap-2 class-info">
                        <span>
                          Ajouter le : {user?.createdAt && new Date(user.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                        <ul className="ms-2"> {/* Ajoutez la classe ici */}
                          {children && children.length > 0 ? (
                            children.map((child) => (
                              <li key={child._id}>
                                <span>Enfant : {child.firstname} {child.lastname}</span>
                              </li>
                            ))
                          ) : (
                            <li>Aucun étudiant trouvé pour ce parent.</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="student-card-bg">
                    <ImageWithBasePath
                      src="assets/img/bg/circle-shape.png"
                      alt="Bg"
                    />
                    <ImageWithBasePath
                      src="assets/img/bg/shape-02.png"
                      alt="Bg"
                    />
                    <ImageWithBasePath
                      src="assets/img/bg/shape-04.png"
                      alt="Bg"
                    />
                    <ImageWithBasePath
                      src="assets/img/bg/blue-polygon.png"
                      alt="Bg"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* /Profile */}
            {/* Leave */}
            <div className="col-xxl-7 d-flex">
              <div className="row flex-fill">
                {/* <div className="col-xl-4 d-flex flex-column">
                  <div className="d-flex bg-white border rounded flex-wrap justify-content-between align-items-center p-3 row-gap-2 mb-2 animate-card">
                    <div className="d-flex align-items-center">
                      <span className="avatar avatar-sm bg-light-500 me-2 rounded">
                        <i className="ti ti-calendar-event text-dark fs-16" />
                      </span>
                      <h6>Apply Leave</h6>
                    </div>
                    <Link
                      to={routes.studentLeaves}
                      className="badge rounded-circle arrow d-flex align-items-center justify-content-center"
                    >
                      <i className="ti ti-chevron-right fs-14" />
                    </Link>
                  </div>
                  <div className="d-flex bg-white border rounded flex-wrap justify-content-between align-items-center p-3 row-gap-2 mb-4 animate-card">
                    <div className="d-flex align-items-center">
                      <span className="avatar avatar-sm bg-light-500 me-2 rounded">
                        <i className="ti ti-message-up text-dark fs-16" />
                      </span>
                      <h6>Raise a Request</h6>
                    </div>
                    <Link
                      to={routes.approveRequest}
                      className="badge rounded-circle arrow d-flex align-items-center justify-content-center"
                    >
                      <i className="ti ti-chevron-right fs-14" />
                    </Link>
                  </div>
                </div> */}
                <div className="col-xl-6 col-md-6">
                  <div className="card bg-success-transparent border-3 border-white text-center p-3">
                    <span className="avatar avatar-sm rounded bg-success mx-auto mb-3">
                      <i className="ti ti-calendar-share fs-15" />
                    </span>
                    <h6 className="mb-2">Congés de maladies (nombre)</h6>
                    <div className="d-flex align-items-center justify-content-between text-default">
                      <p className="border-end mb-0">Utilisés : 05</p>
                      <p>Disponible : 10</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-md-6">
                  <div className="card bg-primary-transparent border-3 border-white text-center p-3">
                    <span className="avatar avatar-sm rounded bg-primary mx-auto mb-3">
                      <i className="ti ti-hexagonal-prism-plus fs-15" />
                    </span>
                    <h6 className="mb-2">Congés occasionnels (nombre)</h6>
                    <div className="d-flex align-items-center justify-content-between text-default">
                      <p className="border-end mb-0">Utilisés : 05</p>
                      <p>Disponible : 10</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Leave */}
          </div>
          <div className="row">
            {/* Events List */}
            <div className="col-xxl-4 col-xl-6 d-flex">
              <div className="card flex-fill">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h4 className="card-title">Liste des événements</h4>
                  <Link to={routes.events} className="fw-medium">
                    Voir tout
                  </Link>
                </div>
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush">
                    {events && events.length > 0 ? (
                      events.map(event => (
                        <li className="list-group-item p-3" key={event._id}>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                              <Link to="#" className="avatar avatar-lg flex-shrink-0 me-2">
                                <ImageWithBasePath
                                  src="assets/img/events/event-01.jpg" // Placeholder image
                                  className="img-fluid"
                                  alt="img"
                                />
                              </Link>
                              <div className="overflow-hidden">
                                <h6 className="mb-1">
                                  <Link to={routes.events}>{event.title}</Link>
                                </h6>
                                <p>
                                  <i className="ti ti-calendar me-1" />
                                  {new Date(event.start_date).toLocaleDateString()} {/* Formatage de la date */}
                                </p>
                              </div>
                            </div>
                            <span>
  {event.start_hour ? new Date(event.start_hour).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'} 
  - 
  {event.end_hour ? new Date(event.end_hour).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'} 
  heures
</span>

                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item p-3">Aucun événement trouvé</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            {/* /Events List */}
            {/* Statistics */}
            <div className="col-xxl-8 col-xl-6 d-flex">
              <div className="card flex-fill">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h4 className="card-title">Statistiques</h4>
                  <div className="dropdown">
                    <Link
                      to="#"
                      className="bg-white dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      <i className="ti ti-calendar me-2" />
                      Ce mois
                    </Link>
                    <ul className="dropdown-menu mt-2 p-3">
                      <li>
                        <Link to="#" className="dropdown-item rounded-1">
                          Ce mois
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-item rounded-1">
                          Cette année
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-item rounded-1">
                          La semaine dernière
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body pb-0">
                  <div id="statistic_chart" />
                  <ReactApexChart
                    id="statistic_chart"
                    options={statistic_chart}
                    series={statistic_chart.series}
                    type="line"
                    height={345}
                  />
                </div>
              </div>
            </div>
            {/* /Statistics */}
          </div>
          <div className="row">
            {/* Leave Status */}
            <div className="col-xxl-4 col-xl-6 d-flex">
              <div className="card flex-fill">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h4 className="card-title">Statut de congé</h4>
                  <div className="dropdown">
                    <Link
                      to="#"
                      className="bg-white dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      <i className="ti ti-calendar me-2" />
                      Ce mois
                    </Link>
                    <ul className="dropdown-menu mt-2 p-3">
                      <li>
                        <Link to="#" className="dropdown-item rounded-1">
                          Ce mois
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-item rounded-1">
                          Cette année
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-item rounded-1">
                          Dernère Semaine
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <div className="bg-light-300 d-sm-flex align-items-center justify-content-between p-3 mb-3">
                    <div className="d-flex align-items-center mb-2 mb-sm-0">
                      <div className="avatar avatar-lg bg-danger-transparent flex-shrink-0 me-2">
                        <i className="ti ti-brand-socket-io" />
                      </div>
                      <div>
                        <h6 className="mb-1">Titre de congé</h6>
                        <p>Date : date du congé</p>
                      </div>
                    </div>
                    <span className="badge bg-skyblue d-inline-flex align-items-center">
                      <i className="ti ti-circle-filled fs-5 me-1" />
                      status
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* /Leave Status */}
            {/* Home Works */}
            <div className="col-xxl-4  col-xl-6 d-flex">
              <div className="card flex-fill">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h4 className="card-titile">Devoirs</h4>
                  <div className="dropdown">
                    <Link
                      to="#"
                      className="bg-white dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      <i className="ti ti-book-2 me-2" />
                      Toutes les Matieres
                    </Link>
                    <ul className="dropdown-menu mt-2 p-3">
                      <li>
                        <Link to="#" className="dropdown-item rounded-1">
                          nom de la matiere
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body py-1">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item py-3 px-0">
                      <div className="d-flex align-items-center">
                        <Link
                          to="#"
                          className="avatar avatar-xl flex-shrink-0 me-2"
                        >
                          <ImageWithBasePath
                            src="assets/img/home-work/home-work-01.jpg"
                            alt="img"
                          />
                        </Link>
                        <div className="overflow-hidden">
                          <p className="d-flex align-items-center text-info mb-1">
                            <i className="ti ti-tag me-2" />
                            nom de la matiere
                          </p>
                          <h6 className="text-truncate mb-1">
                            <Link to={routes.classHomeWork}>
                              Titre du devoir
                            </Link>
                          </h6>
                          <div className="d-flex align-items-center flex-wrap">
                            <div className="d-flex align-items-center border-end me-1 pe-1">
                              <Link
                                to={routes.teacherDetails}
                                className="avatar avatar-xs flex-shrink-0 me-2"
                              >
                                <ImageWithBasePath
                                  src="assets/img/teachers/teacher-01.jpg"
                                  className="rounded-circle"
                                  alt="teacher"
                                />
                              </Link>
                              <p className="text-dark">Nom du prof</p>
                            </div>
                            <p>A rendre avant : date de fin du devoir</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Home Works */}
            {/* Fees Reminder */}
            <div className="col-xxl-4 col-xl-12 d-flex">
              <div className="card flex-fill">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h4 className="card-titile">Rappel des frais</h4>
                  <Link
                    to={routes.feesAssign}
                    className="link-primary fw-medium"
                  >
                    Voir tout
                  </Link>
                </div>
                <div className="card-body py-1">
                  <div className="d-flex align-items-center justify-content-between py-3">
                    <div className="d-flex align-items-center overflow-hidden me-2">
                      <span className="bg-info-transparent avatar avatar-lg me-2 rounded-circle flex-shrink-0">
                        <i className="ti ti-bus-stop fs-16" />
                      </span>
                      <div className="overflow-hidden">
                        <h6 className="text-truncate mb-1">Titre frais</h6>
                        <p>montant</p>
                      </div>
                    </div>
                    <div className="text-end">
                      <h6 className="mb-1">Dernère date</h6>
                      <p>date_dernière</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Fees Reminder */}
          </div>
          <div className="row">
            {/* Exam Result */}
            <div className="col-xxl-8 col-xl-7 d-flex">
              <div className="card flex-fill">
                <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
                  <h4 className="card-title mb-3">Resultat d'examen</h4>
                  <div className="d-flex align-items-center">
                    <div className="dropdown me-3 mb-3">
                      <Link
                        to="#"
                        className="bg-white dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        <i className="ti ti-calendar me-2" />
                        Toutes les classes
                      </Link>
                      <ul className="dropdown-menu mt-2 p-3">
                        <li>
                          <Link to="#" className="dropdown-item rounded-1">
                            nom de la classe
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="dropdown mb-3">
                      <Link
                        to="#"
                        className="bg-white dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        <i className="ti ti-calendar me-2" />
                        Tous les examens
                      </Link>
                      <ul className="dropdown-menu mt-2 p-3">
                        <li>
                          <Link to="#" className="dropdown-item rounded-1">
                          Titre du Type examen
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body px-0">
                  <div className="custom-datatable-filter table-responsive">
                    <table className="table">
                      <thead className="thead-light">
                        <tr>
                          <th>ID</th>
                          <th>Nom</th>
                          <th>Classes </th>
                          <th>Notes %</th>
                          <th>Examens</th>
                          <th>Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>id</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                to={routes.studentDetail}
                                className="avatar avatar-md"
                              >
                                <ImageWithBasePath
                                  src="assets/img/students/student-01.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="img"
                                />
                              </Link>
                              <div className="ms-2">
                                <p className="text-dark mb-0">
                                  <Link to={routes.studentDetail}>Janet</Link>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>III</td>
                          <td>89%</td>
                          <td>Quartely</td>
                          <td>
                            <span className="badge bg-success">Pass</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* /Exam Result */}
            {/* Notice Board */}
            <div className="col-xxl-4 col-xl-5 d-flex">
              <div className="card flex-fill">
                <div className="card-header  d-flex align-items-center justify-content-between">
                  <h4 className="card-title">Tableau d'affichage</h4>
                  <Link to={routes.noticeBoard} className="fw-medium">
                    Voir tout
                  </Link>
                </div>
                <div className="card-body">
                  <div className="notice-widget">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="d-flex align-items-center overflow-hidden me-2">
                        <span className="bg-primary-transparent avatar avatar-md me-2 rounded-circle flex-shrink-0">
                          <i className="ti ti-books fs-16" />
                        </span>
                        <div className="overflow-hidden">
                          <h6 className="text-truncate mb-1">
                            New Syllabus Instructions
                          </h6>
                          <p>
                            <i className="ti ti-calendar me-2" />
                            Added on : 11 Mar 2024
                          </p>
                        </div>
                      </div>
                      <Link to={routes.noticeBoard}>
                        <i className="ti ti-chevron-right fs-16" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Notice Board */}
          </div>
        </div>
  );
};

export default ParentDashboard;
