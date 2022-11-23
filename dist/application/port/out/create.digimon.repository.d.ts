import { Digimon } from "../../model/digimon";
export interface CreateDigimonRepository {
    execute(digimon: Digimon): Promise<void>;
}
