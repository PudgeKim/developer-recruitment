import { Column } from "typeorm";

export class Address {
  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  zipcode: string;

  @Column({ name: "nearest_subway", nullable: true, length: 15 })
  nearestSubway: string; // 가장 가까운 지하철역

  @Column({ name: "walk_distance", nullable: true })
  walkDistance: number; // 가까운 지하철역으로부터 도보 소요 시간

  static create(
    city: string,
    street: string,
    zipcode: string,
    nearestSubway: string,
    walkDistance: number
  ): Address {
    const address = new Address();
    address.city = city;
    address.street = street;
    address.zipcode = zipcode;
    address.nearestSubway = nearestSubway;
    address.walkDistance = walkDistance;
    return address;
  }
}
