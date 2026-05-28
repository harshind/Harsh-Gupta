let allProperties = [];
let currentCurrency = "USD";

const exchangeRates = { USD: 1, EUR: 0.92, AED: 3.67 };
const currencySymbols = { USD: "$", EUR: "€", AED: "AED " };

async function fetchProperties() {
  allProperties = [
    { id:1, title:"Oceanfront Penthouse", location:"Miami Beach, USA", price:28500000, type:"us", img:"https://images.unsplash.com/photo-1600585154340-be6161a56a9c", desc:"Breathtaking 5BR penthouse with private rooftop pool.", bedrooms:5, bathrooms:6, sqft:"8200" },
    { id:2, title:"Mayfair Mansion", location:"London, UK", price:24500000, type:"europe", img:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9", desc:"Grade II listed heritage townhouse.", bedrooms:6, bathrooms:7, sqft:"9500" },
    { id:3, title:"Sentosa Cove Villa", location:"Singapore", price:34000000, type:"asia", img:"https://images.unsplash.com/photo-1613490493576-7fde63acd811", desc:"Waterfront mansion with private marina.", bedrooms:7, bathrooms:8, sqft:"12000" },
    { id:4, title:"Jumeirah Palm Villa", location:"Dubai, UAE", price:23100000, type:"asia", img:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4", desc:"Private beachfront villa.", bedrooms:6, bathrooms:7, sqft:"15000" },
    { id:5, title:"Clifftop Estate", location:"Auckland, New Zealand", price:16800000, type:"asia", img:"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde", desc:"10-acre oceanfront estate.", bedrooms:8, bathrooms:9, sqft:"14500" }
  ];

  renderFeaturedCarousel();
  renderProperties(allProperties);
}

function getPriceDisplay(priceUSD, currency) {
  const converted = (priceUSD * exchangeRates[currency]).toLocaleString('en-US');
  return `${currencySymbols[currency]}${converted}`;
}

function changeCurrency() {
  currentCurrency = document.getElementById('currencySelect').value;
  renderProperties(allProperties);
}

function renderFeaturedCarousel() {
  const inner = document.getElementById('carouselInner');
  inner.innerHTML = '';
  allProperties.slice(0, 3).forEach((prop, i) => {
    inner.innerHTML += `
      <div class="carousel-item ${i===0 ? 'active' : ''}">
        <img src="${prop.img}" class="d-block w-100" style="height:520px; object-fit:cover;">
        <div class="carousel-caption">
          <h4>${prop.title}</h4>
          <p>${prop.location} • ${getPriceDisplay(prop.price, currentCurrency)}</p>
        </div>
      </div>`;
  });
}

function renderProperties(properties) {
  const container = document.getElementById('propertiesGrid');
  container.innerHTML = '';

  properties.forEach(prop => {
    const html = `
      <div class="col-lg-4 col-md-6">
        <div class="card property-card h-100" onclick="showPropertyDetail(${prop.id})">
          <img src="${prop.img}" class="card-img-top" style="height:260px; object-fit:cover;">
          <div class="card-body">
            <h5 class="text-gold">${prop.title}</h5>
            <p class="text-muted">${prop.location}</p>
            <p class="fs-4 fw-bold text-gold">${getPriceDisplay(prop.price, currentCurrency)}</p>
          </div>
        </div>
      </div>`;
    container.innerHTML += html;
  });
}

function showPropertyDetail(id) {
  const prop = allProperties.find(p => p.id === id);
  if (!prop) return;

  const modal = new bootstrap.Modal(document.getElementById('propertyModal'));
  document.getElementById('modalTitle').textContent = prop.title;
  document.getElementById('modalBody').innerHTML = `
    <div class="row">
      <div class="col-md-7">
        <img src="${prop.img}" class="img-fluid rounded" alt="${prop.title}">
      </div>
      <div class="col-md-5">
        <h3 class="text-gold">${prop.title}</h3>
        <p class="fs-5">${prop.location}</p>
        <h2 class="text-gold">${getPriceDisplay(prop.price, currentCurrency)}</h2>
        <div class="d-flex gap-4 my-4">
          <div><i class="fas fa-bed"></i> ${prop.bedrooms} Beds</div>
          <div><i class="fas fa-bath"></i> ${prop.bathrooms} Baths</div>
          <div><i class="fas fa-expand"></i> ${prop.sqft} sqft</div>
        </div>
        <p><strong>Description:</strong> ${prop.desc}</p>
      </div>
    </div>
  `;
  modal.show();
}

function inquireFromModal() {
  window.open(`https://wa.me/919876543210?text=I'm%20interested%20in%20this%20property`, '_blank');
}

function filterProperties() {
  const term = document.getElementById('searchInput').value.toLowerCase();
  const sort = document.getElementById('sortSelect').value;

  let filtered = allProperties.filter(p => 
    p.title.toLowerCase().includes(term) || p.location.toLowerCase().includes(term)
  );

  if (sort === 'price-high') filtered.sort((a,b) => b.price - a.price);
  if (sort === 'price-low') filtered.sort((a,b) => a.price - b.price);

  renderProperties(filtered);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  document.getElementById('backToTop').style.display = window.scrollY > 500 ? 'flex' : 'none';
});

function showContactModal() {
  alert("Thank you! Harsh Gupta will contact you shortly.");
}

// Initialize
window.onload = fetchProperties;
