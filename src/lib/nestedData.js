export function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

export function setNestedValue(obj, path, value) {
  const keys = path.split(".");
  const clone = JSON.parse(JSON.stringify(obj));
  let current = clone;

  for (let i = 0; i < keys.length - 1; i++) {
    current = current[keys[i]];
  }

  current[keys[keys.length - 1]] = value;
  return clone;
}
``
