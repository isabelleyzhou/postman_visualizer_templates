function recommend(obj) {
  isPossibleMap(obj);
  isPossibleBarChart(obj);
  isPossibleScatterPlot(obj);
  isPossibleTable(obj);
  isPossibleTree(obj);
}

function isDictionary(obj) {
  if (typeof obj == "object" && !Array.isArray(obj) && obj !== null) {
    return true;
  } else {
    return false;
  }
}
function isPossibleMap(obj) {
  if (!obj || typeof obj != "object") {
    return false;
  }
  if (Array.isArray(obj)) {
    return obj.some(elem => isPossibleMap(elem));
  }
  for (const [key, value] of Object.entries(obj)) {
    if (
      key == "lat" ||
      key == "long" ||
      key == "lon" ||
      key == "latitude" ||
      key == "longitude"
    ) {
      console.log("A map can be made.");
      return true;
    }
    if (
      (key == "coordinates" || key == "location" || key == "loc") &&
      Array.isArray(value) &&
      (value.length == 2 || value.length == 3) &&
      value.every(elem => typeof elem == "number")
    ) {
      console.log("A map can be made.");
      return true;
    }
  }
  return isPossibleMap(Object.values(obj));
}
function isPossibleTree(obj) {
  if (obj) {
    console.log("A tree can be made.");
    return true;
  }
  return false;
}
function isPossibleScatterPlot(obj) {
  function recursivePrintNumFields(objec, path) {
    for (const [key, value] of Object.entries(objec)) {
      if (typeof value === "number" || (!isNaN(value) && value !== null)) {
        console.log(" - " + path + key);
      }
      if (isDictionary(value)) {
        recursivePrintNumFields(value, path + key + ".");
      }
    }
  }
  function recursiveCountNumFields(objec, aggregate) {
    let count = aggregate;
    for (const [key, value] of Object.entries(objec)) {
      if (typeof value === "number" || (!isNaN(value) && value !== null)) {
        count += 1;
      }
      if (isDictionary(value)) {
        count += recursiveCountNumFields(value, count);
      }
    }
    return count;
  }
  function recursiveSameKeys(obj1, obj2) {
    if (
      JSON.stringify(Object.keys(obj1).sort()) ===
      JSON.stringify(Object.keys(obj2).sort())
    ) {
      for (const [key, value] of Object.entries(obj1)) {
        if (
          isDictionary(value) &&
          !(isDictionary(obj2[key]) && recursiveSameKeys(obj1[key], obj2[key]))
        ) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  if (!obj || typeof obj != "object") {
    return false;
  }
  if (Array.isArray(obj)) {
    //check if all elements in array are objects
    for (let value of obj) {
      if (!isDictionary(value)) {
        return false;
      }
    }
    // check if objects have the same keys.
    //Assumes that if the keys map to objects, the objects will also be of the same structure
    for (let i = 1; i < obj.length; i++) {
      if (!recursiveSameKeys(obj[0], obj[i])) {
        return false;
      }
    }
    if (recursiveCountNumFields(obj[0], 0) >= 2) {
      console.log(
        "A scatter plot can be made. Chose two of the following fields to compare."
      );
      recursivePrintNumFields(obj[0], "");
      return true;
    }
    return false;
  } else {
    if (isDictionary(obj)) {
      // makes sure that the entire array is searched through rather than returning early
      if (
        Object.values(obj).every(elem => isDictionary(elem)) &&
        Object.values(obj).every(elem =>
          recursiveSameKeys(elem, Object.values(obj)[0])
        ) &&
        recursiveCountNumFields(Object.values(obj)[0], 0) >= 2
      ) {
        console.log(
          "A scatter plot can be made. Chose two of the following fields to compare."
        );
        recursivePrintNumFields(Object.values(obj)[0], "");
        return true;
      } else {
        return Object.values(obj)
          .map(elem => isPossibleScatterPlot(elem))
          .includes(true);
      }
    }
  }
}
function isPossibleTable(obj) {
  function recursivePrintStringNumFields(objec, path) {
    for (const [key, value] of Object.entries(objec)) {
      if (typeof value === "string" || typeof value === "number") {
        console.log(" - " + path + key);
      }
      if (isDictionary(value)) {
        recursivePrintStringNumFields(value, path + key + ".");
      }
    }
  }
  function recursiveSameKeys(obj1, obj2) {
    if (
      JSON.stringify(Object.keys(obj1).sort()) ===
      JSON.stringify(Object.keys(obj2).sort())
    ) {
      for (const [key, value] of Object.entries(obj1)) {
        if (
          isDictionary(value) &&
          !(isDictionary(obj2[key]) && recursiveSameKeys(obj1[key], obj2[key]))
        ) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  if (!obj || typeof obj != "object") {
    return false;
  }
  if (Array.isArray(obj)) {
    //check if all elements in array are objects
    for (let value of obj) {
      if (!isDictionary(value)) {
        return false;
      }
    }
    // check if objects have the same keys.
    //Assumes that if the keys map to objects, the objects will also be of the same structure
    for (let i = 1; i < obj.length; i++) {
      if (!recursiveSameKeys(obj[0], obj[i])) {
        return false;
      }
    }
    console.log(
      "A table with any combination of the following columns can be made."
    );
    recursivePrintStringNumFields(obj[0], "");
    return true;
  } else {
    if (isDictionary(obj)) {
      // makes sure that the entire array is searched through rather than returning early
      return Object.values(obj)
        .map(elem => isPossibleTable(elem))
        .includes(true);
    }
  }
}
function isPossibleBarChart(obj) {
  function recursivePrintStringNumFields(objec, path) {
    for (const [key, value] of Object.entries(objec)) {
      if (typeof value === "string" || typeof value === "number") {
        console.log(" - " + path + key);
      }
      if (isDictionary(value)) {
        recursivePrintStringNumFields(value, path + key + ".");
      }
    }
  }
  function recursiveSameKeys(obj1, obj2) {
    if (
      JSON.stringify(Object.keys(obj1).sort()) ===
      JSON.stringify(Object.keys(obj2).sort())
    ) {
      for (const [key, value] of Object.entries(obj1)) {
        if (
          isDictionary(value) &&
          !(isDictionary(obj2[key]) && recursiveSameKeys(obj1[key], obj2[key]))
        ) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  if (!obj || typeof obj != "object") {
    return false;
  }
  if (Array.isArray(obj)) {
    //check if all elements in array are objects
    for (let value of obj) {
      if (!isDictionary(value)) {
        return false;
      }
    }
    // check if objects have the same keys.
    //Assumes that if the keys map to objects, the objects will also be of the same structure
    for (let i = 1; i < obj.length; i++) {
      if (!recursiveSameKeys(obj[0], obj[i])) {
        return false;
      }
    }
    console.log(
      "A histogram bar chart can be formed over any of the following fields."
    );
    recursivePrintStringNumFields(obj[0], "");
    return true;
  } else {
    if (isDictionary(obj)) {
      // makes sure that the entire array is searched through rather than returning early
      return Object.values(obj)
        .map(elem => isPossibleBarChart(elem))
        .includes(true);
    }
  }
}

var response = pm.response.json();
recommend(response);
