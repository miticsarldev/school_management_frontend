export type Mode = "add" | "modify" | "delete";
export type Role = "administrateur" | "enseignant" | "etudiant" | "parent";
export type User = {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  telephone: string;
  password: string;
  bio?: string;
  birthdate?: string;
  gender?: string;
  country?: string;
  city?: string;
  quarter?: string;
  street?: string;
  door?: string;
  image?: string;
  website?: string;
  role: Role;
  status: string;
  lastLogin: string;
  createdAt?: string;
  updatedAt?: string;
};

export type UsersFormProps = {
  mode: Mode | null;
  user?: User | null;
  onClose: () => void;
};

export type CustomError = {
  data: {
    error: string;
  };
};

// types.ts
export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  className: string;
  status: 'actif' | 'inactif';
  admissionDate: string; // Utilise un format de date ISO
  birthDate: string; // Utilise un format de date ISO
  photo?: string; // Optionnel
}
export interface Event extends Document {
  _id?: string;
  title: string;
  type: string;
  desc?: string;
  place: string;
  start_date: Date;
  end_date?: Date;
  status?: boolean;
  start_hour: Date;
  end_hour?: Date;
  student_id: number; // Référence à l'étudiant
  timetable_id: number; // Référence à l'emploi du temps
}

export interface Leave extends Document {
  _id?: string;
  user_id: string; // Référence à l'utilisateur
  timetable_id: string; // Référence à l'emploi du temps
  exam_id: string; // Référence à l'examen
  status: boolean; // Statut de la demande (approuvée ou non)
  date: Date; // Date de la demande
  type: string; // Type de congé ou absence
}

export interface Exam extends Document {
  _id?: string;
  exam_type_id: string; // ID du type d'examen (référence à Exam_Type)
  name: string; // Nom de l'examen
  date: Date; // Date de l'examen
  start_time: string; // Heure de début de l'examen (format: HH:mm:ss)
  end_time: string; // Heure de fin de l'examen (format: HH:mm:ss)
}

export interface ExamResult extends Document {
  _id?: string;
  exam_id: string | Exam;    // Liaison avec l'examen, peuplé avec l'objet Exam
  student_id: string | User; // Liaison avec l'étudiant, peuplé avec l'objet User
  course_id: string | Course;  // Liaison avec le cours, peuplé avec l'objet Course
  grade: string;                     // Note obtenue
  comments?: string;                 // Commentaires du professeur
  status?: string;                   // Statut (Réussi, Échoué, etc.)
}

export interface Course extends Document {
  _id?: string;
  name: string;
  number_of_hours: number;
  description?: string;
  id_user: string | User;
  id_grade: string;
  id_classroom: string | Classroom;
  statuses?: boolean;
}

export interface Homework extends Document {
  _id?: string;
  classroom_id: string | Classroom;
  course_id: string | Course;
  name: string;
  homework_date: Date;
  submission_date: Date;
  status: boolean;
}

export interface TuitionFee extends Document {
  _id: string;
  amount: number;
  due_date: Date;
  payment_mode: string;
  paid_date?: Date;
  fine: number;
  discount: number;
  balance: number;
  student_id: string | User; // Référence à l'étudiant
  classroom_id: string | Classroom; // Référence à la classe
  status: string;
  createdAt: Date;

  // Méthode pour mettre à jour l'état du paiement
  updatePaymentStatus: (paidAmount: number) => void;

  // Méthode pour calculer le solde restant après le paiement
  calculateBalance: (paidAmount: number) => number;
}

export interface Classroom extends Document {
  _id: string;
  name: string;
  capacity: number;
  statuses?: boolean;
}
export interface ClassroomEtudiant extends Document {
  _id: string;
  classroom_id: string | Classroom;
  student_id: string | User;
}