function rangeMap(value, inMin, inMax, outMin, outMax) {
  const inRange = inMax - inMin;
  const outRange = outMax - outMin;
  return ((value - inMin) * outRange) / inRange + outMin;
}

export default rangeMap;
