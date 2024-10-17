import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { api } from "../services/apiConfig";

// Définir le type pour un étudiant
type Student = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  image: string; // URL de l'image de profil
  role: string;
};

// Définir l'état initial pour les étudiants
type StudentState = {
  students: Student[];
  topStudents: Student[]; // Nouveau champ pour les meilleurs étudiants
  isLoading: boolean;
  error: string | null;
};

const initialState: StudentState = {
  students: [],
  topStudents: [], // Initialisation de topStudents
  isLoading: false,
  error: null,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<Student[]>) => {
      state.students = action.payload;
    },
    setTopStudents: (state, action: PayloadAction<Student[]>) => {
      state.topStudents = action.payload;
    },
    addStudent: (state, action: PayloadAction<Student>) => {
      state.students.push(action.payload);
    },
    updateStudent: (state, action: PayloadAction<Student>) => {
      const index = state.students.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    deleteStudent: (state, action: PayloadAction<string>) => {
      state.students = state.students.filter((s) => s.id !== action.payload);
    },
  },
});

// Injecter les endpoints via RTK Query
export const studentApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query<Student[], void>({
      query: () => "/students?role=etudiant",
    }),
    getTopStudents: builder.query<Student[], void>({
      query: () => "/top-students", // Nouveau endpoint pour les meilleurs étudiants
    }),
    addStudent: builder.mutation<{ message: string }, Student>({
      query: (newStudent) => ({
        url: "/student",
        method: "POST",
        body: newStudent,
      }),
    }),
    updateStudent: builder.mutation<{ message: string }, Student>({
      query: (updatedStudent) => ({
        url: `/student/${updatedStudent.id}`,
        method: "PATCH",
        body: updatedStudent,
      }),
    }),
    deleteStudent: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/student/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Générer les hooks pour les requêtes
export const {
  useGetAllStudentsQuery,
  useGetTopStudentsQuery, // Nouveau hook pour récupérer les meilleurs étudiants
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApiSlice;

// Exporter les actions du slice
export const { setStudents, setTopStudents, addStudent, updateStudent, deleteStudent } = studentSlice.actions;

// Sélecteur pour accéder aux données des étudiants
export const selectStudents = (state: RootState) => state.Student.students;
export const selectTopStudents = (state: RootState) => state.Student.topStudents; // Sélecteur pour les meilleurs étudiants

// Exporter le reducer
export default studentSlice.reducer;
