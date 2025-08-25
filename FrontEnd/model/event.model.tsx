import { Location } from "./location.model";
import { User } from "./user.model";

export enum EventStatusEnum {
    DRAFT = "DRAFT",
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    DECLINED = "DECLINED"
};

export interface Event {
    id: number;
    name: string;
    description: string;
    publisher: User;
    type: string;
    hyperlink: string;
    splashImage: string;
    location: Location;
    startDate: string;
    endDate?: string;
    status: EventStatusEnum;
}

export enum AttendanceStatusEnum {
    GOING = "GOING",
    INTERESTED = "INTERESTED",
}