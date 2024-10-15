import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { api } from "../services/apiConfig";

// Définition du type Attendance
type Attendance = {
  id: string;
  student_id: string;
  teacher_id: string;
  timetable_id: string;
  status: boolean; // true pour présent, false pour absent
  desc?: string;
  date: string; // Date de présence
};

// Définition de l'état initial pour les présences
type AttendanceState = {
  attendances: Attendance[];
  isLoading: boolean;
  error: string | null;
  statistics: {
    total: number;
    present: number;
    absent: number;
  };
};

const initialState: AttendanceState = {
  attendances: [],
  isLoading: false,
  error: null,
  statistics: {
    total: 0,
    present: 0,
    absent: 0,
  },
};

// Création du slice pour gérer les présences
const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setAttendances: (state, action: PayloadAction<Attendance[]>) => {
      state.attendances = action.payload;
      // Mettre à jour les statistiques
      state.statistics.total = action.payload.length;
      state.statistics.present = action.payload.filter(a => a.status).length;
      state.statistics.absent = state.statistics.total - state.statistics.present;
    },
    addAttendance: (state, action: PayloadAction<Attendance>) => {
      state.attendances.push(action.payload);
      state.statistics.total += 1;
      if (action.payload.status) {
        state.statistics.present += 1;
      } else {
        state.statistics.absent += 1;
      }
    },
    updateAttendance: (state, action: PayloadAction<Attendance>) => {
      const index = state.attendances.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        const wasPresent = state.attendances[index].status; // Vérifier si l'ancienne présence était 'présent'
        state.attendances[index] = action.payload;

        // Mettre à jour les statistiques si le statut a changé
        if (wasPresent !== action.payload.status) {
          if (action.payload.status) {
            state.statistics.present += 1;
            state.statistics.absent -= 1;
          } else {
            state.statistics.present -= 1;
            state.statistics.absent += 1;
          }
        }
      }
    },
    deleteAttendance: (state, action: PayloadAction<string>) => {
      const index = state.attendances.findIndex(a => a.id === action.payload);
      if (index !== -1) {
        const wasPresent = state.attendances[index].status; // Vérifier si l'ancienne présence était 'présent'
        state.attendances.splice(index, 1);
        state.statistics.total -= 1;

        // Mettre à jour les statistiques
        if (wasPresent) {
          state.statistics.present -= 1;
        } else {
          state.statistics.absent -= 1;
        }
      }
    },
  },
});

// Création de l'API Slice pour gérer les requêtes liées aux présences
export const attendanceApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAttendancesByTeacherId: builder.query<Attendance[], string>({
      query: (teacherId) => `/attendances?teacher_id=${teacherId}`,
    }),
    createAttendance: builder.mutation<{ message: string }, Attendance>({
      query: (newAttendance) => ({
        url: "/attendance",
        method: "POST",
        body: newAttendance,
      }),
    }),
    modifyAttendance: builder.mutation<{ message: string }, Attendance>({
      query: (updatedAttendance) => ({
        url: `/attendance/${updatedAttendance.id}`,
        method: "PATCH",
        body: updatedAttendance,
      }),
    }),
    removeAttendance: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/attendance/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export des hooks générés par l'API slice
export const {
  useGetAllAttendancesByTeacherIdQuery,
  useCreateAttendanceMutation,
  useModifyAttendanceMutation,
  useRemoveAttendanceMutation,
} = attendanceApiSlice;

// Export des actions du slice
export const {
  setAttendances,
  addAttendance,
  updateAttendance,
  deleteAttendance,
} = attendanceSlice.actions;

// Sélecteur pour accéder à l'état des présences
export const selectAttendance = (state: RootState) => state.attendance;

// Export du reducer du slice
export default attendanceSlice.reducer;
