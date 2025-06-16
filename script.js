let slideIndex = 0;
let slides = document.getElementsByClassName("slide");

function showSlides(n) {
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex].style.display = "block";
}

// Change slide manually
function changeSlide(n) {
    slideIndex += n;
    showSlides(slideIndex);
}

// Auto-slide every 3 seconds
function autoSlide() {
    slideIndex++;
    showSlides(slideIndex);
    setTimeout(autoSlide, 3000);
}

// Start slideshow on load
document.addEventListener("DOMContentLoaded", function () {
    showSlides(slideIndex);
    setTimeout(autoSlide, 3000);
});




// Get movie name from URL and display it
function getMovieName() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieName = urlParams.get('movie');
    document.getElementById('movie-title').textContent = `Book Tickets for ${movieName}`;
}

// Generate seat layout
function generateSeats() {
    const seatContainer = document.querySelector('.seats');
    seatContainer.innerHTML = ''; // Clear previous seats

    for (let row = 1; row <= 5; row++) {
        for (let col = 1; col <= 10; col++) {
            const seat = document.createElement('button');
            seat.classList.add('seat');
            seat.textContent = `${row}${String.fromCharCode(64 + col)}`; // A1, A2, etc.
            seat.onclick = function() {
                this.classList.toggle('selected');
            };
            seatContainer.appendChild(seat);
        }
        seatContainer.appendChild(document.createElement('br'));
    }
}

// Handle Confirm Booking Click
document.addEventListener("DOMContentLoaded", () => {
    getMovieName();
    generateSeats();

    document.getElementById('confirm-booking').onclick = function() {
        alert("Booking Confirmed!");
    };
});

function bookTicket(movieName) {
    // Redirect to booking page with movie name as a URL parameter
    window.location.href = `booking.html?movie=${encodeURIComponent(movieName)}`;
}
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");

loginForm.addEventListener("submit", function (e) {
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
        emailError.textContent = "❌ Invalid email address. Please enter a valid email.";
        e.preventDefault(); // Prevent form submission
    } else {
        emailError.textContent = ""; // Clear the error
    }
});
const seatsContainer = document.getElementById('seats-container');
const rows = ['A', 'B', 'C', 'D', 'E'];
const cols = 8;
const seatPrice = 150;
let bookedSeats = [];

rows.forEach(row => {
  for (let col = 1; col <= cols; col++) {
    const seat = document.createElement('button');
    seat.classList.add('seat');
    seat.textContent = `${row}${col}`;
    seat.addEventListener('click', () => toggleSeat(seat));
    seatsContainer.appendChild(seat);
  }
});

function toggleSeat(seat) {
  if (seat.classList.contains('booked')) return;
  seat.classList.toggle('selected');
}

document.getElementById('confirm-booking').addEventListener('click', () => {
  const selectedSeats = document.querySelectorAll('.seat.selected');
  if (selectedSeats.length === 0) {
    alert('Please select at least one seat.');
    return;
  }

  selectedSeats.forEach(seat => {
    seat.classList.remove('selected');
    seat.classList.add('booked');
    seat.disabled = true;
    bookedSeats.push(seat.textContent);
  });

  const totalAmount = selectedSeats.length * seatPrice;

  document.getElementById('status').innerHTML = `
    <h3>🎟️ Booking Confirmed!</h3>
    <p><strong>Hall:</strong> ${document.getElementById('cinema-hall').value}</p>
    <p><strong>Time Slot:</strong> ${document.getElementById('time-slot').value}</p>
    <p><strong>Seats:</strong> ${bookedSeats.join(', ')}</p>
    <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
  `;
});

