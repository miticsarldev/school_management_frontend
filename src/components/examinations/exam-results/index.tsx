import { useRef } from 'react'
import ImageWithBasePath from '@/components/ImageWithBasePath/ImageWithBasePath';
import Table from "../../student/Datatable/index";
import { TableData } from "../../student/data/interface/index";
import { Link } from 'react-router-dom';
import CommonSelect from '@/components/student/commonSelect/CommonSelect';
import TooltipOption from '@/components/student/tooltipOption/TooltipOption';

const ExamResult = () => {

  const examresult = [
    {
      admissionNo: "AD9892434",
      studentName: "Janet",
      english: 95,
      spanish: 93,
      physics: 88,
      chemistry: 90,
      maths: 85,
      computer: 98,
      envScience: 95,
      total: 644,
      percent: 92,
      grade: "O",
      result: "Pass",
      roll: "Roll No : 35013",
      img: "assets/img/students/student-01.jpg",
      key: 1
    },
    {
      admissionNo: "AD9892433",
      studentName: "Joann",
      english: "30",
      spanish: 35,
      physics: 36,
      chemistry: "28",
      maths: 38,
      computer: 40,
      envScience: 37,
      total: 244,
      percent: 34,
      grade: "F",
      result: "Fail",
      roll: "Roll No : 35012",
      img: "assets/img/students/student-02.jpg",
      key: 2
    },
    {
      admissionNo: "AD98924",
      studentName: "Kathleen",
      english: 70,
      spanish: 80,
      physics: 85,
      chemistry: 78,
      maths: 82,
      computer: 83,
      envScience: 80,
      total: 558,
      percent: 79,
      grade: "A",
      result: "Pass",
      roll: "Roll No : 35011",
      img: "assets/img/students/student-03.jpg",
      key: 3
    },
    {
      admissionNo: "AD9892431",
      studentName: "Gifford",
      english: 60,
      spanish: 68,
      physics: 65,
      chemistry: 70,
      maths: 67,
      computer: 72,
      envScience: 75,
      total: 477,
      percent: 68,
      grade: "B+",
      result: "Pass",
      roll: "Roll No : 35010",
      img: "assets/img/students/student-04.jpg",
      key: 4
    },
    {
      admissionNo: "AD98924",
      studentName: "Lisa",
      english: 36,
      spanish: "30",
      physics: 40,
      chemistry: 38,
      maths: 50,
      computer: 48,
      envScience: 43,
      total: "28",
      percent: 40,
      grade: "F",
      result: "Fail",
      roll: "Roll No : 35009",
      img: "assets/img/students/student-05.jpg",
      key: 5
    },
    {
      admissionNo: "AD9892429",
      studentName: "Ralph",
      english: 43,
      spanish: 50,
      physics: 62,
      chemistry: 70,
      maths: 65,
      computer: 58,
      envScience: 60,
      total: 408,
      percent: 58,
      grade: "B",
      result: "Pass",
      roll: "Roll No : 35008",
      img: "assets/img/students/student-06.jpg",
      key: 6
    },
    {
      admissionNo: "AD98924",
      studentName: "Julie",
      english: 72,
      spanish: 80,
      physics: 75,
      chemistry: 78,
      maths: 84,
      computer: 87,
      envScience: 76,
      total: 552,
      percent: 78,
      grade: "A",
      result: "Pass",
      roll: "Roll No : 35007",
      img: "assets/img/students/student-07.jpg",
      key: 7
    },
    {
      admissionNo: "AD9892427",
      studentName: "Ryan",
      english: 40,
      spanish: 48,
      physics: 42,
      chemistry: 47,
      maths: "32",
      computer: 58,
      envScience: 50,
      total: 317,
      percent: 45,
      grade: "F",
      result: "Fail",
      roll: "Roll No : 35006",
      img: "assets/img/students/student-08.jpg",
      key: 8
    },
    {
      admissionNo: "AD9892426",
      studentName: "Susan",
      english: 60,
      spanish: 62,
      physics: 65,
      chemistry: 70,
      maths: 72,
      computer: 63,
      envScience: 78,
      total: 470,
      percent: 67,
      grade: "B+",
      result: "Pass",
      roll: "Roll No : 35005",
      img: "assets/img/students/student-09.jpg",
      key: 9
    },
    {
      admissionNo: "AD9892425",
      studentName: "Susan",
      english: 72,
      spanish: 78,
      physics: 85,
      chemistry: 83,
      maths: 86,
      computer: 90,
      envScience: 92,
      total: 586,
      percent: 83,
      grade: "A+",
      result: "Pass",
      roll: "Roll No : 35004",
      img: "assets/img/students/student-10.jpg",
      key: 10
    }
  ]

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



  const data = examresult;
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
  const handleApplyClick = () => {
    if (dropdownMenuRef.current) {
      dropdownMenuRef.current.classList.remove("show");
    }
  };
  const columns = [
   
    {
      title: "Student Name",
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
            <span className="fs-12">{record.roll}</span>
          </div>
        </div>
      ),
      sorter: (a: TableData, b: TableData) => a.studentName.length - b.studentName.length,
    },
    {
      title: "English",
      dataIndex: "english",
      render: (text: string, record: any, index: number) => (
        <>
          {text === "30" ? (
            <span className="text-danger">{text}</span>
          ) : (
            <span className="attendance-range">{text}</span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) => a.english.length - b.english.length,
    },
    {
      title: "Spanish",
      dataIndex: "spanish",
      render: (text: string, record: any, index: number) => (
        <>
          {text === "30" ? (
            <span className="text-danger">{text}</span>
          ) : (
            <span className="attendance-range">{text}</span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) => a.spanish.length - b.spanish.length,
    },
    {
      title: "Physics",
      dataIndex: "physics",
      sorter: (a: TableData, b: TableData) => a.physics.length - b.physics.length,
    },
    {
      title: "Chemistry",
      dataIndex: "chemistry",
      render: (text: string, record: any, index: number) => (
        <>
          {text === "28" ? (
            <span className="text-danger">{text}</span>
          ) : (
            <span className="attendance-range">{text}</span>
          )}
        </>
      ),
      sorter: (a: TableData, b: TableData) => a.chemistry.length - b.chemistry.length,
    },
    {
      title: "Env Science",
      dataIndex: "envScience",
      sorter: (a: TableData, b: TableData) => a.envScience.length - b.envScience.length,
    },
    {
      title: "Total",
      dataIndex: "total",
      sorter: (a: TableData, b: TableData) => a.total.length - b.total.length,
    },
    {
      title: "Percent",
      dataIndex: "percent",
      sorter: (a: TableData, b: TableData) => a.percent.length - b.percent.length,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      sorter: (a: TableData, b: TableData) => a.grade.length - b.grade.length,
    },
    {
      title: "Result",
      dataIndex: "result",
      render: (text: string) => (
        <>
          {text === "Pass" ? (
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
      sorter: (a: TableData, b: TableData) => a.result.length - b.result.length,
    }
  ];
  
  return (
    <div>
      <>
        {/* Page Wrapper */}
        <div >
          <div className="content">
            {/* Page Header */}
            <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
              <div className="my-auto mb-2">
                <h3 className="page-title mb-1">Exam Result</h3>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to='{routes.adminDashboard}'>Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="#">Academic </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Exam Result
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
                <TooltipOption />
              </div>
            </div>
            {/* /Page Header */}
            {/* Guardians List */}
            <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
                <h4 className="mb-3">Exam Results</h4>
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
                      Filter
                    </Link>
                    <div className="dropdown-menu drop-width" ref={dropdownMenuRef}>
                      <form>
                        <div className="d-flex align-items-center border-bottom p-3">
                          <h4>Filter</h4>
                        </div>
                        <div className="p-3 border-bottom pb-0">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label">Class</label>
                                <CommonSelect
                                  className="select"
                                  options={allClass}
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label">Section</label>
                                <CommonSelect
                                  className="select"
                                  options={classSection}
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label">Exam Type</label>
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
                            Reset
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-primary"
                            onClick={handleApplyClick}
                          >
                            Apply
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
                      Sort by A-Z
                    </Link>
                    <ul className="dropdown-menu p-3">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item rounded-1 active"
                        >
                          Ascending
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item rounded-1"
                        >
                          Descending
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item rounded-1"
                        >
                          Recently Viewed
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item rounded-1"
                        >
                          Recently Added
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
        {/* /Page Wrapper */}
      </>

    </div>
  )
}

export default ExamResult