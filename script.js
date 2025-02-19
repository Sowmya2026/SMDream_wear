document.addEventListener("DOMContentLoaded", function () {
    const feedbackForm = document.getElementById("feedback-form");
    const reviewsContainer = document.getElementById("reviews-container");

    feedbackForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const feedback = document.getElementById("feedback").value;
        const rating = document.getElementById("rating").value;

        const reviewCard = document.createElement("div");
        reviewCard.classList.add("review");
        reviewCard.innerHTML = `<strong>${name}</strong><div class="stars">${rating}</div><p>"${feedback}"</p>`;

        reviewsContainer.appendChild(reviewCard);
        duplicateReviews(); // Ensure continuous effect
        feedbackForm.reset();
    });

    function duplicateReviews() {
        // Duplicate reviews for infinite scrolling effect
        const originalReviews = [...reviewsContainer.children];
        originalReviews.forEach((review) => {
            const clone = review.cloneNode(true);
            reviewsContainer.appendChild(clone);
        });
    }

    function startAutoScroll() {
        let scrollAmount = 0;
        const scrollSpeed = 0.2; // Lower value = slower scrolling
        const maxScroll = reviewsContainer.scrollWidth / 2;

        function scroll() {
            scrollAmount += scrollSpeed;
            if (scrollAmount >= maxScroll) {
                scrollAmount = 0; // Reset to create an infinite loop effect
            }
            reviewsContainer.style.transform = `translateX(-${scrollAmount}px)`;
            requestAnimationFrame(scroll);
        }

        duplicateReviews(); // Ensure smooth looping
        scroll();
    }

    startAutoScroll();
});
