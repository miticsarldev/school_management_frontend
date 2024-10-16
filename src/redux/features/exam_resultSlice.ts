import { ExamResult } from "@/types"; // Assurez-vous que cela correspond bien à votre interface
import { api } from "../services/apiConfig";

type Exam_resultTag = { type: "Exam_results"; id: string };

export const exam_resultApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createExam_result: builder.mutation<{ message: string }, Omit<ExamResult, '_id'>>({
      query: (exam_resultData) => ({
        url: "/exam_results",
        method: "POST",
        body: exam_resultData, // Utilisez exam_resultData directement, car il contient toutes les données nécessaires
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Exam_results", id: "LIST" }],
    }),
    
    getAllExam_results: builder.query<ExamResult[], void>({
      query: () => "/exam_results",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Exam_results",
                id: _id,
              })) as Exam_resultTag[],
              { type: "Exam_results", id: "LIST" },
            ]
          : [{ type: "Exam_results", id: "LIST" }],
    }),

    getAllExam_resultsByUserId: builder.query<ExamResult[], string>({
      query: (student_id) => `/exam_results-by-user/${student_id}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Exam_results",
                id: _id,
              })) as Exam_resultTag[],
              { type: "Exam_results", id: "LIST" },
            ]
          : [{ type: "Exam_results", id: "LIST" }],
    }),

    updateExam_result: builder.mutation<{ message: string }, ExamResult>({
      query: (exam_result) => ({
        url: `/exam_results/${exam_result._id}`,
        method: "PATCH",
        body: exam_result, // Vous envoyez l'ensemble de l'événement, sauf l'ID
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: "Exam_results", id: _id },
        { type: "Exam_results", id: "LIST" },
      ],
    }),

    deleteExam_result: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/exam_results/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Exam_results", id },
        { type: "Exam_results", id: "LIST" },
      ],
    }),
  }),
});

// Exportez les hooks pour utiliser les mutations et les requêtes
export const {
  useCreateExam_resultMutation,
  useGetAllExam_resultsQuery,
  useUpdateExam_resultMutation,
  useDeleteExam_resultMutation,
  useGetAllExam_resultsByUserIdQuery,
} = exam_resultApiSlice;
