import { OfficeHours } from "../../entity/office-hours";

export interface IOfficeHoursRepository {
  save(officeHours: OfficeHours): Promise<OfficeHours>;
}
