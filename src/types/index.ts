export type Mode = "add" | "modify" | "delete";
export type Role = "administrateur" | "enseignant" | "etudiant" | "parent" | "gardien";
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
