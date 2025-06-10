let username;

let nodeList = [];

class Node {
    constructor(value, parent, leftLeaf, rightLeaf) {
        this.id = nodeList.length;
        this.value = value;
        this.amount = 1;
        this.parent = parent;
        this.leftLeaf = leftLeaf;
        this.rightLeaf = rightLeaf;
    }
}

addNode = function(value, parent, leftLeaf, rightLeaf) {
    let newNode = new Node(value, parent, leftLeaf, rightLeaf);
    nodeList.push(newNode);
    return newNode;
}

addFirstNode = function() {
    addNode("NYT", null, null, null).amount = 0;
}

isNewChar = function(char) {
    for (let i = 0; i < nodeList.length; i++) {
        if (char === nodeList[i].value) {
            return false;
        }
    }
    return true;
}

addNewChar = function(char) {
    let parentNode = addNode("blank", nodeList[0].parent, nodeList[0], null);
    nodeList.push(parentNode);
    let newNode = addNode(char, parentNode, null, null);
    nodeList.push(newNode);
    parentNode.rightLeaf = newNode;
    if (nodeList[0].parent !== null) {
        nodeList[0].parent.leftLeaf = parentNode;
    }
    nodeList[0].parent = parentNode;
}

addAmountToParents = function(node) {
    while(node.parent !== null) {
        node = node.parent;
        node.amount = node.leftLeaf.amount + node.rightLeaf.amount;
    }
}

addAmountToNode = function(char) {
    countedChar = [];
    for (let i = 0; i < nodeList.length; i++) {
            if (char === nodeList[i].value && !countedChar.includes(char)) {
                countedChar.push(char);
                nodeList[i].amount += 1;
                addAmountToParents(nodeList[i]);
            }
    }
}

addChar = function(char) {
    if (isNewChar(char)) {
        addNewChar(char);
    } else {
        addAmountToNode(char);
    }
}

//always starts with NYT (nodeList[0])
checkValuesOfNeighbors = function(node) {
    while (node.parent !==null){
        node = node.parent;
        console.log(node.value + " has leaves: " + node.leftLeaf.value + " and " + node.rightLeaf.value);
        if (node.leftLeaf !== null && node.rightLeaf !== null && node.leftLeaf !== undefined && node.rightLeaf !== undefined) {
            if (node.leftLeaf.amount > node.rightLeaf.amount) {
                swapNeightbors(node.leftLeaf, node.rightLeaf);
                console.log("Swapped neighbors: " + node.leftLeaf.value + " and " + node.rightLeaf.value);
            }
        }else{
            console.log("Node has no neighbors to check: " + node.leftLeaf.value + " and " + node.rightLeaf.value);
        }
    }
}

swapNeightborsLeaves = function(leftLeaf, rightLeaf) {
    if(leftLeaf.leftLeaf === null) {
        
    }

    let temp = leftLeaf.value;
    leftLeaf.value = rightLeaf.value;
    rightLeaf.value = temp;
}

swapNeightbors = function(leftLeaf, rightLeaf) {
    let temp = leftLeaf.value;
    leftLeaf.value = rightLeaf.value;
    rightLeaf.value = temp;
    
    temp = leftLeaf.amount;
    leftLeaf.amount = rightLeaf.amount;
    rightLeaf.amount = temp;


    temp = leftLeaf.leftLeaf;
    leftLeaf.leftLeaf = rightLeaf.leftLeaf;
    rightLeaf.leftLeaf = temp;

    temp = leftLeaf.rightLeaf;
    leftLeaf.rightLeaf = rightLeaf.rightLeaf;
    rightLeaf.rightLeaf = temp;
}

showTree = function(node) {
    while(node.parent !== null) {
        node = node.parent;
        console.log(node.leftLeaf.value + " | Amount: " + node.leftLeaf.amount + " - " + node.rightLeaf.value + " | Amount: " + node.rightLeaf.amount);
        }
    console.log(node.value + " | Amount: " + node.amount);
}

processInput = function(inputString) {
    addFirstNode();
    for (let i = 0; i < inputString.length; i++) {
        let char = inputString[i];
        console.log("Processing character: " + char);
        addChar(char);
        checkValuesOfNeighbors(nodeList[0]);
    }
}

document.getElementById("buttonSubmit").onclick = function() {
    nodeList = [];
    inputString = document.getElementById("buttonInput").value;
    document.getElementById("myP").textContent = "Input string: " + inputString;
    processInput(inputString);
    console.log("Final tree structure:");
    showTree(nodeList[0]);
}