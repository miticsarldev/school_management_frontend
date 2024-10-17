import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { TagsInput } from "react-tag-input-component";
import CommonSelect from "../student/commonSelect/CommonSelect";
import { useLocation } from "react-router-dom";
import FormInput from "../FormInput/FormInput.js";

const AddStudent = () => {
    //donnee fictifs pour les selects 
    const AdmissionNo = [
        { value: "AD9892432", label: "AD9892432" },
        { value: "AD9892433", label: "AD9892433" },
        { value: "AD9892434", label: "AD9892434" },
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

    const gender = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
    ];

    const names = [
        { value: "James", label: "James" },
        { value: "Joseph", label: "Joseph" },
        { value: "Kathlen", label: "Kathlen" },
        { value: "Marilyn", label: "Marilyn" },
    ];

    const rollno = [
        { value: "35010", label: "35010" },
        { value: "35011", label: "35011" },
        { value: "35013", label: "35013" },
    ];

    const status = [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
    ];

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [owner, setOwner] = useState<string[]>(['English', 'Spanish']);
    const [owner1, setOwner1] = useState<string[]>([]);
    const [owner2, setOwner2] = useState<string[]>([]);
    const [defaultDate, setDefaultDate] = useState<dayjs.Dayjs | null>(null);
    const [newContents, setNewContents] = useState<number[]>([0]);
    const location = useLocation();
    const addNewContent = () => {
        setNewContents([...newContents, newContents.length]);
    };
    const removeContent = (index: any) => {
        setNewContents(newContents.filter((_, i) => i !== index));
    };
    useEffect(() => {
        if (location.pathname === 'editStudent') {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
            const day = String(today.getDate()).padStart(2, "0");
            const formattedDate = `${month}-${day}-${year}`;
            const defaultValue = dayjs(formattedDate);
            setIsEdit(true)
            setOwner(["English"])
            setOwner1(["Medecine Name"])
            setOwner2(["Allergy", "Skin Allergy"])
            setDefaultDate(defaultValue)
            console.log(formattedDate, 11);

        } else {
            setIsEdit(false)
            setDefaultDate(null)
        }
    }, [location.pathname])

    return (
        <>
            {/* Page Wrapper */}
            <div className="">
                <div className="content content-two">
                    {/* Page Header */}
                    <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
                        <div className="my-auto mb-2">
                            <h3 className="mb-1">{isEdit ? 'Modifier' : 'Ajouter'} Etudiant</h3>
                            <nav>
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        <Link to='{routes.adminDashboard}'>Dashboard</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to='{routes.studentList}'>Etudiants</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        {isEdit ? 'Modifier' : 'Ajouter'} Etudiant
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    {/* /Page Header */}
                    <div className="row">
                        <div className="col-md-12">
                            <form>
                                {/* Personal Information */}
                                <div className="card">
                                    <div className="card-header bg-light">
                                        <div className="d-flex align-items-center">
                                            <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                                                <i className="ti ti-info-square-rounded fs-16" />
                                            </span>
                                            <h4 className="text-dark">Information personnelle</h4>
                                        </div>
                                    </div>
                                    <div className="card-body pb-1">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
                                                    <div className="d-flex align-items-center justify-content-center avatar avatar-xxl border border-dashed me-2 flex-shrink-0 text-dark frames">
                                                        <i className="ti ti-photo-plus fs-16" />
                                                    </div>
                                                    <div className="profile-upload">
                                                        <div className="profile-uploader d-flex align-items-center">
                                                            <div className="drag-upload-btn mb-3">
                                                                Upload
                                                                <input
                                                                    type="file"
                                                                    className="form-control image-sign"
                                                                    multiple
                                                                />
                                                            </div>
                                                            <Link to="#" className="btn btn-primary mb-3">
                                                                Remove
                                                            </Link>
                                                        </div>
                                                        <p className="fs-12">
                                                            Upload image size 4MB, Format JPG, PNG, SVG
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row row-cols-xxl-5 row-cols-md-6">
                                            <div className="col-xxl col-xl-3 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Academic Year</label>
                                                    <CommonSelect
                                                        className="select"
                                                        options={academicYear}
                                                        defaultValue={isEdit ? academicYear[0] : undefined}
                                                    />
                                                </div>
                                            </div>
                                            <FormInput
                                                label="Admission Number"
                                                value={isEdit ? 'AD9892434' : undefined}
                                                isEdit={isEdit ? true : false}
                                                onChange={(e) => console.log(e.target.value)}
                                            />
                                            <div className="col-xxl col-xl-3 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Admission Date</label>
                                                    <div className="input-icon position-relative">
                                                        {isEdit ? <DatePicker
                                                            className="form-control datetimepicker"
                                                            format={{
                                                                format: "DD-MM-YYYY",
                                                                type: "mask",
                                                            }}
                                                            value={defaultDate}
                                                            placeholder="Select Date"
                                                        /> : <DatePicker
                                                            className="form-control datetimepicker"
                                                            format={{
                                                                format: "DD-MM-YYYY",
                                                                type: "mask",
                                                            }}
                                                            defaultValue=""
                                                            placeholder="Select Date"
                                                        />}
                                                        <span className="input-icon-addon">
                                                            <i className="ti ti-calendar" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <FormInput
                                                label="Roll Number"
                                                value={isEdit ? '35013' : undefined}
                                                isEdit={isEdit ? true : false}
                                                onChange={(e) => console.log(e.target.value)}
                                            />
                                            <div className="col-xxl col-xl-3 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Status</label>
                                                    <CommonSelect
                                                        className="select"
                                                        options={status}
                                                        defaultValue={isEdit ? status[0] : undefined}
                                                    />
                                                </div>
                                            </div>

                                            <FormInput
                                                label="Prenom"
                                                value={isEdit ? 'Moussa' : undefined}
                                                isEdit={isEdit ? true : false}
                                                onChange={(e) => console.log(e.target.value)}
                                            />
                                            <FormInput
                                                label="Nom"
                                                value={isEdit ? 'Sidibe' : undefined}
                                                isEdit={isEdit ? true : false}
                                                onChange={(e) => console.log(e.target.value)}
                                            />
                                            <div className="col-xxl col-xl-3 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Classe</label>
                                                    <CommonSelect
                                                        className="select"
                                                        options={allClass}
                                                        defaultValue={isEdit ? allClass[0] : undefined}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xxl col-xl-3 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Gender</label>
                                                    <CommonSelect
                                                        className="select"
                                                        options={gender}
                                                        defaultValue={isEdit ? gender[0] : undefined}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xxl col-xl-3 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Date de Naissance</label>
                                                    <div className="input-icon position-relative">
                                                        {isEdit ? <DatePicker
                                                            className="form-control datetimepicker"
                                                            format={{
                                                                format: "DD-MM-YYYY",
                                                                type: "mask",
                                                            }}
                                                            value={defaultDate}
                                                            placeholder="Select Date"
                                                        /> : <DatePicker
                                                            className="form-control datetimepicker"
                                                            format={{
                                                                format: "DD-MM-YYYY",
                                                                type: "mask",
                                                            }}
                                                            defaultValue=""
                                                            placeholder="Select Date"
                                                        />}
                                                        <span className="input-icon-addon">
                                                            <i className="ti ti-calendar" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <FormInput
                                                label="Numero de contact"
                                                value={isEdit ? '7889976' : undefined}
                                                isEdit={isEdit ? true : false}
                                                onChange={(e) => console.log(e.target.value)}
                                            />
                                            <FormInput
                                                label="Adresse Email"
                                                value={isEdit ? 'sounkbiking5431@gmail.com' : undefined}
                                                isEdit={isEdit ? true : false}
                                                onChange={(e) => console.log(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header bg-light">
                                        <div className="d-flex align-items-center">
                                            <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                                                <i className="ti ti-user-shield fs-16" />
                                            </span>
                                            <h4 className="text-dark">
                                                Autre information a prendre... 
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="card-body pb-0">
                                        {/* ajouter autre champs ici  */}
                                    </div>
                                </div>
                                
                                {/* Address */}
                                <div className="card">
                                    <div className="card-header bg-light">
                                        <div className="d-flex align-items-center">
                                            <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                                                <i className="ti ti-map fs-16" />
                                            </span>
                                            <h4 className="text-dark">Addresse</h4>
                                        </div>
                                    </div>
                                    <div className="card-body pb-1">
                                        <div className="row">

                                            <FormInput
                                                label="Adresse courrante"
                                                value={isEdit ? 'bamako' : undefined}
                                                isEdit={isEdit ? true : false}
                                                onChange={(e) => console.log(e.target.value)}
                                            />

                                            <FormInput
                                                label="Adresse permanant"
                                                value={isEdit ? 'Bamako Mali' : undefined}
                                                isEdit={isEdit ? true : false}
                                                onChange={(e) => console.log(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                               
                                <div className="text-end">
                                    <button type="button" className="btn btn-light me-3">
                                        Annuler
                                    </button>
                                    <Link to='{routes.studentList}' className="btn btn-primary">
                                        Ajouter Etudiant
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}
        </>
    );
};

export default AddStudent;
