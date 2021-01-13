
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Set {
    id: number;
    name?: string;
    year?: number;
    numParts?: number;
}

export class Profile {
    ID: number;
    Name?: string;
    Description?: string;
}

export class User {
    ID: number;
    Login?: string;
    Email?: string;
    Status?: number;
    Role?: string;
    Profile?: Profile;
}

export abstract class IQuery {
    abstract allSets(): Set[] | Promise<Set[]>;

    abstract whoAmI(): User | Promise<User>;
}

export abstract class IMutation {
    abstract addSet(name?: string, year?: string, numParts?: number): Set | Promise<Set>;
}
