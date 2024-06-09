export function log(name: string, value: any) {
  console.log(`${name}: ${value}`);
}

export function logMap(m: Map<string, Object>) {
  try {
    console.log("===== start ===");
    console.log(Object.values(m));
    console.log("========");
    for (let [key, value] of Object.entries(m)) {
      console.log(`key, value = ${key}, ${value}`);
    }
    console.log("=== end =====");
  } catch(err) {
    console.log(`Type of m: ${typeof m}`);
  }
}