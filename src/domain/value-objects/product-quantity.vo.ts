export class ProductQuantity {
  private readonly _value: number;

  constructor(value: number) {
    this.validate(value);
    this._value = value;
  }

  get value(): number {
    return this._value;
  }

  private validate(value: number): void {
    if (!Number.isInteger(value)) {
      throw new Error('Product quantity must be an integer');
    }
    if (value < 0) {
      throw new Error('Product quantity cannot be negative');
    }
    if (value > 999999) {
      throw new Error('Product quantity cannot exceed 999,999');
    }
  }

  isInStock(): boolean {
    return this._value > 0;
  }

  add(quantity: ProductQuantity): ProductQuantity {
    return new ProductQuantity(this._value + quantity._value);
  }

  subtract(quantity: ProductQuantity): ProductQuantity {
    const newValue = this._value - quantity._value;
    if (newValue < 0) {
      throw new Error('Cannot subtract more quantity than available');
    }
    return new ProductQuantity(newValue);
  }

  equals(other: ProductQuantity): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value.toString();
  }

  static fromNumber(value: number): ProductQuantity {
    return new ProductQuantity(value);
  }

  static zero(): ProductQuantity {
    return new ProductQuantity(0);
  }
}