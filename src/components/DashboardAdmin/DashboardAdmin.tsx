import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import "bootstrap-daterangepicker/daterangepicker.css";
import ImageWithBasePath from "../ImageWithBasePath/ImageWithBasePath";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdminDashboardModal from "../AdminDashboardModal/AdminDashboardModal";
import UserCard from "../UserCard/UserCard";
import Attendance from "../Attendance/Attendance";
import ClassRoutine from "../ClassRoutine/ClassRoutine";
import PerformanceCard from "../PerformanceCard/PerformanceCard";
import FeesCollectionCard from "../FeesCollectionCard.tsx/FeesCollectionCard";
import LeaveRequestCard from "../LeaveRequestCard/LeaveRequestCard";
import StudentGradesChart from "../StudentGradesChart/StudentGradesChart";



const DashboardAdmin = () => {
  const [date, setDate] = useState<Nullable<Date>>(null);
  function SampleNextArrow(props: any) {
    const { style, onClick } = props;
    return (
      <div
        className="slick-nav slick-nav-next"
        style={{ ...style, display: "flex", top: "30%", right: "30%" }}
        onClick={onClick}
      >
        <i className="fas fa-chevron-right" style={{ color: "#677788" }}></i>
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { style, onClick } = props;
    return (
      <div
        className="slick-nav slick-nav-prev"
        style={{ ...style, display: "flex", top: "30%", left: "30%" }}
        onClick={onClick}
      >
        <i className="fas fa-chevron-left" style={{ color: "#677788" }}></i>
      </div>
    );
  }
  const settings = {
    dots: false,
    autoplay: false,
    arrows: false,
    slidesToShow: 2,
    margin: 24,
    speed: 500,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const student = {
    dots: false,
    autoplay: false,
    slidesToShow: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const teacher = {
    dots: false,
    autoplay: false,
    slidesToShow: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const [studentDonutChart] = useState<any>({
    chart: {
      height: 218,
      width: 218,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    colors: ["#3D5EE1", "#6FCCD8"],
    series: [3610, 44],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 180,
          },
        },
      },
    ],
  });
  const [teacherDonutChart] = useState<any>({
    chart: {
      height: 218,
      width: 218,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    colors: ["#3D5EE1", "#6FCCD8"],
    series: [346, 54],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 180,
          },
        },
      },
    ],
  });
  const [staffDonutChart] = useState<any>({
    chart: {
      height: 218,
      width: 218,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    colors: ["#3D5EE1", "#6FCCD8"],
    series: [620, 80],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 180,
          },
        },
      },
    ],
  });
  
  const performanceData = {
    top: 45,
    average: 11,
    belowAvg: 2,
  };
  
  const [classDonutChart] = useState<any>({
    chart: {
      height: 218,
      width: 218,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    labels: ["Good", "Average", "Below Average"],
    legend: { show: false },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      tickAmount: 3,
      labels: {
        offsetX: -15,
      },
    },
    grid: {
      padding: {
        left: -8,
      },
    },
    colors: ["#3D5EE1", "#EAB300", "#E82646"],
    series: [45, 11, 2],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 180,
          },
        },
      },
    ],
  });
  const [feesBar] = useState<any>({
    chart: {
      height: 275,
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false,
      }
    },
    legend: {
      show: true,
      horizontalAlign: 'left',
      position: 'top',
      fontSize: '14px',
      labels: {
        colors: '#5D6369',
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        endingShape: 'rounded'
      },
    },
    colors: ['#3D5EE1', '#E9EDF4'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    grid: {
      padding: {
        left: -8,
      },
    },
    series: [{
      name: 'Collected Fee',
      data: [30, 40, 38, 40, 38, 30, 35, 38, 40]
    }, {
      name: 'Total Fee',
      data: [45, 50, 48, 50, 48, 40, 40, 50, 55]
    }],
    xaxis: {
      categories: ['Q1: 2023', 'Q1: 2023', 'Q1: 2023', 'Q1: 2023', 'Q1: 2023', 'uQ1: 2023l', 'Q1: 2023', 'Q1: 2023', 'Q1: 2023'],
    },
    yaxis: {
      tickAmount: 3,
      labels: {
        offsetX: -15
      },
    },
    fill: {
      opacity: 1

    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return "$ " + val + " thousands"
        }
      }
    }
  })
  const [totalEarningArea] = useState<any>({
    chart: {
      height: 90,
      type: 'area',
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true
      }
    },
    colors: ['#3D5EE1'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    series: [{
      name: 'Earnings',
      data: [50, 55, 40, 50, 45, 55, 50]
    }]
  })
  const [totalExpenseArea] = useState<any>({
    chart: {
      height: 90,
      type: 'area',
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true
      }
    },
    colors: ['#E82646'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    series: [{
      name: 'Expense',
      data: [40, 30, 60, 55, 50, 55, 40]
    }]
  })

  const routinesData = [
    {
      teacherName: 'John Doe',
      month: 'Oct 2024',
      imageUrl: 'assets/img/teachers/teacher-01.jpg',
      progress: 80,
      progressColor: 'bg-primary',
    },
    {
      teacherName: 'Jane Smith',
      month: 'Nov 2024',
      imageUrl: 'assets/img/teachers/teacher-02.jpg',
      progress: 75,
      progressColor: 'bg-warning',
    },
    {
      teacherName: 'Alex Johnson',
      month: 'Oct 2024',
      imageUrl: 'assets/img/teachers/teacher-03.jpg',
      progress: 90,
      progressColor: 'bg-success',
    },
  ];
  
  const leaveRequestsData = [
    {
      id: '1',
      name: 'James',
      position: 'Physics Teacher',
      leaveType: 'Emergency',
      leaveDates: '12 - 13 May',
      applyDate: '12 May',
      avatar: 'assets/img/profiles/avatar-14.jpg',
    },
    {
      id: '2',
      name: 'Ramien',
      position: 'Accountant',
      leaveType: 'Casual',
      leaveDates: '12 - 13 May',
      applyDate: '11 May',
      avatar: 'assets/img/profiles/avatar-19.jpg',
    },
    // Ajoutez d'autres demandes de congés si nécessaire
  ];

  const gradesData = {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    series: [
        {
            name: 'Notes des Étudiants',
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148], // Remplacez par les données réelles
        },
    ],
};


  return (
    <>
      {/* Page Wrapper */}
      <div className="">
        <div className="content">
          <>
            {/* Page Header */}
            <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
              <div className="my-auto mb-2">
                <h3 className="page-title mb-1">Admin Dashboard</h3>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to='{routes.adminDashboard}'>Dashboard</Link>
                    </li>
                    <li
                      className="breadcrumb-item active"
                      aria-current="page"
                    >
                      Admin Dashboard
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
                <div className="mb-2">
                  <Link
                    to='{routes.addStudent}'
                    className="btn btn-primary d-flex align-items-center me-3"
                  >
                    <i className="ti ti-square-rounded-plus me-2" />
                    Ajouter Etudiant
                  </Link>
                </div>
                <div className="mb-2">
                  <Link
                    to='{routes.collectFees}'
                    className="btn btn-light d-flex align-items-center"
                  >
                    Détails des frais
                  </Link>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-md-12">
                {/* <div className="alert-message">
                  <div
                    className="alert alert-success rounded-pill d-flex align-items-center justify-content-between border-success mb-4"
                    role="alert"
                  >
                    <div className="d-flex align-items-center">
                      <span className="me-1 avatar avatar-sm flex-shrink-0">
                        <ImageWithBasePath
                          src="assets/img/profiles/avatar-27.jpg"
                          alt="Img"
                          className="img-fluid rounded-circle"
                        />
                      </span>
                      <p>
                        Fahed III,C has paid Fees for the{" "}
                        <strong className="mx-1">“Term1”</strong>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn-close p-0"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    >
                      <span>
                        <i className="ti ti-x" />
                      </span>
                    </button>
                  </div>
                </div> */}
                {/* Dashboard Content */}
                <div className="card bg-dark">
                  <div className="overlay-img">
                    <ImageWithBasePath
                      src="assets/img/bg/shape-04.png"
                      alt="img"
                      className="img-fluid shape-01"
                    />
                    <ImageWithBasePath
                      src="assets/img/bg/shape-01.png"
                      alt="img"
                      className="img-fluid shape-02"
                    />
                    <ImageWithBasePath
                      src="assets/img/bg/shape-02.png"
                      alt="img"
                      className="img-fluid shape-03"
                    />
                    <ImageWithBasePath
                      src="assets/img/bg/shape-03.png"
                      alt="img"
                      className="img-fluid shape-04"
                    />
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-xl-center justify-content-xl-between flex-xl-row flex-column">
                      <div className="mb-3 mb-xl-0">
                        <div className="d-flex align-items-center flex-wrap mb-2">
                          <h1 className="text-white me-2">
                          Bienvenue à vous, Mr Herald
                          </h1>
                          <Link
                            to="profile"
                            className="avatar avatar-sm img-rounded bg-gray-800 dark-hover"
                          >
                            <i className="ti ti-edit text-white" />
                          </Link>
                        </div>
                        <p className="text-white">Passez une bonne journée au travail</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Dashboard Content */}
              </div>
            </div>
            <div className="row d-flex">
              {/* Total Students */}
              <UserCard
                total={3654}
                active={3643}
                inactive={11}
                percentageChange={1.2}
                userType="Students"
                iconPath="assets/img/icons/student.svg"
              />
              {/* /Total Students */}
              {/* Total Teachers */}
              <UserCard
                total={3654}
                active={3643}
                inactive={11}
                percentageChange={1.2}
                userType="Students"
                iconPath="assets/img/icons/student.svg"
              />
              {/* /Total Teachers */}
              {/* Total Staff */}
              <UserCard
                total={3654}
                active={3643}
                inactive={11}
                percentageChange={1.2}
                userType="Students"
                iconPath="assets/img/icons/student.svg"
              />
              {/* /Total Staff */}
              {/* Total Subjects */}
              <UserCard
                total={3654}
                active={3643}
                inactive={11}
                percentageChange={1.2}
                userType="Students"
                iconPath="assets/img/icons/student.svg"
              />
              {/* /Total Subjects */}
            </div>
            <div className="row">
              {/* Schedules */}
              <div className="col-xxl-4 col-xl-6 col-md-12 d-flex">
                <div className="card flex-fill">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div>
                      <h4 className="card-title">Schedules</h4>
                    </div>
                    <Link
                      to="#"
                      className="link-primary fw-medium me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#add_event"
                    >
                      <i className="ti ti-square-plus me-1" />
                      Add New
                    </Link>
                  </div>
                  <div className="card-body ">
                    <Calendar
                      className="datepickers mb-4"
                      value={date}
                      onChange={(e) => setDate(e.value)}
                      inline
                    />
                    <h5 className="mb-3">Événements à venir</h5>
                    <div className="event-wrapper event-scroll">
                      {/* Event Item */}
                      <div className="border-start border-skyblue border-3 shadow-sm p-3 mb-3">
                        <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
                          <span className="avatar p-1 me-2 bg-teal-transparent flex-shrink-0">
                            <i className="ti ti-user-edit text-info fs-20" />
                          </span>
                          <div className="flex-fill">
                            <h6 className="mb-1">Rencontre parents-professeurs</h6>
                            <p className="d-flex align-items-center">
                              <i className="ti ti-calendar me-1" />
                              15 July 2024
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="mb-0">
                            <i className="ti ti-clock me-1" />
                            09:10AM - 10:50PM
                          </p>
                          <div className="avatar-list-stacked avatar-group-sm">
                            <span className="avatar border-0">
                              <ImageWithBasePath
                                src="assets/img/parents/parent-01.jpg"
                                className="rounded-circle"
                                alt="img"
                              />
                            </span>
                            <span className="avatar border-0">
                              <ImageWithBasePath
                                src="assets/img/parents/parent-07.jpg"
                                className="rounded-circle"
                                alt="img"
                              />
                            </span>
                            <span className="avatar border-0">
                              <ImageWithBasePath
                                src="assets/img/parents/parent-02.jpg"
                                className="rounded-circle"
                                alt="img"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* /Event Item */}
                      
                    </div>
                  </div>
                </div>
              </div>
              {/* /Schedules */}

              {/* Attendance */}
              <div className="col-xxl-4 col-xl-6 col-md-12 d-flex flex-column">
              
                <Attendance
                  studentDonutChart={studentDonutChart}
                  teacherDonutChart={teacherDonutChart}
                  staffDonutChart={staffDonutChart}
                />

                {/* student grade */}
                <StudentGradesChart title="Évolution des Notes des Étudiants" gradesData={gradesData} />
              </div>
              {/* /Attendance */}
              <div className="col-xxl-4 col-md-12 d-flex flex-column">
                {/* Quick Links */}
                {/* <div className="card flex-fill">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h4 className="card-title">Quick Links</h4>
                  </div>
                  <div className="card-body pb-1">
                      <Slider
                        {...settings}
                        className="owl-carousel link-slider"
                      >
                        <div className="item">
                          <Link
                            to='{routes.classTimetable}'
                            className="d-block bg-success-transparent ronded p-2 text-center mb-3 class-hover"
                          >
                            <div className="avatar avatar-lg border p-1 border-success rounded-circle mb-2">
                              <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-success rounded-circle">
                                <i className="ti ti-calendar" />
                              </span>
                            </div>
                            <p className="text-dark">Calendar</p>
                          </Link>
                          <Link
                            to='{routes.feesGroup}'
                            className="d-block bg-secondary-transparent ronded p-2 text-center mb-3 class-hover"
                          >
                            <div className="avatar avatar-lg border p-1 border-secondary rounded-circle mb-2">
                              <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-secondary rounded-circle">
                                <i className="ti ti-license" />
                              </span>
                            </div>
                            <p className="text-dark">Fees</p>
                          </Link>
                        </div>
                        <div className="item">
                          <Link
                            to='{routes.examResult}'
                            className="d-block bg-primary-transparent ronded p-2 text-center mb-3 class-hover"
                          >
                            <div className="avatar avatar-lg border p-1 border-primary rounded-circle mb-2">
                              <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-primary rounded-circle">
                                <i className="ti ti-hexagonal-prism" />
                              </span>
                            </div>
                            <p className="text-dark">Exam Result</p>
                          </Link>
                          <Link
                            to='{routes.classHomeWork}'
                            className="d-block bg-danger-transparent ronded p-2 text-center mb-3 class-hover"
                          >
                            <div className="avatar avatar-lg border p-1 border-danger rounded-circle mb-2">
                              <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-danger rounded-circle">
                                <i className="ti ti-report-money" />
                              </span>
                            </div>
                            <p className="text-dark">Home Works</p>
                          </Link>
                        </div>
                        <div className="item">
                          <Link
                            to='{routes.studentAttendance}'
                            className="d-block bg-warning-transparent ronded p-2 text-center mb-3 class-hover"
                          >
                            <div className="avatar avatar-lg border p-1 border-warning rounded-circle mb-2">
                              <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-warning rounded-circle">
                                <i className="ti ti-calendar-share" />
                              </span>
                            </div>
                            <p className="text-dark">Attendance</p>
                          </Link>
                          <Link
                            to='{routes.attendanceReport}'
                            className="d-block bg-skyblue-transparent ronded p-2 text-center mb-3 class-hover"
                          >
                            <div className="avatar avatar-lg border p-1 border-skyblue rounded-circle mb-2">
                              <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-pending rounded-circle">
                                <i className="ti ti-file-pencil" />
                              </span>
                            </div>
                            <p className="text-dark">Reports</p>
                          </Link>
                        </div>
                      </Slider>
                    </div>
                </div> */}
                
                {/* Class Routine */}
                {/* <div className="card flex-fill">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h4 className="card-title">Class Routine</h4>
                    <Link
                      to="#"
                      className="link-primary fw-medium"
                      data-bs-toggle="modal"
                      data-bs-target="#add_class_routine"
                    >
                      <i className="ti ti-square-plus me-1" />
                      Add New
                    </Link>
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-center rounded border p-3 mb-3">
                      <span className="avatar avatar-md flex-shrink-0 border rounded me-2">
                        <ImageWithBasePath
                          src="assets/img/teachers/teacher-01.jpg"
                          className="rounded"
                          alt="Profile"
                        />
                      </span>
                      <div className="w-100">
                        <p className="mb-1">Oct 2024</p>
                        <div className="progress progress-xs  flex-grow-1 mb-1">
                          <div
                            className="progress-bar progress-bar-striped progress-bar-animated bg-primary rounded"
                            role="progressbar"
                            style={{ width: "80%" }}
                            aria-valuenow={80}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center rounded border p-3 mb-3">
                      <span className="avatar avatar-md flex-shrink-0 border rounded me-2">
                        <ImageWithBasePath
                          src="assets/img/teachers/teacher-02.jpg"
                          className="rounded"
                          alt="Profile"
                        />
                      </span>
                      <div className="w-100">
                        <p className="mb-1">Nov 2024</p>
                        <div className="progress progress-xs  flex-grow-1 mb-1">
                          <div
                            className="progress-bar progress-bar-striped progress-bar-animated bg-warning rounded"
                            role="progressbar"
                            style={{ width: "80%" }}
                            aria-valuenow={80}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center rounded border p-3 mb-0">
                      <span className="avatar avatar-md flex-shrink-0 border rounded me-2">
                        <ImageWithBasePath
                          src="assets/img/teachers/teacher-03.jpg"
                          className="rounded"
                          alt="Profile"
                        />
                      </span>
                      <div className="w-100">
                        <p className="mb-1">Oct 2024</p>
                        <div className="progress progress-xs  flex-grow-1 mb-1">
                          <div
                            className="progress-bar progress-bar-striped progress-bar-animated bg-success rounded"
                            role="progressbar"
                            style={{ width: "80%" }}
                            aria-valuenow={80}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <ClassRoutine routines={routinesData} />;
                {/* /Class Routine */}

                {/* Class Wise Performance */}
                {/* <div className="card flex-fill">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h4 className="card-title">Performance</h4>
                    <div className="dropdown">
                      <Link
                        to="#"
                        className="bg-white dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        <i className="ti ti-school-bell  me-2" />
                        Class II
                      </Link>
                      <ul className="dropdown-menu mt-2 p-3">
                        <li>
                          <Link to="#" className="dropdown-item rounded-1">
                            Class I
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item rounded-1">
                            Class II
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item rounded-1">
                            Class III
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item rounded-1">
                            Class IV
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="d-md-flex align-items-center justify-content-between">
                      <div className="me-md-3 mb-3 mb-md-0 w-100">
                        <div className="border border-dashed p-3 rounded d-flex align-items-center justify-content-between mb-1">
                          <p className="mb-0 me-2">
                            <i className="ti ti-arrow-badge-down-filled me-2 text-primary" />
                            Top
                          </p>
                          <h5>45</h5>
                        </div>
                        <div className="border border-dashed p-3 rounde d-flex align-items-center justify-content-between mb-1">
                          <p className="mb-0 me-2">
                            <i className="ti ti-arrow-badge-down-filled me-2 text-warning" />
                            Average
                          </p>
                          <h5>11</h5>
                        </div>
                        <div className="border border-dashed p-3 rounded d-flex align-items-center justify-content-between mb-0">
                          <p className="mb-0 me-2">
                            <i className="ti ti-arrow-badge-down-filled me-2 text-danger" />
                            Below Avg
                          </p>
                          <h5>02</h5>
                        </div>
                      </div>
                      <ReactApexChart
                        id="class-chart"
                        className="text-center text-md-left"
                        options={classDonutChart}
                        series={classDonutChart.series}
                        type="donut"

                      />
                    </div>
                  </div>
                </div> */}
                <PerformanceCard className="Class II" performanceData={performanceData} classDonutChart={classDonutChart}/>
                {/* /Class Wise Performance */}
              </div>
            </div>
            <div className="row">
              {/* Fees Collection */}
              <FeesCollectionCard title="Recouvrement des frais" feesChartOptions={feesBar.chart} feesChartData={feesBar}/>
              {/* /Fees Collection */}
              {/* Leave Requests */}
              <LeaveRequestCard  title="demande de conger" leaveRequests={leaveRequestsData}/>
              {/* /Leave Requests */}
            </div>
            <div className="row">
              {/* Links */}
              <div className="col-xl-3 col-md-6 d-flex">
                <Link
                  to='{routes.studentAttendance}'
                  className="card bg-warning-transparent border border-5 border-white animate-card flex-fill"
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="avatar avatar-lg bg-warning rounded flex-shrink-0 me-2">
                          <i className="ti ti-calendar-share fs-24" />
                        </span>
                        <div className="overflow-hidden">
                          <h6 className="fw-semibold text-default">
                            Voir presence
                          </h6>
                        </div>
                      </div>
                      <span className="btn btn-white warning-btn-hover avatar avatar-sm p-0 flex-shrink-0 rounded-circle">
                        <i className="ti ti-chevron-right fs-14" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
              {/* /Links */}
              {/* Links */}
              <div className="col-xl-3 col-md-6 d-flex">
                <Link
                  to='{routes.events}'
                  className="card bg-success-transparent border border-5 border-white animate-card flex-fill "
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="avatar avatar-lg bg-success rounded flex-shrink-0 me-2">
                          <i className="ti ti-speakerphone fs-24" />
                        </span>
                        <div className="overflow-hidden">
                          <h6 className="fw-semibold text-default">
                            Nouvel evenement
                          </h6>
                        </div>
                      </div>
                      <span className="btn btn-white success-btn-hover avatar avatar-sm p-0 flex-shrink-0 rounded-circle">
                        <i className="ti ti-chevron-right fs-14" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
              {/* /Links */}
              {/* Links */}
              <div className="col-xl-3 col-md-6 d-flex">
                <Link
                  to='{membershipplan}'
                  className="card bg-danger-transparent border border-5 border-white animate-card flex-fill"
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="avatar avatar-lg bg-danger rounded flex-shrink-0 me-2">
                          <i className="ti ti-sphere fs-24" />
                        </span>
                        <div className="overflow-hidden">
                          <h6 className="fw-semibold text-default">
                          Formules d'adhésion
                          </h6>
                        </div>
                      </div>
                      <span className="btn btn-white avatar avatar-sm p-0 flex-shrink-0 rounded-circle danger-btn-hover">
                        <i className="ti ti-chevron-right fs-14" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
              {/* /Links */}
              {/* Links */}
              <div className="col-xl-3 col-md-6 d-flex">
                <Link
                  to='{routes.studentAttendance}'
                  className="card bg-secondary-transparent border border-5 border-white animate-card flex-fill"
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="avatar avatar-lg bg-secondary rounded flex-shrink-0 me-2">
                          <i className="ti ti-moneybag fs-24" />
                        </span>
                        <div className="overflow-hidden">
                          <h6 className="fw-semibold text-default">
                              Finances &amp; comptabilité
                          </h6>
                        </div>
                      </div>
                      <span className="btn btn-white secondary-btn-hover avatar avatar-sm p-0 flex-shrink-0 rounded-circle">
                        <i className="ti ti-chevron-right fs-14" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
              {/* /Links */}
            </div>
            <div className="row justify-between">
              {/* Total Earnings */}
              <div className="col-xxl-4 col-xl-6 d-flex flex-column">
                <div className="card flex-fill">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="mb-1">Bénéfice total</h6>
                        <h2>$64,522,24</h2>
                      </div>
                      <span className="avatar avatar-lg bg-primary">
                        <i className="ti ti-user-dollar" />
                      </span>
                    </div>
                  </div>
                  {/* <div id="total-earning" /> */}
                  <ReactApexChart
                    id="total-earning"
                    options={totalEarningArea}
                    series={totalEarningArea.series}
                    type="area"
                    height={90}
                  />
                </div>
                <div className="card flex-fill">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="mb-1">Dépenses totales</h6>
                        <h2>$60,522,24</h2>
                      </div>
                      <span className="avatar avatar-lg bg-danger">
                        <i className="ti ti-user-dollar" />
                      </span>
                    </div>
                  </div>
                  <div id="total-expenses" />
                  <ReactApexChart
                    id="total-expenses"
                    options={totalExpenseArea}
                    series={totalExpenseArea.series}
                    type="area"
                    height={90}
                  />
                </div>
              </div>
              {/* /Total Earnings */}
              

              {/* Top Subjects */}
               <div className="col-xxl-4 col-xl-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-header  d-flex align-items-center justify-content-between">
                    <h4 className="card-title">Top Matiere</h4>
                    <div className="dropdown">
                      <Link
                        to="#"
                        className="bg-white dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        <i className="ti ti-school-bell  me-2" />
                        Class II
                      </Link>
                      <ul className="dropdown-menu mt-2 p-3">
                        <li>
                          <Link to="#" className="dropdown-item rounded-1">
                            Class I
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item rounded-1">
                            Class II
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item rounded-1">
                            Class III
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item rounded-1">
                            Class IV
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-body">
                    <div
                      className="alert alert-success d-flex align-items-center mb-24"
                      role="alert"
                    >
                      <i className="ti ti-info-square-rounded me-2 fs-14" />
                      <div className="fs-14">
                        These Result are obtained from the syllabus completion
                        on the respective Class
                      </div>
                    </div>
                    <ul className="list-group">
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Maths</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-primary rounded"
                                role="progressbar"
                                style={{ width: "20%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Physics</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-secondary rounded"
                                role="progressbar"
                                style={{ width: "30%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Chemistry</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-info rounded"
                                role="progressbar"
                                style={{ width: "40%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Botany</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-success rounded"
                                role="progressbar"
                                style={{ width: "50%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">English</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-warning rounded"
                                role="progressbar"
                                style={{ width: "70%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Spanish</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-danger rounded"
                                role="progressbar"
                                style={{ width: "80%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Japanese</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-primary rounded"
                                role="progressbar"
                                style={{ width: "85%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Top Subjects */}


              {/* Fees Collection */}
              <div className="col-xxl-3 col-xl-6 order-2 order-xxl-3 d-flex flex-column">
                <div className="card flex-fill mb-2">
                  <div className="card-body">
                    <p className="mb-2">Total des frais perçus</p>
                    <div className="d-flex align-items-end justify-content-between">
                      <h4>$25,000,02</h4>
                      <span className="badge badge-soft-success">
                        <i className="ti ti-chart-line me-1" />
                        1.2%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card flex-fill mb-2">
                  <div className="card-body">
                    <p className="mb-2">Frais perçue à ce jour</p>
                    <div className="d-flex align-items-end justify-content-between">
                      <h4>$4,56,64</h4>
                      <span className="badge badge-soft-danger">
                        <i className="ti ti-chart-line me-1" />
                        1.2%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card flex-fill mb-2">
                  <div className="card-body">
                    <p className="mb-2">Étudiant non payé</p>
                    <div className="d-flex align-items-end justify-content-between">
                      <h4>$545</h4>
                      <span className="badge badge-soft-info">
                        <i className="ti ti-chart-line me-1" />
                        1.2%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card flex-fill mb-4">
                  <div className="card-body">
                    <p className="mb-2">Total des encours</p>
                    <div className="d-flex align-items-end justify-content-between">
                      <h4>$4,56,64</h4>
                      <span className="badge badge-soft-danger">
                        <i className="ti ti-chart-line me-1" />
                        1.2%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Fees Collection */}
            </div>
          </>
        </div>
      </div>
      {/* /Page Wrapper */}
      <AdminDashboardModal />
    </>
  );
};

export default DashboardAdmin;

