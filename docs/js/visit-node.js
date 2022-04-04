// 遍历node节点
function visitNode(node) {
  if (node instanceof Text) {
    if (node.textContent) {
      console.log('text---', node.textContent);
    }
  } else if (node instanceof Comment) {
    console.log('注释节点---');
  } else if (node instanceof Node) {
    console.log(`标签节点---<${node.tagName.toLowerCase()}>`);
  }
}

// 深度优先遍历dom节点，递归写法
function depthFirstTraverse(root) {
  if (!root) {
    return;
  }
  visitNode(root);
  const child = root.childNodes;
  if (child && child.length) {
    child.forEach((node) => depthFirstTraverse(node));
  }
}

// 深度优先遍历dom节点，栈写法
function depthFirstTraverse2(root) {
  const stack = [];
  stack.push(root);
  while (stack.length) {
    const currentNode = stack.pop();
    if (currentNode === null) break;
    visitNode(currentNode);
    const child = currentNode.childNodes;
    for (let i = child.length - 1; i >= 0; i--) {
      // 顺序颠倒入栈
      stack.push(child[i]);
    }
  }
}

// 广度优先遍历dom
function breadthFirstTraverse(root) {
  const queue = []; // 需要借助队列实现
  queue.unshift(root);
  while (queue.length) {
    const node = queue.pop();
    if (node === null) break;
    visitNode(node);
    const child = node.childNodes;
    if (child && child.length) {
      child.forEach((v) => queue.unshift(v));
    }
  }
}

let md = document.getElementsByClassName('markdown-body')[0];
// depthFirstTraverse(md);
// console.log('-------------');
// breadthFirstTraverse(md);
depthFirstTraverse2(md);