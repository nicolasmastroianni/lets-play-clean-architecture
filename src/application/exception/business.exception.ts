export class BusinessException {
  private readonly _description;

  constructor(description : string) {
    this._description = description
  }

  get description() : string {
    return this._description
  }
}