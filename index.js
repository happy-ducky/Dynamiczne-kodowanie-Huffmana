let username;

let nodeList = [];
let checkedChars = [];

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
    addAmountToParents(nodeList[0]);
}

addAmountToParents = function(node) {
    while(node.parent !== null) {
        node = node.parent;
    if(node.leftLeaf === null || node.leftLeaf === undefined) {
        node.amount = 1;
        continue;
    }else{
        if(node.leftLeaf === null || node.leftLeaf === undefined) {
            node.amount = 1;
            continue;
        }else{
            node.amount = node.leftLeaf.amount + node.rightLeaf.amount;
            continue
        }
    }

    }
}

addAmountToNode = function(char) {
    countedChar = [];
    for (let i = 0; i < nodeList.length; i++) {
            if (char === nodeList[i].value && !countedChar.includes(char)) {
                countedChar.push(char);
                nodeList[i].amount += 1;
                addAmountToParents(nodeList[0]);
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
        if (node.leftLeaf !== null && node.rightLeaf !== null && node.leftLeaf !== undefined && node.rightLeaf !== undefined) {
            console.log(node.value + " has leaves: " + node.leftLeaf.value + " and " + node.rightLeaf.value);
            if (node.leftLeaf.amount > node.rightLeaf.amount) {
                swapNeightbors(node.leftLeaf, node.rightLeaf);
                console.log("Swapped neighbors: " + node.leftLeaf.value + " and " + node.rightLeaf.value);
            }else{
                console.log("No swap needed for: " + node.leftLeaf.amount + " <= " + node.rightLeaf.amount);
            }
        }else{
            console.log("Node has no neighbors to check.");
        }
    }
}

swapNeightbors = function(leftLeaf, rightLeaf) {
    let temp = leftLeaf.value;
    leftLeaf.value = rightLeaf.value;
    rightLeaf.value = temp;
    
    let temp2 = leftLeaf.amount;
    leftLeaf.amount = rightLeaf.amount;
    rightLeaf.amount = temp2;

    if(leftLeaf.leftLeaf === null || leftLeaf.leftLeaf === undefined) {
        console.log("Left leaf is empty, moving right leaf to left leaf.");

        //parent has to change before null
        rightLeaf.leftLeaf.parent = leftLeaf;
        rightLeaf.rightLeaf.parent = leftLeaf;

        leftLeaf.leftLeaf = rightLeaf.leftLeaf;
        rightLeaf.leftLeaf = null;

        leftLeaf.rightLeaf = rightLeaf.rightLeaf;
        rightLeaf.rightLeaf = null;
    }else{
        if(rightLeaf.leftLeaf === null || rightLeaf.leftLeaf === undefined) {
            console.log("Right leaf is empty, moving left leaf to right leaf.");
            
            //parent has to change before null
            leftLeaf.leftLeaf.parent = rightLeaf;
            leftLeaf.rightLeaf.parent = rightLeaf;

            rightLeaf.leftLeaf = leftLeaf.leftLeaf;
            leftLeaf.leftLeaf = null;

            rightLeaf.rightLeaf = leftLeaf.rightLeaf;
            leftLeaf.rightLeaf = null;
        }else{
            console.log("Both leaves are not empty, swapping them.");
            //parents have to change before the change
            leftLeaf.leftLeaf.parent = rightLeaf;
            rightLeaf.leftLeaf.parent = leftLeaf;
            leftLeaf.rightLeaf.parent = rightLeaf;
            rightLeaf.rightLeaf.parent = leftLeaf;

            console.log("Swapping left leaves of " + leftLeaf.value + " and " + rightLeaf.value);
            let temp3 = leftLeaf.leftLeaf;
            leftLeaf.leftLeaf = rightLeaf.leftLeaf;
            rightLeaf.leftLeaf = temp3;

            temp3 = leftLeaf.rightLeaf;
            leftLeaf.rightLeaf = rightLeaf.rightLeaf;
            rightLeaf.rightLeaf = temp3;
        }
    }
}

//tu może byc za dużo lini z czasu błędnego kodu - blanks to tylko rodzice
showTree = function(node) {
    finalTree = "";
    while(node.parent !== null) {
        node = node.parent;
        if (node.leftLeaf !== null && node.rightLeaf !== null) {
            console.log("Node: " + node.value + " has children: " + node.leftLeaf.value + " |Amount: " + node.leftLeaf.amount + " and " + node.rightLeaf.value + " | Amount: " + node.rightLeaf.amount);
            finalTree = node.leftLeaf.value + " | A:" + node.leftLeaf.amount + "   |||   " + node.rightLeaf.value + " | A:" + node.rightLeaf.amount + "\n" + finalTree;
        }else if (node.leftLeaf !== null) {
            console.log("Node: " + node.value + " has left child: " + node.leftLeaf.value + " amount: " + node.leftLeaf.amount);
        }else if (node.rightLeaf !== null) {
            console.log("Node: " + node.value + " has right child: " + node.rightLeaf.value + " amound: " + node.rightLeaf.amount);
        }else{
            console.log("Node: " + node.value + " has no children.");
        }
    }
    console.log(node.value + " | A: " + node.amount);
    finalTree = "   " + node.value + " | A: " + node.amount + "\n" + finalTree;
    console.log("Final tree structure:\n" + finalTree);
    return finalTree;
}

//from https://stackoverflow.com/questions/1026069/how-to-reverse-a-string-in-javascript
function reverseString(str) {
    return str.split('').reverse().join('');
}

findCharTreeCode = function(char) {
    let code="";
    for (let j = 0; j < nodeList.length; j++) {
        console.log("Checking lenght: " + nodeList.length);
        if (char === nodeList[j].value) {
            let currentNode = nodeList[j];
            console.log("Found character with parent or not: " + char);
            while (currentNode.parent !== null) {
                if (currentNode.parent.leftLeaf === currentNode) {
                    code = code + "0"; // left child
                } else {
                    code = code + "1"; // right child
                    console.log("Found right child: " + currentNode.value);
                }
                currentNode = currentNode.parent;
            }
            console.log("Code for character '" + char + "': " + code);
            return reverseString(code); // reverse the code to get the correct order
        }
        //console.log("do I double?");
    }
    console.log("Code for character '" + char + "': " + code);
    return reverseString(code); // reverse the code to get the correct order
}

//from https://www.geeksforgeeks.org/javascript/javascript-program-to-convert-decimal-to-binary/
function decimalToBinary(N) {
    return (N >>> 0).toString(2);
}

findFixedCode = function(char) {
    //26 letters in the alphabet, 0-25
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    //based on https://youtu.be/c2wu8QOS1EY?si=cIdTq7qKgFpJm9YF
    //m=2**e+r
    //26=2**e+r
    e= 4; // 2**4 = 16
    r = 10; // 26 - 16 = 10
    //let index = alphabet.indexOf(char); ??? autocoded
    let locationOfCharInAlphabet = alphabet.indexOf(char) + 1; // +1 to make it 1-based index
    if(locationOfCharInAlphabet === -1) {
        return "Character not found in alphabet.";
    }
    if(locationOfCharInAlphabet < 2*r) {
        console.log("Character is in the first half of the alphabet: " + char + " at position " + locationOfCharInAlphabet);
        binaryCode = decimalToBinary(locationOfCharInAlphabet - 1);
        if(binaryCode.length < e + 1) {
            binaryCode = "0".repeat(e + 1 - binaryCode.length) + binaryCode; // pad with leading zeros
        }
        binaryCode = findCharTreeCode("NYT") + binaryCode;
        console.log("tree code of NYT: "+findCharTreeCode("NYT"));
    }else{
        binaryCode = decimalToBinary(locationOfCharInAlphabet - r - 1);
        if(binaryCode.length < e) {
            binaryCode = "0".repeat(e - binaryCode.length) + binaryCode; // pad with leading zeros
        }
        binaryCode = findCharTreeCode("NYT") + binaryCode;
        console.log("tree code of NYT: "+findCharTreeCode("NYT"));
    }
    return binaryCode;
}

encoding = function(char) {
    if(checkedChars.includes(char)) {
        return findCharTreeCode(char);
    }else{
        checkedChars.push(char);
        return findFixedCode(char);
    }
}

loopShowTree = function(fullEncoding) {
    document.getElementById("myH2").innerText = showTree(nodeList[0]);
    document.getElementById("myP2").innerText = "Current encoding: " + fullEncoding;
    //window.alert("Current tree structure:\n" + showTree(nodeList[0]));
}

processInput = function(inputString) {
    checkedChars = [];
    nodeList = [];
    addFirstNode();
    fullEncoding = "";
    for (let i = 0; i < inputString.length; i++) {
        window.setTimeout(function(){
            let char = inputString[i];
            console.log("Processing character: " + char);
            let temp = encoding(char)
            console.log("Current code: " + temp);
            fullEncoding = fullEncoding + "," + temp;
            addChar(char);
            checkValuesOfNeighbors(nodeList[0]);
            loopShowTree(fullEncoding);//so that the tree can be seen in html
        }, i*2000);
    }
    console.log("Full encoding: " + fullEncoding);
}

document.getElementById("buttonSubmit").onclick = function() {
    inputString = document.getElementById("buttonInput").value;
    document.getElementById("myP").textContent = "Input string: " + inputString;
    processInput(inputString);
    console.log("Final tree structure:");
    showTree(nodeList[0]);
}

//aardvark from https://youtu.be/c2wu8QOS1EY?si=ZUF1fQsuuxIEnqX_