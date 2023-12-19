import tree from "./trees.js";
import prettyPrint from "./prettyPrint.js";

//const data = [];
const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
//console.log(tree(data));
const myTree = tree(data);

myTree.insertRecursive(10);

myTree.insertRecursive(11);

myTree.insertRecursive(12);
myTree.insertRecursive(13);
myTree.insertRecursive(14);
myTree.insertRecursive(15);

myTree.insertRecursive(16);
myTree.insertRecursive(17);
myTree.insertRecursive(18);
myTree.insertRecursive(19);
myTree.insertRecursive(20);
myTree.insertRecursive(21);
myTree.insertRecursive(22);
myTree.insertRecursive(24);

prettyPrint(myTree.root);

//myTree.del(4);

//prettyPrint(myTree.root);

//myTree.find(6);
/*
myTree.inOrder(console.log);
myTree.preOrder(console.log);
myTree.postOrder(console.log);
myTree.levelOrder();
*/
myTree.inOrder((args) => {
  //console.log(args.data);
});

console.log("Height:", myTree.height());
console.log("Depth:", myTree.depth(myTree.find(1)));
