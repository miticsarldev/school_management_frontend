import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { api } from "../services/apiConfig";

type Timetable = {
  id: string;
  classRoom_id: {
    _id: string;
    name: string;
  };
  subject: string;
  start_time: string; 
  end_time: string; 
};

type TimetableState = {
  timetables: Timetable[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TimetableState = {
  timetables: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "timetable",
  initialState,
  reducers: {
    setTimetables: (state, action: PayloadAction<Timetable[]>) => {
      state.timetables = action.payload;
    },
    addTimetable: (state, action: PayloadAction<Timetable>) => {
      state.timetables.push(action.payload);
    },
    updateTimetable: (state, action: PayloadAction<Timetable>) => {
      const index = state.timetables.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.timetables[index] = action.payload;
      }
    },
    deleteTimetable: (state, action: PayloadAction<string>) => {
      state.timetables = state.timetables.filter(t => t.id !== action.payload);
    },
  },
});

export const timetableApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTimetables: builder.query<Timetable[], void>({
      query: () => "/timetables",
      // Ajoutez les tags ici si nécessaire
    }),
    addTimetable: builder.mutation<{ message: string }, Timetable>({
      query: (newTimetable) => ({
        url: "/timetable",
        method: "POST",
        body: newTimetable,
      }),
      // Ajoutez les invalidations de tags ici si nécessaire
    }),
    updateTimetable: builder.mutation<{ message: string }, Timetable>({
      query: (updatedTimetable) => ({
        url: `/timetable/${updatedTimetable.id}`,
        method: "PATCH",
        body: updatedTimetable,
      }),
      // Ajoutez les invalidations de tags ici si nécessaire
    }),
    deleteTimetable: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/timetable/${id}`,
        method: "DELETE",
      }),
      // Ajoutez les invalidations de tags ici si nécessaire
    }),
  }),
});

export const {
  useGetAllTimetablesQuery,
  useAddTimetableMutation,
  useUpdateTimetableMutation,
  useDeleteTimetableMutation,
} = timetableApiSlice;

export const { setTimetables, addTimetable, updateTimetable, deleteTimetable } = slice.actions;

export const selectTimetable = (state: RootState) => state.timetable;

export default slice.reducer;
