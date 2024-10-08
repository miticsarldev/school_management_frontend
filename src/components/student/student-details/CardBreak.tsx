import React from 'react';

interface CardBreakProps {
  badgeText: string;
  badgeColor: string;
  timeRange: string;
}

const CardBreak: React.FC<CardBreakProps> = ({ badgeText, badgeColor, timeRange }) => {
  return (
    <div className="col-lg-4 col-xxl-4 col-xl-4 d-flex">
      <div className="card flex-fill">
        <div className="card-body">
          <span className={`bg-${badgeColor} badge badge-sm mb-2`}>
            {badgeText}
          </span>
          <p className="text-dark">
            <i className="ti ti-clock me-1" />
            {timeRange}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardBreak;
