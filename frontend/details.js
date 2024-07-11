// Stores all the feedbacks received
async function submitform() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const dob = document.getElementById("dob").value;
  const gender = document.getElementById("gender").value;
  const address = document.getElementById("address").value;
  const phone_no = document.getElementById("phone_no").value;
  const photo = document.getElementById("photo").value;

  console.log(photo);

  try {
    const details = await fetch("http://localhost:5500/api/details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        dob,
        gender,
        address,
        phone_no,
        photo,
      }),
    });

    if (!details.ok) {
      console.error(error);
    }

    alert("Thank You!");
  } catch (error) {
    console.error(error);
  }
}

// Displays all the feedbacks
async function displayDetails() {
  try {
    const display = await fetch("http://localhost:5500/api/display", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!display.ok) {
      console.error(error);
    }

    const response = await display.json();
    const data = response.data;

    const table = document.getElementById("content");

    const name = document.createElement("th");
    const email = document.createElement("th");
    const dob = document.createElement("th");
    const address = document.createElement("th");
    const gender = document.createElement("th");
    const phone_no = document.createElement("th");
    const unique_no = document.createElement("th");
    const photo = document.createElement("th");

    name.textContent = "Name";
    email.textContent = "Email";
    dob.textContent = "DOB";
    address.textContent = "Address";
    gender.textContent = "Gender";
    phone_no.textContent = "Phone No";
    unique_no.textContent = "Unique No";
    photo.textContent = "Photo";

    table.appendChild(name);
    table.appendChild(email);
    table.appendChild(dob);
    table.appendChild(address);
    table.appendChild(gender);
    table.appendChild(phone_no);
    table.appendChild(unique_no);
    table.appendChild(photo);

    data.forEach((details) => {
      const row = document.createElement("tr");

      const name = document.createElement("td");
      name.textContent = details.name;
      row.appendChild(name);

      const email = document.createElement("td");
      email.textContent = details.email;
      row.appendChild(email);

      const dob = document.createElement("td");
      dob.textContent = details.dob;
      row.appendChild(dob);

      const address = document.createElement("td");
      address.textContent = details.address;
      row.appendChild(address);

      const gender = document.createElement("td");
      gender.textContent = details.gender;
      row.appendChild(gender);

      const phone_no = document.createElement("td");
      phone_no.textContent = details.phone_no;
      row.appendChild(phone_no);

      const unique_no = document.createElement("td");
      unique_no.textContent = details.unique_no;
      row.appendChild(unique_no);

      const photo = document.createElement("td");
      const img = document.createElement("img");
      img.src = details.photo;
      img.alt = "Photo"; // Add alt text for better accessibility
      photo.appendChild(img);
      row.appendChild(photo);

      table.appendChild(row);
    });
  } catch (error) {}
}

document.querySelector("#send").addEventListener("click", (e) => {
  e.preventDefault();
  submitform();
});

document.getElementById("display").addEventListener("click", (e) => {
  window.location.href = "display.html";
});
