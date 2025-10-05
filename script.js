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
    case "mm":
      return 0.001;
    case "cm":
      return 0.01;
    case "m":
      return 1;
    case "in":
      return 0.0254;
    case "ft":
      return 0.3048;
    default:
      return 1;
  }
}

// --- Tab Switching ---
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Activate first tab on load
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("defaultOpen").click();
});

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

    const length =
      parseFloat(document.getElementById("length-flats").value) || 0;
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

    const length =
      parseFloat(document.getElementById("length-bars").value) || 0;
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
        // For rectangular, treat "size" as width and ask user to use width for both sides or extend UI for two sizes
        volume = sizeM * sizeM * lengthM;
        break;
      case "Hex Bar":
        volume = ((3 * Math.sqrt(3)) / 2) * Math.pow(sizeM / 2, 2) * lengthM;
        break;
      default:
        volume = sizeM * sizeM * lengthM;
    }
    setResults("bars", volume, density);
  } else if (tab === "sections") {
    // Steel Sections (shows only kg/m, assumes user selects a section with known kg/m)
    // You can extend this logic to use a dataset if you wish
    // For now, just show a placeholder or clear output
    document.getElementById("resultKg-sections").textContent =
      "Select a section to view kg/m";
  }
}

function setResults(tab, volume, density) {
  const massKg = volume * density;
  const massT = massKg / 1000;
  const massLb = massKg * 2.20462;
  document.getElementById(`resultKg-${tab}`).textContent = isNaN(massKg)
    ? ""
    : massKg.toFixed(3);
  document.getElementById(`resultT-${tab}`).textContent = isNaN(massT)
    ? ""
    : massT.toFixed(3);
  document.getElementById(`resultLb-${tab}`).textContent = isNaN(massLb)
    ? ""
    : massLb.toFixed(3);
}

// --- Steel Sections Logic ---
let dataset = {};

fetch("dataset.json")
  .then(res => res.json())
  .then(data => {
    dataset = data;
    initCalculator();
    initTables();
  });

// CALCULATOR SETUP
function initCalculator() {
  const shapeSelect = document.getElementById("shape");
  const designationSelect = document.getElementById("designation");
  const imgEl = document.getElementById("shapeImg");
  const resultKg = document.getElementById("resultKg");

  // Populate Shape dropdown
  Object.keys(dataset).forEach(shape => {
    const opt = document.createElement("option");
    opt.value = shape;
    opt.textContent = shape;
    shapeSelect.appendChild(opt);
  });

  // When shape changes
  shapeSelect.addEventListener("change", () => {
    const shape = shapeSelect.value;
    designationSelect.innerHTML = '<option value="">-- Select Designation --</option>';
    resultKg.textContent = "";
    imgEl.style.display = "none";

    if (shape && dataset[shape]) {
      // Show image
      imgEl.src = dataset[shape].image;
      imgEl.style.display = "block";

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

    if (shape && designation) {
      const selected = dataset[shape].designations.find(d => d.name === designation);
      if (selected) {
        resultKg.textContent = selected.weight + " kg/m";
      }
    }
  });
}

// TABLES SETUP
function initTables() {
  const container = document.getElementById("tablesContainer");
  container.innerHTML = ""; // clear first

  Object.keys(dataset).forEach(shape => {
    const section = dataset[shape];

    // Create a table
    const table = document.createElement("table");
    table.border = "1";
    table.style.margin = "20px 0";
    table.style.borderCollapse = "collapse";

    // Add caption
    const caption = document.createElement("caption");
    caption.textContent = shape;
    caption.style.fontWeight = "bold";
    caption.style.marginBottom = "5px";
    table.appendChild(caption);

    // Add header
    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>Designation</th>
        <th>Weight (kg/m)</th>
      </tr>
    `;
    table.appendChild(thead);

    // Add body
    const tbody = document.createElement("tbody");
    section.designations.forEach(d => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${d.name}</td><td>${d.weight}</td>`;
      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    container.appendChild(table);
  });
}