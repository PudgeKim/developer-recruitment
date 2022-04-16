import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company";

// 복지로 나오는 물품들
// 예를 들면 허먼밀러 의자, 4k모니터 등
@Entity({ name: "welfare_product" })
export class WelfareProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  type: string;

  @ManyToOne(() => Company, (company) => company.welfareProducts)
  company: Promise<Company>;
}
