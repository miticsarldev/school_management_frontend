import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { api } from "../services/apiConfig";

// Définition du type Event
type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  start_hour: string;
  start_date: Date;
  end_date: Date;
  end_hour: string;
  borderColor:string;
  user_id: string; // Utilisateur associé (teacher)
};

// Définition du state initial pour les événements
type EventState = {
  events: Event[];
  isLoading: boolean;
  error: string | null;
};

const initialState: EventState = {
  events: [],
  isLoading: false,
  error: null,
};

// Création du slice pour gérer les événements
const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      const index = state.events.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(e => e.id !== action.payload);
    },
  },
});

export const eventApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // Récupérer tous les événements d'un utilisateur spécifique
    getAllEventsByUserId: builder.query<Event[], string>({
      query: (userId) => `/events?userId=${userId}`,
    }),
    // Récupérer tous les événements sans filtre
    getAllEvents: builder.query<Event[], void>({
      query: () => "/events",
    }),
    // Ajouter un nouvel événement
    addEvent: builder.mutation<{ message: string }, Event>({
      query: (newEvent) => ({
        url: "/event",
        method: "POST",
        body: newEvent,
      }),
    }),
    // Mettre à jour un événement
    updateEvent: builder.mutation<{ message: string }, Event>({
      query: (updatedEvent) => ({
        url: `/event/${updatedEvent.id}`,
        method: "PATCH",
        body: updatedEvent,
      }),
    }),
    // Supprimer un événement
    deleteEvent: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/event/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllEventsByUserIdQuery,
  useAddEventMutation,
  useGetAllEventsQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApiSlice;

export const { setEvents, addEvent, updateEvent, deleteEvent } = eventSlice.actions;

export const selectEvent = (state: RootState) => state.event;

export default eventSlice.reducer;
