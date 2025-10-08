import Tree from './tree.js'

const arr = [1,2,3,4,5]
const tree = Tree(arr)
tree.prettyPrint(tree.root)

/*
        3
    2       4        
 1             5
*/