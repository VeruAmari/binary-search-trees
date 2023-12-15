import tree from "./trees.js";
import prettyPrint from "./prettyPrint.js";

const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
//console.log(tree(data));
const myTree = tree(data);

myTree.insert(6, myTree.root);

prettyPrint(myTree.root);
