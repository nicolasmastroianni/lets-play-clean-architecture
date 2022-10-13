import { ApiProperty } from "@nestjs/swagger";

export class DigimonRequestBody {
  @ApiProperty({ name: "name", example: "leomon", description: "The name of digimon" })
  private readonly _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }
}