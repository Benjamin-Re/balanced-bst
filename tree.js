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

    const root = buildTree()

    return {
        root: root,
        prettyPrint: prettyPrint
    }
}

export default Tree
