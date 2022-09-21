import { Digimon } from "../../model/digimon";

export interface GetDigimonInfoByNameRepository {
  execute(name : string) : Promise<Digimon>
}