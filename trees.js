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
  function insertRecursive(value, currentNode = root) {
    // Check for existance of value in tree
    if (!root) {
      root = node(value);
      return;
    }
    if (value === currentNode.data) {
      console.log("Value already in tree.");
      return;
    }
    // Determine where to look next
    const check = value < currentNode.data ? "left" : "right";

    // Base case
    if (!currentNode[check]) {
      currentNode[check] = node(value);
      return;
    }
    // Check next child recursively
    insertRecursive(value, currentNode[check]);
    return;
  }

  function del(value, currentNode = root) {
    const next = value < currentNode.data ? "left" : "right";

    // Base cases
    if (!currentNode[next]) {
      console.log("Value not found.");
      return;
    }
    if (currentNode[next].data === value) {
      console.log("Value found at ", currentNode[next], "deleting.");
      if (!currentNode[next].left && !currentNode[next].right) {
        // Handle no child nodes
        currentNode[next] = null;
        return;
      }
      if (
        (currentNode[next].left && !currentNode[next].right) ||
        (!currentNode[next].left && currentNode[next].right)
      ) {
        // Handle one child node
        currentNode[next] = currentNode[next].left
          ? currentNode[next].left
          : currentNode[next].right;
        return;
      } else {
        // Handle two child nodes
        let cursor = currentNode[next].right;
        // Point to current node's right sub-tree
        while (cursor.left.left) {
          // Start traversing down left, side
          cursor = cursor.left;
        }
        if (!cursor.left.right) {
          // If there is no right sub-tree
          // Replace the value with the next closest match
          currentNode[next].data = cursor.left.data;
          // Remove the node containing the match
          cursor.left = null;
        } else {
          // If there is a right sub-tree
          // Replace the value with the next closest match
          currentNode[next].data = cursor.left.data;
          // Remove the node containing the match and have the previous node point to the right sub-tree instead
          cursor.left = cursor.left.right;
        }
        return;
      }
    }
    del(value, currentNode[next]);
  }

  function find(value, currentNode = root) {
    if (!root) {
      return null;
    }
    if (value === currentNode.data) {
      console.log("Value", value, "found at root", currentNode);
      return currentNode;
    }
    const next = value < currentNode.data ? "left" : "right";

    if (!currentNode[next]) {
      console.log("Value", value, "not found in tree.");
      return null;
    }
    if (currentNode[next].data === value) {
      console.log("Value", value, "found at", currentNode[next]);
      return currentNode[next];
    }
    return find(value, currentNode[next]);
  }
  function levelOrder(func) {
    console.log("Running levelOrder");
    const queue = [];
    const tempQueue = [root];
    function enqueue() {
      while (true) {
        const next = tempQueue.shift();
        if (!next) {
          break;
        }
        queue.push(next);
        if (next.left) {
          tempQueue.push(next.left);
        }
        if (next.right) {
          tempQueue.push(next.right);
        }
      }
    }

    enqueue();

    if (func) {
      queue.forEach((arg) => {
        func(arg);
      });
    } else {
      return queue;
    }
  }
  function inOrder(func) {
    console.log("Running inOrder");
    const queue = [];

    function enqueue(node) {
      // console.log(node);
      if (!node) {
        return;
      }
      enqueue(node.left);
      queue.push(node);
      enqueue(node.right);
    }

    enqueue(root);

    if (func) {
      queue.forEach((arg) => {
        func(arg);
      });
    } else {
      return queue;
    }
  }
  function preOrder(func) {
    console.log("Running preOrder");
    const queue = [];

    function enqueue(node) {
      // console.log(node);
      if (!node) {
        return;
      }
      queue.push(node);
      enqueue(node.left);
      enqueue(node.right);
    }

    enqueue(root);

    if (func) {
      queue.forEach((arg) => {
        func(arg);
      });
    } else {
      return queue;
    }
  }
  function postOrder(func) {
    console.log("Running postOrder");
    const queue = [];

    function enqueue(node) {
      // console.log(node);
      if (!node) {
        return;
      }
      enqueue(node.right);
      queue.push(node);
      enqueue(node.left);
    }

    enqueue(root);

    if (func) {
      queue.forEach((arg) => {
        func(arg);
      });
    } else {
      return queue;
    }
  }

  function height(node = root) {
    // Currently returns total amount of nodes in tree
    if (!node) {
      return -1;
    }
    return Math.max(height(node.left), height(node.right)) + 1;
  }
  function depth(node) {
    let depth = -1;
    if (!root) {
      return depth;
    }
    if (node === root) {
      return depth;
    }

    let currentNode = root;
    let next = node.data < currentNode.data ? "left" : "right";

    while (currentNode[next]) {
      depth += 1;
      // console.log("Current Node", currentNode, depth);
      if (currentNode[next] === node) {
        depth += 1;
        return depth;
      }
      currentNode = currentNode[next];
      next = node.data < currentNode.data ? "left" : "right";
    }
    console.log("Not found");
  }
  function isBalanced() {
    return;
  }
  function rebalance() {
    return;
  }
  return {
    root,
    insert,
    insertRecursive,
    del,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}
