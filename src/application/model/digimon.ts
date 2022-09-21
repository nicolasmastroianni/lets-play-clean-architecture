export class Digimon{
  constructor(
    private readonly _name : string,
    private readonly _level : number
  ){}

  get name() : string {
    return this._name;
  }

  get level() : number {
    return this._level
  }
}