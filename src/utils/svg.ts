import { Vector } from '../models/index';

export function arc(center: Vector, radius: number, startAngle: number, endAngle: number) {
  const start = center.copy().add(Vector.fromPolar({r: radius, theta: endAngle}));
  const end = center.copy().add(Vector.fromPolar({r: radius, theta: startAngle}));

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
      'M', center.x, center.y,
      'L', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      'L', center.x, center.y
  ].join(' ');
}
