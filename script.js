
// Material density calculator
    const densities = {
        "Acetal": 1410,        // kg/m³
        "Aluminium": 2700,
        "Cast Iron": 7200,
        "Mild Steel": 7850
    };

    function getUnitFactor(unit) {
        switch (unit) {
            case "mm": return 0.001;
            case "cm": return 0.01;
            case "m":  return 1;
            case "in": return 0.0254;
            case "ft": return 0.3048;
            default:   return 1;
        }
    }

    function calculateMass() {
// Get material and density
const material = document.getElementById("material").value;
const density = densities[material];

// Get form
const form = document.getElementById("form").value;

// Get all inputs and units
const width = parseFloat(document.getElementById("width").value) || 0;
const widthUnit = document.getElementById("width").nextElementSibling.value;
const widthM = width * getUnitFactor(widthUnit);

const depth = parseFloat(document.getElementById("depth").value) || 0;
const depthUnit = document.getElementById("depth").nextElementSibling.value;
const depthM = depth * getUnitFactor(depthUnit);

const length = parseFloat(document.getElementById("length").value) || 0;
const lengthUnit = document.getElementById("length").nextElementSibling.value;
const lengthM = length * getUnitFactor(lengthUnit);

let volume = 0;

// Calculate volume based on form
switch (form) {
    case "Round Bar":
        // width = diameter
        volume = Math.PI * Math.pow(widthM / 2, 2) * lengthM;
        break;
    case "Square Bar":
        volume = Math.pow(widthM, 2) * lengthM;
        break;
    case "Rectangular Bar":
    case "Flat/Sheet":
        volume = widthM * depthM * lengthM;
        break;
    case "Hex Bar":
        // width = flat-to-flat distance
        volume = ((3 * Math.sqrt(3)) / 2) * Math.pow(widthM / 2, 2) * lengthM;
        break;
    default:
        volume = widthM * depthM * lengthM;
}

// Calculate mass
const massKg = volume * density;
const massT = massKg / 1000;
const massLb = massKg * 2.20462;

// Output
document.getElementById("resultKg").textContent = massKg.toFixed(3);
document.getElementById("resultT").textContent = massT.toFixed(3);
document.getElementById("resultLb").textContent = massLb.toFixed(3);
}

// card_header, card_content accordion

var acc = document.getElementsByClassName('card_header');
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        var card_content = this.nextElementSibling;
        if (card_content.style.display === 'flex') {
            card_content.style.display = 'none';
        }else{
            card_content.style.display = 'flex';
        }
    })
}

document.addEventListener("DOMContentLoaded", function () {
    const cardHeaders = document.querySelectorAll('.card_header');
    cardHeaders.forEach(header => {
    header.addEventListener('click', function () {
        const content = this.parentElement.querySelector('.card_content');
        const span = this.querySelector('span');
        const isActive = this.classList.contains('active');

        // Close all other cards
        document.querySelectorAll('.card_header.active').forEach(h => {
        if (h !== this) {
            h.classList.remove('active');
            h.querySelector('span').style.transform = 'none';
            const c = h.parentElement.querySelector('.card_content');
            if (c) c.style.display = 'none';
        }
        });

        if (!isActive) {
        this.classList.add('active');
        if (span) span.style.transform = 'rotate(45deg)';
        if (content) content.style.display = 'flex';
        } else {
        this.classList.remove('active');
        if (span) span.style.transform = 'none';
        if (content) content.style.display = 'none';
        }
    });

    // Keyboard accessibility: rotate on focus/blur
    header.addEventListener('focus', function () {
        if (!this.classList.contains('active')) {
        const span = this.querySelector('span');
        if (span) span.style.transform = 'rotate(45deg)';
        }
    });
    header.addEventListener('blur', function () {
        if (!this.classList.contains('active')) {
        const span = this.querySelector('span');
        if (span) span.style.transform = 'none';
        }
    });
    });
});

// Simple form handler for contact section (no backend, just demo)
document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    document.getElementById('signup-message').textContent = 
        'Thank you for signing up, ' + email + '!';
    this.reset();
});

// sending form data to Google Script Web App

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("signup-form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("signup-email").value;
    
    fetch("https://script.google.com/macros/s/AKfycbw_qaooSjJzruMKoDTgt5YjyVfmNKntSnUmK5jDWtU/dev", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email })
    }).then(() => {
      alert("Thank you! Your email has been saved.");
      form.reset();
    }).catch(err => {
      alert("Error saving your email.");
      console.error(err);
    });
  });
});

// Back to top button functionality
document.getElementById('backToTop').onclick = function() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};