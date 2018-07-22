import * as math from 'mathjs';

export class ValueExpression {
  private _expression: any;
  private _parsedExpression: math.MathNode;

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
    }
  }

  get expression() {
    return this._expression;
  }

  eval(scope: any): number {
    return this._parsedExpression.eval(scope);
  }
}
