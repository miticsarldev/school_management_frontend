import { Link } from "react-router-dom";
import ImageWithBasePath from "@/components/ImageWithBasePath/ImageWithBasePath";

const StudentSidebar = () => {
  return (
    <div className="col-xxl-3 col-xl-4 theiaStickySidebar">
      <div className="stickybar pb-4">
        <div className="card border-white">
          <div className="card-header">
            <div className="d-flex align-items-center flex-wrap row-gap-3">
              <div className="d-flex align-items-center justify-content-center avatar avatar-xxl border border-dashed me-2 flex-shrink-0 text-dark frames">
                <ImageWithBasePath
                  src="assets/img/students/student-01.jpg"
                  className="img-fluid"
                  alt="img"
                />
              </div>
              <div className="overflow-hidden">
                <span className="badge badge-soft-success d-inline-flex align-items-center mb-1">
                  <i className="ti ti-circle-filled fs-5 me-1" />
                  Active
                </span>
                <h5 className="mb-1 text-truncate">Janet Daniel</h5>
                <p className="text-primary">AD1256589</p>
              </div>
            </div>
          </div>
          {/* Basic Information */}
          <div className="card-body">
            <h5 className="mb-3">Basic Information</h5>
            <dl className="row mb-0">
              <dt className="col-6 fw-medium text-dark mb-3">Roll No</dt>
              <dd className="col-6 mb-3">35013</dd>
              <dt className="col-6 fw-medium text-dark mb-3">Gender</dt>
              <dd className="col-6 mb-3">Female</dd>
              <dt className="col-6 fw-medium text-dark mb-3">Date Of Birth</dt>
              <dd className="col-6 mb-3">25 Jan 2008</dd>
              <dt className="col-6 fw-medium text-dark mb-3">Blood Group</dt>
              <dd className="col-6 mb-3">O +ve</dd>
              <dt className="col-6 fw-medium text-dark mb-3">Blood Group</dt>
              <dd className="col-6 mb-3">Red</dd>
              <dt className="col-6 fw-medium text-dark mb-3">Reigion</dt>
              <dd className="col-6 mb-3">Christianity</dd>
              <dt className="col-6 fw-medium text-dark mb-3">Caste</dt>
              <dd className="col-6 mb-3">Catholic</dd>
              <dt className="col-6 fw-medium text-dark mb-3">Category</dt>
              <dd className="col-6 mb-3">OBC</dd>
              <dt className="col-6 fw-medium text-dark mb-3">Mother tongue</dt>
              <dd className="col-6 mb-3">English</dd>
              <dt className="col-6 fw-medium text-dark mb-3">Language</dt>
              <dd className="col-6 mb-3">
                <span className="badge badge-light text-dark me-2">
                  English
                </span>
                <span className="badge badge-light text-dark">Spanish</span>
              </dd>
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
                <p>+1 46548 84498</p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <span className="avatar avatar-md bg-light-300 rounded me-2 flex-shrink-0 text-default">
                <i className="ti ti-mail" />
              </span>
              <div>
                <span className="text-dark fw-medium mb-1">Email Address</span>
                <p>jan@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSidebar;
