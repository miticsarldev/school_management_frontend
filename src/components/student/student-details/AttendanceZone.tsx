import { Link } from 'react-router-dom'
import Table from "../Datatable/index";
import { TableData } from '../data/interface';

function AttendanceZone() {
    const Attendance = [
        {
          key: "1",
          date: "01",
          lundi: "1",
          mardi: "1",
          mercredi: "1",
          jeudi: "1",
          vendredi: "2",
          samedi: "2",
        },
      ]
  const data2 = Attendance;
const columns2 = [
    {
      title: "Date | Month",
      dataIndex: "date",
      sorter: (a: TableData, b: TableData) => a.date.length - b.date.length,
    },
    {
      title: "lundi",
      dataIndex: "lundi",
      render: (text: string) => (
        <>
          {text === "1" ? (
            <span className="attendance-range bg-success"></span>
          ) : text === "2" ? (
            <span className="attendance-range bg-danger"></span>
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
      title: "Mardi",
      dataIndex: "mardi",
      render: (text: string) => (
        <>
          {text === "1" ? (
            <span className="attendance-range bg-success"></span>
          ) : text === "2" ? (
            <span className="attendance-range bg-danger"></span>
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
      title: "Mercredi",
      dataIndex: "mercredi",
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
      title: "Jeudi",
      dataIndex: "jeudi",
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
      title: "vendredi",
      dataIndex: "vendredi",
      render: (text: string) => (
        <>
          {text === "1" ? (
            <span className="attendance-range bg-success"></span>
          ) : text === "2" ? (
            <span className="attendance-range bg-danger"></span>
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
  ];
    return (
        <div className="tab-pane fade" id="attendance">
            <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-1">
                    <h4 className="mb-3">Attendance</h4>
                </div>
                <div className="card-body pb-1">
                    <div className="row">
                        {/* Total Present */}
                        <div className="col-md-6 col-xxl-3 d-flex">
                            <div className="d-flex align-items-center rounded border p-3 mb-3 flex-fill">
                                <span className="avatar avatar-lg bg-primary-transparent rounded me-2 flex-shrink-0 text-primary">
                                    <i className="ti ti-user-check fs-24" />
                                </span>
                                <div className="ms-2">
                                    <p className="mb-1">Present</p>
                                    <h5>4</h5>
                                </div>
                            </div>
                        </div>
                        {/* /Total Present */}
                        {/* Total Absent */}
                        <div className="col-md-6 col-xxl-3 d-flex">
                            <div className="d-flex align-items-center rounded border p-3 mb-3 flex-fill">
                                <span className="avatar avatar-lg bg-danger-transparent rounded me-2 flex-shrink-0 text-danger">
                                    <i className="ti ti-user-check fs-24" />
                                </span>
                                <div className="ms-2">
                                    <p className="mb-1">Absent</p>
                                    <h5>01</h5>
                                </div>
                            </div>
                        </div>
                        {/* /Total Absent */} 
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-1">
                    <h4 className="mb-3">Absence et presence</h4>
                </div>
                <div className="card-body p-0 py-3">
                    <div className="px-3">
                        <div className="d-flex align-items-center flex-wrap">
                            <div className="d-flex align-items-center bg-white border rounded p-2 me-3 mb-3">
                                <span className="avatar avatar-sm bg-success rounded me-2 flex-shrink-0 ">
                                    <i className="ti ti-checks" />
                                </span>
                                <p className="text-dark">Present</p>
                            </div>
                            <div className="d-flex align-items-center bg-white border rounded p-2 me-3 mb-3">
                                <span className="avatar avatar-sm bg-danger rounded me-2 flex-shrink-0 ">
                                    <i className="ti ti-x" />
                                </span>
                                <p className="text-dark">Absent</p>
                            </div>
                        </div>
                    </div>
                    
                    <Table
                        dataSource={data2}
                        columns={columns2}
                        Selection={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default AttendanceZone
