import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("products")
export class ProductEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  price!: number;

  @Column({ type: "int", nullable: false, default: 0 })
  quantity!: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  category!: string | null;

  @Column({ type: "varchar", length: 50, nullable: true, unique: true })
  sku!: string | null;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;

  constructor(partial?: Partial<ProductEntity>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }

  // Domain methods
  updatePrice(newPrice: number): void {
    if (newPrice < 0) {
      throw new Error("Price cannot be negative");
    }
    this.price = newPrice;
  }

  updateQuantity(newQuantity: number): void {
    if (newQuantity < 0) {
      throw new Error("Quantity cannot be negative");
    }
    this.quantity = newQuantity;
  }

  deactivate(): void {
    this.isActive = false;
  }

  activate(): void {
    this.isActive = true;
  }

  isInStock(): boolean {
    return this.quantity > 0;
  }
}
