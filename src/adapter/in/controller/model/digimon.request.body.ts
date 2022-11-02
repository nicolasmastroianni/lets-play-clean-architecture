import { ApiProperty } from "@nestjs/swagger";

export class DigimonRequestBody {
  @ApiProperty({ name: "name", example: "leomon", description: "The name of digimon" })
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}