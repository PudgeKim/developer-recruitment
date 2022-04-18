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
exports.WelfareProductRepository = void 0;
const welfare_product_1 = require("../../entity/welfare-product");
class WelfareProductRepository {
    constructor(appDataSource) {
        this.appDataSource = appDataSource;
        this.repo = this.appDataSource.getRepository(welfare_product_1.WelfareProduct);
    }
    save(welfareProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedWelfareProduct = yield this.repo.save(welfareProduct);
            return savedWelfareProduct;
        });
    }
}
exports.WelfareProductRepository = WelfareProductRepository;
