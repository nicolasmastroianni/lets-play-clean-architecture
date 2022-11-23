import { Digimon } from "../../../../application/model/digimon";
export declare class DigimonRestModel {
    private readonly _name;
    private readonly _level;
    constructor(_name: string, _level: string);
    get name(): string;
    get level(): string;
    toDomain(): Digimon;
}
