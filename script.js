

    let index = 0;
    const slides = document.querySelectorAll('.slide');

    function showSlide(i) {
        slides[index].classList.remove('active');
        index = (i + slides.length) % slides.length;
        slides[index].classList.add('active'); 
        document.querySelector('.slider').style.transform = `translateX(${-index * 100}vw)`;
    }


    document.addEventListener('DOMContentLoaded', function() {
        
        const cards = document.querySelectorAll('.genre-card');
        
        cards.forEach(card => {
          card.addEventListener('click', () => {
            const genre = card.dataset.genre;
            window.location.href = `Books.html?genre=${encodeURIComponent(genre)}`;
          });
        });
      });

      
    function nextSlide() {
        showSlide(index + 1);
    }

    function prevSlide() {
        showSlide(index - 1);
    }

    setInterval(nextSlide, 6000); // Auto-slide every 4 seconds



    

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
                }, 800);
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
document.addEventListener("DOMContentLoaded", function() {
    // ========== DOM ELEMENTS ==========
    const steps = document.querySelectorAll(".quiz-step");
    const progressBar = document.querySelector(".progress-bar");
    const resultContainer = document.querySelector(".quiz-result");
    const overlay = document.createElement("div");
    overlay.classList.add("quiz-overlay");
    document.body.appendChild(overlay);

    // Buttons
    const cancelButton = document.getElementById('CANCEL');
    const seeRecommendationsBtn = document.getElementById('seeRecommendations');
    const revealBooksBtn = document.getElementById('revealBooks');
    const goBackButton = document.getElementById('goBack');

    // Sorting Hat Section
    const sortingHatSection = document.getElementById('sortingHatSection');
    const hatQuestionElement = document.getElementById('hatQuestion');
    const bookRecommendations = document.getElementById('bookRecommendations');
    const bookList = document.getElementById('bookList');

    // ========== QUIZ STATE ==========
    let currentStepIndex = 0;
    let answerCounts = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };

    // ========== PERSONALITY DATA ==========
    const results = {
        A: {
            title: "Bookworm",
            description: "You devour books constantly and love a well-organized reading experience.",
            hatMessage: "Ahh... A true seeker of knowledge, are you?",
            books: [
                { title: "War and Peace", image: "/images2/war_and_peace.jpg" },
                { title: "Crime and Punishment", image: "/images2/crime_and_punishment.jpg" },
                { title: "The Brothers Karamazov", image: "/images2/brothers_karamazov.jpg" },
                { title: "Moby Dick", image: "/images2/moby_dick.webp" },
                { title: "Ulysses", image: "/images2/ulysses.jpg" }
            ]
        },
        B: {
            title: "Casual Reader",
            description: "You enjoy books at your own pace and read whenever the mood strikes.",
            hatMessage: "A curious mind, but one that enjoys its own rhythm...",
            books: [
                { title: "The Alchemist", image: "/images2/alchemist.jpg" },
                { title: "Pride and Prejudice", image: "/images2/pride_and_prejudice.jpg" },
                { title: "The Rosie Project", image: "/images2/rosie_project.jpg" },
                { title: "Norwegian Wood", image: "/images2/norwegian_wood.jpg" },
                { title: "The Perks of Being a Wallflower", image: "/images2/perks_wallflower.jpg" }
            ]
        },



        C: {
            title: "Genre Explorer",
            description: "You have favorite genres and stick to them, but you're always looking for the next adventure.",
            hatMessage: "A wanderer of genres, forever in search of adventure...",
            books: [
                { title: "The Way of Kings", image: "images2/way_of_kings.jpg" },
                { title: "Dune", image: "images2/dune.jpg" },
                { title: "The Name of the Wind", image: "images2/name_of_wind.jpg" },
                { title: "The Hobbit", image: "images2/hobbit.jpg" },
                { title: "The Lies of Locke Lamora", image: "images2/locke_lamora.jpg" }
            ]
        },
        D: {
            title: "Emotional Reader",
            description: "You connect deeply with stories, cherishing the feelings they evoke.",
            hatMessage: "Your heart beats with the stories that move souls...",
            books: [
                { title: "The Book Thief", image: "images2/book_thief.webp" },
                { title: "A Man Called Ove", image: "images2/man_called_ove.jpg" },
                { title: "Me Before You", image: "images2/me_before_you.webp" },
                { title: "The Nightingale", image: "images2/nightingale.jpg" },
                { title: "Where the Crawdads Sing", image: "images2/crawdads_sing.jpg" }
            ]
        },
        E: {
            title: "Knowledge Seeker",
            description: "You read to expand your understanding of the world and prefer thought-provoking books.",
            hatMessage: "Wisdom and curiosity blend in your book choices...",
            books: [
                { title: "Sapiens", image: "images2/sapiens.jpg" },
                { title: "Meditations", image: "images2/meditations.jpg" },
                { title: "Thus Spoke Zarathustra", image: "images2/zarathustra.jpg" },
                { title: "The Little Prince", image: "images2/little_prince.jpg" },
                { title: "A Brief History of Time", image: "images2/brief_history_time.jpg" }
            ]
        },
        F: {
            title: "Adventurous Reader",
            description: "You love surprises, experimental writing, and discovering hidden literary gems.",
            hatMessage: "Ah! A daring reader, unafraid to embrace the unknown...",
            books: [
                { title: "Gone Girl", image: "images2/gone_girl.jpg" },
                { title: "The Girl with the Dragon Tattoo", image: "images2/dragon_tattoo.jpg" },
                { title: "The Silent Patient", image: "images2/silent_patient.jpg" },
                { title: "The Da Vinci Code", image: "images2/da_vinci_code.jpg" },
                { title: "Shutter Island", image: "images2/shutter_island.jpg" }
            ]
        }
        
    };

    // ========== CORE FUNCTIONS ==========
    function typeMessage(text, elementId, callback) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element with ID "${elementId}" not found`);
            return;
        }

        element.innerHTML = "";
        let index = 0;

        function type() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, 50);
            } else if (callback) {
                callback();
            }
        }

        type();
    }

    function showPersonalityResult() {
        const highestType = Object.keys(answerCounts).reduce((a, b) => 
            answerCounts[a] > answerCounts[b] ? a : b
        );
        const result = results[highestType];

        document.getElementById('resultType').textContent = result.title;
        document.getElementById('resultDescription').textContent = result.description;

        setTimeout(() => {
            overlay.classList.add("show");
            resultContainer.classList.add("show");
        }, 800);
    }

    function showBookRecommendations() {
        const personalityTitle = document.getElementById('resultType').textContent;
        const personality = Object.keys(results).find(key => results[key].title === personalityTitle);
        const result = results[personality];

        // Hide result and show sorting hat
        resultContainer.classList.remove("show");
        sortingHatSection.style.display = "block";
        sortingHatSection.scrollIntoView({ behavior: "smooth" });


        console.log(result.hatMessage)

        // Type the message then show reveal button
        typeMessage(result.hatMessage, "hatQuestion", () => {
            revealBooksBtn.style.display = "block";
        });
    }

    document.getElementById("revealBooks").addEventListener("click", function () {
        document.getElementById("sortingHatSection").style.display = "none"; // Hide sorting hat section
        document.getElementById("bookRecommendations").style.display = "block"; // Show book list
        displayBooks(); // Load books
    });
    
    function displayBooks() {
        const personalityTitle = document.getElementById('resultType').textContent;
        const personality = Object.keys(results).find(key => results[key].title === personalityTitle);
        const result = results[personality];
    
        bookList.innerHTML = result.books.map(book => `
            <div class="col-6 col-md-4 col-lg-2 d-flex justify-content-center">
                <div class="card book-card">
                    <img src="${book.image}" alt="${book.title}" class="book-cover">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                    </div>
                </div>
            </div>
        `).join("");
    }
    
    
    
    

    // ========== EVENT LISTENERS ==========
    // Option buttons
    document.querySelectorAll(".option-btn").forEach(button => {
        button.addEventListener("click", function() {
            const answerType = this.getAttribute("data-answer");
            if (answerType) answerCounts[answerType]++;

            const currentStep = steps[currentStepIndex];
            const nextStep = steps[currentStepIndex + 1];

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

    // Cancel button
    cancelButton.addEventListener("click", function() {
        steps[currentStepIndex].classList.remove("active");
        currentStepIndex = 0;
        steps[currentStepIndex].classList.add("active");
        progressBar.style.width = "0%";
        answerCounts = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
        overlay.classList.remove("show");
        resultContainer.classList.remove("show");
        sortingHatSection.style.display = "none";
        bookRecommendations.style.display = "none";
        revealBooksBtn.style.display = "none";
    });

    // See recommendations button
    seeRecommendationsBtn.addEventListener("click", showBookRecommendations);

    // Reveal books button
    revealBooksBtn.addEventListener("click", displayBooks);

    // Go back button
    goBackButton.addEventListener("click", function() {
        sortingHatSection.style.display = "none";
        overlay.classList.add("show");
        resultContainer.classList.add("show");
        bookRecommendations.style.display = "none";
        revealBooksBtn.style.display = "none";
    });
});