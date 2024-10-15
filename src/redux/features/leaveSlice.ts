import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { api } from "../services/apiConfig";

// TypeScript interface pour Leave
type Leave = {
  id: string;
  user_id: string;       // Référence à l'utilisateur
  timetable_id: string;  // Référence à l'emploi du temps
  exam_id: string;       // Référence à l'examen
  status: 'Pending' | 'Approved' | 'Declined';       // Statut de la demande (approuvée ou non)
  date: string;          // Date de la demande (format Date ISO string)
  type: string;          // Type de congé ou absence
};

// Type pour le state
type LeaveState = {
  leaves: Leave[];
  isLoading: boolean;
  error: string | null;
};

// State initial
const initialState: LeaveState = {
  leaves: [],
  isLoading: false,
  error: null,
};

// Création du slice pour Leave
const leaveSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {
    setLeaves: (state, action: PayloadAction<Leave[]>) => {
      state.leaves = action.payload;
    },
    addLeave: (state, action: PayloadAction<Leave>) => {
      state.leaves.push(action.payload);
    },
    updateLeave: (state, action: PayloadAction<Leave>) => {
      const index = state.leaves.findIndex(l => l.id === action.payload.id);
      if (index !== -1) {
        state.leaves[index] = action.payload;
      }
    },
    deleteLeave: (state, action: PayloadAction<string>) => {
      state.leaves = state.leaves.filter(l => l.id !== action.payload);
    },
  },
});
export const leaveApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
      getAllLeaves: builder.query<Leave[], void>({
        query: () => "/leaves",
      }),
      addLeave: builder.mutation<{ message: string }, Leave>({
        query: (newLeave) => ({
          url: "/leave",
          method: "POST",
          body: newLeave,
        }),
      }),
      updateLeave: builder.mutation<{ message: string }, Leave>({
        query: (updatedLeave) => ({
          url: `/leave/${updatedLeave.id}`,
          method: "PATCH",
          body: updatedLeave,
        }),
      }),
      deleteLeave: builder.mutation<{ message: string }, string>({
        query: (id) => ({
          url: `/leave/${id}`,
          method: "DELETE",
        }),
      }),
    }),
  });
  
  // Export des hooks générés par RTK Query
  export const {
    useGetAllLeavesQuery,
    useAddLeaveMutation,
    useUpdateLeaveMutation,
    useDeleteLeaveMutation,
  } = leaveApiSlice;
export const {
  setLeaves,
  addLeave,
  updateLeave,
  deleteLeave,
} = leaveSlice.actions;

export const selectLeave = (state: RootState) => state.leave;

export default leaveSlice.reducer;
