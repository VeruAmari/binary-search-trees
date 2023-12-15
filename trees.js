import node from "./nodes.js";

export default function tree(array) {
  // Remove duplicates?
  const dupeless = [...new Set(array)];
  // Sort data
  dupeless.sort((a, b) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });

  const buildTree = (arr) => {
    const start = 0;
    const end = arr.length;

    if (start >= end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);

    const newNode = node(arr[mid]);
    newNode.left = buildTree(arr.slice(start, mid));
    newNode.right = buildTree(arr.slice(mid + 1, end));

    return newNode;
  };

  let root = buildTree(dupeless);

  function insert(value) {
    console.log("Inserting value", value, ".");
    let currentNode = root;

    let next = currentNode;
    let check;
    while (next) {
      check = value < currentNode.data ? "left" : "right";
      if (value === currentNode.data) {
        console.log("Value already in tree.");
        return;
      }
      next = currentNode[check];
      if (next) {
        // If there is a next node, move there and keep going
        currentNode = next;
      }
    }
    let newNode = node(value);

    if (value < currentNode.data) {
      currentNode.left = newNode;
    } else {
      currentNode.right = newNode;
    }
  }

  function insertRecursive(value, currentNode) {
    if (value === currentNode.data) {
      console.log("Value already in tree.");
      return;
    }
    let check = value < currentNode.data ? "left" : "right";

    if (!currentNode[check]) {
      currentNode[check] = node(value);
      return;
    }
    insertRecursive(value, currentNode[check]);
    return;
  }

  function del(value) {
    return;
  }
  return { root, insert, insertRecursive, del };
}
