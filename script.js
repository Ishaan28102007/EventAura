console.log("EventAura JavaScript Connected Successfully!");

// Contact Form Submission
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const messageData = {
            name: document.getElementById("contactName").value,
            email: document.getElementById("contactEmail").value,
            subject: document.getElementById("contactSubject").value,
            message: document.getElementById("contactMessage").value
        };

        try {
            const response = await fetch("/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(messageData)
            });

            const result = await response.json();

            if (result.success) {
                document.getElementById("contactResponse").textContent =
                    "Message sent successfully!";

                contactForm.reset();
            } else {
                throw new Error("Submission failed");
            }

        } catch (error) {
            document.getElementById("contactResponse").textContent =
                "Something went wrong. Please try again.";
        }
    });
}


// Booking Form Submission
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        console.log("Booking form submit triggered");

        const bookingData = {
            name: document.getElementById("bookingName").value,
            phone: document.getElementById("bookingPhone").value,
            email: document.getElementById("bookingEmail").value,
            eventType: document.getElementById("eventType").value,
            eventDate: document.getElementById("eventDate").value,
            guests: "",
            eventDetails: document.getElementById("eventDetails").value
        };

        try {
            console.log("booking form submit triggered");
            const response = await fetch("https://eventaura-backend-eg9t.onrender.com/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookingData)
            });

            if (response.ok) {
                document.getElementById("bookingResponse").textContent =
                    "Booking submitted successfully!";

                bookingForm.reset();
            } else {
                throw new Error("Booking submission failed");
            }

        } catch (error) {
            document.getElementById("bookingResponse").textContent =
                "Something went wrong. Please try again.";
        }
    });
}