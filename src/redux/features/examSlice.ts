import { Exam } from "@/types"; // Assurez-vous que cela correspond bien à votre interface
import { api } from "../services/apiConfig";

type ExamTag = { type: "Exams"; id: string };

export const examApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createExam: builder.mutation<{ message: string }, Omit<Exam, '_id'>>({
      query: (examData) => ({
        url: "/exams",
        method: "POST",
        body: examData, // Utilisez examData directement, car il contient toutes les données nécessaires
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Exams", id: "LIST" }],
    }),
    
    getAllExams: builder.query<Exam[], void>({
      query: () => "/exams",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Exams",
                id: _id,
              })) as ExamTag[],
              { type: "Exams", id: "LIST" },
            ]
          : [{ type: "Exams", id: "LIST" }],
    }),

    getAllExamsByUserId: builder.query<Exam[], string>({
      query: (student_id) => `/exams-by-user/${student_id}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Exams",
                id: _id,
              })) as ExamTag[],
              { type: "Exams", id: "LIST" },
            ]
          : [{ type: "Exams", id: "LIST" }],
    }),

    updateExam: builder.mutation<{ message: string }, Exam>({
      query: (exam) => ({
        url: `/exams/${exam._id}`,
        method: "PATCH",
        body: exam, // Vous envoyez l'ensemble de l'événement, sauf l'ID
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: "Exams", id: _id },
        { type: "Exams", id: "LIST" },
      ],
    }),

    deleteExam: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/exams/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Exams", id },
        { type: "Exams", id: "LIST" },
      ],
    }),
  }),
});

// Exportez les hooks pour utiliser les mutations et les requêtes
export const {
  useCreateExamMutation,
  useGetAllExamsQuery,
  useUpdateExamMutation,
  useDeleteExamMutation,
  useGetAllExamsByUserIdQuery,
} = examApiSlice;
