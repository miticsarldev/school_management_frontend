import { useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "./DashboardEnseignant/imageWithBasePath";
//import AdminDashboardModal from "../adminDashboard/adminDashboardModal";
import ReactApexChart from "react-apexcharts";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dayjs from "dayjs";
import { DatePicker} from "antd";
import { format } from 'date-fns'
import Slider from "react-slick";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  selectAuth
} from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useGetAllTimetablesQuery } from "../redux/features/timetableSlice";
import { useGetAllEventsQuery } from "@/redux/features/eventSlice";
import { useGetAllLeavesQuery } from "../redux/features/leaveSlice";
import { useGetAllClassroomsQuery } from "@/redux/features/classroomSlice";
const DashboardEnseigant = () => {
  const [date, setDate] = useState<Nullable<Date>>(null);
  const { user } = useAppSelector(selectAuth);
  
  function SampleNextArrow(props: any) {
    const { style, onClick } = props;
    return (
      <div
        className="slick-nav slick-nav-next class-slides"
        style={{ ...style, display: "flex", top: "-72%", left: "22%" }}
        onClick={onClick}
      >
        <i className="fas fa-chevron-right" style={{ fontSize: "12px" }}></i>
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { style, onClick } = props;
    return (
      <div
        className="slick-nav slick-nav-prev class-slides"
        style={{ ...style, display: "flex", top: "-72%", left: "17%" }}
        onClick={onClick}
      >
        <i className="fas fa-chevron-left" style={{ fontSize: "12px" }}></i>
      </div>
    );
  }
  const settings = {
    dots: false,
    autoplay: false,
    slidesToShow: 4,
    margin: 24,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
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
  
  const [studentDonutChart] = useState<any>({
    chart: {
      height: 90,
      type: "donut",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: false,
    },

    series: [95, 5],
    labels: ["Completed", "Pending"],
    legend: { show: false },
    colors: ["#1ABE17", "#E82646"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 100,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });
  const [attendance_chart] = useState<any>({
    chart: {
      height: 290,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: false,
    },

    series: [60, 5, 15, 20],
    labels: ["Present", "Late", "Half Day", "Absent"],
    colors: ["#1ABE17", "#1170E4", "#E9EDF4", "#E82646"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "left",
          },
        },
      },
    ],
    legend: {
      position: "bottom",
    },
  });
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${month}-${day}-${year}`;
  const defaultValue = dayjs(formattedDate);

  const { data: timetables, error, isLoading } = useGetAllTimetablesQuery();
  
// Fonction pour obtenir la couleur de la barre de progression
const getProgressBarColor = (performance: number) => {
  if (performance >= 80) {
    return 'bg-success'; // Vert si la performance est >= 80
  } else if (performance >= 50) {
    return 'bg-warning'; // Jaune si la performance est entre 50 et 79
  } else {
    return 'bg-danger'; // Rouge si la performance est < 50
  }
};

  // Fonction pour vérifier si une classe est passée
  const isClassPast = (startTime: string): boolean => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const classDate = new Date();
    classDate.setHours(startHour, startMinute, 0, 0);
    return new Date() > classDate;
  };

  const { data: events } = useGetAllEventsQuery();
  
  const { data: leaves} = useGetAllLeavesQuery();

  const { data: classrooms} = useGetAllClassroomsQuery();
  console.log(classrooms, "pas trouver");
  const bestPerformers = (classrooms || [])
  .filter((classroom) => classroom.performance !== undefined) // Vérifie que la performance est définie
  .sort((a, b) => b.performance - a.performance) // Trie par performance décroissante
  .slice(0, 3); // Prend les 3 meilleures classes
  
  
  return (
    <>
      {/* Page Wrapper */}
      <div
       className="col-md-10"
      >
        <div className="content">
          {/* Page Header */}
          <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
            <div className="my-auto mb-2">
              <h3 className="page-title mb-1">Teacher Dashboard</h3>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                  <Link to="/dashboard/admin">Admin Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">Dashboard</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Teacher Dashboard
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          {/* /Page Header */}
          {/* Greeting Section */}
          <div className="row">
            <div className="col-md-12 d-flex">
              <div className="card flex-fill bg-info bg-03">
                <div className="card-body">
                <h1 className="text-white mb-1">
                  Bonjour, {user?.firstname} {user?.lastname}
                </h1>
                  <p className="text-white mb-3">Have a Good day at work</p>
                  <p className="text-light">
                    Notice : There is a staff meeting at 9AM today, Dont forget
                    to Attend!!!
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* /Greeting Section */}
          {/* Teacher-Profile */}
          <div className="row">
            <div className="col-xxl-8 col-xl-12">
              <div className="row">
                <div className="col-xxl-7 col-xl-8 d-flex">
                  <div className="card bg-dark position-relative flex-fill">
                    <div className="card-body pb-1">
                      <div className="d-sm-flex align-items-center justify-content-between row-gap-3">
                        <div className="d-flex align-items-center overflow-hidden mb-3">
                          <div className="avatar avatar-xxl rounded flex-shrink-0 border border-2 border-white me-3">
                            <ImageWithBasePath
                              src="/teachers/teacher-05.jpg"
                              alt="Img"
                            />
                          </div>
                          <div className="overflow-hidden">
                            <span className="badge bg-transparent-primary text-primary mb-1">
                              #T594651
                            </span>
                            <h3 className="text-white mb-1 text-truncate">
                            {user?.firstname} {user?.lastname}
                            </h3>
                            <div className="d-flex align-items-center flex-wrap text-light row-gap-2">
                              <span className="me-2">Classes : I-A, V-B</span>
                              <span className="d-flex align-items-center">
                                <i className="ti ti-circle-filled text-warning fs-7 me-1" />
                                Physics
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* <Link
                          // to={routes.editTeacher}
                          className="btn btn-primary flex-shrink-0 mb-3"
                        >
                          Edit Profile
                        </Link> */}
                      </div>
                      <div className="student-card-bg">
                        <ImageWithBasePath
                          src="/bg/circle-shape.png"
                          alt="Bg"
                        />
                        <ImageWithBasePath
                          src="/bg/shape-02.png"
                          alt="Bg"
                        />
                        <ImageWithBasePath
                          src="/bg/shape-04.png"
                          alt="Bg"
                        />
                        <ImageWithBasePath
                          src="/bg/blue-polygon.png"
                          alt="Bg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-5 col-xl-4 d-flex">
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="row align-items-center justify-content-between">
                        <div className="col-sm-5">
                          <div
                            id="plan_chart"
                            className="mb-3 mb-sm-0 text-center text-sm-start"
                          ></div>
                          <ReactApexChart
                            id="plan_chart"
                            className="mb-3 mb-sm-0 text-center text-sm-start"
                            options={studentDonutChart}
                            series={studentDonutChart.series}
                            type="donut"
                            height={90}
                          />
                        </div>
                        <div className="col-sm-7">
                          <div className=" text-center text-sm-start">
                            <h4 className="mb-3">Syllabus</h4>
                            <p className="mb-2">
                              <i className="ti ti-circle-filled text-success me-1" />
                              Completed :{" "}
                              <span className="fw-semibold">95%</span>
                            </p>
                            <p>
                              <i className="ti ti-circle-filled text-danger me-1" />
                              Pending :<span className="fw-semibold">5%</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Today's Class */}
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <h4 className="me-2">Cours d'aujourd'hui</h4>
                    <div className="owl-nav slide-nav2 text-end nav-control" />
                  </div>
                  <div className="d-inline-flex align-items-center class-datepick">
                    <span className="icon">
                      <i className="ti ti-chevron-left" />
                    </span>
                    <DatePicker
                      className="form-control datetimepicker border-0"
                      format={{
                        format: "DD-MM-YYYY",
                        type: "mask",
                      }}
                      defaultValue={defaultValue}
                      placeholder="16 May 2024"
                      onChange={(date: Date | null) => setDate(date)}
                    />
                    <span className="icon">
                      <i className="ti ti-chevron-right" />
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  {isLoading ? (
                    <p>Loading classes...</p>
                  ) : error ? (
                    <p>Error loading timetables: {JSON.stringify(error)}</p>
                  ) : timetables && timetables.length > 0 ? (
                    <Slider {...settings} className="owl-carousel owl-theme task-slider">
                      {timetables.map((timetable: Timetable) => (
                        <div className="item" key={timetable.id}>
                          <div className="bg-light-400 rounded p-3">
                            <span className={`badge badge-${isClassPast(timetable.start_time) ? 'danger' : 'primary'} badge-lg mb-2`}>
                              <i className="ti ti-clock me-1" />
                              {timetable.start_time} - {timetable.end_time}
                            </span>
                            <p className="text-dark">Class:
                              {timetable.classRoom_id}, {timetable.day}
                            </p>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  ) : (
                    <p>Aucun emploi du temps disponible.</p>
                  )}
                </div>
              </div>
              {/* /Today's Class */}
              <div className="row">
                {/* Attendance */}
                <div className="col-xxl-6 col-xl-6 col-md-6 d-flex">
                  <div className="card flex-fill">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h4 className="card-title">Attendance</h4>
                      <div className="card-dropdown">
                        <Link
                          to="#"
                          className="dropdown-toggle p-2"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-calendar-due" />
                          This Week
                        </Link>
                        <div className="dropdown-menu  dropdown-menu-end">
                          <ul>
                            <li>
                              <Link to="#">This Week</Link>
                            </li>
                            <li>
                              <Link to="#">Last Week</Link>
                            </li>
                            <li>
                              <Link to="#">Last Month</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card-body pb-0">
                      <div className="bg-light-300 rounde border p-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <h6 className="mb-2">Last 7 Days </h6>
                          <p className="mb-2">14 May 2024 - 21 May 2024</p>
                        </div>
                        <div className="d-flex align-items-center gap-1 flex-wrap">
                          <Link to="#" className="badge badge-lg bg-success">
                            M
                          </Link>
                          <Link to="#" className="badge badge-lg bg-success">
                            T
                          </Link>
                          <Link to="#" className="badge badge-lg bg-success">
                            W
                          </Link>
                          <Link to="#" className="badge badge-lg bg-success">
                            T
                          </Link>
                          <Link to="#" className="badge badge-lg bg-danger">
                            F
                          </Link>
                          <Link
                            to="#"
                            className="badge badge-lg bg-white border text-default"
                          >
                            S
                          </Link>
                          <Link
                            to="#"
                            className="badge badge-lg  bg-white border text-gray-1"
                          >
                            S
                          </Link>
                        </div>
                      </div>
                      <p className="mb-3">
                        <i className="ti ti-calendar-heart text-primary me-2" />
                        No of total working days{" "}
                        <span className="fw-medium text-dark"> 28 Days</span>
                      </p>
                      <div className="border rounded p-3">
                        <div className="row">
                          <div className="col text-center border-end">
                            <p className="mb-1">Present</p>
                            <h5>25</h5>
                          </div>
                          <div className="col text-center border-end">
                            <p className="mb-1">Absent</p>
                            <h5>2</h5>
                          </div>
                          <div className="col text-center border-end">
                            <p className="mb-1">Halfday</p>
                            <h5>0</h5>
                          </div>
                          <div className="col text-center">
                            <p className="mb-1">Late</p>
                            <h5>1</h5>
                          </div>
                        </div>
                      </div>
                      <div className="attendance-chart text-center">
                        {/* <div id="attendance_chart" /> */}
                        <ReactApexChart
                          id="attendance_chart"
                          className="mb-3 mb-sm-0 text-center text-sm-start"
                          options={attendance_chart}
                          series={attendance_chart.series}
                          type="donut"
                          height={250}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Attendance */}
                {/* Best Performers */}
                <div className="col-xxl-6 col-xl-6 col-md-6 d-flex flex-column">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h4 className="card-title">Best Performers</h4>
                  </div>
                  <div className="card-body pb-1">
                    {bestPerformers.map((classroom, index) => (
                      <div className="d-sm-flex align-items-center mb-1" key={index}>
                        <div className="w-50 mb-2">
                          {/* Utilisation de 'name' au lieu de 'classGrade' */}
                          <h6>{`Class: ${classroom.name || 'N/A'}`}</h6>
                        </div>
                        <div className="class-progress w-100 ms-sm-3 mb-3">
                          <div
                            className="progress justify-content-between"
                            role="progressbar"
                            aria-valuenow={classroom.performance || 0}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            <div
                              className={`progress-bar ${getProgressBarColor(classroom.performance || 0)}`}
                              style={{ width: `${classroom.performance || 0}%` }}
                            >
                              {/* Suppression de la partie des étudiants si non utilisée */}
                            </div>
                            <span className="badge">{`${classroom.performance || 0}%`}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                  <div className="card flex-fill">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h4 className="card-title">Best student</h4>
                      <div className="dropdown">
                        <Link
                          to="#"
                          className="bg-white dropdown-toggle"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-calendar me-2" />
                          This Month
                        </Link>
                        <ul className="dropdown-menu mt-2 p-3">
                          <li>
                            <Link to="#" className="dropdown-item rounded-1">
                              This Month
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item rounded-1">
                              This Year
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item rounded-1">
                              Last Week
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between p-3 mb-2 border br-5">
                        <div className="d-flex align-items-center overflow-hidden me-2">
                          <Link
                            to="#"
                            className="avatar avatar-lg flex-shrink-0 br-6 me-2"
                          >
                            <ImageWithBasePath
                              src="/students/student-09.jpg"
                              alt="student"
                            />
                          </Link>
                          <div className="overflow-hidden">
                            <h6 className="mb-1 text-truncate">
                              <Link to="#">Susan Boswell</Link>
                            </h6>
                            <p>III, B</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <ImageWithBasePath
                            src="/icons/medal.svg"
                            alt="icon"
                          />
                          <span className="badge badge-success ms-2">98%</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between p-3 mb-2 border br-5">
                        <div className="d-flex align-items-center overflow-hidden me-2">
                          <Link
                            to="#"
                            className="avatar avatar-lg flex-shrink-0 br-6 me-2"
                          >
                            <ImageWithBasePath
                              src="/students/student-12.jpg"
                              alt="student"
                            />
                          </Link>
                          <div className="overflow-hidden">
                            <h6 className="mb-1 text-truncate">
                              <Link to="#">Richard Mayes</Link>
                            </h6>
                            <p>V, A</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <ImageWithBasePath
                            src="/icons/medal-2.svg"
                            alt="icon"
                          />
                          <span className="badge badge-success ms-2">98%</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between p-3 mb-0 border rounded">
                        <div className="d-flex align-items-center overflow-hidden me-2">
                          <Link
                            to="#"
                            className="avatar avatar-lg flex-shrink-0 br-6 me-2"
                          >
                            <ImageWithBasePath
                              src="/students/student-11.jpg"
                              alt="student"
                            />
                          </Link>
                          <div className="overflow-hidden">
                            <h6 className="mb-1 text-truncate">
                              <Link to="#">Veronica Randle</Link>
                            </h6>
                            <p>V, B</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="badge bg-info">78%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Best Performers */}
              </div>
            </div>
            {/* Schedules */}
            <div className="col-xxl-4 col-xl-12 d-flex">
              <div className="card flex-fill">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h4 className="card-title">Horaires</h4>
                  <Link
                    to="#"
                    className="link-primary fw-medium me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#add_event"
                  >
                    <i className="ti ti-square-plus me-1" />
                    Ajouter un nouveau
                  </Link>
                </div>
                <div className="card-body">
                  {/* <div className="datepic mb-4" /> */}
                  <Calendar
                    className="datepickers mb-4 custom-cal-react"
                    value={date}
                    onChange={(e) => setDate(e.value)}
                    inline
                  />
                  {/* <DatePicker
                        selected={startDate}
                        onChange={(date:any) => setStartDate(date)}
                        inline
                        /> */}
                  <h4 className="mb-3">Evenement à venir</h4>
      <div className="event-scroll">
        {events?.map((event, index) => (
          <div key={index} className="border-start border-danger border-3 shadow-sm p-3 mb-3">
            <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
              <span className="avatar p-1 me-2 bg-danger-transparent flex-shrink-0">
                <i className="ti ti-vacuum-cleaner fs-24" />
              </span>
              <div className="flex-fill">
                <h6 className="mb-1">{event.title}</h6>
                <p className="d-flex align-items-center">
                  <i className="ti ti-calendar me-1" />
                  {format(new Date(event.start_date), 'dd MMMM yyyy')} - {format(new Date(event.end_date), 'dd MMMM yyyy')}
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p className="mb-0">
                <i className="ti ti-clock me-1" />
                {format(new Date(event.start_hour), 'hh:mm a')} - {format(new Date(event.end_hour), 'hh:mm a')}
              </p>
              <div className="avatar-list-stacked avatar-group-sm">
                {/* Vous pouvez ajouter des images ici */}
              </div>
            </div>
          </div>
        ))}
                  


                  </div>
                </div>
              </div>
            </div>
            {/* /Schedules */}
          </div>
          {/* Teacher-profile */}
          
          <div className="row">
            {/* Student Marks */}
            <div className="col-xxl-8 col-xl-7 d-flex">
              <div className="card flex-fill">
                <div className="card-header d-flex align-items-center justify-content-between flex-wrap">
                  <h4 className="card-title ">Student Marks</h4>
                  <div className="d-flex align-items-center">
                    <div className="dropdown me-2 ">
                      <Link
                        to="#"
                        className="bg-white dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        <i className="ti ti-calendar me-2" />
                        All Classes
                      </Link>
                      <ul className="dropdown-menu mt-2 p-3">
                        <li>
                          <Link to="#" className="dropdown-item rounded-1">
                            I
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item rounded-1">
                            II
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item rounded-1">
                            III
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="dropdown ">
                      <Link
                        to="#"
                        className="bg-white dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        <i className="ti ti-calendar me-2" />
                        All Sections
                      </Link>
                      <ul className="dropdown-menu mt-2 p-3">
                        <li>
                          <Link to="#" className="dropdown-item rounded-1">
                            A
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item rounded-1">
                            B
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item rounded-1">
                            C
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body px-0">
                  <div className="custom-datatable-filter table-responsive">
                    <table className="table ">
                      <thead className="thead-light">
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Class </th>
                          <th>Marks %</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>35013</td>
                          <td>
                            <div className="d-flex align-items-center">
                              {/* <Link
                                // to={routes.studentDetail}
                                className="avatar avatar-md"
                              >
                                <ImageWithBasePath
                                  src="/students/student-01.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="img"
                                />
                              </Link> */}
                              <div className="ms-2">
                                <p className="text-dark mb-0">
                                  {/* <Link to={routes.studentDetail}>Janet</Link> */}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>III</td>
                          <td>89%</td>
                          <td>
                            <span className="badge bg-success">Pass</span>
                          </td>
                        </tr>
                        <tr>
                          <td>35013</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                //to={routes.studentDetail}
                                to={'#'}
                                className="avatar avatar-md"
                              >
                                <ImageWithBasePath
                                  src="/students/student-02.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="img"
                                />
                              </Link>
                              <div className="ms-2">
                                <p className="text-dark mb-0">
                                  {/* <Link to={routes.studentDetail}>Joann</Link> */}
                                  
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>IV</td>
                          <td>88%</td>
                          <td>
                            <span className="badge bg-success">Pass</span>
                          </td>
                        </tr>
                        <tr>
                          <td>35011</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                // to={routes.studentDetail}
                                to={'#'}
                                className="avatar avatar-md"
                              >
                                <ImageWithBasePath
                                  src="/students/student-03.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="img"
                                />
                              </Link>
                              <div className="ms-2">
                                <p className="text-dark mb-0">
                                  {/* <Link to={routes.studentDetail}>
                                    Kathleen
                                  </Link> */}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>II</td>
                          <td>69%</td>
                          <td>
                            <span className="badge bg-success">Pass</span>
                          </td>
                        </tr>
                        <tr>
                          <td>35010</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                //to={routes.studentDetail}
                                to={'#'}
                                className="avatar avatar-md"
                              >
                                <ImageWithBasePath
                                  src="/students/student-04.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="img"
                                />
                              </Link>
                              <div className="ms-2">
                                <p className="text-dark mb-0">
                                  {/* <Link to={routes.studentDetail}>Gifford</Link> */}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>I</td>
                          <td>21%</td>
                          <td>
                            <span className="badge bg-success">Pass</span>
                          </td>
                        </tr>
                        <tr>
                          <td>35009</td>
                          <td>
                            <div className="d-flex align-items-center">
                              {/* <Link
                                to={routes.studentDetail}
                                className="avatar avatar-md"
                              >
                                <ImageWithBasePath
                                  src="/students/student-05.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="img"
                                />
                              </Link> */}
                              <div className="ms-2">
                                <p className="text-dark mb-0">
                                  {/* <Link to={routes.studentDetail}>Lisa</Link> */}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>II</td>
                          <td>31%</td>
                          <td>
                            <span className="badge bg-danger">Fail</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* /Student Marks */}
            {/* Leave Status */}
            <div className="col-xxl-4 col-xl-5 d-flex">
      <div className="card flex-fill">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h4 className="card-title">Leave Status</h4>
          <div className="dropdown">
            <a href="#" className="bg-white dropdown-toggle" data-bs-toggle="dropdown">
              <i className="ti ti-calendar me-2"></i> This Month
            </a>
            <ul className="dropdown-menu mt-2 p-3">
              <li><a href="#" className="dropdown-item rounded-1">This Month</a></li>
              <li><a href="#" className="dropdown-item rounded-1">This Year</a></li>
              <li><a href="#" className="dropdown-item rounded-1">Last Week</a></li>
            </ul>
          </div>
        </div>

        <div className="card-body">
            {leaves?.map(leave => (
              <div className="bg-light-300 d-sm-flex align-items-center justify-content-between p-3 mb-3" key={leave.id}>
                <div className="d-flex align-items-center mb-2 mb-sm-0">
                  <div className={`avatar avatar-lg bg-${leave.status === 'Pending' ? 'danger' : leave.status === 'Approved' ? 'success' : 'danger'}-transparent flex-shrink-0 me-2`}>
                    <i className={`ti ti-${leave.type === 'congé' ? 'brand-socket-io' : 'medical-cross'}`} />
                  </div>
                  <div>
                    <h6 className="mb-1">{leave.type}</h6>
                    <p>Date: {leave.date}</p>
                  </div>
                </div>
                <span className={`badge bg-${leave.status === 'Pending' ? 'skyblue' : leave.status === 'Approved' ? 'success' : 'danger'} d-inline-flex align-items-center`}>
                  <i className="ti ti-circle-filled fs-5 me-1" /> {leave.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
            {/* /Leave Status */}
          </div>
        </div>
      </div>
      {/* <AdminDashboardModal /> */}
      {/* /Page Wrapper */}
    </>
  );
};

export default DashboardEnseigant;
