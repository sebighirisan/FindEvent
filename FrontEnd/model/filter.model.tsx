import { AttendanceStatusEnum } from "./event.model";

export interface Filter { 
    pageNumber: number;
    pageSize: number;
}

export interface PersonalActivitiesFilters extends Filter {
    attendanceStatus: AttendanceStatusEnum
}