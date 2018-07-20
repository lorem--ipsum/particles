export default function nanOr(value: any, defaultValue: number) {
  return isNaN(value) ? defaultValue : +value;
}
