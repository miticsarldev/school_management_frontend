import { Leave } from "@/types"; // Assurez-vous que cela correspond bien à votre interface
import { api } from "../services/apiConfig";

type LeaveTag = { type: "Leaves"; id: string };

export const leaveApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createLeave: builder.mutation<{ message: string }, Omit<Leave, '_id'>>({
      query: (leaveData) => ({
        url: "/leaves",
        method: "POST",
        body: leaveData, // Utilisez leaveData directement, car il contient toutes les données nécessaires
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Leaves", id: "LIST" }],
    }),
    
    getAllLeaves: builder.query<Leave[], void>({
      query: () => "/leaves",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Leaves",
                id: _id,
              })) as LeaveTag[],
              { type: "Leaves", id: "LIST" },
            ]
          : [{ type: "Leaves", id: "LIST" }],
    }),

    getAllLeavesByUserId: builder.query<Leave[], string>({
      query: (student_id) => `/leaves-by-user/${student_id}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Leaves",
                id: _id,
              })) as LeaveTag[],
              { type: "Leaves", id: "LIST" },
            ]
          : [{ type: "Leaves", id: "LIST" }],
    }),

    updateLeave: builder.mutation<{ message: string }, Leave>({
      query: (leave) => ({
        url: `/leaves/${leave._id}`,
        method: "PATCH",
        body: leave, // Vous envoyez l'ensemble de l'événement, sauf l'ID
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: "Leaves", id: _id },
        { type: "Leaves", id: "LIST" },
      ],
    }),

    deleteLeave: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/leaves/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Leaves", id },
        { type: "Leaves", id: "LIST" },
      ],
    }),
  }),
});

// Exportez les hooks pour utiliser les mutations et les requêtes
export const {
  useCreateLeaveMutation,
  useGetAllLeavesQuery,
  useUpdateLeaveMutation,
  useDeleteLeaveMutation,
  useGetAllLeavesByUserIdQuery,
} = leaveApiSlice;
