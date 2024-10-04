import React from "react";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

// Définition des types pour les props
type AttendanceProps = {
  studentDonutChart: any;
  teacherDonutChart: any;
  staffDonutChart: any;
};

const Attendance: React.FC<AttendanceProps> = ({
  studentDonutChart,
  teacherDonutChart,
  staffDonutChart,
}) => {
  return (
    <div className="card">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h4 className="card-title">Présence</h4>
        <div className="dropdown">
          <Link
            to="#"
            className="bg-white dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <i className="ti ti-calendar-due me-1" />
            Aujourd'hui
          </Link>
          <ul className="dropdown-menu mt-2 p-3">
            <li>
              <Link to="#" className="dropdown-item rounded-1">
                Cette semaine
              </Link>
            </li>
            <li>
              <Link to="#" className="dropdown-item rounded-1">
                Semaine passer
              </Link>
            </li>
            <li>
              <Link to="#" className="dropdown-item rounded-1">
                mois passer
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="card-body">
        <div className="list-tab mb-4">
          <ul className="nav">
            <li>
              <Link
                to="#"
                className="active"
                data-bs-toggle="tab"
                data-bs-target="#students"
              >
                Etudant
              </Link>
            </li>
            <li>
              <Link to="#" data-bs-toggle="tab" data-bs-target="#teachers">
                Professeur
              </Link>
            </li>
            <li>
              <Link to="#" data-bs-toggle="tab" data-bs-target="#staff">
                Staff
              </Link>
            </li>
          </ul>
        </div>

        <div className="tab-content">
          {/* Students Tab */}
          <div className="tab-pane fade active show" id="students">
            <div className="row gx-3">
              <div className="col-sm-4">
                <div className="card bg-light-300 shadow-none border-0">
                  <div className="card-body p-3 text-center">
                    <h5>28</h5>
                    <p className="fs-12">Urgence</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card bg-light-300 shadow-none border-0">
                  <div className="card-body p-3 text-center">
                    <h5>01</h5>
                    <p className="fs-12">Absent</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card bg-light-300 shadow-none border-0">
                  <div className="card-body p-3 text-center">
                    <h5>01</h5>
                    <p className="fs-12">Retard</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <ReactApexChart
                id="student-chart"
                className="mb-4"
                options={studentDonutChart}
                series={studentDonutChart.series}
                type="donut"
                height={210}
              />
              <Link to="student-attendance" className="btn btn-light">
                <i className="ti ti-calendar-share me-1" />
                View All
              </Link>
            </div>
          </div>

          {/* Teachers Tab */}
          <div className="tab-pane fade" id="teachers">
            <div className="row gx-3">
              <div className="col-sm-4">
                <div className="card bg-light-300 shadow-none border-0">
                  <div className="card-body p-3 text-center">
                    <h5>30</h5>
                    <p className="fs-12">Urgence</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card bg-light-300 shadow-none border-0">
                  <div className="card-body p-3 text-center">
                    <h5>03</h5>
                    <p className="fs-12">Absent</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card bg-light-300 shadow-none border-0">
                  <div className="card-body p-3 text-center">
                    <h5>03</h5>
                    <p className="fs-12">Retard</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <ReactApexChart
                id="teacher-chart"
                className="mb-4"
                options={teacherDonutChart}
                series={teacherDonutChart.series}
                type="donut"
                height={210}
              />
              <Link to="teacher-attendance" className="btn btn-light">
                <i className="ti ti-calendar-share me-1" />
                View All
              </Link>
            </div>
          </div>

          {/* Staff Tab */}
          <div className="tab-pane fade" id="staff">
            <div className="row gx-3">
              <div className="col-sm-4">
                <div className="card bg-light-300 shadow-none border-0">
                  <div className="card-body p-3 text-center">
                    <h5>45</h5>
                    <p className="fs-12">Urgence</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card bg-light-300 shadow-none border-0">
                  <div className="card-body p-3 text-center">
                    <h5>01</h5>
                    <p className="fs-12">Absent</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card bg-light-300 shadow-none border-0">
                  <div className="card-body p-3 text-center">
                    <h5>10</h5>
                    <p className="fs-12">Retard</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <ReactApexChart
                id="staff-chart"
                className="mb-4"
                options={staffDonutChart}
                series={staffDonutChart.series}
                type="donut"
                height={210}
              />
              <Link to="staff-attendance" className="btn btn-light">
                <i className="ti ti-calendar-share me-1" />
                View All
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
