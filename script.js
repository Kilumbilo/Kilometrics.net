
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

// --- Tab Switching ---
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  // NOTE: We assume the container ID in HTML is 'calculator-widget-home'
  const container = document.getElementById("calculator-widget-home");
  
  // 1. Lock current height
  if (container) {
      container.style.height = container.offsetHeight + "px";
  }

  // 2. Hide all tab content
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // 3. Deactivate buttons
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // 4. Show new tab
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
      selectedTab.style.display = "block";
  }
  
  // 5. Activate button
  if (evt && evt.currentTarget) {
    evt.currentTarget.className += " active";
  }

  // 6. Animate Height
  if (container && selectedTab) {
      requestAnimationFrame(() => {
         const tabsHeader = document.querySelector(".tabs-container");
         if (tabsHeader) {
            const newHeight = tabsHeader.offsetHeight + selectedTab.offsetHeight; 
            container.style.height = newHeight + "px";
            
            // Unlock height after transition
            setTimeout(() => {
                container.style.height = "auto";
            }, 300);
         }
      });
  }
}
// --- Densities ---
const densities = {
  Acetal: 1410,
  Aluminium: 2700,
  "Cast Iron": 7200,
  "Mild Steel": 7850,
};

// --- Unit Conversion ---
function getUnitFactor(unit) {
  switch (unit) {
    case "mm": return 0.001;
    case "cm": return 0.01;
    case "m": return 1;
    case "in": return 0.0254;
    case "ft": return 0.3048;
    default: return 1;
  }
}

// --- Tab Switching ---
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  // NOTE: We assume the container ID in HTML is 'calculator-widget-home'
  const container = document.getElementById("calculator-widget-home");
  
  // 1. Lock current height
  if (container) {
      container.style.height = container.offsetHeight + "px";
  }

  // 2. Hide all tab content
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // 3. Deactivate buttons
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // 4. Show new tab
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
      selectedTab.style.display = "block";
  }
  
  // 5. Activate button
  if (evt && evt.currentTarget) {
    evt.currentTarget.className += " active";
  }

  // 6. Animate Height
  if (container && selectedTab) {
      requestAnimationFrame(() => {
         const tabsHeader = document.querySelector(".tabs-container");
         if (tabsHeader) {
            const newHeight = tabsHeader.offsetHeight + selectedTab.offsetHeight; 
            container.style.height = newHeight + "px";
            
            // Unlock height after transition
            setTimeout(() => {
                container.style.height = "auto";
            }, 300);
         }
      });
  }
}

// --- Calculator Logic ---
function calculateMass(tab) {
  if (tab === "flats") {
    // Flats/Sheets
    const material = document.getElementById("material-flats").value;
    const density = densities[material];
    const width = parseFloat(document.getElementById("width-flats").value) || 0;
    const widthUnit = document.getElementById("widthUnit-flats").value;
    const widthM = width * getUnitFactor(widthUnit);

    const depth = parseFloat(document.getElementById("depth-flats").value) || 0;
    const depthUnit = document.getElementById("depthUnit-flats").value;
    const depthM = depth * getUnitFactor(depthUnit);

    const length = parseFloat(document.getElementById("length-flats").value) || 0;
    const lengthUnit = document.getElementById("lengthUnit-flats").value;
    const lengthM = length * getUnitFactor(lengthUnit);

    const volume = widthM * depthM * lengthM;
    setResults("flats", volume, density);
  } else if (tab === "bars") {
    // Solid Bars
    const material = document.getElementById("material-bars").value;
    const density = densities[material];
    const form = document.getElementById("form-bars").value;

    const size = parseFloat(document.getElementById("size-bars").value) || 0;
    const sizeUnit = document.getElementById("sizeUnit-bars").value;
    const sizeM = size * getUnitFactor(sizeUnit);

    const length = parseFloat(document.getElementById("length-bars").value) || 0;
    const lengthUnit = document.getElementById("lengthUnit-bars").value;
    const lengthM = length * getUnitFactor(lengthUnit);

    let volume = 0;
    switch (form) {
      case "Round Bar":
        volume = Math.PI * Math.pow(sizeM / 2, 2) * lengthM;
        break;
      case "Square Bar":
        volume = Math.pow(sizeM, 2) * lengthM;
        break;
      case "Rectangular Bar":
        volume = sizeM * sizeM * lengthM; // Simplified
        break;
      case "Hex Bar":
        volume = ((3 * Math.sqrt(3)) / 2) * Math.pow(sizeM / 2, 2) * lengthM;
        break;
      default:
        volume = sizeM * sizeM * lengthM;
    }
    setResults("bars", volume, density);
  } else if (tab === "sections") {
    // Handled by initCalculator listeners
    document.getElementById("resultKg-sections").textContent = "Select a section to view kg/m";
  }
}

