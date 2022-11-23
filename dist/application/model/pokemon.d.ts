export declare class Pokemon {
    private readonly _name;
    private readonly _types;
    private readonly _abilities;
    constructor(_name: string, _types: string[], _abilities: string[]);
    get name(): string;
    get types(): string[];
    get abilities(): string[];
}
