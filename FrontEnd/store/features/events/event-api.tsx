import {
  AttendanceStatusEnum,
  Event,
  EventCategoryWithTypes,
  EventRequest,
} from "@/model/event.model";
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
      Event[],
      { attendanceStatus: AttendanceStatusEnum }
    >({
      query: ({ attendanceStatus }) => ({
        url: "me",
        method: "GET",
        params: {
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
    fetchTrendingEvents: builder.query<Event[], void>({
      query: () => ({
        url: "trending",
        method: "GET",
      }),
    }),
    fetchUpcomingEvents: builder.query<Event[], { name?: string, latitude?: number, longitude?: number, proximity?: number}>({
      query: ({ name, latitude, longitude, proximity }) => ({
        url: "",
        method: "GET",
        params: {
          name,
          latitude,
          longitude,
          proximity
        }
      }),
    }),
    fetchEventTypes: builder.query<EventCategoryWithTypes[], void>({
      query: () => ({
        url: "types",
        method: "GET",
      }),
    }),
    createEvent: builder.mutation<Event, EventRequest>({
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

        if (splashImage) {
          formData.append("splashImage", splashImage);
        }

        return {
          url: "",
          method: "POST",
          body: formData,
        };
      },
    }),
    updateAttendanceStatus: builder.mutation<
      any,
      { id: number; attendanceStatus: AttendanceStatusEnum }
    >({
      query: ({ id, attendanceStatus }) => ({
        url: `${id}/attendance`,
        method: "PUT",
        params: {
          status: attendanceStatus,
        },
      }),
    }),
    deleteAttendanceStatus: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `${id}/attendance`,
        method: "DELETE",
      }),
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
  useDeleteAttendanceStatusMutation,
  useUpdateAttendanceStatusMutation,
} = eventApi;
