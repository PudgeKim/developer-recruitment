"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentRepository = void 0;
const department_1 = require("../../entity/department");
class DepartmentRepository {
    constructor(appDataSource) {
        this.appDataSource = appDataSource;
        this.departmentRepo = this.appDataSource.getRepository(department_1.Department);
    }
    save(department) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedDepartment = this.departmentRepo.save(department);
            return savedDepartment;
        });
    }
}
exports.DepartmentRepository = DepartmentRepository;
