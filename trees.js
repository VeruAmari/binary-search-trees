import node from "./nodes.js";

export default function tree(array) {
  // Sort data
  array.sort((a, b) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });
  const parsed = [...new Set(array)];
  // Remove duplicates?

  const buildTree = (arr) => {
    const start = 0;
    const end = arr.length;

    if (start >= end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);

    const newNode = node();
    newNode.data = arr[mid];
    newNode.left = buildTree(arr.slice(start, mid));
    newNode.right = buildTree(arr.slice(mid + 1, end));

    return newNode;
  };

  let root = buildTree(parsed);
  return root;
}

const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
//console.log(tree(data));

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
prettyPrint(tree(data));
