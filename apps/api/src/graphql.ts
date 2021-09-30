
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Position {
    x?: number;
    y?: number;
    z?: number;
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
    abstract whoAmI(): User | Promise<User>;

    abstract peripheralGroupList(): PeripheralGroup[] | Promise<PeripheralGroup[]>;

    abstract getPeripheralGroupsBy3DPart(view3DPart?: string): PeripheralGroup[] | Promise<PeripheralGroup[]>;
}

export abstract class IMutation {
    abstract addPeripheralGroup(Name: string, Data: JSON, Description?: string, Type?: string): PeripheralGroup | Promise<PeripheralGroup>;
}

export class Peripheral {
    ID: number;
    Name?: string;
    Data?: JSON;
    Type?: string;
    Description?: string;
    IsActive?: boolean;
    Interface?: string;
    LastUpdate?: Date;
    Position?: Position;
    Object3DReference?: Object3DReference;
}

export class PeripheralGroup {
    ID: number;
    Name?: string;
    Data?: JSON;
    Type?: string;
    Description?: string;
    Peripherals?: Peripheral[];
    Object3DReference?: Object3DReference;
}

export class Object3DReference {
    ID: number;
    Type?: string;
    ActiveIn?: string;
    Config?: JSON;
    Peripherals?: Peripheral[];
    PeripheralGroups?: PeripheralGroup[];
}

export type JSON = any;
