export class ProductPrice {
  private readonly _value: number;

  constructor(value: number) {
    this.validate(value);
    this._value = value;
  }

  get value(): number {
    return this._value;
  }

  private validate(value: number): void {
    if (value < 0) {
      throw new Error('Product price cannot be negative');
    }
    if (!Number.isFinite(value)) {
      throw new Error('Product price must be a valid number');
    }
    if (value > 999999.99) {
      throw new Error('Product price cannot exceed 999,999.99');
    }
  }

  equals(other: ProductPrice): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value.toFixed(2);
  }

  static fromNumber(value: number): ProductPrice {
    return new ProductPrice(value);
  }
}