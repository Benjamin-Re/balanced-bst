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
        curr = curr.right
        while (curr !== null && curr.left !== null) curr = curr.left
        return curr
    }
    const del = (value, node) => {
        if (!node) {
            return null
        }
        // cases: leaf, one child, two children
        if (value > node.data) {
            node.right = del(value, node.right)
        } else if (value < node.data) {
            node.left = del(value, node.left)
        } else {
            if (!node.left && !node.right) {
                return null
            } // leaf
            if (!node.left) {
                // one right child
                return node.right
            }
            if (!node.right) {
                // one left child
                return node.left
            }
            if (node.left && node.right) {
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
        if (typeof value !== 'number') {
            throw new Error('provide number value')
        }
        let current = root
        while (current) {
            if (current.data === value) {
                return current
            }
            if (value < current.data) {
                current = current.left
            }
            if (value > current.data) {
                current = current.right
            }
        }
        return null
    }

    // Breadth first traversal
    function levelOrderForEach(cb) {
        if (!cb) {
            throw new Error('A callback needs to be provided')
        }
        if (!root) {
            return
        }
        let queue = [root]
        while (queue.length > 0) {
            const current = queue.shift()
            if (current.left) {
                queue.push(current.left)
            }
            cb(current)
            if (current.right) {
                queue.push(current.right)
            }
        }
    }
    /* Depth first traversal*/
    // Inorder left-root-right
    function inOrderForEach(cb, node) {
        if (!cb) {
            throw new Error('A callback needs to be provided')
        }
        if (!node) {
            return
        }
        inOrderForEach(cb, node.left)
        cb(node)
        inOrderForEach(cb, node.right)
    }
    // preorder root-left-right
    function preOrderForEach(cb, node) {
        if (!cb) {
            throw new Error('A callback needs to be provided')
        }
        if (!node) {
            return
        }
        cb(node)
        preOrderForEach(cb, node.left)
        preOrderForEach(cb, node.right)
    }
    // postorder left-right-root
    function postOrderForEach(cb, node) {
        if (!cb) {
            throw new Error('A callback needs to be provided')
        }
        if (!node) {
            return
        }
        inOrderForEach(cb, node.left)
        inOrderForEach(cb, node.right)
        cb(node)
    }

    function height(value) {
        // height = the distance from the node to a leaf
        if (!Number.isFinite(value)) {
            throw new Error('please provide a number for height(value)')
        }
        let node = findValue(value)
        if (!node) return null // If the value is not found in the tree, the function should return null.
        return heightRec(node)
    }
    function heightRec(node) {
        if (!node) return -1
        // calc height of left and right subtree and return the bigger one
        let heightLeft = heightRec(node.left) + 1
        let heightRight = heightRec(node.right) + 1
        return heightLeft > heightRight ? heightLeft : heightRight
    }

    function depth(value) {
        // depth = nr edges from a node to the tree's root
        if (!Number.isFinite(value)) {
            throw new Error('please provide a number for depth(value)')
        }
        let current = root
        let i = 0
        while (current !== null) {
            i++
            if (value > current.data) {
                current = current.right
            }
            else if (value < current.data) {
                current = current.left
            }
            else if (value === current.data) {
                return i
            }
        }
        return null
    }

    function isBalanced() {
        /* For every node in the tree, the height difference
         between its left and right subtrees is no more than 1 */
        let isBalanced = true
        levelOrderForEach(cb)
        function cb(node) {
            if(!isBalanced) return false // Short circuit
            let leftHeight = !node.left ? -1 : height(node.left.data)
            let rightHeight = !node.right ? -1 : height(node.right.data)
            console.log(`From the current node ${node.data} -
                 the diff of left ${leftHeight} and right ${rightHeight} is ${leftHeight - rightHeight}`)
            if (Math.abs(leftHeight - rightHeight) > 1) isBalanced = false
        }
        return isBalanced
    }

    const root = buildTree()

    return {
        root: root,
        prettyPrint: prettyPrint,
        insert: insert,
        del: del,
        findValue: findValue,
        levelOrderForEach: levelOrderForEach,
        inOrderForEach: inOrderForEach,
        postOrderForEach: postOrderForEach,
        preOrderForEach: preOrderForEach,
        height: height,
        depth: depth,
        isBalanced: isBalanced
    }
}

export default Tree
