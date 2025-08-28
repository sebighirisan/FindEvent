import {
  AttendanceStatusEnum,
  Event,
  EventCategoryWithTypes,
  EventRequest,
} from "@/model/event.model";
import { PaginatedResponseModel } from "@/model/paging.model";
import { RootState } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventApi = createApi({
  reducerPath: "event-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/event`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchPersonalizedEvents: builder.query<
      PaginatedResponseModel<Event>,
      { page: number; size: number; attendanceStatus: AttendanceStatusEnum }
    >({
      query: ({ page, size, attendanceStatus }) => ({
        url: "me",
        method: "GET",
        params: {
          pageNumber: page,
          pageSize: size,
          attendanceStatus,
        },
      }),
    }),
    fetchEventById: builder.query<Event, { id: number }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
    fetchTrendingEvents: builder.query<
      PaginatedResponseModel<Event>,
      { page: number; size: number }
    >({
      query: ({ page, size }) => ({
        url: "trending",
        method: "GET",
        params: {
          pageNumber: page,
          pageSize: size,
        },
      }),
    }),
    fetchUpcomingEvents: builder.query<Event[], void>({
      query: () => ({
        url: "upcoming",
        method: "GET",
      }),
    }),
    fetchEventTypes: builder.query<EventCategoryWithTypes[], void>({
      query: () => ({
        url: "types",
        method: "GET",
      }),
    }),
    createEvent: builder.mutation<any, EventRequest>({
      query: ({
        name,
        description,
        hyperlink,
        location,
        type,
        splashImage,
        startDate,
        endDate,
      }) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("hyperlink", hyperlink);
        formData.append("location.name", location.name);
        formData.append("location.latitude", location.latitude);
        formData.append("location.longitude", location.longitude);
        formData.append("type", type);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
        formData.append("splashImage", splashImage);

        return {
          url: "",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useFetchPersonalizedEventsQuery,
  useFetchTrendingEventsQuery,
  useFetchUpcomingEventsQuery,
  useFetchEventTypesQuery,
  useFetchEventByIdQuery,
  useCreateEventMutation,
} = eventApi;
