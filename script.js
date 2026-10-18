/* 
   ==================================================================
   FOOD WASTAGE AWARENESS - JAVASCRIPT
   Project for School/College Science & Environmental Studies (EVS)
   Author: Student Project
   ==================================================================
*/

// ================================================================
// 1. Mobile Menu Toggle
// ================================================================
// this opens and closes the mobile navigation menu when tapping the hamburger button
document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", function () {
            navLinks.classList.toggle("show");
        });
    }

    // initialize specific page functions
    setupFactGenerator();
    setupPledgeForm();
    setupChecklist();
    setupQuiz();
});


// ================================================================
// 2. "Did You Know?" Random Fact Generator (Home Page)
// ================================================================
// array of facts from real sources (UNEP, FAO, USDA)
const foodFacts = [
    "Around 1.05 billion tonnes of edible food is wasted globally every year — that is about 19% of all food available to consumers! (UNEP 2024)",
    "If food waste were a country, it would be the third-largest emitter of greenhouse gases in the world, right behind China and the USA! (FAO)",
    "'Best Before' dates are about food quality and freshness, NOT food safety. Most dry or canned foods are completely safe after this date! (USDA)",
    "Roughly 60% of all food wasted at the consumer level happens in ordinary household kitchens, not in grocery stores! (UNEP Food Waste Index)",
    "Wasting just one single apple throws away the equivalent of 125 litres of water needed to grow and transport it! (Water Footprint Network)",
    "Bread is one of the most commonly wasted foods at home. Stale bread can easily be made into crunchy croutons, french toast, or breadcrumbs!",
    "Around 783 million people suffer from chronic hunger worldwide, yet the world wastes more than enough food to feed everyone twice over! (FAO/WFP)",
    "Storing potatoes and onions separately stops them from spoiling each other, because onions release ethylene gas that makes potatoes sprout!"
];

let lastFactIndex = -1;

function setupFactGenerator() {
    const factText = document.getElementById("factDisplay");
    const factBtn = document.getElementById("newFactBtn");

    if (!factText || !factBtn) return;

    // show a random fact on button click
    factBtn.addEventListener("click", function () {
        let randomIndex;
        // make sure we don't pick the same fact twice in a row
        do {
            randomIndex = Math.floor(Math.random() * foodFacts.length);
        } while (randomIndex === lastFactIndex && foodFacts.length > 1);

        lastFactIndex = randomIndex;
        
        // simple text replacement
        factText.textContent = foodFacts[randomIndex];
    });
}


// ================================================================
// 3. "My Pledge" Interactive Form (Home & Solutions)
// ================================================================
// this lets the user pledge to reduce food waste and shows a sincere thank-you message
function setupPledgeForm() {
    const pledgeForm = document.getElementById("pledgeForm");
    const nameInput = document.getElementById("pledgeNameInput");
    const resultBox = document.getElementById("pledgeResult");

    if (!pledgeForm || !nameInput || !resultBox) return;

    // check if user already pledged before in this browser session
    const savedName = localStorage.getItem("studentPledgeName");
    if (savedName) {
        resultBox.style.display = "block";
        resultBox.innerHTML = `🎉 <strong>Welcome back, ${savedName}!</strong> You pledged to waste less food. Keep up the good habit!`;
    }

    pledgeForm.addEventListener("submit", function (e) {
        e.preventDefault(); // stop page refresh

        const enteredName = nameInput.value.trim();

        if (enteredName === "") {
            alert("Please type your name or nickname to make the pledge!");
            nameInput.focus();
            return;
        }

        // save name in localStorage so it remembers
        try {
            localStorage.setItem("studentPledgeName", enteredName);
        } catch (err) {
            console.log("LocalStorage not available:", err);
        }

        // display the thank you card
        resultBox.style.display = "block";
        resultBox.innerHTML = `🌟 <strong>Thank you, ${enteredName}!</strong> You officially pledged to waste less food! Every single grain and leftover counts. Tell your friends and family too!`;

        nameInput.value = "";
    });
}


// ================================================================
// 4. Interactive Food-Saver Checklist (Solutions Page)
// ================================================================
// this tracks which habits the user has checked off and gives friendly encouragement
function setupChecklist() {
    const checklistItems = document.querySelectorAll(".checklist-item input[type='checkbox']");
    const feedbackBox = document.getElementById("checklistFeedback");

    if (!checklistItems.length || !feedbackBox) return;

    function updateChecklistProgress() {
        let checkedCount = 0;
        checklistItems.forEach(function (box) {
            if (box.checked) {
                checkedCount++;
            }
        });

        const totalCount = checklistItems.length;

        if (checkedCount === 0) {
            feedbackBox.textContent = `Tick the habits above that you already do or want to try this week!`;
            feedbackBox.style.backgroundColor = "#faf4e8";
        } else if (checkedCount === totalCount) {
            feedbackBox.innerHTML = `🏆 <strong>Incredible! All ${totalCount} of ${totalCount} habits checked!</strong> You are an official Food-Saving Champion!`;
            feedbackBox.style.backgroundColor = "#d8f3dc";
        } else {
            feedbackBox.innerHTML = `🌱 <strong>Great start!</strong> You've checked <strong>${checkedCount} of ${totalCount}</strong> habits. Every small change makes a difference!`;
            feedbackBox.style.backgroundColor = "#d8f3dc";
        }
    }

    checklistItems.forEach(function (box) {
        box.addEventListener("change", updateChecklistProgress);
    });
}


