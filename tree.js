import Node from './node.js'

const Tree = (arr) => {
    const buildTreeRec = (start, end) => {
        if (start > end) {
            return null
        }
        const mid = start + Math.floor((end - start) / 2)
        const node = Node(arr[mid])
        node.left = buildTreeRec(start, mid - 1)
        node.right = buildTreeRec(mid + 1, end)
        return node
    }

    const buildTree = () => {
        return buildTreeRec(0, arr.length - 1)
    }

    const prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node === null) {
            return
        }
        if (node.right !== null) {
            prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
        if (node.left !== null) {
            prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
        }
    }

    const insert = (value, currentRoot) => {
        // if the tree is empty, create the root node
        if(currentRoot === null) {
            return
        }
        // compare the vale to insert with the current node's value
        // if the value already exists, do not insert it
        if(value === currentRoot.data) return
        // if its smaller, go left
        if(value < currentRoot.data) {
            if(currentRoot.left === null) {
                currentRoot.left = Node(value)
                return
            }
            insert(value, currentRoot.left)
        } else {
            // if its larger, go right
            if(currentRoot.right === null) {
                currentRoot.right = Node(value)
                return
            }
            insert(value, currentRoot.right)
        }
    }

    const del = (value, node) => {
        if(node === null) return
        // case target is leaf: have parent point at null
        if(node.data === value) {
            return true
        } else {
            if(del(value, node.left)) {node.left = null}
            if(del(value, node.right)) {node.right = null}
        }
        // case target has one child: have parent point at target child
        // Case target has two children: get targets right child's leftmost child. Then remove the right childs leftmost child (the child that has no left). Replace target with the right childs leftmost child.

    }

    const root = buildTree()

    return {
        root: root,
        prettyPrint: prettyPrint,
        insert: insert,
        del: del
    }
}

export default Tree
