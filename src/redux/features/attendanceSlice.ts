import { Attendance } from "@/types"; // Assurez-vous que cela correspond bien à votre interface
import { api } from "../services/apiConfig";

type AttendanceTag = { type: "Attendances"; id: string };

export const attendanceApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createAttendance: builder.mutation<{ message: string }, Omit<Attendance, '_id'>>({
      query: (attendanceData) => ({
        url: "/attendances",
        method: "POST",
        body: attendanceData, // Utilisez attendanceData directement, car il contient toutes les données nécessaires
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Attendances", id: "LIST" }],
    }),
    
    getAllAttendances: builder.query<Attendance[], void>({
      query: () => "/attendances",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Attendances",
                id: _id,
              })) as AttendanceTag[],
              { type: "Attendances", id: "LIST" },
            ]
          : [{ type: "Attendances", id: "LIST" }],
    }),

    getAllAttendancesByParentId: builder.query<Attendance[], string>({
      query: (parent_id) => `/attendances-by-parent/${parent_id}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Attendances",
                id: _id,
              })) as AttendanceTag[],
              { type: "Attendances", id: "LIST" },
            ]
          : [{ type: "Attendances", id: "LIST" }],
    }),
    getAllAttendancesByUserId: builder.query<Attendance[], string>({
        query: (user_id) => `/attendances/user/${user_id}`,
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ _id }) => ({
                  type: "Attendances",
                  id: _id,
                })) as AttendanceTag[],
                { type: "Attendances", id: "LIST" },
              ]
            : [{ type: "Attendances", id: "LIST" }],
      }),

    updateAttendance: builder.mutation<{ message: string }, Attendance>({
      query: (attendance) => ({
        url: `/attendances/${attendance._id}`,
        method: "PATCH",
        body: attendance, // Vous envoyez l'ensemble de l'événement, sauf l'ID
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: "Attendances", id: _id },
        { type: "Attendances", id: "LIST" },
      ],
    }),

    deleteAttendance: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/attendances/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Attendances", id },
        { type: "Attendances", id: "LIST" },
      ],
    }),
  }),
});

// Exportez les hooks pour utiliser les mutations et les requêtes
export const {
  useCreateAttendanceMutation,
  useGetAllAttendancesQuery,
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,
  useGetAllAttendancesByParentIdQuery,
  useGetAllAttendancesByUserIdQuery,
} = attendanceApiSlice;
