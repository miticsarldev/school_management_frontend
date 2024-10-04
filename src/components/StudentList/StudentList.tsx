import { useState } from "react";
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

const StudentList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [linesPerPage, setLinesPerPage] = useState<number>(5);
  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openPopupIndex, setOpenPopupIndex] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);

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
    // Ajoutez d'autres étudiants ici...
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
    <div className="w-full container mx-auto p-4 space-y-4 mt-5">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          Tous les étudiants: {filteredStudents.length}
        </h2>
      </div>

      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Rechercher un étudiant..."
          className="border-2 rounded p-2 w-full bg-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={() => handleAction("add", null)} className="ml-2">
          <PlusCircleIcon className="w-4 h-4 mr-2" /> Ajouter un nouvel étudiant
        </Button>
      </div>

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
                    className={`px-2 py-1 rounded-full text-xs ${
                      student.status === "actif"
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
                      className="btn btn-white btn-icon btn-sm rounded-circle p-0"
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
          <ul className="p-2">
            <li>
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
  );
};

export default StudentList;
