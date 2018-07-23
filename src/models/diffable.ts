export interface Diffable {
  identify: () => string;
  toJS(): any;
}
