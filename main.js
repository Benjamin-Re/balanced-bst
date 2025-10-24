import Tree from './tree.js'

const arr = [1,2,3,4,5]
const tree = Tree(arr)
tree.insert(0, tree.root)
tree.insert(6, tree.root)
tree.insert(8, tree.root)
tree.del(8, tree.root)
tree.prettyPrint(tree.root)
console.log(tree.findValue(1))
// tree.levelOrderForEach(print)
tree.postOrderForEach(print, tree.root)

function print(node) {
    console.log(node.data)
}