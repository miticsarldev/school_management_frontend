import { Grade } from "@/types"; // Assurez-vous que cela correspond bien à votre type
import { api } from "../services/apiConfig";

type GradeTag = { type: "Grades"; id: string };

export const gradeApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createGrade: builder.mutation<{ message: string }, Omit<Grade, '_id'>>({
      query: (gradeData) => ({
        url: "/grades",
        method: "POST",
        body: gradeData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Grades", id: "LIST" }],
    }),

    getAllGrades: builder.query<Grade[], void>({
      query: () => "/grades",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Grades",
                id: _id,
              })) as GradeTag[],
              { type: "Grades", id: "LIST" },
            ]
          : [{ type: "Grades", id: "LIST" }],
    }),

    updateGrade: builder.mutation<{ message: string }, Grade>({
      query: (grade) => ({
        url: `/grades/${grade._id}`,
        method: "PATCH",
        body: grade,
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: "Grades", id: _id },
        { type: "Grades", id: "LIST" },
      ],
    }),

    deleteGrade: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/grades/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Grades", id },
        { type: "Grades", id: "LIST" },
      ],
    }),
  }),
});

// Exportez les hooks pour utiliser les mutations et les requêtes
export const {
  useCreateGradeMutation,
  useGetAllGradesQuery,
  useUpdateGradeMutation,
  useDeleteGradeMutation,
} = gradeApiSlice;
