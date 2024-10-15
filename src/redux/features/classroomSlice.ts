import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { api } from "../services/apiConfig";

// Définir le type de données pour une classroom
type Classroom = {
  id: string;
  name: string;
  capacity: number; 
  performance:number;
};

type ClassroomState = {
  classrooms: Classroom[];
  isLoading: boolean;
  error: string | null;
};

const initialState: ClassroomState = {
  classrooms: [],
  isLoading: false,
  error: null,
};

const classroomSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {
    setClassrooms: (state, action: PayloadAction<Classroom[]>) => {
      state.classrooms = action.payload;
    },
    addClassroom: (state, action: PayloadAction<Classroom>) => {
      state.classrooms.push(action.payload);
    },
    updateClassroom: (state, action: PayloadAction<Classroom>) => {
      const index = state.classrooms.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.classrooms[index] = action.payload;
      }
    },
    deleteClassroom: (state, action: PayloadAction<string>) => {
      state.classrooms = state.classrooms.filter(c => c.id !== action.payload);
    },
  },
});

// Injecter les endpoints via RTK Query
export const classroomApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllClassrooms: builder.query<Classroom[], void>({
      query: () => "/classrooms",
    }),
    addClassroom: builder.mutation<{ message: string }, Classroom>({
      query: (newClassroom) => ({
        url: "/classroom",
        method: "POST",
        body: newClassroom,
      }),
    }),
    updateClassroom: builder.mutation<{ message: string }, Classroom>({
      query: (updatedClassroom) => ({
        url: `/classroom/${updatedClassroom.id}`,
        method: "PATCH",
        body: updatedClassroom,
      }),
    }),
    deleteClassroom: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/classroom/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Générer les hooks pour les requêtes
export const {
  useGetAllClassroomsQuery,
  useAddClassroomMutation,
  useUpdateClassroomMutation,
  useDeleteClassroomMutation,
} = classroomApiSlice;

// Exporter les actions du slice
export const { setClassrooms, addClassroom, updateClassroom, deleteClassroom } = classroomSlice.actions;

// Sélecteur pour accéder aux données des classrooms
export const selectClassroom = (state: RootState) => state.classroom;

// Exporter le reducer
export default classroomSlice.reducer;
