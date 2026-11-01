const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files
app.use(express.static(__dirname));

// Receive contact form messages
app.post("/contact", (req, res) => {
    const message = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
        date: new Date().toISOString()
    };

    const filePath = path.join(__dirname, "data", "messages.json");

    let messages = [];

    if (fs.existsSync(filePath)) {
        messages = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    messages.push(message);

    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

    res.json({ success: true, message: "Message saved successfully!" });
});


// Receive booking form data
app.post("/bookings", (req, res) => {

    const booking = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        eventType: req.body.eventType,
        eventDate: req.body.eventDate,
        guests: req.body.guests,
        eventDetails: req.body.eventDetails
    };

   console.log("New Booking Received:");
console.log(booking);

// Save booking to JSON file
const filePath = path.join(__dirname, "data", "bookings.json");
const dataDir = path.join(__dirname, "data");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]");
}
let bookings = [];

if (fs.existsSync(filePath)) {
    bookings = JSON.parse(fs.readFileSync(filePath, "utf8"));
}

bookings.push(booking);

fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2));

    res.send(`
        <h1>Booking Submitted Successfully!</h1>
        <p>Thank you, ${booking.name}!</p>
        <p>We have received your booking request.</p>
        <a href="/">Return to EventAura</a>
    `);
});

// Get all bookings
app.get("/api/bookings", (req, res) => {
    const filePath = path.join(__dirname, "data", "bookings.json");

    const bookings = JSON.parse(
        fs.readFileSync(filePath, "utf8")
    );

    res.json(bookings);
});

// Delete a booking
app.delete("/api/bookings/:index", (req, res) => {
    const filePath = path.join(__dirname, "data", "bookings.json");

    let bookings = JSON.parse(
        fs.readFileSync(filePath, "utf8")
    );

    const index = Number(req.params.index);

    if (!Number.isInteger(index) || index < 0 || index >= bookings.length) {
        return res.status(404).json({ message: "Booking not found" });
    }

    bookings.splice(index, 1);

    fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2));

    res.json({ message: "Booking deleted successfully" });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});