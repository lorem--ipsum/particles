import * as math from 'mathjs';

export class ValueExpression {
  private _expression: any;
  private _parsedExpression: math.MathNode;
  private _value = 0;

  constructor(expression: any) {
    this.expression = expression;
  }

  set expression(value: any) {
    try {
      const p = math.parse(value);
      p.eval({t: 0});
      this._expression = value;
      this._parsedExpression = p;
    } catch (e) {
      console.log(e)
    }
  }

  get expression() {
    return this._expression;
  }

  eval(scope: any): number {
    return this._parsedExpression ? this._parsedExpression.eval(scope) : 0;
  }

  update(scope: any) {
    this._value = this.eval(scope);
  }

  get value(): number {
    return this._value;
  }
}
