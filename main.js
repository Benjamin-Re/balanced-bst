import Tree from './tree.js'

const arr = [1,2,3,4,5]
const tree = Tree(arr)
tree.prettyPrint(tree.root)

// Capture the returned root and update the tree's root
tree.insert(0, tree.root)
tree.insert(6, tree.root)
tree.insert(8, tree.root)
tree.prettyPrint(tree.root)