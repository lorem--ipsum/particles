import nanOr from '../utils/nan-or';

export interface VectorJS {
  x: number;
  y: number;
}

export interface PolarVector {
  r: number;
  theta: number;
}

export class Vector {
  public x: number;
  public y: number;

  static ORIGIN() {
    return new Vector({x: 0, y: 0});
  }

  static fromJS(params: VectorJS) {
    return new Vector(params);
  }

  static fromPolar(params: PolarVector) {
    const { r, theta } = params;

    return new Vector({
      x: r * Math.cos(theta),
      y: r * Math.sin(theta)
    });
  }

  constructor(params: VectorJS) {
    this.x = nanOr(params.x, 1);
    this.y = nanOr(params.y, 1);
  }

  toJS(): VectorJS {
    return {
      x: this.x,
      y: this.y
    };
  }

  toPolar(): PolarVector {
    return {
      r: this.getMagnitude(),
      theta: Math.atan2(this.y, this.x)
    };
  }

  add(other: Vector) {
    this.x = this.x + other.x;
    this.y = this.y + other.y;

    return this;
  }

  subtract(other: Vector) {
    this.x = this.x - other.x;
    this.y = this.y - other.y;

    return this;
  }

  multiply(value: number) {
    this.x = this.x * value;
    this.y = this.y * value;

    return this;
  }

  divide(value: number) {
    this.x = this.x / value;
    this.y = this.y / value;

    return this;
  }

  normalize() {
    const m = this.getMagnitude();

    if (m) {
      this.divide(m);
    }

    return this;
  }

  getMagnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  copy() {
    return new Vector({x: this.x, y: this.y});
  }
}
