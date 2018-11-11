export default class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  static add(vector, ...vectors) {
    let x = vector.x;
    let y = vector.y;
    vectors.forEach(vector => {
      x += vector.x;
      y += vector.y;
    });
    return new Vector2(x, y);
  }

  static subtract(vector, ...vectors) {
    let x = vector.x;
    let y = vector.y;
    vectors.forEach(vector => {
      x -= vector.x;
      y -= vector.y;
    });
    return new Vector2(x, y);
  }

  static rotate(vector, angle = 0) {
    let x = vector.x * Math.cos(angle) - vector.y * Math.sin(angle);
    let y = vector.y * Math.cos(angle) - vector.x * Math.sin(angle);
    return new Vector2(x, y);
  }

  static multiply(vector, factor) {
    return new Vector2(vector.x * factor, vector.y * factor);
  }

  static divide(vector, divisor) {
    return Vector2.multiply(vector, 1 / divisor);
  }

  static orbit(vector, pivot, angle = 0) {
    let offsetVector = Vector2.subtract(vector, pivot);
    let rotatedVector = Vector2.rotate(offsetVector, angle);
    return Vector2.add(rotatedVector, pivot);
  }

  static squareMagnitude(vector) {
    return Math.pow(vector.x, 2) + Math.pow(vector.y, 2);
  }

  static magnitude(vector) {
    return Math.sqrt(Vector2.squareMagnitude(vector));
  }

  static normalize(vector) {
    return Vector2.divide(vector, Vector2.magnitude(vector));
  }

  // Clockwise:
  //   0.0 π rads is up
  //   0.5 π rads is right
  //   1.0 π rads is down
  //   1.5 π rads is left

  static fromAngle(theta) {
    return new Vector2(Math.sin(theta), Math.cos(theta));
  }
}
