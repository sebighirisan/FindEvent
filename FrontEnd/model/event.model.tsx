import { Location } from "./location.model";
import { User } from "./user.model";

export enum EventStatusEnum {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  DECLINED = "DECLINED",
}

export interface Event {
  id: number;
  name: string;
  description: string;
  publisher: User;
  type: string;
  hyperlink: string;
  hasSplashImage: boolean;
  location: Location;
  startDate: string;
  endDate?: string;
  status: EventStatusEnum;
  going: string[];
  interested: string[];
}

export enum AttendanceStatusEnum {
  GOING = "GOING",
  INTERESTED = "INTERESTED",
}

export interface EventCategoryWithTypes {
  category: string;
  types: EventType[];
}

export interface EventType {
  name: string;
  value: string;
}

export interface LocationRequest {
  name: string;
  longitude: string;
  latitude: string;
}

export interface EventRequest {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  hyperlink: string;
  type: string;
  splashImage: Blob;
  location: LocationRequest;
}
