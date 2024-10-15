import { Homework } from "@/types"; // Assurez-vous que cela correspond bien à votre interface
import { api } from "../services/apiConfig";

type HomeworkTag = { type: "Homeworks"; id: string };

export const homeworkApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createHomework: builder.mutation<{ message: string }, Omit<Homework, '_id'>>({
      query: (homeworkData) => ({
        url: "/homeworks",
        method: "POST",
        body: homeworkData, // Utilisez homeworkData directement, car il contient toutes les données nécessaires
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Homeworks", id: "LIST" }],
    }),
    
    getAllHomeworks: builder.query<Homework[], void>({
      query: () => "/homeworks",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Homeworks",
                id: _id,
              })) as HomeworkTag[],
              { type: "Homeworks", id: "LIST" },
            ]
          : [{ type: "Homeworks", id: "LIST" }],
    }),

    getAllHomeworksByUserId: builder.query<Homework[], string>({
      query: (student_id) => `/homeworks-by-user/${student_id}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Homeworks",
                id: _id,
              })) as HomeworkTag[],
              { type: "Homeworks", id: "LIST" },
            ]
          : [{ type: "Homeworks", id: "LIST" }],
    }),
    getAllHomeworksByParentId: builder.query<Homework[], string>({
      query: (parentId) => `/homeworks-by-parent/${parentId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Homeworks",
                id: _id,
              })) as HomeworkTag[],
              { type: "Homeworks", id: "LIST" },
            ]
          : [{ type: "Homeworks", id: "LIST" }],
    }),

    updateHomework: builder.mutation<{ message: string }, Homework>({
      query: (homework) => ({
        url: `/homeworks/${homework._id}`,
        method: "PATCH",
        body: homework, // Vous envoyez l'ensemble de l'événement, sauf l'ID
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: "Homeworks", id: _id },
        { type: "Homeworks", id: "LIST" },
      ],
    }),

    deleteHomework: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/homeworks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Homeworks", id },
        { type: "Homeworks", id: "LIST" },
      ],
    }),
  }),
});

// Exportez les hooks pour utiliser les mutations et les requêtes
export const {
  useCreateHomeworkMutation,
  useGetAllHomeworksQuery,
  useUpdateHomeworkMutation,
  useDeleteHomeworkMutation,
  useGetAllHomeworksByUserIdQuery,
  useGetAllHomeworksByParentIdQuery
} = homeworkApiSlice;
