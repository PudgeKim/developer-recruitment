import { Department } from "../../entity/department";

export interface IDepartmentRepository {
  save(department: Department): Promise<Department>;
}
