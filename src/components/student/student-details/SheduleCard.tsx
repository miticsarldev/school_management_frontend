import React from 'react';
import { Link } from 'react-router-dom';

interface ScheduleCardProps {
  time: string;
  subject: string;
  teacherName: string;
  teacherImage: string;
  teacherDetailsLink: string;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  time,
  subject,
  teacherName,
  teacherImage,
  teacherDetailsLink
}) => {
  return (
    <div className="bg-transparent-primary rounded p-3 mb-4">
      <p className="d-flex align-items-center text-nowrap mb-1">
        <i className="ti ti-clock me-1" />
        {time}
      </p>
      <p className="text-dark">Subject : {subject}</p>
      <div className="bg-white rounded p-1 mt-3">
        <Link to={teacherDetailsLink} className="text-muted d-flex align-items-center">
          <span className="avatar avatar-sm me-2">
            <img src={teacherImage} alt={teacherName} className="rounded-circle" />
          </span>
          {teacherName}
        </Link>
      </div>
    </div>
  );
};

export default ScheduleCard;