function setResults(tab, volume, density) {
  const massKg = volume * density;
  const massT = massKg / 1000;
  const massLb = massKg * 2.20462;
  
  const elKg = document.getElementById(`resultKg-${tab}`);
  if (elKg) elKg.textContent = isNaN(massKg) ? "-" : massKg.toFixed(3);
  
  const elT = document.getElementById(`resultT-${tab}`);
  if (elT) elT.textContent = isNaN(massT) ? "-" : massT.toFixed(3);
  
  const elLb = document.getElementById(`resultLb-${tab}`);
  if (elLb) elLb.textContent = isNaN(massLb) ? "-" : massLb.toFixed(3);
}

// --- Steel Sections Logic ---
// Dataset embedded directly to allow local usage without CORS issues
const dataset = {
  "IPE AA": {
    "image": "images/ipe-aa.png",
    "designations": [
      { "name": "IPE AA 80", "weight": "4.9" },
      { "name": "IPE AA 100", "weight": "6.7" },
      { "name": "IPE AA 120", "weight": "8.4" }
    ]
  },
  "IPE": {
    "image": "images/ipe.png",
    "designations": [
      { "name": "IPE 80", "weight": "6.0" },
      { "name": "IPE 100", "weight": "8.1" },
      { "name": "IPE 120", "weight": "10.4" }
    ]
  },
  "HE A": {
    "designations": [
      { "name": "HE 100 A", "weight": "16.7" },
      { "name": "HE 120 A", "weight": "19.9" }
    ]
  },
  "HE B": {
    "designations": [
      { "name": "HE 100 B", "weight": "20.4" },
      { "name": "HE 120 B", "weight": "26.7" }
    ]
  }
};

// fetchDataset removed in favor of embedded data


function initCalculator() {
  const shapeSelect = document.getElementById("shape");
  const designationSelect = document.getElementById("designation");
  const imgEl = document.getElementById("shapeImg");
  const resultKg = document.getElementById("resultKg");

  if (!shapeSelect) return; // Exit if element not present (e.g. on pages without calculator)

  // Populate Shape dropdown
  if (dataset && Object.keys(dataset).length > 0) {
      Object.keys(dataset).forEach(shape => {
        const opt = document.createElement("option");
        opt.value = shape;
        opt.textContent = shape;
        shapeSelect.appendChild(opt);
      });
  }

  // When shape changes
  shapeSelect.addEventListener("change", () => {
    const shape = shapeSelect.value;
    designationSelect.innerHTML = '<option value="">-- Select Designation --</option>';
    if (resultKg) resultKg.textContent = "-";
    if (imgEl) imgEl.style.display = "none";

    if (shape && dataset[shape]) {
      // Show image
      if (imgEl && dataset[shape].image) {
          // Fix image path if needed (images/...)
          // Assuming images folder is in root. If we are in about/, we need ../images/
          // We can check if image path starts with images/
          let imgSrc = dataset[shape].image;
          // Simple check for subdirectories
          if (window.location.pathname.includes("/about/") || 
              window.location.pathname.includes("/glossary/") ||
              window.location.pathname.includes("/terms/") ||
              window.location.pathname.includes("/privacy/")) {
              if (!imgSrc.startsWith("../")) imgSrc = "../" + imgSrc;
          }
          imgEl.src = imgSrc;
          imgEl.style.display = "block";
      }

      // Populate designations
      dataset[shape].designations.forEach(d => {
        const opt = document.createElement("option");
        opt.value = d.name;
        opt.textContent = d.name;
        designationSelect.appendChild(opt);
      });
    }
  });

  // When designation changes
  designationSelect.addEventListener("change", () => {
    const shape = shapeSelect.value;
    const designation = designationSelect.value;

    if (shape && designation && dataset[shape]) {
      const selected = dataset[shape].designations.find(d => d.name === designation);
      if (selected && resultKg) {
        resultKg.textContent = selected.weight + " kg/m";
      }
    }
  });
}

// --- Dynamic Year ---
function updateYear() {
    const yearElements = document.querySelectorAll('.year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

// --- Initialization ---
document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Update Year
    updateYear();

    // 2. Initialize Calculator (if present)
    const defaultTab = document.getElementById("defaultOpen");
    if (defaultTab) {
        defaultTab.click(); 
        // Use embedded dataset
        if (Object.keys(dataset).length === 0) {
            // Fallback Init if empty (shouldn't happen with embedded data)
             initCalculator();
        } else {
             initCalculator();
        }
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

// sending form data to Google Script Web App - kilometrics1@gmail.com

document.addEventListener("DOMContentLoaded", function() {
  // Get the form if it exists on the page
  const form = document.getElementById("signup-form");
  if (form) {
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      const email = document.getElementById("signup-email").value;

      fetch("https://script.google.com/macros/s/AKfycbyLNgwxfgm4UrxVZdWaGGZ1jrjP-3_TG48JKjcVDUMrnUjlFJKxKCbnAHafSpYbNhmEtw/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email })
      }).then(() => {
        alert("Thank you! Your email has been saved.");
        form.reset();
      }).catch(err => {
        alert("Error saving your email.");
        console.error(err);
      });
    });
  }
});


// Back to top button functionality
document.getElementById('backToTop').onclick = function() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};