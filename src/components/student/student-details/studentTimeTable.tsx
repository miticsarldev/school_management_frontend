import { Link, useParams } from 'react-router-dom';
import StudentModals from '../studentModals/StudentModals';
import StudentSidebar from './studentSidebar';
import StudentBreadcrumb from './studentBreadcrumb';
import ScheduleCard from './SheduleCard';
import CardBreak from './CardBreak';
import ProfilNav from './ProfilNav';
import { useEffect, useState } from 'react';
import axios from 'axios';

const StudentTimeTable = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [selectUser, setSelectUser] = useState<Record<string, any>>({});
    const [timeTable, setTimeTable] = useState<Record<string, any[]>>({});


    // Récupère l'ID de l'étudiant depuis l'URL
    const { studentId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4444/api/users');
                setUsers(response.data);
            } catch (error: any) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (studentId && users.length > 0) {
            findUserById(studentId);
            fetchTimeTable(studentId); // Charger l'emploi du temps pour l'étudiant sélectionné
        }
    }, [users, studentId]);

    const findUserById = (userId: string) => {
        const user = users.find((u) => u._id === userId);
        if (user) {
            setSelectUser(user);
        } else {
            console.error("User not found with ID:", userId);
        }
    };

    // Récupérer l'emploi du temps pour l'étudiant en fonction de l'ID
    const fetchTimeTable = async (studentId: string) => {
        try {
            const response = await axios.get(`http://localhost:4444/api/timetables/user/${studentId}`);
            console.log(response.data);
            
            const timeTableData = response.data;

            // Réorganiser les données en fonction des jours
            const organizedTimeTable: Record<string, any[]> = {};
            timeTableData.forEach((entry: any) => {
                const dayKey = new Date(entry.day).toLocaleDateString('fr-FR', { weekday: 'long' });
                const scheduleEntry = {
                    time: `${new Date(entry.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(entry.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
                    subject: entry.cours_id.name,
                    teacherName: getUserFullNameById(entry.cours_id.id_user), // Remplacer par le nom du professeur si disponible
                    teacherId: entry.id_users._id, // Remplacer par l'ID du professeur si disponible
                    teacherImage: '', // Ajoutez l'image du professeur si disponible
                };

                if (!organizedTimeTable[dayKey]) {
                    organizedTimeTable[dayKey] = [];
                }
                organizedTimeTable[dayKey].push(scheduleEntry);
            });

            setTimeTable(organizedTimeTable);
        } catch (error: any) {
            console.log("Error fetching timetable:", error.message);
        }
    };

    // Fonction pour formater la date
    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('fr-FR', options);
    }

    function getUserFullNameById(idUser: string): string | null {
        // Parcourir le tableau des utilisateurs
        for (const user of users) {
            // Vérifier si l'ID correspond à celui passé en paramètre
            if (user._id === idUser) {
                // Retourner le nom et le prénom de l'utilisateur
                return `${user.firstname} ${user.lastname}`;
            }
        }
        // Retourner null si l'utilisateur n'est pas trouvé
        return null;
    }

    // Liste des jours de la semaine
    const daysOfWeek = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

    return (
        <>
            {/* Page Wrapper */}
            <div className="">
                <div className="content">
                    <div className="row">
                        {/* Page Header */}
                        <StudentBreadcrumb />
                        {/* /Page Header */}
                    </div>
                    <div className="row">
                        {/* Student Information */}
                        <StudentSidebar
                            avatar={selectUser.image}
                            name={selectUser.firstname}
                            studentId={selectUser.studentId || "AD1256589"}
                            rollNo={selectUser.rollNo || "35013"}
                            gender={selectUser.gender}
                            dob={formatDate(selectUser.birthdate)}
                            bloodGroup={selectUser.country}
                            region={selectUser.city}
                            caste="Catholic"
                            category="OBC"
                            motherTongue="English"
                            languages={["English", "Spanish"]}
                            phoneNumber={selectUser.telephone}
                            email={selectUser.email}
                        />
                        {/* /Student Information */}
                        <div className="col-xxl-9 col-xl-8">
                            <div className="row">
                                <div className="col-md-12">
                                    {/* <ProfilNav routes={routes} /> */}
                                    <ul className="nav nav-tabs nav-tabs-bottom mb-4">
                                        <li>
                                            <Link to={`/dashboard/studentDetail/${studentId}`} className="nav-link">
                                                <i className="ti ti-school me-2" />
                                                deatils Etudiant
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/dashboard/studentTimeTable/${studentId}`} className="nav-link active">
                                                <i className="ti ti-table-options me-2" />
                                                Emploie du temps
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={`/dashboard/studentLeave/${studentId}`}
                                                className="nav-link"
                                            >
                                                <i className="ti ti-calendar-due me-2" />
                                                Absence &amp; Presence
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/dashboard/studentFees/${studentId}`} className="nav-link">
                                                <i className="ti ti-report-money me-2" />
                                                Payement frais
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className="card">
                                        <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
                                            <h4 className="mb-3">Emploi du temps</h4>
                                            <div className="d-flex align-items-center flex-wrap">
                                                <div className="dropdown mb-3">
                                                    <Link
                                                        to="#"
                                                        className="btn btn-outline-light border-white bg-white dropdown-toggle shadow-md"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        Cette semaine
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body pb-0">
                                            <div className="d-flex flex-nowrap overflow-auto">
                                                {daysOfWeek.map((day) => (
                                                    <div key={day} className="d-flex flex-column me-4 flex-fill">
                                                        <div className="mb-3">
                                                            <h6>{day.charAt(0).toUpperCase() + day.slice(1)}</h6>
                                                        </div>
                                                        {timeTable[day] && timeTable[day].length > 0 ? (
                                                            timeTable[day].map((schedule: any, index: number) => (
                                                                <ScheduleCard
                                                                    key={index} // Utilisez l'index comme clé ici
                                                                    time={schedule.time}
                                                                    subject={schedule.subject}
                                                                    teacherName={schedule.teacherName}
                                                                    teacherImage={schedule.teacherImage}
                                                                    teacherDetailsLink={`/teacher-details/${schedule.teacherId}`}
                                                                />
                                                            ))
                                                        ) : (
                                                            <p>Aucune classe prévue</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="card-footer border-0 pb-0">
                                            <div className="row">
                                                <CardBreak
                                                    badgeText="Morning Break"
                                                    badgeColor="primary"
                                                    timeRange="10:30 to 10:45 AM"
                                                />
                                                <CardBreak
                                                    badgeText="Lunch"
                                                    badgeColor="warning"
                                                    timeRange="12:00 to 12:30 PM"
                                                />
                                                <CardBreak
                                                    badgeText="Evening Break"
                                                    badgeColor="info"
                                                    timeRange="03:30 to 03:45 PM"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}
            {/* <StudentModals /> */}
        </>
    )
}

export default StudentTimeTable;
