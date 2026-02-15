import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TextLayer {
    rotation: number;
    shadow: {
        blurRadius: number;
        color: Color;
        offsetX: number;
        offsetY: number;
    };
    color: Color;
    text: string;
    isBold: boolean;
    isItalic: boolean;
    isUnderline: boolean;
    textSpacing: bigint;
    fontFamily: string;
    position: {
        x: number;
        y: number;
    };
    fontSize: bigint;
}
export interface Design {
    id: string;
    owner: Principal;
    name: string;
    createdAt: bigint;
    garmentType: GarmentType;
    updatedAt: bigint;
    textLayers: Array<TextLayer>;
}
export interface UserProfile {
    name: string;
}
export interface Color {
    red: number;
    blue: number;
    green: number;
}
export enum GarmentType {
    cap = "cap",
    poloShirt = "poloShirt",
    pufferJacket = "pufferJacket",
    backpack = "backpack",
    shorts = "shorts",
    joggers = "joggers",
    tankTop = "tankTop",
    toteBag = "toteBag",
    leggings = "leggings",
    duffleBag = "duffleBag",
    vNeckShirt = "vNeckShirt",
    tShirt = "tShirt",
    fannyPack = "fannyPack",
    skirt = "skirt",
    beanie = "beanie",
    canvasPoster = "canvasPoster",
    crewNeck = "crewNeck",
    zipUpHoodie = "zipUpHoodie",
    hoodie = "hoodie",
    sportsJersey = "sportsJersey",
    dress = "dress",
    sweatpants = "sweatpants",
    longSleeveShirt = "longSleeveShirt"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteDesign(id: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDesign(id: string): Promise<Design>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listMyDesigns(): Promise<Array<Design>>;
    renameDesign(id: string, newName: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveDesign(id: string, name: string, garmentType: GarmentType, textLayers: Array<TextLayer>): Promise<void>;
}
