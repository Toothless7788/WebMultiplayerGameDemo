export function log(name: string, value: any) {
  console.log(`${name}: ${value}`);
}

export function logMap(name: string, m: Map<string, Object>) {
  try {
    console.log(`\n===== ${name} =====`);
    console.log(Object.values(m));
    console.log("========");
    for (let [key, value] of Object.entries(m)) {
      console.log(`key, value = ${key}, ${value}`);
    }
    console.log(`\n===== End of ${name} =====`);
  } catch(err) {
    console.log(`Type of m: ${typeof m}`);
  }
}

/**
 * Return a list of block instances
 * @param o The Object.entries(JSON Object)
 * @returns a list of block instance
 */
export function createList(o: Object) {
  let jsonList: Object[] = [];
  let entries = Object.entries(o);

  // console.log(`createMap() entries = ${entries}`);

  entries.forEach((key, dummyValue) => {
    // console.log(`\nkey = ${key[1][0]}`);
    // console.log(`value = ${key[1][1]}`);
    // console.log(`dummy value = ${dummyValue}`);
    jsonList.push(key[1][1]);
  });

  return jsonList;
  
}