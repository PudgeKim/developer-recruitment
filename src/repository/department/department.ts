import { DataSource, Repository } from "typeorm";
import { Department } from "../../entity/department";

export class DepartmentRepository {
  private appDataSource: DataSource;
  private departmentRepo: Repository<Department>;

  constructor(appDataSource: DataSource) {
    this.appDataSource = appDataSource;
    this.departmentRepo = this.appDataSource.getRepository(Department);
  }

  public async save(department: Department): Promise<Department> {
    const savedDepartment = this.departmentRepo.save(department);
    return savedDepartment;
  }
}
