import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircleIcon } from "lucide-react";
import { Mode, Student } from "@/types"; // Assurez-vous d'importer les types appropriés
import TooltipOption from "../tooltipOption/TooltipOption";
import { Link } from "react-router-dom";
import CommonSelect from "../commonSelect/CommonSelect";

const StudentList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [linesPerPage, setLinesPerPage] = useState<number>(5);
  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openPopupIndex, setOpenPopupIndex] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);

  //donnees de filtrage 

  const allClass = [
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
    { value: "IV", label: "IV" },
  ];

  const names = [
    { value: "James", label: "James" },
    { value: "Joseph", label: "Joseph" },
    { value: "Kathlen", label: "Kathlen" },
    { value: "Marilyn", label: "Marilyn" },
  ];

  const gender = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const status = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const handleApplyClick = () => {
    if (dropdownMenuRef.current) {
      dropdownMenuRef.current.classList.remove('show');
    }
  };

  // Données fictives pour les étudiants
  const studentsData: Student[] = [
    {
      id: 1,
      firstName: "Alice",
      lastName: "Dupont",
      className: "1A",
      status: "actif",
      admissionDate: "2023-01-10",
      birthDate: "2005-06-15",
      photo: "",
    },
    {
      id: 2,
      firstName: "Bob",
      lastName: "Martin",
      className: "1B",
      status: "inactif",
      admissionDate: "2023-02-20",
      birthDate: "2006-07-25",
      photo: "",
    },
  ];

  const handleAction = (action: Mode, student: Student | null) => {
    setMode(action);
    setSelectedStudent(student);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setMode("");
    setSelectedStudent(null);
  };

  const filteredStudents = studentsData.filter((student) =>
    `${student.firstName} ${student.lastName} ${student.className} ${student.status}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const togglePopup = (index: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Empêche la propagation de l'événement de clic
    if (openPopupIndex === index) {
      setOpenPopupIndex(null);
      setPopupPosition(null);
    } else {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      setPopupPosition({ top: rect.bottom + window.scrollY, left: rect.left });
      setOpenPopupIndex(index);
    }
  };

  return (
    <div className="content content-two">

      <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
        <div className="my-auto mb-2">
          <h3 className="page-title mb-1">Etudiant</h3>
          <nav>
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="{routes.adminDashboard}">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">Peoples</li>
              <li className="breadcrumb-item active" aria-current="page">
                Liste
              </li>
            </ol>
          </nav>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
          <TooltipOption />

          <div className="mb-2">
            <Link
              to="{routes.addStudent}"
              className="btn btn-primary d-flex align-items-center"
            >
              <i className="ti ti-square-rounded-plus me-2" />
              Ajouter etudiant
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white p-3 border rounded-1 d-flex align-items-center justify-content-between flex-wrap mb-4">
        <h4 className="mb-3">Liste Etudiant</h4>
        <div className="d-flex align-items-center flex-wrap">
          <div className="input-icon-start mb-3 me-2 position-relative">
            {/* <PredefinedDateRanges /> */}
          </div>
          <div className="input-icon-start mb-3 me-2 position-relative">
            <input
              type="text"
              placeholder="Rechercher un étudiant..."
              className="border-2 rounded p-2 w-250 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="dropdown mb-3 me-2">
            <Link
              to="#"
              className="btn btn-outline-light bg-white dropdown-toggle"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
            >
              <i className="ti ti-filter me-2" />
              filtre
            </Link>
            <div className="dropdown-menu drop-width" ref={dropdownMenuRef}>
              <form>
                <div className="d-flex align-items-center border-bottom p-3">
                  <h4>Filtre</h4>
                </div>
                <div className="p-3 pb-0 border-bottom">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Classe</label>
                        <CommonSelect
                          className="select"
                          options={allClass}
                          defaultValue={allClass[0]}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Nom</label>
                        <CommonSelect
                          className="select"
                          options={names}
                          defaultValue={names[0]}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Genre</label>
                        <CommonSelect
                          className="select"
                          options={gender}
                          defaultValue={gender[0]}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Status</label>
                        <CommonSelect
                          className="select"
                          options={status}
                          defaultValue={status[0]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 d-flex align-items-center justify-content-end">
                  <Link to="#" className="btn btn-light me-3">
                    Reset
                  </Link>
                  <Link to="{routes.studentGrid}" className="btn btn-primary" onClick={handleApplyClick}>
                    Appliquer
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="d-flex align-items-center bg-white border rounded-2 p-1 mb-3 me-2">
            <Link
              to="{routes.studentList}"
              className="btn btn-icon btn-sm me-1 bg-light primary-hover"
            >
              <i className="ti ti-list-tree" />
            </Link>
            <Link
              to="{routes.studentGrid}"
              className="active btn btn-icon btn-sm primary-hover"
            >
              <i className="ti ti-grid-dots" />
            </Link>
          </div>

        </div>
      </div>


      <div className="w-full">

        <Table className="w-full bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Classe</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date d'adhésion</TableHead>
              <TableHead>Date de naissance</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents
              .slice((currentPage - 1) * linesPerPage, currentPage * linesPerPage)
              .map((student, index) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <img
                        src={student.photo || "/default-avatar.png"}
                        alt={`${student.firstName} ${student.lastName}`}
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      {student.firstName} {student.lastName}
                    </div>
                  </TableCell>
                  <TableCell>{student.className}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${student.status === "actif"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                    >
                      {student.status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(student.admissionDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(student.birthDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="relative inline-block">
                      <Button
                        onClick={(e) => togglePopup(index, e)}
                        className="btn btn-white btn-icon btn-sm rounded-circle p-0 bg-slate-100"
                      >
                        <i className="ti ti-dots-vertical fs-14" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {popupPosition && openPopupIndex !== null && (
          <div
            className="absolute z-10 bg-white border border-gray-200 rounded shadow-lg"
            style={{ top: popupPosition.top, left: popupPosition.left }}
          >
            <ul className="p-2 bg-slate-100">
              <li className="bg-white">
                <Button
                  className="dropdown-item w-full text-left"
                  onClick={() => { handleAction("add", studentsData[openPopupIndex!]); setOpenPopupIndex(null); }}
                >
                  <i className="ti ti-menu me-2" />
                  Voir l'étudiant
                </Button>
              </li>
              <li>
                <Button
                  className="dropdown-item w-full text-left"
                  onClick={() => { handleAction("modify", studentsData[openPopupIndex!]); setOpenPopupIndex(null); }}
                >
                  <i className="ti ti-edit-circle me-2" />
                  Modifier
                </Button>
              </li>
              <li>
                <Button
                  className="dropdown-item w-full text-left"
                  onClick={() => { /* Ouvrir modal pour les détails de connexion */ setOpenPopupIndex(null); }}
                >
                  <i className="ti ti-lock me-2" />
                  Détails de connexion
                </Button>
              </li>
              <li>
                <Button
                  className="dropdown-item w-full text-left"
                  onClick={() => { /* Désactiver l'étudiant */ setOpenPopupIndex(null); }}
                >
                  <i className="ti ti-toggle-right me-2" />
                  Désactiver
                </Button>
              </li>
              <li>
                <Button
                  className="dropdown-item w-full text-left"
                  onClick={() => { /* Promouvoir l'étudiant */ setOpenPopupIndex(null); }}
                >
                  <i className="ti ti-arrow-ramp-right-2 me-2" />
                  Promouvoir l'étudiant
                </Button>
              </li>
              <li>
                <Button
                  className="dropdown-item w-full text-left"
                  onClick={() => { /* Supprimer l'étudiant */ setOpenPopupIndex(null); }}
                >
                  <i className="ti ti-trash-x me-2" />
                  Supprimer
                </Button>
              </li>
            </ul>
          </div>
        )}

        <Dialog open={isModalOpen} onOpenChange={setIsOpenModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {mode === "add" && "Ajouter un nouvel étudiant"}
                {mode === "modify" && "Modifier l'étudiant"}
                {mode === "delete" && "Supprimer l'étudiant"}
                {mode === "view" && "Profil de l'étudiant"}
              </DialogTitle>
            </DialogHeader>
            {/* <StudentsForm mode={mode} student={selectedStudent} onClose={handleCloseModal} /> */}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default StudentList;
