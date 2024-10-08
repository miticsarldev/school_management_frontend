import  { useRef } from "react";
import { Link } from "react-router-dom";
import CommonSelect from "../student/commonSelect/CommonSelect";
import {
  AdmissionNo,
  allClass,
  allSection,
  amount,
  DueDate,
  
  names,
  rollno,
} from "./selectoption";
import { collectFessData } from "./collectFeesData";
import Table from "../student/Datatable/index";
import { TableData } from "../student/data/interface";
import StudentModals from "../student/studentModals/StudentModals";
import ImageWithBasePath from "../ImageWithBasePath/ImageWithBasePath";
import TooltipOption from "../student/tooltipOption/TooltipOption";

const CollectFees = () => {
//   const routes = all_routes;
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
  const data = collectFessData;
  const handleApplyClick = () => {
    if (dropdownMenuRef.current) {
      dropdownMenuRef.current.classList.remove("show");
    }
  };
  const columns = [
    {
      title: "Etudiant",
      dataIndex: "student",
      render: (text: string, record: any) => (
        <div className="d-flex align-items-center">
          <Link to='{routes.studentDetail}' className="avatar avatar-md">
            <ImageWithBasePath
              src={record.studentImage}
              className="img-fluid rounded-circle"
              alt="img"
            />
          </Link>
          <div className="ms-2">
            <p className="text-dark mb-0">
              <Link to='{routes.studentDetail}'>{text}</Link>
            </p>
            <span className="fs-12">{record.studentClass}</span>
          </div>
        </div>
      ),
      sorter: (a: TableData, b: TableData) =>
        a.student.length - b.student.length,
    },
    {
      title: "Classe",
      dataIndex: "class",
      sorter: (a: TableData, b: TableData) => a.class.length - b.class.length,
    },
    {
      title: "Montant (Fcfa)",
      dataIndex: "amount",
      sorter: (a: TableData, b: TableData) => a.amount.length - b.amount.length,
    },

    {
      title: "Derniere date",
      dataIndex: "lastDate",
      sorter: (a: TableData, b: TableData) =>
        a.lastDate.length - b.lastDate.length,
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <>
          {text === "Paid" ? (
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
    {
      title: "Action",
      dataIndex: "status",
      render: (text: string) => (
        <>
          {text === "Paid" ? (
            <Link to='{routes.studentFees}' className="btn btn-light">
              Voir details
            </Link>
          ) : (
            <Link
              to="#"
              className="btn btn-light"
              data-bs-toggle="modal"
              data-bs-target="#add_fees_collect"
            >
              Percevoir les frais
            </Link>
          )}
        </>
      ),
    },
  ];
  return (
    <>
      {/* Page Wrapper */}
      <div className="">
        <div className="content">
          {/* Page Header */}
          <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
            <div className="my-auto mb-2">
              <h3 className="page-title mb-1">Collecte des frais</h3>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to='{routes.adminDashboard}'>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Collecte des frais</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Collect Fees
                  </li>
                </ol>
              </nav>
            </div>
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
              <TooltipOption />
            </div>
          </div>
          {/* /Page Header */}
          {/* Students List */}
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
              <h4 className="mb-3">Fees List</h4>
              <div className="d-flex align-items-center flex-wrap">
                {/* <div className="input-icon-start mb-3 me-2 position-relative">
                  <PredefinedDateRanges />
                </div> */}
                <div className="dropdown mb-3 me-2">
                  <Link
                    to="#"
                    className="btn btn-outline-light bg-white dropdown-toggle"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    <i className="ti ti-filter me-2" />
                    Filtre
                  </Link>
                  <div
                    className="dropdown-menu drop-width"
                    ref={dropdownMenuRef}
                  >
                    <form>
                      <div className="d-flex align-items-center border-bottom p-3">
                        <h4>Filtre</h4>
                      </div>
                      <div className="p-3 border-bottom">
                        <div className="row">
      
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">Etudiant</label>
                              <CommonSelect
                                className="select"
                                options={names}
                                defaultValue={names[0]}
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Classe</label>
                              <CommonSelect
                                className="select"
                                options={allClass}
                                defaultValue={allClass[0]}
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="mb-0">
                              <label className="form-label">Montant</label>
                              <CommonSelect
                                className="select"
                                options={amount}
                                defaultValue={amount[0]}
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="mb-0">
                              <label className="form-label">Date</label>
                              <CommonSelect
                                className="select"
                                options={DueDate}
                                defaultValue={DueDate[0]}
                              />
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="p-3 d-flex align-items-center justify-content-end">
                        <Link to="#" className="btn btn-light me-3">
                          Annuler
                        </Link>
                        <Link
                          to="#"
                          className="btn btn-primary"
                          onClick={handleApplyClick}
                        >
                          Appliquer
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="dropdown mb-3">
                  <Link
                    to="#"
                    className="btn btn-outline-light bg-white dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <i className="ti ti-sort-ascending-2 me-2" />
                    trier par A-Z{" "}
                  </Link>
                  <ul className="dropdown-menu p-3">
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Ascendant
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Descendant
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Ajouter recement
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body p-0 py-3">
              {/* Student List */}
              <Table dataSource={data} columns={columns} Selection={true} />
              {/* /Student List */}
            </div>
          </div>
          {/* /Students List */}
        </div>
      </div>
      {/* /Page Wrapper */}
      <StudentModals />
    </>
  );
};

export default CollectFees;
