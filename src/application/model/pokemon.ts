export class Pokemon {

  constructor(
    private readonly name: string,
    private readonly types: string[],
    private readonly abilities: string[],
  ) {}

  getName(): string {
    return this.name;
  }

  getTypes(): string[] {
    return this.types;
  }

  getAbilities(): string[] {
    return this.abilities;
  }

}
