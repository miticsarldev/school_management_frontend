import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"; // Assurez-vous que le chemin est correct
import { api } from "../services/apiConfig"; // Votre configuration API

// Interface pour l'examen
export interface Exam {
    exam_type_id: string; // ID du type d'examen (référence à Exam_Type)
    name: string; // Nom de l'examen
    date: Date; // Date de l'examen
    start_time: string; // Heure de début de l'examen (format: HH:mm:ss)
    end_time: string;
}

// Interface pour l'étudiant
export interface User {
  _id: string; 
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  telephone: string;
  password: string;
  bio?: string;
  birthdate?: Date;
  gender?: string; 
  country?: string;
  city?: string;
  quarter?: string;
  street?: string;
  door?: string;
  image?: string;
  website?: string;
  role: string; 
  status: string;
  children: string; // Déclare children comme un tableau d'ObjectId
  parent?: string; // parent peut être facultatif
  lastLogin: Date;
  createdAt: Date;
}

// Interface pour le cours
export interface Course {
  _id: string;
  name: string;
  number_of_hours: number;
  description: string;
  id_user: User;
  id_grade: string;
  id_classroom_etudiant: ClassroomEtudiant | string;
  statuses: boolean;   // Crédits du cours
}
export interface Classroom {
  _id: string;
  name: string;
  capacity: number;
  statuses: boolean;
  performance:number;

}
export interface ClassroomEtudiant {
  _id: string;
  etudiant_id: User;
  classroom_id: Classroom;

}

export interface ExamResult {
  _id?: string;
  exam_id: Exam;    // Référence à l'examen
  student_id: User; // Référence à l'étudiant
  course_id: Course;  // Référence au cours
  grade: string;      // Note obtenue
  comments?: string;  // Commentaires (facultatif)
  status?: string;    // Statut (facultatif)
}

interface ExamResultState {
  results: ExamResult[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ExamResultState = {
  results: [], // Table des résultats d'examen
  isLoading: false,
  error: null,
};

const examResultSlice = createSlice({
  name: "examResult",
  initialState,
  reducers: {
    setExamResults: (state, action: PayloadAction<ExamResult[]>) => {
      state.results = action.payload;
    },
    addExamResult: (state, action: PayloadAction<ExamResult>) => {
      state.results.push(action.payload);
    },
    updateExamResult: (state, action: PayloadAction<ExamResult>) => {
      const index = state.results.findIndex((result) => result._id === action.payload._id);
      if (index !== -1) {
        state.results[index] = action.payload;
      }
    },
    deleteExamResult: (state, action: PayloadAction<string>) => {
      state.results = state.results.filter((result) => result._id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Injecter les endpoints via RTK Query
export const examResultApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createExamResult: builder.mutation<{ message: string; exam_result: ExamResult }, Partial<ExamResult>>({
      query: (newExamResult) => ({
        url: "/exam-result", // Remplacez par votre endpoint
        method: "POST",
        body: newExamResult,
      }),
    }),
    getAllExamResults: builder.query<ExamResult[], void>({
      query: () => "/exam-results", // Remplacez par votre endpoint
    }),
    getTopStudents: builder.query<ExamResult[], void>({
      query: () => "/top-students", // Assurez-vous que votre backend a un endpoint correspondant
    }),
    updateExamResult: builder.mutation<{ message: string; exam_result: ExamResult }, Partial<ExamResult>>({
      query: (updatedExamResult) => ({
        url: `/exam-result/${updatedExamResult._id}`,
        method: "PATCH",
        body: updatedExamResult,
      }),
    }),
    deleteExamResult: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/exam-result/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Générer les hooks pour les requêtes
export const {
  useCreateExamResultMutation,
  useGetAllExamResultsQuery,
  useGetTopStudentsQuery,
  useUpdateExamResultMutation,
  useDeleteExamResultMutation,
} = examResultApiSlice;

// Exporter les actions du slice
export const {
  setExamResults,
  addExamResult,
  updateExamResult,
  deleteExamResult,
  setLoading,
  setError,
} = examResultSlice.actions;

// Sélecteurs pour accéder aux résultats d'examen
export const selectExamResults = (state: RootState) => state.examResult.results;
export const selectIsLoading = (state: RootState) => state.examResult.isLoading;
export const selectError = (state: RootState) => state.examResult.error;

// Exporter le reducer
export default examResultSlice.reducer;
