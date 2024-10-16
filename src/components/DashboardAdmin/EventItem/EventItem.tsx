import React from 'react';
import ImageWithBasePath from '@/components/ImageWithBasePath/ImageWithBasePath';

interface EventItemProps {
    title: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    icon: string; // L'icône pour l'événement
    borderColor: string; // La classe de couleur pour la bordure
}

const EventItem: React.FC<EventItemProps> = ({ title, start_date,end_date, start_time, end_time, borderColor }) => {
    return (
        <div className={`border-start ${borderColor} border-3 shadow-sm p-3 mb-3`}>
            <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
                <span className='avatar p-1 me-2 bg-teal-transparent flex-shrink-0'>
                <i className="ti ti-user-edit text-info fs-20" />
                </span>
                <div className="flex-fill">
                    <h6 className="mb-1">{title}</h6>
                    <p className="d-flex align-items-center">
                        <i className="ti ti-calendar me-1" />
                        {'du ' + start_date + " au " + end_date}
                    </p>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0">
                    <i className="ti ti-clock me-1" />
                    {"de " + start_time + " a " + end_time}
                </p>
            </div>
        </div>
    );
};

export default EventItem;
