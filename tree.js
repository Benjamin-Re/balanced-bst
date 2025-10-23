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
        if (currentRoot === null) {
            return
        }
        // compare the vale to insert with the current node's value
        // if the value already exists, do not insert it
        if (value === currentRoot.data) return
        // if its smaller, go left
        if (value < currentRoot.data) {
            if (currentRoot.left === null) {
                currentRoot.left = Node(value)
                return
            }
            insert(value, currentRoot.left)
        } else {
            // if its larger, go right
            if (currentRoot.right === null) {
                currentRoot.right = Node(value)
                return
            }
            insert(value, currentRoot.right)
        }
    }
    // get inorder successor (smallest element in the right subtree)
    function getSuccessor(curr) {
        curr = curr.right;
        while (curr !== null && curr.left !== null)
            curr = curr.left;
        return curr;
    }
    const del = (value, node) => {
        if (!node) { return null }
        // cases: leaf, one child, two children
         if(value > node.data) {
             node.right = del(value, node.right)
         } else if(value < node.data) {
            node.left = del(value, node.left)
         } else {
            if(!node.left && !node.right) { return null } // leaf
            if(!node.left) {
                // one right child
                return node.right
            }
            if(!node.right) {
                // one left child
                return node.left
            }
            if(node.left && node.right) {
                // two children
                // find successor
                const successor = getSuccessor(node)
                // replace target with successor
                node.data = successor.data
                // set target to null
                node.right = del(node.right, successor.data)
            }
         }
         return node
    }

    // returns the node with the given value.
    function findValue(value) {
        let current = root
        while(current) {
            if(current.data === value) {
                return current
            }
            if(value < current.data) {
                current = current.left
            }
            if(value > current.data) {
                current = current.right
            }
        }
        return current
    }

    const root = buildTree()

    return {
        root: root,
        prettyPrint: prettyPrint,
        insert: insert,
        del: del,
        findValue: findValue
    }
}

export default Tree
