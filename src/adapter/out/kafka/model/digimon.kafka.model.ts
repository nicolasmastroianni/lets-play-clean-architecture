import { TypeEvent } from "./type.event";

export class DigimonKafkaModel{
    constructor(
      private readonly _name : string,
      private readonly _level : number,
      private readonly _typeEvent: TypeEvent, 
    ){}
  
    get name() : string {
      return this._name;
    }
  
    get level() : number {
      return this._level
    }

    get typeEvent() : TypeEvent {
        return this._typeEvent
      }
  }