// ================================================================
// 5. 5-Question Multiple Choice Quiz (Quiz Page)
// ================================================================
// quiz questions, options, and explanations
const quizData = [
    {
        question: "1. Approximately how much edible food is wasted globally every year?",
        options: [
            "Around 10 million tonnes",
            "Around 1.05 billion tonnes",
            "Around 50 million tonnes",
            "Less than 500,000 tonnes"
        ],
        correct: 1,
        explanation: "According to the UNEP Food Waste Index Report (2024), about 1.05 billion tonnes of food is wasted annually — nearly a fifth of all food available to consumers."
    },
    {
        question: "2. What is the real difference between 'Best Before' and 'Use By' dates?",
        options: [
            "'Best Before' is about food safety; 'Use By' is about taste",
            "'Best Before' is about quality/freshness; 'Use By' is about safety",
            "Both dates mean the food turns toxic at midnight",
            "There is no difference; manufacturers pick them randomly"
        ],
        correct: 1,
        explanation: "'Best Before' is a guarantee of peak quality and flavor (food is often safe to eat past this date). 'Use By' is about safety, especially for perishables like dairy and meat."
    },
    {
        question: "3. What powerful greenhouse gas is produced when food rots in an airtight landfill?",
        options: [
            "Oxygen",
            "Methane (CH4)",
            "Helium",
            "Argon"
        ],
        correct: 1,
        explanation: "When food is buried under tons of trash without oxygen, anaerobic bacteria break it down and produce Methane — a greenhouse gas over 25 times more potent than CO2 at trapping heat."
    },
    {
        question: "4. What does the kitchen storage rule 'FIFO' stand for?",
        options: [
            "Fast In, Fast Out",
            "First In, First Out",
            "Freeze It, Forget One",
            "Fresh Ingredients For Others"
        ],
        correct: 1,
        explanation: "'First In, First Out' means moving older groceries to the front of the shelf or fridge so they get eaten before newly bought items!"
    },
    {
        question: "5. Where does the largest share of consumer food waste actually happen?",
        options: [
            "Household kitchens (at home)",
            "School science laboratories",
            "International flights and trains",
            "Convenience store display windows"
        ],
        correct: 0,
        explanation: "UNEP reports that about 60% of all consumer food waste happens right at home in household kitchens! That means our everyday habits have the biggest impact."
    }
];

function setupQuiz() {
    const quizForm = document.getElementById("quizForm");
    const submitBtn = document.getElementById("submitQuizBtn");
    const resetBtn = document.getElementById("resetQuizBtn");
    const scoreCard = document.getElementById("quizScoreCard");

    if (!quizForm || !submitBtn) return;

    // submit and calculate score
    submitBtn.addEventListener("click", function () {
        let score = 0;
        let allAnswered = true;

        // check each question
        quizData.forEach(function (item, index) {
            const selectedOption = quizForm.querySelector(`input[name="q${index}"]:checked`);
            const explanationBlock = document.getElementById(`explanation-${index}`);
            const questionBlock = document.getElementById(`qblock-${index}`);

            if (!selectedOption) {
                allAnswered = false;
            }

            // reset existing classes
            const labels = questionBlock.querySelectorAll(".option-label");
            labels.forEach(function (lbl) {
                lbl.classList.remove("correct-answer", "wrong-answer");
            });

            if (selectedOption) {
                const userChoice = parseInt(selectedOption.value, 10);
                if (userChoice === item.correct) {
                    score++;
                    selectedOption.parentElement.classList.add("correct-answer");
                } else {
                    selectedOption.parentElement.classList.add("wrong-answer");
                    // also highlight which one was actually correct
                    const correctLabel = labels[item.correct];
                    if (correctLabel) {
                        correctLabel.classList.add("correct-answer");
                    }
                }
            } else {
                // if not answered, show correct one anyway
                const correctLabel = labels[item.correct];
                if (correctLabel) {
                    correctLabel.classList.add("correct-answer");
                }
            }

            // show explanation
            if (explanationBlock) {
                explanationBlock.style.display = "block";
            }
        });

        // warn user if they missed some
        if (!allAnswered) {
            alert("You didn't answer all 5 questions, but we graded the ones you picked! Check the answers below.");
        }

        // display the final score
        if (scoreCard) {
            scoreCard.style.display = "block";
            let remark = "";
            if (score === 5) {
                remark = "🏆 Perfect 5/5! You're a certified Food Saver Pro! You really know your stuff.";
            } else if (score >= 3) {
                remark = "🌱 Great job! You scored " + score + "/5. You understand the big issues, check out the Solutions page for extra tips!";
            } else {
                remark = "📚 You scored " + score + "/5. Nice effort! Read through the explanations and the Causes page, then try again!";
            }

            scoreCard.innerHTML = `
                <h3>Your Score: ${score} / 5</h3>
                <p>${remark}</p>
            `;

            // scroll score card into view smoothly
            scoreCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    });

    // reset quiz
    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            quizForm.reset();

            // remove highlights and hide explanations
            quizData.forEach(function (item, index) {
                const questionBlock = document.getElementById(`qblock-${index}`);
                const explanationBlock = document.getElementById(`explanation-${index}`);
                if (questionBlock) {
                    const labels = questionBlock.querySelectorAll(".option-label");
                    labels.forEach(function (lbl) {
                        lbl.classList.remove("correct-answer", "wrong-answer");
                    });
                }
                if (explanationBlock) {
                    explanationBlock.style.display = "none";
                }
            });

            if (scoreCard) {
                scoreCard.style.display = "none";
            }
        });
    }
}
