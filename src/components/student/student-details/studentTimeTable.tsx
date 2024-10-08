import { Link } from 'react-router-dom'
// import { all_routes } from '../../../router/all_routes'
import StudentModals from '../studentModals/StudentModals'
import StudentSidebar from './studentSidebar'
import StudentBreadcrumb from './studentBreadcrumb'
import ScheduleCard from './SheduleCard'
import CardBreak from './CardBreak'
import ProfilNav from './ProfilNav'

const StudentTimeTable = () => {
    const routes = [
        { path: '/dashboard/studentDetails', label: 'Student Details', icon: 'ti-school' },
        { path: '/dashboard/studentTimeTable', label: 'Time Table', icon: 'ti-table-options' },
        { path: '/dashboard/studentLeaves', label: 'Leave & Attendance', icon: 'ti-calendar-due' },
        { path: '/dashboard/studentFees', label: 'Fees', icon: 'ti-report-money' },
        { path: '/dashboard/studentResult', label: 'Exam & Results', icon: 'ti-bookmark-edit' },
      ];
    // const routes = all_routes
    return (
        <>
            {/* Page Wrapper */}
            <div className="">
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
                                            <Link to='{routes.studentDetail}' className="nav-link">
                                                <i className="ti ti-school me-2" />
                                                Student Details
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to='{routes.studentTimeTable}' className="nav-link active">
                                                <i className="ti ti-table-options me-2" />
                                                Time Table
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to='{routes.studentLeaves}' className="nav-link">
                                                <i className="ti ti-calendar-due me-2" />
                                                Leave &amp; Attendance
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to='{routes.studentFees}' className="nav-link">
                                                <i className="ti ti-report-money me-2" />
                                                Fees
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to='{routes.studentResult}' className="nav-link">
                                                <i className="ti ti-bookmark-edit me-2" />
                                                Exam &amp; Results
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to='{routes.studentLibrary}' className="nav-link">
                                                <i className="ti ti-books me-2" />
                                                Library
                                            </Link>
                                        </li>
                                    </ul> */}
                                    <ProfilNav routes={routes} />

                                    {/* /List */}
                                    <div className="card">
                                        <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
                                            <h4 className="mb-3">Exams &amp; Results</h4>
                                            <div className="d-flex align-items-center flex-wrap">
                                                <div className="dropdown mb-3">
                                                    <Link
                                                        to="#"
                                                        className="btn btn-outline-light border-white bg-white dropdown-toggle shadow-md"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <i className="ti ti-calendar-due me-2" />
                                                        This Year
                                                    </Link>
                                                    <ul className="dropdown-menu p-3">
                                                        <li>
                                                            <Link
                                                                to="#"
                                                                className="dropdown-item rounded-1"
                                                            >
                                                                This Year
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                to="#"
                                                                className="dropdown-item rounded-1"
                                                            >
                                                                This Month
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                to="#"
                                                                className="dropdown-item rounded-1"
                                                            >
                                                                This Week
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body pb-0">
                                            <div className="d-flex flex-nowrap overflow-auto">
                                                <div className="d-flex flex-column me-4 flex-fill">
                                                    <div className="mb-3">
                                                        <h6>Monday</h6>
                                                    </div>
                                                    <ScheduleCard
                                                        time="09:00 - 09:45 AM"
                                                        subject="Maths"
                                                        teacherName="Jacquelin"
                                                        teacherImage="assets/img/teachers/teacher-07.jpg"
                                                        teacherDetailsLink="/teacher-details"
                                                    />
                                                </div>
                                                <div className="d-flex flex-column me-4 flex-fill">
                                                    <div className="mb-3">
                                                        <h6>Tuesday</h6>
                                                    </div>
                                                    <ScheduleCard
                                                        time="09:00 - 09:45 AM"
                                                        subject="Maths"
                                                        teacherName="Jacquelin"
                                                        teacherImage="assets/img/teachers/teacher-07.jpg"
                                                        teacherDetailsLink="/teacher-details"
                                                    />
                                                </div>
                                                <div className="d-flex flex-column me-4 flex-fill">
                                                    <div className="mb-3">
                                                        <h6>Wednesday</h6>
                                                    </div>
                                                    <ScheduleCard
                                                        time="09:00 - 09:45 AM"
                                                        subject="Maths"
                                                        teacherName="Jacquelin"
                                                        teacherImage="assets/img/teachers/teacher-07.jpg"
                                                        teacherDetailsLink="/teacher-details"
                                                    />

                                                </div>
                                                <div className="d-flex flex-column me-4 flex-fill">
                                                    <div className="mb-3">
                                                        <h6>Thursday</h6>
                                                    </div>
                                                    <ScheduleCard
                                                        time="09:00 - 09:45 AM"
                                                        subject="Maths"
                                                        teacherName="Jacquelin"
                                                        teacherImage="assets/img/teachers/teacher-07.jpg"
                                                        teacherDetailsLink="/teacher-details"
                                                    />
                                                </div>
                                                <div className="d-flex flex-column me-4 flex-fill">
                                                    <div className="mb-3">
                                                        <h6>Friday</h6>
                                                    </div>
                                                    <ScheduleCard
                                                        time="09:00 - 09:45 AM"
                                                        subject="Maths"
                                                        teacherName="Jacquelin"
                                                        teacherImage="assets/img/teachers/teacher-07.jpg"
                                                        teacherDetailsLink="/teacher-details"
                                                    />
                                                </div>
                                                <div className="d-flex flex-column flex-fill">
                                                    <div className="mb-3">
                                                        <h6>Saturday</h6>
                                                    </div>
                                                    <ScheduleCard
                                                        time="09:00 - 09:45 AM"
                                                        subject="Maths"
                                                        teacherName="Jacquelin"
                                                        teacherImage="assets/img/teachers/teacher-07.jpg"
                                                        teacherDetailsLink="/teacher-details"
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer border-0 pb-0">
                                            <div className="row">

                                                <CardBreak
                                                    badgeText="Morning Break"
                                                    badgeColor="primary"
                                                    timeRange="10:30 to 10:45 AM"
                                                />

                                                <CardBreak
                                                    badgeText="Lunch"
                                                    badgeColor="warning"
                                                    timeRange="10:30 to 10:45 AM"
                                                />

                                                <CardBreak
                                                    badgeText="Evening Break"
                                                    badgeColor="info"
                                                    timeRange="10:30 to 10:45 AM"
                                                />
                                                {/* <div className="col-lg-4 col-xxl-3 d-flex">
                                                    <div className="card flex-fill">
                                                        <div className="card-body">
                                                            <span className="bg-info badge badge-sm mb-2">
                                                                Evening Break
                                                            </span>
                                                            <p className="text-dark">
                                                                <i className="ti ti-clock me-1" />
                                                                03:30 PM to 03:45 PM
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div> */}
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

    )
}

export default StudentTimeTable