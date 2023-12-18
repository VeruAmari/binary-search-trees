import tree from "./trees.js";
import prettyPrint from "./prettyPrint.js";

const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
//console.log(tree(data));
const myTree = tree(data);

//myTree.insertRecursive(6);

prettyPrint(myTree.root);

//myTree.del(4);

//prettyPrint(myTree.root);

//myTree.find(6);
/*
myTree.inOrder(console.log);
myTree.preOrder(console.log);
myTree.postOrder(console.log);*/
myTree.levelOrder((arg) => {
  console.log(arg.data);
});
