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

export type Grade = {
  _id?: string;
  value: number;         // Valeur de la note, obligatoire
  appreciation?: string; // Appréciation, optionnelle
  statuses?: boolean;    // Statut, optionnel, par défaut à true
};
