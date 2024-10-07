import React from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../../core/common/imageWithBasePath";
import { all_routes } from "../../../router/all_routes";
import StudentModals from "../studentModals";
import StudentSidebar from "./studentSidebar";
import StudentBreadcrumb from "./studentBreadcrumb";
import Table from "../../../../core/common/dataTable/index";
import { TableData } from "../../../../core/data/interface";
import { leaveData } from "../../../../core/data/json/leaveData";
import { Attendance } from "../../../../core/data/json/attendance";

const StudentFees = () => {
  const routes = all_routes;
  const data = leaveData;
  const data2 = Attendance;
  const columns = [
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      sorter: (a: TableData, b: TableData) =>
        a.leaveType.length - b.leaveType.length,
    },
    {
      title: "Leave Date",
      dataIndex: "leaveDate",
      sorter: (a: TableData, b: TableData) =>
        a.leaveDate.length - b.leaveDate.length,
    },
    {
      title: "No of Days",
      dataIndex: "noOfDays",
      sorter: (a: TableData, b: TableData) =>
        parseFloat(a.noOfDays) - parseFloat(b.noOfDays),
    },
    {
      title: "Applied On",
      dataIndex: "appliedOn",
      sorter: (a: TableData, b: TableData) =>
        a.appliedOn.length - b.appliedOn.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <>
          {text === "Approved" ? (
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
      sorter: (a: TableData, b: TableData) => a.status.length - b.status.length,
    },
  ];
  const columns2 = [
    {
      title: "Date | Month",
      dataIndex: "date",
      sorter: (a: TableData, b: TableData) => a.date.length - b.date.length,
    },
    {
      title: "Jan",
      dataIndex: "jan",
      render: (text: string) => (
        <>
          {text === "1" ? (
            <span className="attendance-range bg-success"></span>
          ) : text === "2" ? (
            <span className="attendance-range bg-pending"></span>
          ) : text === "3" ? (
            <span className="attendance-range bg-dark"></span>
          ) : text === "4" ? (
            <span className="attendance-range bg-danger"></span>
          ) : (
            <span className="attendance-range bg-info"></span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) => a.jan.length - b.jan.length,
    },
    {
      title: "feb",
      dataIndex: "feb",
      render: (text: string) => (
        <>
          {text === "1" ? (
            <span className="attendance-range bg-success"></span>
          ) : text === "2" ? (
            <span className="attendance-range bg-pending"></span>
          ) : text === "3" ? (
            <span className="attendance-range bg-dark"></span>
          ) : text === "4" ? (
            <span className="attendance-range bg-danger"></span>
          ) : (
            <span className="attendance-range bg-info"></span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) => a.feb.length - b.feb.length,
    },
    {
      title: "mar",
      dataIndex: "mar",
      render: (text: string) => (
        <>
          {text === "1" ? (
            <span className="attendance-range bg-success"></span>
          ) : text === "2" ? (
            <span className="attendance-range bg-pending"></span>
          ) : text === "3" ? (
            <span className="attendance-range bg-dark"></span>
          ) : text === "4" ? (
            <span className="attendance-range bg-danger"></span>
          ) : (
            <span className="attendance-range bg-info"></span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) => a.mar.length - b.mar.length,
    },
    {
      title: "apr",
      dataIndex: "apr",
      render: (text: string) => (
        <>
          {text === "1" ? (
            <span className="attendance-range bg-success"></span>
          ) : text === "2" ? (
            <span className="attendance-range bg-pending"></span>
          ) : text === "3" ? (
            <span className="attendance-range bg-dark"></span>
          ) : text === "4" ? (
            <span className="attendance-range bg-danger"></span>
          ) : (
            <span className="attendance-range bg-info"></span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) => a.apr.length - b.apr.length,
    },
    {
      title: "may",
      dataIndex: "may",
      render: (text: string) => (
        <>
          {text === "1" ? (
            <span className="attendance-range bg-success"></span>
          ) : text === "2" ? (
            <span className="attendance-range bg-pending"></span>
          ) : text === "3" ? (
            <span className="attendance-range bg-dark"></span>
          ) : text === "4" ? (
            <span className="attendance-range bg-danger"></span>
          ) : (
            <span className="attendance-range bg-info"></span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) => a.may.length - b.may.length,
    },
    {
      title: "jun",
      dataIndex: "jun",
      render: (text: string) => (
        <>
          {text === "1" ? (
            <span className="attendance-range bg-success"></span>
          ) : text === "2" ? (
            <span className="attendance-range bg-pending"></span>
          ) : text === "3" ? (
            <span className="attendance-range bg-dark"></span>
          ) : text === "4" ? (
            <span className="attendance-range bg-danger"></span>
          ) : (
            <span className="attendance-range bg-info"></span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) => a.jun.length - b.jun.length,
    },
    {
      title: "jul",
      dataIndex: "jul",
      render: (text: string) => (
        <>
          {text === "1" ? (
            <span className="attendance-range bg-success"></span>
          ) : text === "2" ? (
            <span className="attendance-range bg-pending"></span>
          ) : text === "3" ? (
            <span className="attendance-range bg-dark"></span>
          ) : text === "4" ? (
            <span className="attendance-range bg-danger"></span>
          ) : (
            <span className="attendance-range bg-info"></span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) => a.jul.length - b.jul.length,
    },
    {
      title: "aug",
      dataIndex: "aug",
      render: (text: string) => (
        <>
          {text === "1" ? (
            <span className="attendance-range bg-success"></span>
          ) : text === "2" ? (
            <span className="attendance-range bg-pending"></span>
          ) : text === "3" ? (
            <span className="attendance-range bg-dark"></span>
          ) : text === "4" ? (
            <span className="attendance-range bg-danger"></span>
          ) : (
            <span className="attendance-range bg-info"></span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) => a.aug.length - b.aug.length,
    },
    {
      title: "sep",
      dataIndex: "sep",
      render: (text: string) => (
        <>
          {text === "1" ? (
            <span className="attendance-range bg-success"></span>
          ) : text === "2" ? (
            <span className="attendance-range bg-pending"></span>
          ) : text === "3" ? (
            <span className="attendance-range bg-dark"></span>
          ) : text === "4" ? (
            <span className="attendance-range bg-danger"></span>
          ) : (
            <span className="attendance-range bg-info"></span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) => a.sep.length - b.sep.length,
    },
    {
      title: "oct",
      dataIndex: "oct",
      render: (text: string) => (
        <>
          {text === "1" ? (
            <span className="attendance-range bg-success"></span>
          ) : text === "2" ? (
            <span className="attendance-range bg-pending"></span>
          ) : text === "3" ? (
            <span className="attendance-range bg-dark"></span>
          ) : text === "4" ? (
            <span className="attendance-range bg-danger"></span>
          ) : (
            <span className="attendance-range bg-info"></span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) => a.oct.length - b.oct.length,
    },
    {
      title: "nov",
      dataIndex: "nov",
      render: (text: string) => (
        <>
          {text === "1" ? (
            <span className="attendance-range bg-success"></span>
          ) : text === "2" ? (
            <span className="attendance-range bg-pending"></span>
          ) : text === "3" ? (
            <span className="attendance-range bg-dark"></span>
          ) : text === "4" ? (
            <span className="attendance-range bg-danger"></span>
          ) : (
            <span className="attendance-range bg-info"></span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) => a.nov.length - b.nov.length,
    },
    {
      title: "dec",
      dataIndex: "dec",
      render: (text: string) => (
        <>
          {text === "1" ? (
            <span className="attendance-range bg-success"></span>
          ) : text === "2" ? (
            <span className="attendance-range bg-pending"></span>
          ) : text === "3" ? (
            <span className="attendance-range bg-dark"></span>
          ) : text === "4" ? (
            <span className="attendance-range bg-danger"></span>
          ) : (
            <span className="attendance-range bg-info"></span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) => a.dec.length - b.dec.length,
    },
  ];
  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
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
                  <ul className="nav nav-tabs nav-tabs-bottom mb-4">
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
                      <Link to={routes.studentFees} className="nav-link active">
                        <i className="ti ti-report-money me-2" />
                        Fees
                      </Link>
                    </li>
                    <li>
                      <Link to={routes.studentResult} className="nav-link">
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
                  </ul>
                  {/* /List */}
                  <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
                      <h4 className="mb-3">Fees</h4>
                      <div className="d-flex align-items-center flex-wrap">
                        <div className="dropdown mb-3 me-2">
                          <Link
                            to=""
                            className="btn btn-outline-light bg-white dropdown-toggle"
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
                          >
                            <i className="ti ti-calendar-due me-2" />
                            Year : 2024 / 2025
                          </Link>
                          <ul className="dropdown-menu p-3">
                            <li>
                              <Link to="" className="dropdown-item rounded-1">
                                Year : 2024 / 2025
                              </Link>
                            </li>
                            <li>
                              <Link to="" className="dropdown-item rounded-1">
                                Year : 2023 / 2024
                              </Link>
                            </li>
                            <li>
                              <Link to="" className="dropdown-item rounded-1">
                                Year : 2022 / 2023
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-0 py-3">
                      {/* Fees List */}
                      <div className="custom-datatable-filter table-responsive">
                        <table className="table datatable">
                          <thead className="thead-light">
                            <tr>
                              <th>Fees Group</th>
                              <th>Fees Code</th>
                              <th>Due Date</th>
                              <th>Amount $ </th>
                              <th>Status</th>
                              <th>Ref ID</th>
                              <th>Mode</th>
                              <th>Date Paid</th>
                              <th>Discount ($)</th>
                              <th>Fine ($)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <p className="text-primary fees-group">
                                  Class 1 General
                                  <span className="d-block">
                                    (Admission Fees)
                                  </span>
                                </p>
                              </td>
                              <td>admission-fees</td>
                              <td>25 Mar 2024</td>
                              <td>2000</td>
                              <td>
                                <span className="badge badge-soft-success d-inline-flex align-items-center">
                                  <i className="ti ti-circle-filled fs-5 me-1" />
                                  Paid
                                </span>
                              </td>
                              <td>#435454</td>
                              <td>Cash</td>
                              <td>25 Jan 2024</td>
                              <td>10%</td>
                              <td>200</td>
                            </tr>
                            <tr>
                              <td>
                                <p className="text-primary">
                                  Class 1 General{" "}
                                  <span className="d-block">
                                    {" "}
                                    (Mar month fees)
                                  </span>
                                </p>
                              </td>
                              <td>mar-month-fees</td>
                              <td>10 Apr 2024</td>
                              <td>2500</td>
                              <td>
                                <span className="badge badge-soft-success d-inline-flex align-items-center">
                                  <i className="ti ti-circle-filled fs-5 me-1" />
                                  Paid
                                </span>
                              </td>
                              <td>#435453</td>
                              <td>Cash</td>
                              <td>03 Apr 2024</td>
                              <td>10%</td>
                              <td>0</td>
                            </tr>
                            <tr>
                              <td>
                                <p className="text-primary">
                                  Class 1 General{" "}
                                  <span className="d-block">
                                    (Apr month Fees)
                                  </span>
                                </p>
                              </td>
                              <td>apr-month-fees</td>
                              <td>10 May 2024</td>
                              <td>2500</td>
                              <td>
                                <span className="badge badge-soft-success d-inline-flex align-items-center">
                                  <i className="ti ti-circle-filled fs-5 me-1" />
                                  Paid
                                </span>
                              </td>
                              <td>#435453</td>
                              <td>Cash</td>
                              <td>03 Apr 2024</td>
                              <td>10%</td>
                              <td>0</td>
                            </tr>
                            <tr>
                              <td>
                                <p className="text-primary">
                                  Class 1 General{" "}
                                  <span className="d-block">
                                    (May month Fees)
                                  </span>
                                </p>
                              </td>
                              <td>may-month-fees</td>
                              <td>10 Jun 2024</td>
                              <td>2500</td>
                              <td>
                                <span className="badge badge-soft-success d-inline-flex align-items-center">
                                  <i className="ti ti-circle-filled fs-5 me-1" />
                                  Paid
                                </span>
                              </td>
                              <td>#435451</td>
                              <td>Cash</td>
                              <td>02 Jun 2024</td>
                              <td>10%</td>
                              <td>200</td>
                            </tr>
                            <tr>
                              <td>
                                <p className="text-primary">
                                  Class 1 General{" "}
                                  <span className="d-block">
                                    (Jun month Fees)
                                  </span>
                                </p>
                              </td>
                              <td>jun-month-fees</td>
                              <td>10 Jul 2024</td>
                              <td>2500</td>
                              <td>
                                <span className="badge badge-soft-success d-inline-flex align-items-center">
                                  <i className="ti ti-circle-filled fs-5 me-1" />
                                  Paid
                                </span>
                              </td>
                              <td>#435450</td>
                              <td>Cash</td>
                              <td>05 Jul 2024</td>
                              <td>10%</td>
                              <td>200</td>
                            </tr>
                            <tr>
                              <td>
                                <p className="text-primary">
                                  Class 1 General{" "}
                                  <span className="d-block">
                                    (Jul month Fees)
                                  </span>
                                </p>
                              </td>
                              <td>jul-month-fees</td>
                              <td>10 Aug 2024</td>
                              <td>2500</td>
                              <td>
                                <span className="badge badge-soft-success d-inline-flex align-items-center">
                                  <i className="ti ti-circle-filled fs-5 me-1" />
                                  Paid
                                </span>
                              </td>
                              <td>#435449</td>
                              <td>Cash</td>
                              <td>01 Aug 2024</td>
                              <td>10%</td>
                              <td>200</td>
                            </tr>
                            <tr>
                              <td>
                                <p className="text-primary">
                                  Class 1 General{" "}
                                  <span className="d-block">
                                    (Dec month Fees)
                                  </span>
                                </p>
                              </td>
                              <td>dec-month-fees</td>
                              <td>10 Jan 2024</td>
                              <td>2500</td>
                              <td>
                                <span className="badge badge-soft-success d-inline-flex align-items-center">
                                  <i className="ti ti-circle-filled fs-5 me-1" />
                                  Paid
                                </span>
                              </td>
                              <td>#435443</td>
                              <td>Cash</td>
                              <td>05 Jan 2024</td>
                              <td>10%</td>
                              <td>0</td>
                            </tr>
                            <tr>
                              <td>
                                <p className="text-primary">
                                  Class 1 General{" "}
                                  <span className="d-block">
                                    (Jan month Fees)
                                  </span>
                                </p>
                              </td>
                              <td>jan-month-fees</td>
                              <td>10 Feb 2024</td>
                              <td>2000</td>
                              <td>
                                <span className="badge badge-soft-success d-inline-flex align-items-center">
                                  <i className="ti ti-circle-filled fs-5 me-1" />
                                  Paid
                                </span>
                              </td>
                              <td>#435443</td>
                              <td>Cash</td>
                              <td>01 Feb 2024</td>
                              <td>10%</td>
                              <td>200</td>
                            </tr>
                            <tr>
                              <td className="bg-dark">-</td>
                              <td className="bg-dark" />
                              <td className="bg-dark" />
                              <td className="bg-dark text-white">2000</td>
                              <td className="bg-dark" />
                              <td className="bg-dark" />
                              <td className="bg-dark" />
                              <td className="bg-dark" />
                              <td className="bg-dark text-white">200</td>
                              <td className="bg-dark text-white">200</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {/* /Fees List */}
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

export default StudentFees;
