let allProperties = [];
let currentCurrency = "USD";

const exchangeRates = {
  USD: 1,
  EUR: 0.92,
  AED: 3.67
};

const currencySymbols = {
  USD: "$",
  EUR: "€",
  AED: "AED "
};

// Fetch Mock Data
async function fetchProperties() {
  allProperties = [
    { id:1, title:"Oceanfront Penthouse", location:"Miami Beach, USA", price:28500000, priceDisplay:"$28.5M", type:"us", img:"https://images.unsplash.com/photo-1600585154340-be6161a56a9c", desc:"...", bedrooms:5, bathrooms:6, sqft:"8200" },
    { id:2, title:"Mayfair Mansion", location:"London, UK", price:24500000, priceDisplay:"£18.75M", type:"europe", img:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9", desc:"...", bedrooms:6, bathrooms:7, sqft:"9500" },
    { id:3, title:"Sentosa Cove Villa", location:"Singapore", price:34000000, priceDisplay:"SGD 45M", type:"asia", img:"https://images.unsplash.com/photo-1613490493576-7fde63acd811", desc:"...", bedrooms:7, bathrooms:8, sqft:"12000" },
    { id:4, title:"Jumeirah Palm Villa", location:"Dubai, UAE", price:23100000, priceDisplay:"AED 85M", type:"asia", img:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4", desc:"...", bedrooms:6, bathrooms:7, sqft:"15000" },
    { id:5, title:"Clifftop Estate", location:"Auckland, NZ", price:16800000, priceDisplay:"NZD 28M", type:"asia", img:"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde", desc:"...", bedrooms:8, bathrooms:9, sqft:"14500" }
  ];

  renderFeaturedCarousel();
  renderProperties(allProperties);
  updateLastUpdated();
}

// Currency Conversion
function convertPrice(priceUSD, currency) {
  return (priceUSD * exchangeRates[currency]).toLocaleString('en-US');
}

function getPriceDisplay(priceUSD, currency) {
  const converted = convertPrice(priceUSD, currency);
  return `${currencySymbols[currency]}${converted}`;
}

function changeCurrency() {
  currentCurrency = document.getElementById('currencySelect').value;
  renderProperties(allProperties);   // re-render with new currency
}

// Featured Carousel
function renderFeaturedCarousel() {
  const inner = document.getElementById('carouselInner');
  inner.innerHTML = '';

  allProperties.slice(0, 3).forEach((prop, index) => {
    const active = index === 0 ? 'active' : '';
    inner.innerHTML += `
      <div class="carousel-item ${active}">
        <img src="${prop.img}" class="d-block w-100" style="height: 520px; object-fit: cover;" alt="${prop.title}">
        <div class="carousel-caption d-none d-md-block">
          <h3>${prop.title}</h3>
          <p>${prop.location} • ${getPriceDisplay(prop.price, currentCurrency)}</p>
        </div>
      </div>`;
  });
}

// Render Properties Grid
function renderProperties(properties) {
  const container = document.getElementById('propertiesGrid');
  container.innerHTML = '';

  properties.forEach(prop => {
    const cardHTML = `
      <div class="col-lg-4 col-md-6">
        <div class="card property-card h-100">
          <img src="${prop.img}" class="card-img-top" style="height:260px;object-fit:cover;">
          <div class="card-body">
            <h5 class="text-gold">${prop.title}</h5>
            <p class="text-muted">${prop.location}</p>
            <p class="fs-4 fw-bold text-gold">${getPriceDisplay(prop.price, currentCurrency)}</p>
            <button class="btn btn-gold w-100 mt-3" onclick="inquireProperty(${prop.id})">Inquire Now</button>
          </div>
        </div>
      </div>`;
    container.innerHTML += cardHTML;
  });
}

// Filter function (same as before)
function filterProperties() {
  // ... (keep your existing filter + sort logic)
  // After filtering, call renderProperties(filtered)
}

// Initialize
window.onload = fetchProperties;
