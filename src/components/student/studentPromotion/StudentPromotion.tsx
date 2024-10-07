import  { useState } from 'react'
import { Link } from 'react-router-dom'
import ImageWithBasePath from '@/components/ImageWithBasePath/ImageWithBasePath';
import Table from "../Datatable/index";
import { TableData } from "../data/interface";
import CommonSelect from '../commonSelect/CommonSelect';
import TooltipOption from '../tooltipOption/TooltipOption';

const StudentPromotion = () => {

    //DONNEE STATIC DE TEST

    const Studentlist = [
        {
            key: "1",
            result: "Pass",
            promotion: 1,
            AdmissionNo: "AD9892434",
            RollNo: "35013",
            name: "Janet",
            class: "III",
            section: "A",
            gender: "Female",
            status: "Active",
            DateofJoin: "25 Mar 2024",
            DOB: "10 Jan 2015",
            imgSrc: "assets/img/students/student-01.jpg"
        },
        {
            key: "2",
            result: "Pass",
            promotion: 1,
            AdmissionNo: "AD9892433",
            RollNo: "35013",
            name: "Joann",
            class: "IV",
            section: "B",
            gender: "Male",
            status: "Active",
            DateofJoin: "18 Mar 2024",
            DOB: "19 Aug 2014",
            imgSrc: "assets/img/students/student-02.jpg"
        },
        {
            key: "3",
            result: "Pass",
            promotion: 1,
            AdmissionNo: "AD9892432",
            RollNo: "35011",
            name: "Kathleen",
            class: "II",
            section: "A",
            gender: "Female",
            status: "Active",
            DateofJoin: "14 Mar 2024",
            DOB: "05 Dec 2017",
            imgSrc: "assets/img/students/student-03.jpg"
        },
        {
            key: "4",
            result: "Pass",
            promotion: 1,
            AdmissionNo: "AD9892431",
            RollNo: "35010",
            name: "Gifford",
            class: "I",
            section: "B",
            gender: "Male",
            status: "Active",
            DateofJoin: "27 Feb 2024",
            DOB: "22 Mar 2018",
            imgSrc: "assets/img/students/student-04.jpg"
        },
        {
            key: "5",
            result: "Pass",
            promotion: 1,
            AdmissionNo: "AD9892430",
            RollNo: "35009",
            name: "Lisa",
            class: "II",
            section: "B",
            gender: "Female",
            status: "Inactive",
            DateofJoin: "13 Feb 2024",
            DOB: "13 May 2017",
            imgSrc: "assets/img/students/student-05.jpg"
        },
        {
            key: "6",
            result: "Fail",
            promotion: 0,
            AdmissionNo: "AD9892429",
            RollNo: "35008",
            name: "Ralph",
            class: "III",
            section: "B",
            gender: "Male",
            status: "Active",
            DateofJoin: "11 Feb 2024",
            DOB: "20 Jun 2015",
            imgSrc: "assets/img/students/student-06.jpg"
        },
        {
            key: "7",
            result: "Fail",
            promotion: 0,
            AdmissionNo: "AD9892428",
            RollNo: "35007",
            name: "Julie",
            class: "V",
            section: "A",
            gender: "Female",
            status: "Active",
            DateofJoin: "24 Jan 2024",
            DOB: "18 Sep 2013",
            imgSrc: "assets/img/students/student-07.jpg"
        },
        {
            key: "8",
            result: "Pass",
            promotion: 1,
            AdmissionNo: "AD9892427",
            RollNo: "35006",
            name: "Ryan",
            class: "VI",
            section: "A",
            gender: "Male",
            status: "Active",
            DateofJoin: "19 Jan 2024",
            DOB: "26 Nov 2012",
            imgSrc: "assets/img/students/student-08.jpg"
        },
        {
            key: "9",
            result: "Pass",
            promotion: 1,
            AdmissionNo: "AD9892426",
            RollNo: "35005",
            name: "Susan",
            class: "VIII",
            section: "B",
            gender: "Female",
            status: "Inactive",
            DateofJoin: "08 Jan 2024",
            DOB: "26 May 2010",
            imgSrc: "assets/img/students/student-09.jpg"
        },
        {
            key: "10",
            result: "Fail",
            promotion: 0,
            AdmissionNo: "AD9892425",
            RollNo: "35004",
            name: "Richard",
            class: "VII",
            section: "B",
            gender: "Male",
            status: "Active",
            DateofJoin: "22 Dec 2024",
            DOB: "06 Oct 2011",
            imgSrc: "assets/img/students/student-10.jpg"
        },
        {
            key: "11",
            result: "Pass",
            promotion: 1,
            AdmissionNo: "AD9892424",
            RollNo: "35003",
            name: "Veronica",
            class: "IX",
            section: "A",
            gender: "Female",
            status: "Active",
            DateofJoin: "15 Dec 2024",
            DOB: "27 Dec 2009",
            imgSrc: "assets/img/students/student-11.jpg"
        }
    ]

    const promotion = [
        { value: "No Promotion", label: "No Promotion" },
        { value: "Promote to IV", label: "Promote to IV" },

    ];

    const academicYear = [
        { value: "June 2024/25", label: "June 2024/25" },
        { value: "June 2023/24", label: "June 2023/24" },
        { value: "June 2022/23", label: "June 2022/23" },
    ];

    const allClass = [
        { value: "I", label: "I" },
        { value: "II", label: "II" },
        { value: "III", label: "III" },
        { value: "IV", label: "IV" },
    ];

    const [isPromotion, setIsPromotion] = useState<boolean>(false);
    // const routes = all_routes;
    const data = Studentlist;
    const columns = [
        
        {
            title: "Name",
            dataIndex: "name",
            render: (text: string, record: any) => (
                <div className="d-flex align-items-center">
                    <Link to="#" className="avatar avatar-md">
                        <ImageWithBasePath
                            src={record.imgSrc}
                            className="img-fluid rounded-circle"
                            alt="img"
                        />
                    </Link>
                    <div className="ms-2">
                        <p className="text-dark mb-0">
                            <Link to="#">{text}</Link>
                        </p>
                    </div>
                </div>
            ),
            sorter: (a: TableData, b: TableData) =>
                a.name.length - b.name.length,
        },
        {
            title: "Class",
            dataIndex: "class",
            sorter: (a: TableData, b: TableData) =>
                a.class.length - b.class.length,
        },
        {
            title: "Exam Result",
            dataIndex: "result",
            render: (text: string) => (
                <>
                    {text === "Pass" ? (
                        <span
                            className="badge badge-soft-success d-inline-flex align-items-center"
                        >
                            <i className='ti ti-circle-filled fs-5 me-1'></i>{text}
                        </span>
                    ) :
                        (
                            <span
                                className="badge badge-soft-danger d-inline-flex align-items-center"
                            >
                                <i className='ti ti-circle-filled fs-5 me-1'></i>{text}
                            </span>
                        )}
                </>
            ),
            sorter: (a: TableData, b: TableData) =>
                a.result.length - b.result.length,
        },
        {
            title: "Action",
            dataIndex: "promotion",
            render: (res: any) => (
                <>
                    <div className="table-select mb-0">
                        <CommonSelect
                            className="select"
                            options={promotion}
                            defaultValue={promotion[res]}
                        />
                    </div>
                </>
            ),

        },
    ];
    return (
        <>
            <div className="">
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
                                <div className="my-auto mb-2">
                                    <h3 className="page-title mb-1">Promotion étudiante</h3>
                                    <nav>
                                        <ol className="breadcrumb mb-0">
                                            <li className="breadcrumb-item">
                                                <Link to='{routes.adminDashboard}'>Dashboard</Link>
                                            </li>
                                            <li className="breadcrumb-item">
                                                <Link to="#">Etudiant</Link>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">
                                                Promotion étudiante
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                                <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
                                    <TooltipOption />

                                </div>
                            </div>
                            <div className="alert alert-outline-primary bg-primary-transparent p-2 d-flex align-items-center flex-wrap row-gap-2 mb-4">
                                <i className="ti ti-info-circle me-1" />
                                <strong>Note :</strong> Promouvoir l'étudiant de la classe actuelle à
                                le cours suivant créera une nouvelle inscription de l'étudiant
                            </div>
                            <div className="card">
                                <div className="card-header border-0 pb-0">
                                    <div className="bg-light-gray p-3 rounded">
                                        <h4>Promotion</h4>
                                        <p>Sélectionnez une classe pour promouvoir la prochaine session et la nouvelle classe</p>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form >
                                        <div className="d-md-flex align-items-center justify-content-between">
                                            <div className="card flex-fill w-100">
                                                <div className="card-body">
                                                    <div className="mb-3">
                                                        <label className="form-label">
                                                        Session en cours <span className="text-danger">*</span>
                                                        </label>
                                                        <div className="form-control-plaintext p-0">
                                                            2023 - 2024
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="form-label mb-2">
                                                        Promotion de la classe
                                                            <span className="text-danger"> *</span>
                                                        </label>
                                                        <div className="d-block d-md-flex">
                                                            <div className=" flex-fill me-md-3 me-0 mb-0">
                                                                <label className="form-label">Classe</label>
                                                                <CommonSelect
                                                                    className="select"
                                                                    options={allClass}
                                                                    defaultValue={allClass[0]}
                                                                />
                                                            </div>
                                                            {/* <div className=" flex-fill mb-0">
                                                                <label className="form-label">Section</label>
                                                                <CommonSelect
                                                                    className="select"
                                                                    options={allSection}
                                                                    defaultValue={allSection[0]}
                                                                />
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link
                                                to="#"
                                                className="badge bg-primary badge-xl exchange-link text-white d-flex align-items-center justify-content-center mx-md-4 mx-auto my-md-0 my-4 flex-shrink-0"
                                            >
                                                <span>
                                                    <i className="ti ti-arrows-exchange fs-16" />
                                                </span>
                                            </Link>
                                            <div className="card flex-fill w-100">
                                                <div className="card-body">
                                                    <div className="mb-3">
                                                        <label className="form-label">
                                                            Promouvoir en session{" "}
                                                            <span className="text-danger"> *</span>
                                                        </label>
                                                        <CommonSelect
                                                            className="select"
                                                            options={academicYear}
                                                            defaultValue={academicYear[0]}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="form-label mb-2">
                                                        Promotion de la classe
                                                            <span className="text-danger"> *</span>
                                                        </label>
                                                        <div className="d-block d-md-flex">
                                                            <div className="flex-fill me-md-3 me-0 mb-0">
                                                                <label className="form-label">Classe</label>
                                                                <CommonSelect
                                                                    className="select"
                                                                    options={allClass}
                                                                    defaultValue={allClass[0]}
                                                                />
                                                            </div>
                                                            {/* <div className=" flex-fill ">
                                                                <label className="form-label">Section</label>
                                                                <CommonSelect
                                                                    className="select"
                                                                    options={allSection}
                                                                    defaultValue={allSection[0]}
                                                                />
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="manage-promote-btn d-flex justify-content-center flex-wrap row-gap-2">
                                                <button
                                                    type="reset"
                                                    className="btn btn-light reset-promote me-3"
                                                    onClick={() => setIsPromotion(false)}
                                                >
                                                    Réinitialiser la promotion
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary promote-students-btn"
                                                    onClick={() => setIsPromotion(true)}
                                                >
                                                    Gérer les promotions
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className={`promote-card-main ${isPromotion && 'promote-card-main-show'}`}>
                                <div className="card">
                                    <div className="card-header border-0 pb-0">
                                        <div className="bg-light-gray p-3 rounded">
                                            <h4>Sections de classe de carte</h4>
                                            <p>Sélectionnez le mappage de section de l'ancienne classe vers la nouvelle classe</p>
                                        </div>
                                    </div>
                                    <div className="card-body pb-2">
                                        <form >
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="card w-100">
                                                    <div className="card-body">
                                                        <div className="mb-3">
                                                            <label className="form-label">
                                                                de la clase<span className="text-danger">*</span>
                                                            </label>
                                                            <div className="form-control-plaintext p-0">III</div>
                                                        </div>
                                                        <div className="mb-0">
                                                            <label className="form-label d-block mb-3">
                                                                Promotion de la Section
                                                                <span className="text-danger"> *</span>
                                                            </label>
                                                            <label className="form-label d-block mb-2">
                                                                Edtudiant de la section
                                                                <span className="text-danger"> *</span>
                                                            </label>
                                                            <div className="form-control-plaintext p-0">A</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Link
                                                    to="#"
                                                    className="badge bg-primary badge-xl exchange-link text-white d-flex align-items-center justify-content-center mx-md-4 mx-auto my-md-0 my-4 flex-shrink-0"
                                                >
                                                    <span>
                                                        <i className="ti ti-arrows-exchange fs-16" />
                                                    </span>
                                                </Link>
                                                <div className="card w-100">
                                                    <div className="card-body">
                                                        <div className="mb-3">
                                                            <label className="form-label">
                                                            Promouvoir en session{" "}
                                                                <span className="text-danger"> *</span>
                                                            </label>
                                                            <div className="form-control-plaintext p-0">IV</div>
                                                        </div>
                                                        <div>
                                                            <label className="form-label mb-2">
                                                            Attribuer à la section
                                                                <span className="text-danger"> *</span>
                                                            </label>
                                                            <div className="d-block d-md-flex">
                                                                <div className=" flex-fill me-0">
                                                                    <label className="form-label">Class</label>
                                                                    <CommonSelect
                                                                        className="select"
                                                                        options={allClass}
                                                                        defaultValue={allClass[0]}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {/* Students List */}
                                <div className="card">
                                    <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
                                        <h4 className="mb-3">Liste des Etudiants</h4>
                                        <div className="d-flex align-items-center flex-wrap">
                                            <div className="input-icon-start mb-3 me-2 position-relative">
                                                {/* <PredefinedDateRanges/> */}
                                            </div>
                                            <div className="dropdown mb-3">
                                                <Link
                                                    to="#"
                                                    className="btn btn-outline-light bg-white dropdown-toggle"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    <i className="ti ti-sort-ascending-2 me-2" />
                                                    ranger par A-Z{" "}
                                                </Link>
                                                <ul className="dropdown-menu p-3">
                                                    <li>
                                                        <Link
                                                            to="#"
                                                            className="dropdown-item rounded-1"
                                                        >
                                                            Ascendant
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            to="#"
                                                            className="dropdown-item rounded-1"
                                                        >
                                                            Descendant
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            to="#"
                                                            className="dropdown-item rounded-1"
                                                        >
                                                            Récemment consulté
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
                                        {/* Student List */}
                                        <Table dataSource={data} columns={columns} Selection={true} />
                                        {/* /Student List */}
                                    </div>
                                </div>
                                {/* /Students List */}
                                <div className="promoted-year text-center">
                                    <p>
                                    Les étudiants sélectionnés seront promus au programme académique 2024-2025.
                                    Session
                                    </p>
                                    <Link
                                        to="#"
                                        className="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#student_promote"
                                    >
                                        Promouvoir les étudiants
                                    </Link>
                                </div>
                                <div className="toast-container success-msg-toast position-fixed">
                                    <div
                                        id="topright-Toast"
                                        className="toast"
                                        role="alert"
                                        aria-live="assertive"
                                        aria-atomic="true"
                                    >
                                        <div className="toast-header">
                                            <p className="me-auto">
                                                <span>
                                                    <i className="ti ti-square-check-filled text-success" />
                                                </span>
                                                Promu avec succès
                                            </p>
                                            <Link
                                                to="#"
                                                className="toast-close"
                                                data-bs-dismiss="toast"
                                                aria-label="Close"
                                            >
                                                <span>
                                                    <i className="ti ti-x" />
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="student_promote">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <h4>Confirm Promotion</h4>
                            <p>
                                Are you Sure, want to promote all 57 selected students to the next
                                academic session
                            </p>
                            <div className="d-flex justify-content-center">
                                <Link
                                    to="#"
                                    className="btn btn-light me-3"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </Link>
                                <Link
                                    to="#"
                                    className="btn btn-danger"
                                    id="toprightToastBtn"
                                    data-bs-dismiss="modal"
                                >
                                    Promote
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentPromotion