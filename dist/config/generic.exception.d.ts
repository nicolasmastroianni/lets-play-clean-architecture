export declare abstract class GenericException {
    private readonly _description;
    protected constructor(description: string);
    get description(): string;
}
