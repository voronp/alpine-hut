
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Position {
    x?: Nullable<number>;
    y?: Nullable<number>;
    z?: Nullable<number>;
}

export class ProfileAuthorization {
    ID: number;
    Access?: Nullable<string>;
    PeripheralGroupID?: Nullable<number>;
}

export class Profile {
    ID: number;
    Name?: Nullable<string>;
    Description?: Nullable<string>;
    Authorizations?: Nullable<Nullable<ProfileAuthorization>[]>;
}

export class User {
    ID: number;
    Login?: Nullable<string>;
    Email?: Nullable<string>;
    Status?: Nullable<number>;
    Role?: Nullable<string>;
    Profile?: Nullable<Profile>;
}

export abstract class IQuery {
    abstract whoAmI(): Nullable<User> | Promise<Nullable<User>>;

    abstract peripheralGroupList(): Nullable<Nullable<PeripheralGroup>[]> | Promise<Nullable<Nullable<PeripheralGroup>[]>>;

    abstract getPeripheralGroupsBy3DPart(view3DPart?: Nullable<string>): Nullable<Nullable<PeripheralGroup>[]> | Promise<Nullable<Nullable<PeripheralGroup>[]>>;

    abstract getProfile(): Nullable<Profile> | Promise<Nullable<Profile>>;
}

export abstract class IMutation {
    abstract addPeripheralGroup(Name: string, Data: JSON, Description?: Nullable<string>, Type?: Nullable<string>): Nullable<PeripheralGroup> | Promise<Nullable<PeripheralGroup>>;

    abstract activatePeripheralGroup(ID: number): Nullable<PeripheralGroup> | Promise<Nullable<PeripheralGroup>>;

    abstract deactivatePeripheralGroup(ID: number): Nullable<PeripheralGroup> | Promise<Nullable<PeripheralGroup>>;
}

export abstract class ISubscription {
    abstract peripheralUpdated(peripheralID: number): Nullable<Peripheral> | Promise<Nullable<Peripheral>>;
}

export class Peripheral {
    ID: number;
    Name?: Nullable<string>;
    Data?: Nullable<JSON>;
    Type?: Nullable<string>;
    Description?: Nullable<string>;
    IsActive?: Nullable<boolean>;
    Interface?: Nullable<string>;
    LastUpdate?: Nullable<Date>;
    Position?: Nullable<Position>;
    Object3DReference?: Nullable<Object3DReference>;
}

export class PeripheralGroup {
    ID: number;
    Name?: Nullable<string>;
    Data?: Nullable<JSON>;
    Type?: Nullable<string>;
    Description?: Nullable<string>;
    Peripherals?: Nullable<Nullable<Peripheral>[]>;
    Object3DReference?: Nullable<Object3DReference>;
}

export class Object3DReference {
    ID: number;
    Type?: Nullable<string>;
    ActiveIn?: Nullable<string>;
    Config?: Nullable<JSON>;
    Peripherals?: Nullable<Nullable<Peripheral>[]>;
    PeripheralGroups?: Nullable<Nullable<PeripheralGroup>[]>;
}

export type JSON = any;
type Nullable<T> = T | null;
