const tasks = [
    { question: "Lust auf Sport haben", answer: "darauf" },
    { question: "sich für Geschichte interessieren", answer: "dafür" },
    { question: "gern über Mode sprechen", answer: "darüber" },
    { question: "auch auf den Sommer warten", answer: "darauf" },
    { question: "sich auf den Geburtstag freuen", answer: "darauf" },
    { question: "gern über Fußball sprechen", answer: "darüber" },
    { question: "mit der Wohnung zufrieden sein", answer: "damit" },
    { question: "jeden Tag an dein Land denken", answer: "daran" },
    { question: "sich noch an den ersten Schultag erinnern", answer: "daran" },
    { question: "sich heute um das Abendessen kümmern", answer: "darum" },
    { question: "sich über den schlechten Service beschweren", answer: "darüber" },
    { question: "sich über schlechte Filme im Fernsehen ärgern", answer: "darüber" },
    { question: "manchmal von dem Test träumen", answer: "davon" },
    { question: "oft lange auf den Bus warten", answer: "darauf" },
    { question: "Lust auf eine Zigarette haben", answer: "darauf" },
    { question: "sich für Computerspiele interessieren", answer: "dafür" },
    { question: "sich über laute Musik ärgern", answer: "darüber" },
    { question: "von einem großen Haus mit Garten träumen", answer: "davon" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        // card.addEventListener("click", () => {
        //     if (!card.classList.contains("flipped")) {
        //         card.classList.add("flipped");
        //     }
        // });


        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });


        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Prevent card flip
            card.classList.add("fade-out"); // fades out a card when you click the "checked" sign

            // Wait for the transition to finish before removing
            setTimeout(() => {
                card.remove();
                checkEnd();
            }, 600); // Match the CSS transition duration
        };


        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}



// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);

// layout toggling logic

const toggleBtn = document.getElementById("toggleLayoutBtn");
let isStacked = false;

toggleBtn.addEventListener("click", () => {
    isStacked = !isStacked;
    container.classList.toggle("stack-mode", isStacked);
    container.classList.toggle("grid-mode", !isStacked);
});
