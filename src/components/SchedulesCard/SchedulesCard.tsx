import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar'; // Assurez-vous que ce package est installé
import ImageWithBasePath from '../ImageWithBasePath/ImageWithBasePath';

// Définition de l'interface des événements
interface Event {
    
    title: string;
    date: string;
    time: string;
    iconClass: string;
    iconBgClass: string;
    borderClass: string;
    participants: Array<string>; // Chemins des images des participants
}

interface SchedulesCardProps {
    events: Event[]; // Liste des événements
    initialDate: Date; // Date initiale à afficher dans le calendrier
}

const SchedulesCard: React.FC<SchedulesCardProps> = ({ events, initialDate }) => {
    const [date, setDate] = useState<Date>(initialDate);

    return (
        <div className="col-xxl-4 col-xl-6 col-md-12 d-flex">
            <div className="card flex-fill">
                <div className="card-header d-flex align-items-center justify-content-between">
                    <div>
                        <h4 className="card-title">Schedules</h4>
                    </div>
                    {/* Lien pour ajouter un nouvel événement */}
                    <Link
                        to="#"
                        className="link-primary fw-medium me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#add_event"
                    >
                        <i className="ti ti-square-plus me-1" />
                        Add New
                    </Link>
                </div>
                <div className="card-body">
                    {/* Calendrier affiché en ligne */}
                    <Calendar
                        className="datepickers mb-4"
                        value={date}
                        onChange={(newDate) => setDate(newDate as Date)}
                        
                    />
                    <h5 className="mb-3">Upcoming Events</h5>
                    <div className="event-wrapper event-scroll">
                        {/* Affichage dynamique des événements */}
                        {events.map((event) => (
                            <div  className={`border-start ${event.borderClass} border-3 shadow-sm p-3 mb-3`}>
                                <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
                                    <span className={`avatar p-1 me-2 ${event.iconBgClass} flex-shrink-0`}>
                                        <i className={`${event.iconClass} fs-20`} />
                                    </span>
                                    <div className="flex-fill">
                                        <h6 className="mb-1">{event.title}</h6>
                                        <p className="d-flex align-items-center">
                                            <i className="ti ti-calendar me-1" />
                                            {event.date}
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <p className="mb-0">
                                        <i className="ti ti-clock me-1" />
                                        {event.time}
                                    </p>
                                    <div className="avatar-list-stacked avatar-group-sm">
                                        {event.participants.map((participant, index) => (
                                            <span key={index} className="avatar border-0">
                                                <ImageWithBasePath
                                                    src={participant}
                                                    className="rounded-circle"
                                                    alt="Participant"
                                                />
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchedulesCard;
