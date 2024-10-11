import { Event } from "@/types"; // Assurez-vous que cela correspond bien à votre interface
import { api } from "../services/apiConfig";

type EventTag = { type: "Events"; id: string };

export const eventApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation<{ message: string }, Omit<Event, '_id'>>({
      query: (eventData) => ({
        url: "/events",
        method: "POST",
        body: eventData, // Utilisez eventData directement, car il contient toutes les données nécessaires
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Events", id: "LIST" }],
    }),
    
    getAllEvents: builder.query<Event[], void>({
      query: () => "/events",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Events",
                id: _id,
              })) as EventTag[],
              { type: "Events", id: "LIST" },
            ]
          : [{ type: "Events", id: "LIST" }],
    }),

    getAllEventsByUserId: builder.query<Event[], string>({
      query: (student_id) => `/events-by-user/${student_id}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Events",
                id: _id,
              })) as EventTag[],
              { type: "Events", id: "LIST" },
            ]
          : [{ type: "Events", id: "LIST" }],
    }),

    updateEvent: builder.mutation<{ message: string }, Event>({
      query: (event) => ({
        url: `/events/${event._id}`,
        method: "PATCH",
        body: event, // Vous envoyez l'ensemble de l'événement, sauf l'ID
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: "Events", id: _id },
        { type: "Events", id: "LIST" },
      ],
    }),

    deleteEvent: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Events", id },
        { type: "Events", id: "LIST" },
      ],
    }),
  }),
});

// Exportez les hooks pour utiliser les mutations et les requêtes
export const {
  useCreateEventMutation,
  useGetAllEventsQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetAllEventsByUserIdQuery,
} = eventApiSlice;
