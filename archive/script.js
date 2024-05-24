$(document).ready(function () {
    loadQuickRolls();
    updateStatus();
});

var activeDie = [];
const activeDieType = {
    "d4": 0,
    "d6": 0,
    "d8": 0,
    "d10": 0,
    "d12": 0,
    "d20": 0,
};
const diceElement = {
    "d4": $(`
    <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
        <g>
            <polygon points="50,0 100,100 0,100" fill="#b03535" />
        </g>
    </svg>
    `),
    "d6": $(`
    <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
        <g>
            <polygon points="0,0 100,0 100,100 0,100" fill="#d97945" />
        </g>
    </svg>
    `),
    "d8": $(`
    <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
        <g>
            <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="#cfa940" />
            <polygon points="50,0 100,75 0,75" fill="#f2ce6b" />
            <polygon points="50,100 100,75 0,75" fill="#8f7328" />            
        </g>
    </svg>
    `),
    "d10": $(`
    <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
        <g>
            <polygon points="50,0 100,40 100,60 50,100 0,60 0,40" fill="#79b349" />
            <polygon points="50,0 80,60 50,75 20,60" fill="#87c951" />
            <polygon points="0,60 20,60 50,75, 80,60 100,60 50,100" fill="#65993a" />
        </g>
    </svg>
    `),
    "d12": $(`
    <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
        <g>
            <polygon points="50,0 80,10 100,35 100,65 80,90 50,100 20,90 0,65 0,35 20,10" fill="#387fc2" />
            <polygon points="50,0 80,10 100,35 83,40 50,20 17,40 0,35 20,10" fill="#3574b0" />
            <polygon points="70,75 80,90 50,100 20,90 30,75" fill="#1e5e9c" />
            <polygon points="50,20 83,40 70,75 30,75 17,40" fill="#4188cc" />
        </g>
    </svg>
    `),
    "d20": $(`
    <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
        <g>
            <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="#6928b8" />
            <polygon points="0,75 100,75 50,100" fill="#561f99" />
            <polygon points="0,25 100,25 80,75 50,100 20,75" fill="#7a37cc" />
            <polygon points="50,25 80,75 20,75" fill="#8845d9" />
        </g>
    </svg>
    `)
}

function addActiveDice(dice) {
    console.log(`Adding ${dice}`);
    var diceId = `${dice}-${activeDieType[dice]}`;
    activeDie.push({
        id: diceId,
        type: dice,
        result: null
    });
    activeDieType[dice]++;
    newDice = diceElement[dice].clone().attr('id', diceId);
    $("#dice-roll").append(newDice);
    $(`#${diceId}`).on("click", () => removeActiveDice(diceId));

    updateStatus();
}

function removeActiveDice(diceId) {
    console.log(`Removing ${diceId}`);
    activeDie = activeDie.filter(die => die.id != diceId);
    dice = diceId.split("-")[0];
    activeDieType[dice]--;
    $(`#${diceId}`).remove();

    updateStatus();
}

function sumResult() {
    let sum = 0;
    activeDie.forEach(die => {
        sum += parseInt(die.result?.textContent ?? '0');
    });
    sum += parseInt($("#modifier").val() || 0);
    return sum;
}

function updateStatus() {
    const status = [];
    Object.entries(activeDieType).forEach(die => {
        if (die[1] > 0) {
            status.push(`${die[1]}${die[0]}`);
        }
    });
    statusText = status.join("+");
    const modifier = $("#modifier").val();
    if (modifier > 0) {
        statusText += ` + ${modifier}`;
    }
    result = sumResult();
    if (result > 0) {
        statusText += ` = ${result}`;
    }
    $("#status").text(statusText);
}

let last = -1
function random(min, max) {
    const rand = min + (max - min + 1) * crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32 | 0
    if (rand === last) {
        return random(min, max)
    } else {
        last = rand
        return rand
    }
}

function rollDice() {
    activeDie.forEach(die => {
        $(`#${die.id}`).addClass("rolling");

        const dice = die.type;
        const result = random(1, parseInt(dice.slice(1)));

        setTimeout(() => {
            $(`#${die.id}`).removeClass("rolling");
            if (!die.result) {
                // create text element
                newText = document.createElementNS("http://www.w3.org/2000/svg", "text");
                newText.setAttribute("x", "50");
                newText.setAttribute("y", "55");
                newText.setAttribute("text-anchor", "middle");
                newText.setAttribute("alignment-baseline", "middle");
                newText.setAttribute("font-size", "35");
                newText.setAttribute("font-weight", "bold");
                newText.setAttribute("fill", "white");
                newText.textContent = result;
                die.result = newText;
                $(`#${die.id}`).find("g").append(newText);
            }
            else {
                // update text element
                die.result.textContent = result;
            }

            updateStatus();
        }, 1500);
    });
}

function resetDice() {
    console.log("Resetting dice");
    activeDie.length = 0;
    Object.keys(activeDieType).forEach(die => activeDieType[die] = 0);
    $("#dice-roll").empty();
    $("#modifier").val(0);
    updateStatus();
}

function parseDice(text) {
    const dice = text.replace(" ", "").split("+");
    dice.forEach(die => {
        if (die.includes("d")) {
            const numberOfDie = parseInt(die.split("d")[0] || 1);
            die = `d${die.split("d")[1]}`;
            if (die in activeDieType) {
                for (let i = 0; i < numberOfDie; i++) {
                    addActiveDice(die);
                }
            }
        }
        else {
            var modifier = parseInt($("#modifier").val() || 0);
            modifier += parseInt(die);
            $("#modifier").val(modifier);

            updateStatus();
        }
    });
}

function setEnterDice(ele) {
    if (event.key === 'Enter') {
        console.log(`Setting dice: ${ele.value}`);
        parseDice(ele.value);
        ele.value = "";
    }
}

function quickRoll(ele) {
    resetDice();
    const roll = ele.value;
    parseDice(roll);
}

function loadQuickRolls() {
    // Load quick rolls from local storage into #quick-roll selector
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        // Create new option element
        newOption = document.createElement("option");
        newOption.textContent = key;
        newOption.value = value;
        $("#quick-roll").append(newOption);
    }
}

function saveQuickRoll() {
    // Get roll from status and prompt name to save in local storage
    const roll = $("#status").text().split("=")[0].replace(" ", "");
    const name = prompt("Enter name for quick roll:");
    if (name) {
        // Save roll in local storage
        localStorage.setItem(name, roll);

        // Create new option element
        newOption = document.createElement("option");
        newOption.textContent = name;
        newOption.value = roll;
        $("#quick-roll").append(newOption);
    }
}