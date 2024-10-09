import { useRef } from "react";
import ImageWithBasePath from "@/components/ImageWithBasePath/ImageWithBasePath";
import CommonSelect from "@/components/student/commonSelect/CommonSelect";
import { Link } from "react-router-dom";
import TooltipOption from "@/components/student/tooltipOption/TooltipOption";
import Table from "../../student/Datatable/index";
import { TableData } from "../../student/data/interface/index";

const ExamAttendance = () => {

  const allClass = [
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
    { value: "IV", label: "IV" },
  ];

  const classSection = [
    { value: "Select", label: "Select" },
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
  ];

  const weeklytest = [
    { value: "Select", label: "Select" },
    { value: "Weekly Test", label: "Weekly Test" },
    { value: "Monthly Test", label: "Monthly Test" },
    { value: "Chapter Wise Test", label: "Chapter Wise Test" },
  ];

  const examattendance = [
    {
      id: "EA123794",
      studentName: "Janet",
      rollNo: "Roll No : 35013",
      english: "green",
      spanish: "green",
      physics: "green",
      chemistry: "green",
      maths: "green",
      computer: "green",
      envScience: "green",
      img: "assets/img/students/student-01.jpg",
      key: 1
    },
    {
      id: "EA123793",
      studentName: "Joann",
      rollNo: "Roll No : 35012",
      english: "green",
      spanish: "red",
      physics: "green",
      chemistry: "green",
      maths: "green",
      computer: "green",
      envScience: "green",
      img: "assets/img/students/student-02.jpg",
      key: 2
    },
    {
      id: "EA123792",
      studentName: "Kathleen",
      rollNo: "Roll No : 35011",
      english: "green",
      spanish: "green",
      physics: "green",
      chemistry: "green",
      maths: "green",
      computer: "green",
      envScience: "green",
      img: "assets/img/students/student-03.jpg",
      key: 3
    },
    {
      id: "EA123791",
      studentName: "Gifford",
      rollNo: "Roll No : 35010",
      english: "green",
      spanish: "green",
      physics: "green",
      chemistry: "green",
      maths: "blue",
      computer: "green",
      envScience: "green",
      img: "assets/img/students/student-04.jpg",
      key: 4
    },
    {
      id: "EA123790",
      studentName: "Lisa",
      rollNo: "Roll No : 35009",
      english: "green",
      spanish: "green",
      physics: "blue",
      chemistry: "green",
      maths: "green",
      computer: "green",
      envScience: "green",
      img: "assets/img/students/student-05.jpg",
      key: 5
    },
    {
      id: "EA123789",
      studentName: "Ralph",
      rollNo: "Roll No : 35008",
      english: "green",
      spanish: "green",
      physics: "green",
      chemistry: "green",
      maths: "green",
      computer: "green",
      envScience: "green",
      img: "assets/img/students/student-06.jpg",
      key: 6
    },
    {
      id: "EA123788",
      studentName: "Julie",
      rollNo: "Roll No : 35007",
      english: "green",
      spanish: "green",
      physics: "green",
      chemistry: "green",
      maths: "green",
      computer: "green",
      envScience: "green",
      img: "assets/img/students/student-07.jpg",
      key: 7
    },
    {
      id: "EA123787",
      studentName: "Ryan",
      rollNo: "Roll No : 35006",
      english: "green",
      spanish: "red",
      physics: "green",
      chemistry: "green",
      maths: "green",
      computer: "green",
      envScience: "green",
      img: "assets/img/students/student-08.jpg",
      key: 8
    },
    {
      id: "EA123786",
      studentName: "Susan",
      rollNo: "Roll No : 35004",
      english: "green",
      spanish: "green",
      physics: "green",
      chemistry: "green",
      maths: "green",
      computer: "red",
      envScience: "green",
      img: "assets/img/students/student-09.jpg",
      key: 9
    },
    {
      id: "EA123785",
      studentName: "Richard",
      rollNo: "Roll No : 35003",
      english: "green",
      spanish: "green",
      physics: "green",
      chemistry: "green",
      maths: "green",
      computer: "green",
      envScience: "green",
      img: "assets/img/students/student-09.jpg",
      key: 10
    }
  ]


  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
  const handleApplyClick = () => {
    if (dropdownMenuRef.current) {
      dropdownMenuRef.current.classList.remove("show");
    }
  };
  const data = examattendance;
  const columns = [
    {
      title: "Nom Etudiant",
      dataIndex: "studentName",
      render: (text: string, record: any) => (
        <div className="d-flex align-items-center">
          <Link to='{routes.studentDetail}' className="avatar avatar-md">
            <ImageWithBasePath
              src={record.img}
              className="img-fluid rounded-circle"
              alt="img"
            />
          </Link>
          <div className="ms-2">
            <p className="text-dark mb-0">
              <Link to='{routes.studentDetail}'>{text}</Link>
            </p>
            <span className="fs-12">{record.rollNo}</span>
          </div>
        </div>
      ),
      sorter: (a: TableData, b: TableData) =>
        a.studentName.length - b.studentName.length,
    },
    {
      title: "English",
      dataIndex: "english",
      render: (text: string, record: any, index: number) => (
        <>
          {text === "green" ? (
            <span className="attendance-range bg-success">
            </span>
          ) : (
            <span className="attendance-range bg-danger">
            </span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) =>
        a.english.length - b.english.length,
    },
    {
      title: "Spanish",
      dataIndex: "spanish",
      render: (text: string, record: any, index: number) => (
        <>
          {text === "green" ? (
            <span className="attendance-range bg-success">
            </span>
          ) : (
            <span className="attendance-range bg-danger">
            </span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) =>
        a.spanish.length - b.spanish.length,
    },
    {
      title: "Physics",
      dataIndex: "physics",
      render: (text: string, record: any, index: number) => (
        <>
          {text === "green" ? (
            <span className="attendance-range bg-success">
            </span>
          ) : (
            <span className="attendance-range bg-pending">
            </span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) =>
        a.physics.length - b.physics.length,
    },
    {
      title: "Chemistry",
      dataIndex: "chemistry",
      render: (text: string, record: any, index: number) => (
        <>
          {text === "green" ? (
            <span className="attendance-range bg-success">
            </span>
          ) : (
            <span className="attendance-range bg-pending">
            </span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) =>
        a.chemistry.length - b.chemistry.length,
    },
    {
      title: "Maths",
      dataIndex: "maths",
      render: (text: string, record: any, index: number) => (
        <>
          {text === "green" ? (
            <span className="attendance-range bg-success">
            </span>
          ) : (
            <span className="attendance-range bg-pending">
            </span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) =>
        a.maths.length - b.maths.length,
    },
    {
      title: "Computer",
      dataIndex: "computer",
      render: (text: string, record: any, index: number) => (
        <>
          {text === "green" ? (
            <span className="attendance-range bg-success">
            </span>
          ) : (
            <span className="attendance-range bg-danger">
            </span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) =>
        a.computer.length - b.computer.length,
    },
    {
      title: "Env Science",
      dataIndex: "envScience",
      render: (text: string, record: any, index: number) => (
        <>
          {text === "green" ? (
            <span className="attendance-range bg-success">
            </span>
          ) : (
            <span className="attendance-range bg-pending">
            </span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) =>
        a.envScience.length - b.envScience.length,
    },

  ];
  return (
    <div>
      <>
        {/* Page Wrapper */}
        <div className="">
          <div className="content">
            {/* Page Header */}
            <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
              <div className="my-auto mb-2">
                <h3 className="page-title mb-1">Présence aux examens</h3>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to='{routes.adminDashboard}'>Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="#">Rapport</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                    Présence aux examens
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
                <TooltipOption />
              </div>
            </div>
            {/* /Page Header */}
            <div className="attendance-types page-header justify-content-end">
              <ul className="attendance-type-list">
                <li>
                  <span className="attendance-icon bg-success">
                    <i className="ti ti-checks" />
                  </span>
                  Present
                </li>
                <li>
                  <span className="attendance-icon bg-danger">
                    <i className="ti ti-x" />
                  </span>
                  Absent
                </li>
                <li>
                  <span className="attendance-icon bg-pending">
                    <i className="ti ti-clock-x" />
                  </span>
                  Retard
                </li>
              </ul>
            </div>
            {/* Attendance List */}
            <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
                <h4 className="mb-3">Présence aux examens</h4>
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
                    <div className="dropdown-menu drop-width">
                      <form>
                        <div className="d-flex align-items-center border-bottom p-3">
                          <h4>Filtre</h4>
                        </div>
                        <div className="p-3 border-bottom pb-0">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label">Classe</label>
                                <CommonSelect
                                  className="select"
                                  options={allClass}
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label">Type d'examen</label>
                                <CommonSelect
                                  className="select"
                                  options={weeklytest}
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
                            to='{routes.studentGrid}'
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
                      Ranger by A-Z
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
                          Ajouter Recement
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body p-0 py-3">
                {/* Student List */}
                <Table columns={columns} dataSource={data} Selection={true} />
                {/* /Student List */}
              </div>
            </div>
            {/* /Attendance List */}
          </div>
        </div>
        {/* /Page Wrapper */}
      </>
    </div>
  );
};

export default ExamAttendance;
