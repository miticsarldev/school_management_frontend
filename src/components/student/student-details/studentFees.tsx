import { Link, useParams } from "react-router-dom";
import StudentModals from "../studentModals/StudentModals";
import StudentSidebar from "./studentSidebar";
import StudentBreadcrumb from "./studentBreadcrumb";
import { useEffect, useState } from "react";
import axios from "axios";

const StudentFees = () => {

  const [fees, setFees] = useState<any[]>([]);
  const [selectUser, setSelectUser] = useState<Record<string, any>>({});
  const [users, setUsers] = useState<any[]>([]);


  const { studentId } = useParams(); // Récupère l'ID de l'étudiant à partir des paramètres

  useEffect(() => {
    const fetchFeesData = async () => {
      try {
        const response = await axios.get(`http://localhost:4444/api/tuition-fees/student/${studentId}`);
        console.log(response.data);

        setFees(response.data); // Enregistre les frais récupérés
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchFeesData();
  }, [studentId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4444/api/users');
        console.log('Fetched users:', response.data); // Vérification des données récupérées
        setUsers(response.data);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (studentId) {
      findUserById(studentId);
      console.log("Users list:", users); // Après la récupération des utilisateurs
      console.log("Selected user state:", selectUser); // Après la mise à jour de selectUser

    }
  }, [users, studentId]);

  const findUserById = (userId: string) => {
    const user = users.find((u) => u._id === userId);
    if (user) {
      setSelectUser(user);
    } else {
      console.error("User not found with ID:", userId); // Message d'erreur si l'utilisateur n'est pas trouvé
    }
  };

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  }

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
                  {/* List */}
                  {/* <ProfilNav routes={routes} /> */}
                  <ul className="nav nav-tabs nav-tabs-bottom mb-4">
                    <li>
                      <Link to={`/dashboard/studentDetail/${studentId}`} className="nav-link">
                        <i className="ti ti-school me-2" />
                        deatils Etudiant
                      </Link>
                    </li>
                    <li>
                      <Link to={`/dashboard/studentTimeTable/${studentId}`} className="nav-link">
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
                      <Link to={`/dashboard/studentFees/${studentId}`} className="nav-link active">
                        <i className="ti ti-report-money me-2" />
                        Payement frais
                      </Link>
                    </li>
                  </ul>
                  {/* /List */}
                  <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
                      <h4 className="mb-3">Payement des Frais</h4>
                    </div>
                    <div className="card-body p-0 py-3">
                      {/* Fees List */}
                      <div className="custom-datatable-filter table-responsive">
                        <table className="table datatable">
                          <thead className="thead-light">
                            <tr>
                              <th>Montant (FCFA)</th>
                              <th>Date echeance</th>
                              <th>Status</th>
                              <th>Mode Paiement</th>
                              <th>Date Paiement</th>
                              <th>rabais (FCFA)</th>
                              <th>Amende ($)</th>
                              <th>Reste (FCFA)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {fees?.map((fee) => (
                              <tr key={fee._id}>
                                <td>{fee.amount}</td>
                                <td>{formatDate(fee.due_date)}</td>
                                <td>
                                  <span className={`badge ${fee.status === 'paid' ? 'badge-soft-success' : fee.status === 'overdue' ? 'badge-soft-danger' : 'badge-soft-warning'} d-inline-flex align-items-center`}>
                                    <i className="ti ti-circle-filled fs-5 me-1" />
                                    {fee.status}
                                  </span>
                                </td>
                                <td>{fee.payment_mode}</td>
                                <td>{fee.paid_date ? formatDate(fee.paid_date) : 'Not Paid'}</td>
                                <td>{fee.discount}</td>
                                <td>{fee.fine}</td>
                                <td>{fee.balance}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {/* /Fees List */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      <StudentModals />
    </>
  );
};

export default StudentFees;
