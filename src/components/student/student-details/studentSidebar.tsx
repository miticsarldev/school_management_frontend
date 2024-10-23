import { FC } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "@/components/ImageWithBasePath/ImageWithBasePath";

// Définir une interface pour les props
interface StudentProps {
  avatar: string;
  name: string;
  studentId: string;
  rollNo: string;
  gender: string;
  dob: string;
  bloodGroup: string;
  region: string;
  caste: string;
  category: string;
  motherTongue: string;
  languages: string[];
  phoneNumber: string;
  email: string;
}

const StudentSidebar: FC<StudentProps> = ({
  avatar,
  name,
  studentId,
  rollNo,
  gender,
  dob,
  bloodGroup,
  region,
  caste,
  category,
  motherTongue,
  languages,
  phoneNumber,
  email,
}) => {
  return (
    <div className="col-xxl-3 col-xl-4 theiaStickySidebar">
      <div className="stickybar pb-4">
        <div className="card border-white">
          <div className="card-header">
            <div className="d-flex align-items-center flex-wrap row-gap-3">
              <div className="d-flex align-items-center justify-content-center avatar avatar-xxl border border-dashed me-2 flex-shrink-0 text-dark frames">
                <ImageWithBasePath src={avatar} className="img-fluid" alt="img" />
              </div>
              <div className="overflow-hidden">
                <span className="badge badge-soft-success d-inline-flex align-items-center mb-1">
                  <i className="ti ti-circle-filled fs-5 me-1" />
                  Active
                </span>
                <h5 className="mb-1 text-truncate">{name}</h5>
                <p className="text-primary">{studentId}</p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="card-body">
            <h5 className="mb-3">Basic Information</h5>
            <dl className="row mb-0">
              <dt className="col-6 fw-medium text-dark mb-3">Roll No</dt>
              <dd className="col-6 mb-3">{rollNo}</dd>
              <dt className="col-6 fw-medium text-dark mb-3">Genre</dt>
              <dd className="col-6 mb-3">{gender}</dd>
              <dt className="col-6 fw-medium text-dark mb-3">Date de naissance</dt>
              <dd className="col-6 mb-3">{dob}</dd>
              <dt className="col-6 fw-medium text-dark mb-3">Pays</dt>
              <dd className="col-6 mb-3">{bloodGroup}</dd>
              <dt className="col-6 fw-medium text-dark mb-3">Ville</dt>
              <dd className="col-6 mb-3">{region}</dd>
            </dl>
            <Link
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#add_fees_collect"
              className="btn btn-primary btn-sm w-100"
            >
              Add Fees
            </Link>
          </div>
          {/* /Basic Information */}
        </div>

        {/* Primary Contact Info */}
        <div className="card border-white">
          <div className="card-body">
            <h5 className="mb-3">Primary Contact Info</h5>
            <div className="d-flex align-items-center mb-3">
              <span className="avatar avatar-md bg-light-300 rounded me-2 flex-shrink-0 text-default">
                <i className="ti ti-phone" />
              </span>
              <div>
                <span className="text-dark fw-medium mb-1">Phone Number</span>
                <p>{phoneNumber}</p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <span className="avatar avatar-md bg-light-300 rounded me-2 flex-shrink-0 text-default">
                <i className="ti ti-mail" />
              </span>
              <div>
                <span className="text-dark fw-medium mb-1">Email Address</span>
                <p>{email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSidebar;
