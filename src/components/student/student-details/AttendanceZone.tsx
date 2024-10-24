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
      title: "Semaine | Mois",
      dataIndex: "week",
      render: (text: any) => (
        <span>{`Semaine ${text.week} | ${text.month}`}</span>
      ),
      sorter: (a: any, b: any) => a.week - b.week,
    },
    {
      title: "Lundi",
      dataIndex: "days.Monday",
      render: (text: any) => (
        <>
          {text.length > 0 ? (
            text.map((status: boolean, index: number) => (
              <span key={index} className={`attendance-range ${status ? 'bg-success' : 'bg-danger'}`}></span>
            ))
          ) : (
            <span>N/A</span>
          )}
        </>
      ),
      sorter: (a: any, b: any) => a.days.Monday.length - b.days.Monday.length,
    },
    {
      title: "Mardi",
      dataIndex: "days.Tuesday",
      render: (text: any) => (
        <>
          {text.length > 0 ? (
            text.map((status: boolean, index: number) => (
              <span key={index} className={`attendance-range ${status ? 'bg-success' : 'bg-danger'}`}></span>
            ))
          ) : (
            <span>N/A</span>
          )}
        </>
      ),
      sorter: (a: any, b: any) => a.days.Tuesday.length - b.days.Tuesday.length,
    },
    {
      title: "Mercredi",
      dataIndex: "days.Wednesday",
      render: (text: any) => (
        <>
          {text.length > 0 ? (
            text.map((status: boolean, index: number) => (
              <span key={index} className={`attendance-range ${status ? 'bg-success' : 'bg-danger'}`}></span>
            ))
          ) : (
            <span>N/A</span>
          )}
        </>
      ),
      sorter: (a: any, b: any) => a.days.Wednesday.length - b.days.Wednesday.length,
    },
    {
      title: "Jeudi",
      dataIndex: "days.Thursday",
      render: (text: any) => (
        <>
          {text.length > 0 ? (
            text.map((status: boolean, index: number) => (
              <span key={index} className={`attendance-range ${status ? 'bg-success' : 'bg-danger'}`}></span>
            ))
          ) : (
            <span>N/A</span>
          )}
        </>
      ),
      sorter: (a: any, b: any) => a.days.Thursday.length - b.days.Thursday.length,
    },
    {
      title: "Vendredi",
      dataIndex: "days.Friday",
      render: (text: any) => (
        <>
          {text.length > 0 ? (
            text.map((status: boolean, index: number) => (
              <span key={index} className={`attendance-range ${status ? 'bg-success' : 'bg-danger'}`}></span>
            ))
          ) : (
            <span>N/A</span>
          )}
        </>
      ),
      sorter: (a: any, b: any) => a.days.Friday.length - b.days.Friday.length,
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
