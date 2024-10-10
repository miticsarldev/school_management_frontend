import ImageWithBasePath from "../DashboardEnseignant/imageWithBasePath";
import { Link } from "react-router-dom";

const TeacherSidebar = () => {
  return (
    <div className="col-xxl-3 col-xl-4 theiaStickySidebar">
      <div className="stickytopbar pb-4">
        <div className="card border-white">
          <div className="card-header">
            <div className="d-flex align-items-center flex-wrap row-gap-3">
              <div className="d-flex align-items-center justify-content-center avatar avatar-xxl border border-dashed me-2 flex-shrink-0 text-dark frames">
                <ImageWithBasePath
                  src="/teachers/teacher-05.jpg"
                  className="img-fluid"
                  alt="img"
                />
              </div>
              <div>
                <h5 className="mb-1 mb-1 text-truncate">Teresa</h5>
                <p className="text-primary mb-1">T849126</p>
                <p>Joined : 25 May 24</p>
              </div>
            </div>
          </div>
          <div className="card-body">
            <h5 className="mb-3">Basic Information</h5>
            <dl className="row mb-0">
              <dt className="col-6 fw-medium text-dark mb-3">
                Class &amp; Section
              </dt>
              <dd className="col-6  mb-3">III, A</dd>
              <dt className="col-6 fw-medium text-dark mb-3">Subject</dt>
              <dd className="col-6  mb-3">Physics</dd>
              <dt className="col-6 fw-medium text-dark mb-3">Gender</dt>
              <dd className="col-6  mb-3">Female</dd>
              <dt className="col-6 fw-medium text-dark mb-3">Blood Group</dt>
              <dd className="col-6  mb-3">O +ve</dd>
              <dt className="col-6 fw-medium text-dark mb-3">House</dt>
              <dd className="col-6  mb-3">Red</dd>
              <dt className="col-6 fw-medium text-dark mb-3">Language Known</dt>
              <dd className="col-6  mb-3">English</dd>
              <dt className="col-6 fw-medium text-dark mb-0">Language</dt>
              <dd className="col-6  mb-0">
                <span className="badge badge-light text-dark me-2">
                  English
                </span>
                <span className="badge badge-light text-dark">Spanish</span>
              </dd>
            </dl>
          </div>
        </div>
        <div className="card border-white">
          <div className="card-body">
            <h5 className="mb-3 ">Primary Contact Info</h5>
            <div className="d-flex align-items-center mb-3">
              <span className="avatar avatar-md bg-light-300 rounded me-2 flex-shrink-0 text-default">
                <i className="ti ti-phone" />
              </span>
              <div>
                <span className=" text-dark fw-medium mb-1">Phone Number</span>
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
        <div className="card border-white">
          <div className="card-body pb-1">
            <h5 className="mb-3">PAN Number / ID Number</h5>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center mb-3">
                <span className="avatar avatar-md bg-light-300 rounded me-2 flex-shrink-0 text-default">
                  <i className="ti ti-id" />
                </span>
                <div>
                  <p className="text-dark">343445954908</p>
                </div>
              </div>
              <Link to="#" className="btn btn-primary btn-icon btn-sm mb-3">
                <i className="ti ti-copy" />
              </Link>
            </div>
          </div>
        </div>
           
      </div>
    </div>
  );
};

export default TeacherSidebar;
