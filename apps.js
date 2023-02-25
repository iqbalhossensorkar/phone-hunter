const loadPhones = async (search, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
  const res = await fetch(url);
  const data = await res.json();
  getPhones(data.data, dataLimit);
}

const getPhones = (phones, dataLimit) => {
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.innerText = '';
  const showAll = document.getElementById('show-all')
  if (dataLimit && phones.length > 7) {
    phones = phones.slice(0, 7);
    showAll.classList.remove('d-none');
  } else {
    showAll.classList.add('d-none');
  }
  const nothingFound = document.getElementById('spam-message');
  if (phones.length === 0) {
    nothingFound.classList.remove('d-none');
  } else {
    nothingFound.classList.add('d-none');
  }
  phones.forEach(phone => {
    console.log(phone);
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <div class="card h-100 p-4">
          <img src="${phone.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.</p>
              <button onclick="loadPhoneDetails('${phone.slug}')" href = "#" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#phoneDetails">Details</button>
          </div>
        </div>
    `;
    phoneContainer.appendChild(div);
  });
  loadingPage(false);
}

const processSearch = (dataLimit) => {
  loadingPage(true);
  const inputField = document.getElementById('inputField').value;
  loadPhones(inputField, dataLimit);
}

document.getElementById('btn').addEventListener('click', function () {
  processSearch(7);
})

document.getElementById('inputField').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    processSearch(7);
  }
})

const loadingPage = loading => {
  const loadSpinner = document.getElementById('loader');
  if (loading) {
    loadSpinner.classList.remove('d-none');
  } else {
    loadSpinner.classList.add('d-none');
  }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
  processSearch();
})

const loadPhoneDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
  console.log(phone);
  const phoneTitle = document.getElementById('phoneDetailsLabel');
   phoneTitle.innerText = phone.name;
   const phoneDescription = document.getElementById('phoneDescription');
   phoneDescription.innerHTML =`
   <div class="container text-center">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 gap-2">
      <div class="col">
      <img class="img-fluid" src="${phone.image}">
      </div>
    <div class="col">
    <p class="fw-semibold">${phone.name}</p>
    <p>${phone.releaseDate}</p>
    <p>${phone.brand}</p>
    </div>
    </div>
  </div>
  <p class="fw-bold text-decoration-underline text-center my-2">mainFeatures:</p>
  <p class="mt-3">Storage: ${phone.mainFeatures.storage}</p>
  <p>displaySize: ${phone.mainFeatures.displaySize}</p>
  <p>memory: ${phone.mainFeatures.memory}</p>
  <p>chipset: ${phone.mainFeatures.chipSet}</p>
  <p class="fw-bold text-decoration-underline text-center my-2">Others:</p>
  <p class="mt-3">Bluetooth: ${phone.others.Bluetooth}</p>
  <p>Radio: ${phone.others.Radio}</p>
  <p>WLAN: ${phone.others.WLAN}</p>
  <p>USB: ${phone.others.USB}</p>
   `
}

loadPhones('samsung');