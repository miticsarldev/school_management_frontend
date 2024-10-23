import { Link } from "react-router-dom";
// import { all_routes } from "../../../router/all_routes";
import StudentModals from "../studentModals/StudentModals";
import StudentSidebar from "./studentSidebar";
import StudentBreadcrumb from "./studentBreadcrumb";

const StudentExamResult = () => {
  // const routes = all_routes;

  return (
    <>
      {/* Page Wrapper */}
      <div>
        <div className="content">
          <div className="row">
            {/* Page Header */}
            <StudentBreadcrumb />
            {/* /Page Header */}
          </div>
          <div className="row">
            {/* Student Information */}
            <StudentSidebar />
            {/* /Student Information */}
            <div className="col-xxl-9 col-xl-8">
              <div className="row">
                <div className="col-md-12">
                  {/* List */}
                  {/* <ul className="nav nav-tabs nav-tabs-bottom mb-4">
                    <li>
                      <Link to={routes.studentDetail} className="nav-link">
                        <i className="ti ti-school me-2" />
                        Student Details
                      </Link>
                    </li>
                    <li>
                      <Link to={routes.studentTimeTable} className="nav-link">
                        <i className="ti ti-table-options me-2" />
                        Time Table
                      </Link>
                    </li>
                    <li>
                      <Link to={routes.studentLeaves} className="nav-link ">
                        <i className="ti ti-calendar-due me-2" />
                        Leave &amp; Attendance
                      </Link>
                    </li>
                    <li>
                      <Link to={routes.studentFees} className="nav-link ">
                        <i className="ti ti-report-money me-2" />
                        Fees
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={routes.studentResult}
                        className="nav-link active"
                      >
                        <i className="ti ti-bookmark-edit me-2" />
                        Exam &amp; Results
                      </Link>
                    </li>
                    <li>
                      <Link to={routes.studentLibrary} className="nav-link">
                        <i className="ti ti-books me-2" />
                        Library
                      </Link>
                    </li>
                  </ul> */}
                  {/* /List */}
                  <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
                      <h4 className="mb-3">Exams &amp; Results</h4>
                    </div>
                    <div className="card-body">
                      <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              <span className="avatar avatar-sm bg-success me-2">
                                <i className="ti ti-checks" />
                              </span>
                              Monthly Test (May)
                            </button>
                          </h2>
                          <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                          >
                            <div className="accordion-body">
                              {/* Exam Result List */}
                              <div className="table-responsive">
                                <table className="table">
                                  <thead className="thead-light">
                                    <tr>
                                      <th>Subject</th>
                                      <th>Max Marks</th>
                                      <th>Min Marks</th>
                                      <th>Marks Obtained</th>
                                      <th className="text-end">Result</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>English (150)</td>
                                      <td>100</td>
                                      <td>35</td>
                                      <td>65</td>
                                      <td className="text-end">
                                        <span className="badge badge-soft-success d-inline-flex align-items-center">
                                          <i className="ti ti-circle-filled fs-5 me-1" />
                                          Pass
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="bg-dark text-white">Rank : 30</td>
                                      <td className="bg-dark text-white">Total : 500</td>
                                      <td className="bg-dark text-white" colSpan={2}>
                                        Marks Obtained : 395
                                      </td>
                                      <td className="bg-dark text-white text-end">
                                        <div className="d-flex align-items-center justify-content-end">
                                          <span className="me-2">Percentage : 79.50</span>
                                          <h6 className="fw-normal text-white">
                                            Result :{" "}
                                            <span className="text-success"> Pass</span>
                                          </h6>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              {/* /Exam Result List */}
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
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

export default StudentExamResult;
