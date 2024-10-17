import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import StudentModals from '../studentModals/StudentModals'
import CommonSelect from '../commonSelect/CommonSelect'
import TooltipOption from '../tooltipOption/TooltipOption'
import StudentCard from '../studentCard/StudentCard'
import { useGetAllUsersQuery } from '@/redux/features/authSlice'

const StudentGrid = () => {
    const dropdownMenuRef = useRef<HTMLDivElement | null>(null);


    const allClass = [
        { value: "I", label: "I" },
        { value: "II", label: "II" },
        { value: "III", label: "III" },
        { value: "IV", label: "IV" },
    ];

    const names = [
        { value: "James", label: "James" },
        { value: "Joseph", label: "Joseph" },
        { value: "Kathlen", label: "Kathlen" },
        { value: "Marilyn", label: "Marilyn" },
    ];

    const gender = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
    ];

    const status = [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
    ];

    // States for filter values
    const [selectedClass, setSelectedClass] = useState(allClass[0].value);
    const [selectedName, setSelectedName] = useState(names[0].value);
    const [selectedGender, setSelectedGender] = useState(gender[0].value);
    const [selectedStatus, setSelectedStatus] = useState(status[0].value);


    const { data: usersData, isLoading: isLoadingUsers } = useGetAllUsersQuery();

    const filteredStudents = usersData?.filter(user =>
        user.role === "etudiant"
    ) || [];

    const handleApplyClick = () => {
        if (dropdownMenuRef.current) {
            dropdownMenuRef.current.classList.remove('show');
        }
    };

    return (
        <>
            {/* Page Wrapper */}
            <div className="">
                <div className="content content-two">
                    {/* Page Header */}
                    <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
                        <div className="my-auto mb-2">
                            <h3 className="page-title mb-1">Etudiant</h3>
                            <nav>
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        <Link to="{routes.adminDashboard}">Dashboard</Link>
                                    </li>
                                    <li className="breadcrumb-item">Peoples</li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Etudiant Card
                                    </li>
                                </ol>
                            </nav>
                        </div>
                        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
                            <TooltipOption />

                            <div className="mb-2">
                                <Link
                                    to="{routes.addStudent}"
                                    className="btn btn-primary d-flex align-items-center"
                                >
                                    <i className="ti ti-square-rounded-plus me-2" />
                                    Ajouter etudiant
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}
                    {/* Filter */}
                    <div className="bg-white p-3 border rounded-1 d-flex align-items-center justify-content-between flex-wrap mb-4 pb-0">
                        <h4 className="mb-3">Students Grid</h4>
                        <div className="d-flex align-items-center flex-wrap">
                            <div className="input-icon-start mb-3 me-2 position-relative"></div>
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
                                <div className="dropdown-menu drop-width" ref={dropdownMenuRef}>
                                    <form>
                                        <div className="d-flex align-items-center border-bottom p-3">
                                            <h4>Filtre</h4>
                                        </div>
                                        <div className="p-3 pb-0 border-bottom">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Classe</label>
                                                        <CommonSelect
                                                            className="select"
                                                            options={allClass}
                                                            defaultValue={allClass[0]}
                                                            // onChange={(e) => setSelectedClass(e.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Nom</label>
                                                        <CommonSelect
                                                            className="select"
                                                            options={names}
                                                            defaultValue={names[0]}
                                                            // onChange={(e) => setSelectedName(e.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Genre</label>
                                                        <CommonSelect
                                                            className="select"
                                                            options={gender}
                                                            defaultValue={gender[0]}
                                                            // onChange={(e) => setSelectedGender(e.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Status</label>
                                                        <CommonSelect
                                                            className="select"
                                                            options={status}
                                                            defaultValue={status[0]}
                                                            // onChange={(e) => setSelectedStatus(e.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-3 d-flex align-items-center justify-content-end">
                                            <Link to="#" className="btn btn-light me-3">
                                                Reset
                                            </Link>
                                            <Link to="#" className="btn btn-primary" onClick={handleApplyClick}>
                                                Appliquer
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="d-flex align-items-center bg-white border rounded-2 p-1 mb-3 me-2">
                                <Link
                                    to="/dashboard/studentList"
                                    className="btn btn-icon btn-sm me-1 bg-light primary-hover"
                                >
                                    <i className="ti ti-list-tree" />
                                </Link>
                                <Link
                                    to="{routes.studentGrid}"
                                    className="active btn btn-icon btn-sm primary-hover"
                                >
                                    <i className="ti ti-grid-dots" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* /Filter */}
                    <div className="row">
                        {/* Student Grid */}
                        {isLoadingUsers ? (
                            <p>Loading...</p>
                        ) : (
                            filteredStudents.map(student => (
                                <StudentCard
                                    key={student._id}
                                    studentName={student.firstname}
                                    rollNo={String(student.bio)}
                                    gender={String(student.gender)}
                                    joinedDate={String(student.createdAt)}
                                    status={student.status}
                                    avatar={String(student.image)}
                                    classInfo={"Salle A"}
                                    routes={{
                                        studentDetail: `/student/detail/${student._id}`,
                                        editStudent: `/student/edit/${student._id}`,
                                        studentPromotion: `/student/promotion/${student._id}`,
                                    }}
                                />
                            ))
                        )}
                        {/* /Student Grid */}
                        <div className="col-md-12 text-center">
                            <Link to="#" className="btn btn-primary">
                                <i className="ti ti-loader-3 me-2" />
                                Voir plus
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}
            <StudentModals />
        </>
    );
}

export default StudentGrid;
