import { TechStack } from "../../entity/tech-stack";

export interface ITechStackRepository {
  save(techStack: TechStack): Promise<TechStack>;
}
