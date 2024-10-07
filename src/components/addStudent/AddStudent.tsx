import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { feeGroup, feesTypes, paymentType } from '../../../core/common/selectoption/selectoption'
// import { all_routes } from "../../../router/all_routes";
import { DatePicker } from "antd";
import dayjs from "dayjs";

import {
    AdmissionNo,
    Hostel,
    PickupPoint,
    VehicleNumber,
    academicYear,
    allClass,
    allSection,
    bloodGroup,
    cast,
    gender,
    house,
    mothertongue,
    names,
    religion,
    rollno,
    roomNO,
    route,
    status,
} from "./selectOption.js";
import { TagsInput } from "react-tag-input-component";
import CommonSelect from "../student/commonSelect/CommonSelect";
import { useLocation } from "react-router-dom";
import FormInput from "../FormInput/FormInput.js";
import { log } from "console";

const AddStudent = () => {
    //   const routes = all_routes;

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
                                            {/* <div className="col-xxl col-xl-3 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Admission Number</label>
                                                    <input type="text" className="form-control" defaultValue={isEdit ? 'AD9892434' : undefined} />
                                                </div>
                                            </div> */}

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
                                {/* /Personal Information */}
                                {/* Parents & Guardian Information */}
                                <div className="card">
                                    <div className="card-header bg-light">
                                        <div className="d-flex align-items-center">
                                            <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                                                <i className="ti ti-user-shield fs-16" />
                                            </span>
                                            <h4 className="text-dark">
                                                Information des   Parents &amp; Tuteurs
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="card-body pb-0">
                                        <div className="border-bottom mb-3">
                                            <h5 className="mb-3">Information du pere</h5>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
                                                        <div className="d-flex align-items-center justify-content-center avatar avatar-xxl border border-dashed me-2 flex-shrink-0 text-dark frames">
                                                            <i className="ti ti-photo-plus fs-16" />
                                                        </div>
                                                        <div className="profile-upload">
                                                            <div className="profile-uploader d-flex align-items-center">
                                                                <div className="drag-upload-btn mb-3">
                                                                    televerser
                                                                    <input
                                                                        type="file"
                                                                        className="form-control image-sign"
                                                                        multiple
                                                                    />
                                                                </div>
                                                                <Link to="#" className="btn btn-primary mb-3">
                                                                    Supprimer
                                                                </Link>
                                                            </div>
                                                            <p className="fs-12">
                                                                Taille de l'image téléchargée 4Mo, format JPG, PNG, SVG
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <FormInput
                                                    label="Nom du pere"
                                                    value={isEdit ? 'AD9892434' : undefined}
                                                    isEdit={isEdit ? true : false}
                                                    onChange={(e) => console.log(e.target.value)}
                                                />

                                                <FormInput
                                                    label="E-mail"
                                                    value={isEdit ? 'email@gmail' : undefined}
                                                    isEdit={isEdit ? true : false}
                                                    onChange={(e) => console.log(e.target.value)}
                                                />

                                                <FormInput
                                                    label="Numero de telephone"
                                                    value={isEdit ? '6789098' : undefined}
                                                    isEdit={isEdit ? true : false}
                                                    onChange={(e) => console.log(e.target.value)}
                                                />

                                                <FormInput
                                                    label="Travail du pere"
                                                    value={isEdit ? 'Ingenieur' : undefined}
                                                    isEdit={isEdit ? true : false}
                                                    onChange={(e) => console.log(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="border-bottom mb-3">
                                            <h5 className="mb-3">Information de la mere</h5>
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

                                                <FormInput
                                                    label="Nom de la mere"
                                                    value={isEdit ? 'Fanta' : undefined}
                                                    isEdit={isEdit ? true : false}
                                                    onChange={(e) => console.log(e.target.value)}
                                                />

                                                <FormInput
                                                    label="E-mail"
                                                    value={isEdit ? 'email@gmail' : undefined}
                                                    isEdit={isEdit ? true : false}
                                                    onChange={(e) => console.log(e.target.value)}
                                                />

                                                <FormInput
                                                    label="Numero de telephone"
                                                    value={isEdit ? '6789098' : undefined}
                                                    isEdit={isEdit ? true : false}
                                                    onChange={(e) => console.log(e.target.value)}
                                                />

                                                <FormInput
                                                    label="Travail de la mere"
                                                    value={isEdit ? 'Ingenieur' : undefined}
                                                    isEdit={isEdit ? true : false}
                                                    onChange={(e) => console.log(e.target.value)}
                                                />

                                            </div>
                                        </div>
                                        {/* <div>
                                            <h5 className="mb-3">Guardian Details</h5>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="mb-2">
                                                        <div className="d-flex align-items-center flex-wrap">
                                                            <label className="form-label text-dark fw-normal me-2">
                                                                If Guardian Is
                                                            </label>
                                                            <div className="form-check me-3 mb-2">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="guardian"
                                                                    id="parents"
                                                                    defaultChecked
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="parents"
                                                                >
                                                                    Parents
                                                                </label>
                                                            </div>
                                                            <div className="form-check me-3 mb-2">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="guardian"
                                                                    id="guardian"
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="guardian"
                                                                >
                                                                    Guardian
                                                                </label>
                                                            </div>
                                                            <div className="form-check mb-2">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="guardian"
                                                                    id="other"
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="other"
                                                                >
                                                                    Others
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
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
                                                <div className="col-lg-3 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Guardian Name</label>
                                                        <input type="text" className="form-control" defaultValue={isEdit ? 'Jerald Vicinius' : undefined} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">
                                                            Guardian Relation
                                                        </label>
                                                        <input type="text" className="form-control" defaultValue={isEdit ? 'Uncle' : undefined} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Phone Number</label>
                                                        <input type="text" className="form-control" defaultValue={isEdit ? '+1 45545 46464' : undefined} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Email</label>
                                                        <input type="email" className="form-control" defaultValue={isEdit ? 'jera@example.com' : undefined} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Occupation</label>
                                                        <input type="text" className="form-control" defaultValue={isEdit ? 'Mechanic' : undefined} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Address</label>
                                                        <input type="text" className="form-control" defaultValue={isEdit ? '3495 Red Hawk Road, Buffalo Lake, MN 55314' : undefined} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                {/* /Parents & Guardian Information */}
                                {/* Sibilings */}
                                <div className="card">
                                    <div className="card-header bg-light">
                                        <div className="d-flex align-items-center">
                                            <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                                                <i className="ti ti-users fs-16" />
                                            </span>
                                            <h4 className="text-dark">Freres et soeur</h4>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="addsibling-info">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="mb-2">
                                                        <label className="form-label">Information freres et soeur</label>
                                                        <div className="d-flex align-items-center flex-wrap">
                                                            <label className="form-label text-dark fw-normal me-2">
                                                                Le frère ou la sœur étudie-t-il dans la même école ?
                                                            </label>
                                                            <div className="form-check me-3 mb-2">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="sibling"
                                                                    id="yes"
                                                                    defaultChecked
                                                                />
                                                                <label className="form-check-label" htmlFor="yes">
                                                                    oui
                                                                </label>
                                                            </div>
                                                            <div className="form-check mb-2">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="sibling"
                                                                    id="no"
                                                                />
                                                                <label className="form-check-label" htmlFor="no">
                                                                    Non
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {newContents.map((_, index) => (
                                                    <div key={index} className="col-lg-12">
                                                        <div className="row">
                                                            <div className="col-lg-3 col-md-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Nom</label>
                                                                    <CommonSelect
                                                                        className="select"
                                                                        options={names}
                                                                        defaultValue={isEdit ? names[0] : undefined}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Roll No</label>
                                                                    <CommonSelect
                                                                        className="select"
                                                                        options={rollno}
                                                                        defaultValue={isEdit ? rollno[0] : undefined}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Admission No</label>
                                                                    <CommonSelect
                                                                        className="select"
                                                                        options={AdmissionNo}
                                                                        defaultValue={isEdit ? AdmissionNo[0] : undefined}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-6">
                                                                <div className="mb-3">
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="w-100">
                                                                            <label className="form-label">Classe</label>
                                                                            <CommonSelect
                                                                                className="select"
                                                                                options={allClass}
                                                                                defaultValue={isEdit ? allClass[0] : undefined}
                                                                            />
                                                                        </div>
                                                                        {newContents.length > 1 && (
                                                                            <div>
                                                                                <label className="form-label">&nbsp;</label>
                                                                                <Link
                                                                                    to="#"
                                                                                    className="trash-icon ms-3"
                                                                                    onClick={() => removeContent(index)}
                                                                                >
                                                                                    <i className="ti ti-trash-x" />
                                                                                </Link>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="border-top pt-3">
                                            <Link
                                                to="#"
                                                onClick={addNewContent}
                                                className="add-sibling btn btn-primary d-inline-flex align-items-center"
                                            >
                                                <i className="ti ti-circle-plus me-2" />
                                                Ajouter nouveau
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* /Sibilings */}
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
                                {/* /Address */}
                                {/* Transport Information */}
                                {/* <div className="card">
                                    <div className="card-header bg-light d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                                                <i className="ti ti-bus-stop fs-16" />
                                            </span>
                                            <h4 className="text-dark">Transport Information</h4>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                role="switch"
                                            />
                                        </div>
                                    </div>
                                    <div className="card-body pb-1">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Route</label>
                                                    <CommonSelect
                                                        className="select"
                                                        options={route}
                                                        defaultValue={isEdit ? route[0] : undefined}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Vehicle Number</label>
                                                    <CommonSelect
                                                        className="select"
                                                        options={VehicleNumber}
                                                        defaultValue={isEdit ? VehicleNumber[0] : undefined}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Pickup Point</label>
                                                    <CommonSelect
                                                        className="select"
                                                        options={PickupPoint}
                                                        defaultValue={isEdit ? PickupPoint[0] : undefined}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                {/* /Transport Information */}
                                {/* Hostel Information */}
                                {/* <div className="card">
                                    <div className="card-header bg-light d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                                                <i className="ti ti-building-fortress fs-16" />
                                            </span>
                                            <h4 className="text-dark">Hostel Information</h4>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                role="switch"
                                            />
                                        </div>
                                    </div>
                                    <div className="card-body pb-1">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Hostel</label>
                                                    <CommonSelect
                                                        className="select"
                                                        options={Hostel}
                                                        defaultValue={isEdit ? Hostel[0] : undefined}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Room No</label>
                                                    <CommonSelect
                                                        className="select"
                                                        options={roomNO}
                                                        defaultValue={isEdit ? roomNO[0] : undefined}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                {/* /Hostel Information */}
                                {/* Documents */}
                                <div className="card">
                                    <div className="card-header bg-light">
                                        <div className="d-flex align-items-center">
                                            <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                                                <i className="ti ti-file fs-16" />
                                            </span>
                                            <h4 className="text-dark">Documents</h4>
                                        </div>
                                    </div>
                                    <div className="card-body pb-1">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="mb-2">
                                                    <div className="mb-3">
                                                        <label className="form-label mb-1">
                                                            Condition Medical
                                                        </label>
                                                        <p>Téléchargez une taille d'image de 4 Mo, format PDF accepté</p>
                                                    </div>
                                                    <div className="d-flex align-items-center flex-wrap">
                                                        <div className="btn btn-primary drag-upload-btn mb-2 me-2">
                                                            <i className="ti ti-file-upload me-1" />
                                                            televerser dovument
                                                            <input
                                                                type="file"
                                                                className="form-control image_sign"
                                                                multiple
                                                            />
                                                        </div>
                                                        {isEdit ? <p className="mb-2">BirthCertificate.pdf</p> : <></>}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-2">
                                                    <div className="mb-3">
                                                        <label className="form-label mb-1">
                                                        Télécharger le certificat de transfert
                                                        </label>
                                                        <p>Téléchargez une taille d'image de 4 Mo, format PDF accepté</p>
                                                    </div>
                                                    <div className="d-flex align-items-center flex-wrap">
                                                        <div className="btn btn-primary drag-upload-btn mb-2">
                                                            <i className="ti ti-file-upload me-1" />
                                                            televerser Document
                                                            <input
                                                                type="file"
                                                                className="form-control image_sign"
                                                                multiple
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Documents */}
                                {/* Medical History */}
                                <div className="card">
                                    <div className="card-header bg-light">
                                        <div className="d-flex align-items-center">
                                            <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                                                <i className="ti ti-medical-cross fs-16" />
                                            </span>
                                            <h4 className="text-dark">Antécédents médicaux</h4>
                                        </div>
                                    </div>
                                    <div className="card-body pb-1">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-2">
                                                    <label className="form-label">
                                                        Condition Medical
                                                    </label>
                                                    <div className="d-flex align-items-center flex-wrap">
                                                        <label className="form-label text-dark fw-normal me-2">
                                                        État de santé d'un étudiant
                                                        </label>
                                                        <div className="form-check me-3 mb-2">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="condition"
                                                                id="good"
                                                                defaultChecked
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="good"
                                                            >
                                                                bien
                                                            </label>
                                                        </div>
                                                        <div className="form-check me-3 mb-2">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="condition"
                                                                id="bad"
                                                            />
                                                            <label className="form-check-label" htmlFor="bad">
                                                                mauvais
                                                            </label>
                                                        </div>
                                                        <div className="form-check mb-2">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="condition"
                                                                id="others"
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="others"
                                                            >
                                                                autre
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Allergies</label>

                                                <TagsInput
                                                    // className="input-tags form-control"
                                                    value={owner2}
                                                    onChange={setOwner2}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Médicaments</label>
                                                <TagsInput
                                                    // className="input-tags form-control"
                                                    value={owner1}
                                                    onChange={setOwner1}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Medical History */}
                                {/* Previous School details */}
                                {/* <div className="card">
                                    <div className="card-header bg-light">
                                        <div className="d-flex align-items-center">
                                            <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                                                <i className="ti ti-building fs-16" />
                                            </span>
                                            <h4 className="text-dark">Détails de l'école précédente</h4>
                                        </div>
                                    </div>
                                    <div className="card-body pb-1">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">School Name</label>
                                                    <input type="text" className="form-control" defaultValue={isEdit ? 'Oxford Matriculation, USA' : undefined} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Address</label>
                                                    <input type="text" className="form-control" defaultValue={isEdit ? '1852 Barnes Avenue, Cincinnati, OH 45202' : undefined} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                {/* /Previous School details */}
                                {/* Other Details */}
                                {/* <div className="card">
                                    <div className="card-header bg-light">
                                        <div className="d-flex align-items-center">
                                            <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                                                <i className="ti ti-building-bank fs-16" />
                                            </span>
                                            <h4 className="text-dark">Other Details</h4>
                                        </div>
                                    </div>
                                    <div className="card-body pb-1">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <div className="mb-3">
                                                    <label className="form-label">Bank Name</label>
                                                    <input type="text" className="form-control" defaultValue={isEdit ? 'Bank of America' : undefined} />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="mb-3">
                                                    <label className="form-label">Branch</label>
                                                    <input type="text" className="form-control" defaultValue={isEdit ? 'Cincinnati' : undefined} />
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="mb-3">
                                                    <label className="form-label">IFSC Number</label>
                                                    <input type="text" className="form-control" defaultValue={isEdit ? 'BOA83209832' : undefined} />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Other Information
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        rows={3}
                                                        defaultValue={""}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                {/* /Other Details */}
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
