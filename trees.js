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

    while (next) {
      if (value < currentNode.data) {
        // If value to insert is less than the current node's, see left
        next = currentNode.left;
      } else if (value > currentNode.data) {
        // If value to insert is more than current node's, see right.
        next = currentNode.right;
      } else if (value === currentNode.data) {
        console.log("Value already in tree.");
        return;
      }
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

  function del(value) {
    return;
  }
  return { root, insert, del };
}
