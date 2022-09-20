export abstract class GenericException {
  private readonly _description;

  protected constructor(description : string) {
    this._description = description
  }

  get description() : string {
    return this._description
  }
}