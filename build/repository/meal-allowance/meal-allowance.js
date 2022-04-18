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
exports.MealAllowanceRepository = void 0;
const meal_allowance_1 = require("../../entity/meal-allowance");
class MealAllowanceRepository {
    constructor(appDataSource) {
        this.appDataSource = appDataSource;
        this.repo = this.appDataSource.getRepository(meal_allowance_1.MealAllowance);
    }
    save(mealAllowance) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedMealAllowance = yield this.repo.save(mealAllowance);
            return savedMealAllowance;
        });
    }
}
exports.MealAllowanceRepository = MealAllowanceRepository;
