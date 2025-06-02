class Node {
    constructor(data) {
        this.data = data;
        this.yes = null;
        this.no = null;
    }
}

const treeData = {
    data: "Party de rhe ho na 😊??",
    yes: {
        data: "uWu, 🥰💞"
    },
    no: {
        data: "Aasa karoge ab mere saath 🥹",
        yes: {
            data: "😡, yaad rakhunga mai iss baat ko dhyan rakhna.\nLast baar puch rha hu, party??",
            yes: {
                data: "I knew it, you'll say YES, uWu"
            },
            no: {
                data: "Please 🥹",
                yes: {
                    data: "I knew it, you'll say YES, uWu"
                },
                no: {
                    data: "Pretty please 🥹",
                    yes: {
                        data: "I knew it, you'll say YES, uWu"
                    },
                    no: {
                        data: "Seriously abhi bhi mana kar rhe ho.\nJao mai baat nhi kar rha tumhse...",
                        no: {
                            data: "Toh fhir party pakki apni 🥹??",
                            yes: {
                                data: "uWu, 🥰💞"
                            }
                        }
                    }
                }
            }
        },
        no: {
            data: "uWu, mujhe pata tha tum bohot aache ho 💞"
        }
    }
};

function buildTree(obj) {
    if (!obj) return null;
    const node = new Node(obj.data);
    node.yes = buildTree(obj.yes);
    node.no = buildTree(obj.no);
    return node;
}

const first = buildTree(treeData);

let currentNode = first;
let depth = 0;

const modalContent = document.getElementById("modalContent");
const promptText = document.getElementById("promptText");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const partyBtn = document.getElementById("partyBtn");
const modal = document.getElementById("modal");
modal.style.display = "none";

function updatePrompt() {
    if (currentNode) {
        promptText.textContent = currentNode.data;
        
        if (currentNode.yes) {
            yesBtn.style.display = "flex";
        } else {
            yesBtn.style.display = "none";
        }
        
        if (currentNode.no) {
            noBtn.style.display = "flex";
        } else {
            noBtn.style.display = "none";
        }
        
        const maxWidth = window.innerWidth * 0.6;
        const maxHeight = window.innerHeight * 0.6;
        
        const baseWidth = 320;
        const baseHeight = 120;
        const width = Math.min(baseWidth + depth * 100, maxWidth);
        const height = Math.min(baseHeight + depth * 80, maxHeight);
        
        modalContent.style.width = `${width}px`;
        modalContent.style.minHeight = `${height}px`;
        
        const fontSize = Math.min(20 + depth * 4, 38);
        promptText.style.fontSize = `${fontSize}px`;
        
        const buttonSize = Math.min(80 + depth * 10, 140);
        const buttonFontSize = Math.min(16 + depth * 2, 28);
        
        yesBtn.style.width = `${buttonSize}px`;
        yesBtn.style.height = `${buttonSize}px`;
        yesBtn.style.fontSize = `${buttonFontSize}px`;
        
        noBtn.style.width = `${buttonSize}px`;
        noBtn.style.height = `${buttonSize}px`;
        noBtn.style.fontSize = `${buttonFontSize}px`;
        
        modalContent.classList.remove("sparkle-blue", "sparkle-red", "sparkle-colorful");
        modalContent.classList.add("sparkle");
        
        if (!currentNode.yes && !currentNode.no) {
            modalContent.style.animationName = "sparkleColorful";
        } else if (depth === 2 || depth === 5) {
            modalContent.style.animationName = "sparkleRed";
        } else {
            modalContent.style.animationName = "sparkleBlue";
        }
        
        if (depth === 5 && currentNode.data.includes("Jao mai baat")) {
            noBtn.innerText = "NO!!!";
        }
        
        if (depth === 6 && currentNode.data.includes("Toh fhir party pakki")) {
            yesBtn.innerText = "YES!!!";
        }
        
        const showParty = (
            currentNode === first.yes ||
            currentNode === first.no.no ||
            currentNode === first.no.yes.yes ||
            currentNode === first.no.yes.no.yes ||
            currentNode === first.no.yes.no.no.yes ||
            currentNode === first.no.yes.no.no.no.no.yes
        );
        if (showParty) {
            partyBtn.style.display = "flex";
        } else {
            partyBtn.style.display = "none";
        }
    }
}

// initial call to load data
updatePrompt();

yesBtn.addEventListener("click", () => {
    if (currentNode.yes) {
        currentNode = currentNode.yes;
        depth++;
        updatePrompt();
    }
});

noBtn.addEventListener("click", () => {
    if (currentNode.no) {
        currentNode = currentNode.no;
        depth++;
        updatePrompt();
    }
});

partyBtn.addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
    document.getElementById("qrModal").style.display = "flex";
});


const playBtn = document.getElementById('audioBtn');
const playBtnModal = document.getElementById('m');
const audio = document.getElementById('aud');

playBtn.addEventListener('click', () => {
  audio.play().then(() => {
    modal.style.display = "flex";
    playBtnModal.style.display = "none";
  }).catch(err => {
    console.log("Audio play failed:", err);
  });
});