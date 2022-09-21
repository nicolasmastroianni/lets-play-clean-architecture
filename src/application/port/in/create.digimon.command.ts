import { CreateDigimonRequest } from "../../model/create.digimon.request";

export interface CreateDigimonCommand {
  execute(command : CreateDigimonRequest ) : void
}