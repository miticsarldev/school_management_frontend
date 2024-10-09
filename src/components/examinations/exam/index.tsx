import { useRef } from "react";
import { Link } from "react-router-dom";
import Table from "../../student/Datatable/index";
import { TableData } from "../../student/data/interface/index";
import CommonSelect from "@/components/student/commonSelect/CommonSelect";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import TooltipOption from "@/components/student/tooltipOption/TooltipOption";

const Exam = () => {

  const exam = [
    {
      id: "E140523",
      examName: "Week Test",
      examDate: "13 May 2024",
      startTime: "09:30 AM",
      endTime: "10:45 AM",
      key: 1
    },
    {
      id: "E140522",
      examName: "Mothly Test",
      examDate: "27 May 2024",
      startTime: "09:30 AM",
      endTime: "11:00 AM",
      key: 2
    },
    {
      id: "E140521",
      examName: "Chapter Wise Test",
      examDate: "05 Jun 2024",
      startTime: "09:30 AM",
      endTime: "10:30 AM",
      key: 3
    },
    {
      id: "E140520",
      examName: "Unit Test",
      examDate: "15 Jun 2024",
      startTime: "10:30 AM",
      endTime: "11:30 AM",
      key: 4
    },
    {
      id: "E140519",
      examName: "Progress Test",
      examDate: "20 Jun 2024",
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      key: 5
    },
    {
      id: "E140518",
      examName: "Oral Test",
      examDate: "03 Jul 2024",
      startTime: "12:30 PM",
      endTime: "01:30 PM",
      key: 6
    },
    {
      id: "E140517",
      examName: "Semester Exam",
      examDate: "18 Jul 2024",
      startTime: "10:30 AM",
      endTime: "12:30 PM",
      key: 7
    },
    {
      id: "E140516",
      examName: "Quaterly Exam",
      examDate: "26 Aug 2024",
      startTime: "09:00 AM",
      endTime: "12:00 PM",
      key: 8
    },
    {
      id: "E140515",
      examName: "Half Yearly Exam",
      examDate: "15 Nov 2024",
      startTime: "09:30 AM",
      endTime: "12:30 PM",
      key: 9
    },
    {
      id: "E140514",
      examName: "Annual Exam",
      examDate: "10 Mar 2025",
      startTime: "10:00 AM",
      endTime: "01:00 PM",
      key: 10
    }
  ];

  const examtwo = [
    { value: "Select", label: "Select" },
    { value: "Week Test", label: "Week Test" },
    { value: "Monthly Test", label: "Monthly Test" },
    { value: "Chapter Wise Test", label: "Chapter Wise Test" },
  ];

  const examOne = [
    { value: "Select", label: "Select" },
    { value: "13 May 2024", label: "13 May 2024" },
    { value: "27 May 2024", label: "27 May 2024" },
    { value: "05 Jun 2024", label: "05 Jun 2024" },
  ];

  const startTimeOne = [
    { value: "Select", label: "Select" },
    { value: "10:45 AM", label: "10:45 AM" },
    { value: "11:00 AM", label: "11:00 AM" },
    { value: "11:30 AM", label: "11:30 AM" },
    { value: "12:00 PM", label: "12:00 PM" },
  ];

  const startTime = [
    { value: "Select", label: "Select" },
    { value: "09:30 AM", label: "09:30 AM" },
    { value: "10:30 AM", label: "10:30 AM" },
    { value: "12:30 PM", label: "12:30 PM" },
  ];





  const data = exam;
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${month}-${day}-${year}`;
  const defaultValue = dayjs(formattedDate);

  const handleApplyClick = () => {
    if (dropdownMenuRef.current) {
      dropdownMenuRef.current.classList.remove("show");
    }
  };
  const getModalContainer = () => {
    const modalElement = document.getElementById("modal-datepicker");
    return modalElement ? modalElement : document.body; // Fallback to document.body if modalElement is null
  };
  const columns = [
    {
      title: "Nom Examen",
      dataIndex: "examName",
      sorter: (a: TableData, b: TableData) =>
        a.examName.length - b.examName.length,
    },
    {
      title: "Date Examen",
      dataIndex: "examDate",
      sorter: (a: TableData, b: TableData) =>
        a.examDate.length - b.examDate.length,
    },
    {
      title: "Heure Debut",
      dataIndex: "startTime",
      sorter: (a: TableData, b: TableData) =>
        a.startTime.length - b.startTime.length,
    },
    {
      title: "Heure fin",
      dataIndex: "endTime",
      sorter: (a: TableData, b: TableData) =>
        a.endTime.length - b.endTime.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <>
          <div className="d-flex align-items-center">
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
                  <Link
                    className="dropdown-item rounded-1"
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_exam"
                  >
                    <i className="ti ti-edit-circle me-2" />
                    Edit
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item rounded-1"
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete-modal"
                  >
                    <i className="ti ti-trash-x me-2" />
                    Delete
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      ),
    },
  ];
  return (
    <div>
      <div >
        <div className="content">
          {/* Page Header */}
          <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
            <div className="my-auto mb-2">
              <h3 className="page-title mb-1">Exame</h3>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to='{routes.adminDashboard}'>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Academie </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Examen
                  </li>
                </ol>
              </nav>
            </div>
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
              <TooltipOption />
              <div className="mb-2">
                <Link
                  to="#"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#add_exam"
                >
                  <i className="ti ti-square-rounded-plus-filled me-2" />
                  ajouter examen
                </Link>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Guardians List */}
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
              <h4 className="mb-3">Liste des examens</h4>
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
                    filtre
                  </Link>
                  <div
                    className="dropdown-menu drop-width"
                    ref={dropdownMenuRef}
                  >
                    <form>
                      <div className="d-flex align-items-center border-bottom p-3">
                        <h4>filtre</h4>
                      </div>
                      <div className="p-3 border-bottom pb-0">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">nom</label>
                              <CommonSelect
                                className="select"
                                options={examtwo}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">Date</label>
                              <CommonSelect
                                className="select"
                                options={examOne}
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
                    Ranger de A-Z
                  </Link>
                  <ul className="dropdown-menu p-3">
                    <li>
                      <Link to="#" className="dropdown-item rounded-1 active">
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
                        ajouter recement
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body p-0 py-3">
              {/* Guardians List */}
              <Table columns={columns} dataSource={data} Selection={true} />

              {/* /Guardians List */}
            </div>
          </div>
          {/* /Guardians List */}
        </div>
      </div>
      <>
        {/* Add Exam */}
        <div className="modal fade" id="add_exam">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">ajouter examen</h4>
                <button
                  type="button"
                  className="btn-close custom-btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <form >
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Nom examen</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Date Examen</label>
                        <div className="date-pic">
                          <DatePicker
                            className="form-control datetimepicker"
                            format={{
                              format: "DD-MM-YYYY",
                              type: "mask",
                            }}
                            getPopupContainer={getModalContainer}
                            defaultValue={defaultValue}
                            placeholder="16 May 2024"
                          />
                          <span className="cal-icon">
                            <i className="ti ti-calendar" />
                          </span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">heure debut</label>
                        <CommonSelect className="select" options={startTime} />
                      </div>
                      <div className="mb-0">
                        <label className="form-label">heure fin</label>
                        <CommonSelect
                          className="select"
                          options={startTimeOne}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <Link
                    to="#"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                  >
                    retour
                  </Link>
                  <Link className="btn btn-primary" to="#" data-bs-dismiss="modal">
                    ajouter
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Add Exam */}
        {/* Edit Exam */}
        <div className="modal fade" id="edit_exam">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Modifier Examen</h4>
                <button
                  type="button"
                  className="btn-close custom-btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <form >
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Nom Examen</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Exam Name"
                          defaultValue="Week Test"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">date Examen</label>
                        <div className="date-pic">
                          <DatePicker
                            className="form-control datetimepicker"
                            format={{
                              format: "DD-MM-YYYY",
                              type: "mask",
                            }}
                            getPopupContainer={getModalContainer}
                            defaultValue={defaultValue}
                            placeholder="16 May 2024"
                          />
                          <span className="cal-icon">
                            <i className="ti ti-calendar" />
                          </span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">heure debut</label>
                        <CommonSelect
                          className="select"
                          options={startTime}
                          defaultValue={startTime[1]}
                        />
                      </div>
                      <div className="mb-0">
                        <label className="form-label">heure fin</label>
                        <CommonSelect
                          className="select"
                          options={startTimeOne}
                          defaultValue={startTimeOne[1]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <Link
                    to="#"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Annuler
                  </Link>
                  <Link className="btn btn-primary" to="#" data-bs-dismiss="modal">
                    Modifier
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Edit Exam */}
        {/* Delete Modal */}
        <div className="modal fade" id="delete-modal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form >
                <div className="modal-body text-center">
                  <span className="delete-icon">
                    <i className="ti ti-trash-x" />
                  </span>
                  <h4>Confirmer la suppression</h4>
                  <p>
                  Vous souhaitez supprimer tous les éléments marqués, cette opération ne peut pas être annulée
                  une fois supprimée.
                  </p>
                  <div className="d-flex justify-content-center">
                    <Link
                      to="#"
                      className="btn btn-light me-3"
                      data-bs-dismiss="modal"
                    >
                      Annuler
                    </Link>
                    <Link to="#" data-bs-dismiss="modal" className="btn btn-danger">
                      Oui, supprimer
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Delete Modal */}
      </>
    </div>
  );
};

export default Exam;
