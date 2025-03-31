

    let index = 0;
    const slides = document.querySelectorAll('.slide');

    function showSlide(i) {
        slides[index].classList.remove('active');
        index = (i + slides.length) % slides.length;
        slides[index].classList.add('active'); 
        document.querySelector('.slider').style.transform = `translateX(${-index * 100}vw)`;
    }

    function nextSlide() {
        showSlide(index + 1);
    }

    function prevSlide() {
        showSlide(index - 1);
    }

    setInterval(nextSlide, 6000); // Auto-slide every 4 seconds



    const quizData = [
    {
        question: "Which magical creature would you bring to a library?",
        answers: [
            { text: "🦉 Wise Owl", tag: "classic" },
            { text: "🐉 Fierce Dragon", tag: "fantasy" }
        ]
    },
    
];

document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".quiz-step");
    const progressBar = document.querySelector(".progress-bar");
    let currentStepIndex = 0;

    document.querySelectorAll(".option-btn").forEach(button => {
        button.addEventListener("click", function () {
            let currentStep = steps[currentStepIndex];
            let nextStep = steps[currentStepIndex + 1];

            if (nextStep) {
                // Flip current step like turning a book page
                currentStep.classList.add("flipping");

                setTimeout(() => {
                    currentStep.classList.remove("active", "flipping"); 
                    nextStep.classList.add("active");

                    // Update progress bar
                    currentStepIndex++;
                    let progress = ((currentStepIndex + 1) / steps.length) * 100;
                    progressBar.style.width = progress + "%";
                }, 800); // Matches animation duration
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".quiz-step"); // All questions
    const progressBar = document.querySelector(".progress-bar"); // Progress bar element
    let currentStepIndex = 0; // Track current step

    document.querySelectorAll(".option-btn").forEach(button => {
        button.addEventListener("click", function () {
            let currentStep = steps[currentStepIndex];
            let nextStep = steps[currentStepIndex + 1];

            if (nextStep) {
                // Hide current step
                currentStep.style.transform = "rotateY(180deg)";
                currentStep.style.opacity = "0";

                setTimeout(() => {
                    currentStep.classList.remove("active"); 
                    nextStep.classList.add("active");

                    // Reset rotation for the next step
                    nextStep.style.transform = "rotateY(180deg)"; 
                    setTimeout(() => {
                        nextStep.style.transform = "rotateY(0)";
                        nextStep.style.opacity = "1";
                    }, 50);

                    // Update progress bar
                    currentStepIndex++;
                    let progress = ((currentStepIndex + 1) / steps.length) * 100;
                    progressBar.style.width = progress + "%";
                }, 600); // Delay matches transition time
            }
        });
    });
});




document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".quiz-step");
    const progressBar = document.querySelector(".progress-bar");
    const resultContainer = document.querySelector(".quiz-result");
    const overlay = document.createElement("div"); // Creates a dark overlay
    overlay.classList.add("quiz-overlay");
    const cancelButton = document.getElementById('CANCEL');

    document.body.appendChild(overlay);

    let currentStepIndex = 0;
    let answerCounts = { A: 0, B: 0, C: 0, D: 0, E: 0,F:0 }; // Track answer selection

    const results = {
        A: {
            title: "The Bookworm",
            description: "You devour books constantly and love a well-organized reading experience."
        },
        B: {
            title: "The Casual Reader",
            description: "You enjoy books at your own pace and read whenever the mood strikes."
        },
        C: {
            title: "The Genre Explorer",
            description: " You have favorite genres and stick to them, but you’re always looking for the next adventure."
        },
        D: {
            title: "The Emotional Reader",
            description: "You connect deeply with stories, cherishing the feelings they evoke."
        },
        E: {
            title: "The Knowledge Seeker",
            description: "You read to expand your understanding of the world and prefer thought-provoking books."
        },
        F: {
            title: "The Adventurous Reader",
            description: "You love surprises, experimental writing, and discovering hidden literary gems."
        }
    };

    document.querySelectorAll(".option-btn").forEach(button => {
        button.addEventListener("click", function () {
            let answerType = this.getAttribute("data-answer"); // Example: "A", "B", "C"
            if (answerType) {
                answerCounts[answerType]++; // Track selected answers
            }

            let currentStep = steps[currentStepIndex];
            let nextStep = steps[currentStepIndex + 1];

            if (nextStep) {
                currentStep.classList.add("flipping");
                setTimeout(() => {
                    currentStep.classList.remove("active");
                    nextStep.classList.add("active");

                    currentStepIndex++;
                    let progress = ((currentStepIndex + 1) / steps.length) * 100;
                    progressBar.style.width = progress + "%";
                }, 800);
            } else {
                showPersonalityResult();
            }
        });

        cancelButton.addEventListener("click", function() {
       
        steps[currentStepIndex].classList.remove("active");  
        currentStepIndex = 0; 
        steps[currentStepIndex].classList.add("active");  

        
        progressBar.style.width = "0%";

        
        

        
        answerCounts = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
    });

    
    


    });


    function typeMessage(text, elementId) {
        console.log("typeMessage called with:", text, elementId); // Debugging line
        let index = 0;
        const element = document.getElementById(elementId);
    
        if (!element) {
            console.error(`Element with ID "${elementId}" not found.`);
            return;
        }
    
        element.innerHTML = ""; // Clear previous text
    
        function type() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, 50); // Speed of typing effect
            }
        }
    
        type();
    }

    function showPersonalityResult() {
    let highestType = Object.keys(answerCounts).reduce((a, b) => answerCounts[a] > answerCounts[b] ? a : b);
    let result = results[highestType];

    document.getElementById('resultType').textContent = result.title;
    document.getElementById('resultDescription').textContent = result.description;

    // Show result
    setTimeout(() => {
        overlay.classList.add("show");
        resultContainer.classList.add("show");
    }, 800);

    // Set Sorting Hat messages based on personality
    const sortingHatMessages = {
        A: "Ahh... A true seeker of knowledge, are you?",
        B: "A curious mind, but one that enjoys its own rhythm...",
        C: "A wanderer of genres, forever in search of adventure...",
        D: "Your heart beats with the stories that move souls...",
        E: "Wisdom and curiosity blend in your book choices...",
        F: "Ah! A daring reader, unafraid to embrace the unknown..."
    };

    document.getElementById('seeRecommendations').addEventListener('click', function () {
        const sortingHatSection = document.getElementById('sortingHatSection');
        if (sortingHatSection) {
            sortingHatSection.style.display = 'block';
            sortingHatSection.scrollIntoView({ behavior: "smooth" });


            console.log("highestType:", highestType);
console.log("Message:", sortingHatMessages[highestType]);



            // Make the Sorting Hat "talk"
            typeMessage(sortingHatMessages[highestType], "hatQuestion");
        }
    });
}
resultContainer.classList.remove("show");
    });



    document.addEventListener("DOMContentLoaded", function () {
        const steps = document.querySelectorAll(".quiz-step");
        const progressBar = document.querySelector(".progress-bar");
        const resultContainer = document.querySelector(".quiz-result");
        const overlay = document.createElement("div"); // Dark overlay
        overlay.classList.add("quiz-overlay");
        document.body.appendChild(overlay);
    
        const cancelButton = document.getElementById("CANCEL");
        const showMagicBooksButton = document.getElementById("seeRecommendations");
        const goBackButton = document.getElementById("goBack");
    
        let currentStepIndex = 0;
        let answerCounts = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
    
        const results = {
            A: { title: "The Bookworm", description: "You devour books constantly and love a well-organized reading experience." },
            B: { title: "The Casual Reader", description: "You enjoy books at your own pace and read whenever the mood strikes." },
            C: { title: "The Genre Explorer", description: "You have favorite genres and stick to them, but you’re always looking for the next adventure." },
            D: { title: "The Emotional Reader", description: "You connect deeply with stories, cherishing the feelings they evoke." },
            E: { title: "The Knowledge Seeker", description: "You read to expand your understanding of the world and prefer thought-provoking books." },
            F: { title: "The Adventurous Reader", description: "You love surprises, experimental writing, and discovering hidden literary gems." }
        };
    
        // Handle quiz button clicks
        document.querySelectorAll(".option-btn").forEach(button => {
            button.addEventListener("click", function () {
                let answerType = this.getAttribute("data-answer");
                if (answerType) answerCounts[answerType]++;
    
                let currentStep = steps[currentStepIndex];
                let nextStep = steps[currentStepIndex + 1];
    
                if (nextStep) {
                    currentStep.classList.add("flipping");
                    setTimeout(() => {
                        currentStep.classList.remove("active");
                        nextStep.classList.add("active");
    
                        currentStepIndex++;
                        progressBar.style.width = ((currentStepIndex + 1) / steps.length) * 100 + "%";
                    }, 800);
                } else {
                    showPersonalityResult();
                }
            });
        });



        
    
        // Function to show result
        function showPersonalityResult() {
            let highestType = Object.keys(answerCounts).reduce((a, b) => answerCounts[a] > answerCounts[b] ? a : b);
            let result = results[highestType];
    
            document.getElementById("resultType").textContent = result.title;
            document.getElementById("resultDescription").textContent = result.description;
    
            setTimeout(() => {
                overlay.classList.add("show");
                resultContainer.classList.add("show");
            }, 800);
        }
    
        // Cancel button resets quiz
        cancelButton.addEventListener("click", function () {
            steps[currentStepIndex].classList.remove("active");
            currentStepIndex = 0;
            steps[currentStepIndex].classList.add("active");
            progressBar.style.width = "0%";
            answerCounts = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
        });
    
        // Typing effect function
     
        console.log(document.getElementById("resultType"));
        console.log(personality)
        alert("Personality detected: " + personality);
        alert("Message found: " + (personalityData[personality]?.message || "Not found"));
    
        // Book recommendation section
        const sortingHatSection = document.getElementById("sortingHatSection");
        const sortingMessage = document.getElementById("sortingMessage");
        const bookList = document.getElementById("bookRecommendations");
    
        const personalityData = {
            "The Bookworm": { message: "Ah, a seeker of knowledge! I foresee endless shelves calling your name...", books: [{ title: "War and Peace", image: "war_and_peace.jpg" }, { title: "Crime and Punishment", image: "crime_and_punishment.jpg" }, { title: "The Brothers Karamazov", image: "brothers_karamazov.jpg" }, { title: "Moby Dick", image: "moby_dick.jpg" }, { title: "Ulysses", image: "ulysses.jpg" }] },
            "The Casual Reader": { message: "Books are like old friends, and you enjoy meeting them at your own pace...", books: [{ title: "The Alchemist", image: "alchemist.jpg" }, { title: "Pride and Prejudice", image: "pride_and_prejudice.jpg" }, { title: "The Rosie Project", image: "rosie_project.jpg" }, { title: "Norwegian Wood", image: "norwegian_wood.jpg" }, { title: "The Perks of Being a Wallflower", image: "perks_wallflower.jpg" }] },
            "The Genre Explorer": { message: "You traverse worlds, seeking adventures, mysteries, and tales untold!", books: [{ title: "The Way of Kings", image: "way_of_kings.jpg" }, { title: "Dune", image: "dune.jpg" }, { title: "The Name of the Wind", image: "name_of_wind.jpg" }, { title: "The Hobbit", image: "hobbit.jpg" }, { title: "The Lies of Locke Lamora", image: "locke_lamora.jpg" }] },
            "The Emotional Reader": { message: "Stories that touch the soul are your treasures...", books: [{ title: "The Book Thief", image: "book_thief.jpg" }, { title: "A Man Called Ove", image: "man_called_ove.jpg" }, { title: "Me Before You", image: "me_before_you.jpg" }, { title: "The Nightingale", image: "nightingale.jpg" }, { title: "Where the Crawdads Sing", image: "crawdads_sing.jpg" }] },
            "The Knowledge Seeker": { message: "You crave wisdom and deep thoughts that challenge your mind...", books: [{ title: "Sapiens", image: "sapiens.jpg" }, { title: "Meditations", image: "meditations.jpg" }, { title: "Thus Spoke Zarathustra", image: "zarathustra.jpg" }, { title: "The Little Prince", image: "little_prince.jpg" }, { title: "A Brief History of Time", image: "brief_history_time.jpg" }] },
            "The Adventurous Reader": { message: "Twists, turns, and unpredictable tales excite your soul!", books: [{ title: "Gone Girl", image: "gone_girl.jpg" }, { title: "The Girl with the Dragon Tattoo", image: "dragon_tattoo.jpg" }, { title: "The Silent Patient", image: "silent_patient.jpg" }, { title: "The Da Vinci Code", image: "da_vinci_code.jpg" }, { title: "Shutter Island", image: "shutter_island.jpg" }] }
        };
    
        // Show book recommendations
        showMagicBooksButton.addEventListener("click", function () {
            resultContainer.classList.remove("show");
            sortingHatSection.style.display = "block";
            sortingHatSection.scrollIntoView({ behavior: "smooth" });
    
            let personality = document.getElementById("resultType").textContent;
            typeMessage(personalityData[personality].message, "sortingMessage");
    
            bookList.innerHTML = "";
            personalityData[personality].books.forEach(book => {
                const bookCard = document.createElement("div");
                bookCard.classList.add("book-card");
                bookCard.innerHTML = `<img src="images/${book.image}" alt="${book.title}"><p>${book.title}</p>`;
                bookList.appendChild(bookCard);
            });
        });
    
        // Go back button
        goBackButton.addEventListener("click", () => sortingHatSection.style.display = "none");
    });
    









