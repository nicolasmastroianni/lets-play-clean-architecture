import { TypeEvent } from "./type.event";

export class PokemonKafkaModel{
  constructor(
    private readonly _name: string,
    private readonly _types: string[],
    private readonly _abilities: string[],
    private readonly _typeEvent: TypeEvent
  ) {}

  get name(): string {
    return this._name;
  }

  get types(): string[] {
    return this._types;
  }

  get abilities(): string[] {
    return this._abilities;
  }

  get typeEvent(): TypeEvent {
    return this._typeEvent;
  }
}