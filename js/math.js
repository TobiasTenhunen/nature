export function lerp(value, target, acceleration) {
    return value += (target - value) * acceleration;
}