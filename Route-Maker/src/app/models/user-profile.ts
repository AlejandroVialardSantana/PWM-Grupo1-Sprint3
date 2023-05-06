import { Actividad } from "./interfaces/actividades";

export interface ProfileUser {
    uid: string;
    email?: string;
    displayName?: string;
    displaySurname?: string;
    name?: string;
    surname?: string;
    photoURL?: string;
    activities?: Actividad[];
    password?: string;
}