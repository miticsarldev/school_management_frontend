import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Users", "Events", "Leaves", "Exams", "Homeworks", "Exam_results", "TuitionFees", "Attendances"], 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (_builder) => ({}),
});
