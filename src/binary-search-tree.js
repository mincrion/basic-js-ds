const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const node = new Node(data); 
    if (!this.rootNode) { 
      this.rootNode = node; 
    } else { 
      this.insertNode(this.rootNode, node);
    }  
  }

  has(data) {
    return !!this.findNode(this.rootNode, data);
  }

  find(data) {
    return this.findNode(this.rootNode, data);
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  min() {
    if (!this.rootNode) return null;
    return this.findMinNode(this.rootNode).data;
  }

  max() {
    if (!this.rootNode) return null
    let current = this.rootNode;
    while (current.right) { 
      current = current.right; 
    } 
    return current.data;
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
 
  findNode(node, data) {
    if (!node) return null;
    if (data < node.data) {
      return this.findNode(node.left, data);
    } else if (data > node.data) {
      return this.findNode(node.right, data);
    } else {
      return node;
    }
  }

  removeNode(node, data) {
    if (!node) return null;
    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      // node hasn't children (leaf node)
      if (!node.left && !node.right) {
        node = null;
        return node;
      }
      // node has only one child
      if (!node.left) {
        node = node.right;
        return node;
      } else if (!node.right) {
        node = node.left;
        return node;
      }
      // node with two children
      const temp = this.findMinNode(node.right);
      node.data = temp.data;
      node.right = this.removeNode(node.right, temp.data);
      return node;
    }
  }

  findMinNode(node) {
    if (!node.left) return node;
    return this.findMinNode(node.left);
  }

}

module.exports = {
  BinarySearchTree
};