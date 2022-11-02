export class Digimon{
  constructor(
    private readonly name : string,
    private readonly level : number
  ){}

  getName() : string {
    return this.name;
  }

  getLevel() : number {
    return this.level
  }
}