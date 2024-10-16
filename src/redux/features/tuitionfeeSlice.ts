import { TuitionFee } from "@/types"; // Assurez-vous que cela correspond bien à votre interface
import { api } from "../services/apiConfig";

type TuitionFeeTag = { type: "TuitionFees"; id: string };

export const tuitionTuitionFeeApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createTuitionFee: builder.mutation<{ message: string }, Omit<TuitionFee, '_id'>>({
      query: (tuitionTuitionFeeData) => ({
        url: "/tuition-fees",
        method: "POST",
        body: tuitionTuitionFeeData, // Utilisez tuitionTuitionFeeData directement, car il contient toutes les données nécessaires
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "TuitionFees", id: "LIST" }],
    }),
    
    getAllTuitionFees: builder.query<TuitionFee[], void>({
      query: () => "/tuition-fees",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "TuitionFees",
                id: _id,
              })) as TuitionFeeTag[],
              { type: "TuitionFees", id: "LIST" },
            ]
          : [{ type: "TuitionFees", id: "LIST" }],
    }),

    getAllTuitionFeesByUserId: builder.query<TuitionFee[], string>({
      query: (student_id) => `/tuition-fees-by-user/${student_id}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "TuitionFees",
                id: _id,
              })) as TuitionFeeTag[],
              { type: "TuitionFees", id: "LIST" },
            ]
          : [{ type: "TuitionFees", id: "LIST" }],
    }),
    getAllTuitionFeesByParentId: builder.query<TuitionFee[], string>({
      query: (parentId) => `/tuition-fees-by-parent/${parentId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "TuitionFees",
                id: _id,
              })) as TuitionFeeTag[],
              { type: "TuitionFees", id: "LIST" },
            ]
          : [{ type: "TuitionFees", id: "LIST" }],
    }),
    updateTuitionFee: builder.mutation<{ message: string }, TuitionFee>({
      query: (tuitionTuitionFee) => ({
        url: `/tuition-fees/${tuitionTuitionFee._id}`,
        method: "PATCH",
        body: tuitionTuitionFee, // Vous envoyez l'ensemble de l'événement, sauf l'ID
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: "TuitionFees", id: _id },
        { type: "TuitionFees", id: "LIST" },
      ],
    }),

    deleteTuitionFee: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/tuition-fees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "TuitionFees", id },
        { type: "TuitionFees", id: "LIST" },
      ],
    }),
  }),
});

// Exportez les hooks pour utiliser les mutations et les requêtes
export const {
  useCreateTuitionFeeMutation,
  useGetAllTuitionFeesQuery,
  useUpdateTuitionFeeMutation,
  useDeleteTuitionFeeMutation,
  useGetAllTuitionFeesByUserIdQuery,
  useGetAllTuitionFeesByParentIdQuery,
} = tuitionTuitionFeeApiSlice;
