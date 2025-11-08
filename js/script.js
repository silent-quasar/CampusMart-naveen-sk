// Show products on homepage
const productSection = document.getElementById("products");
if (productSection) {
  const items = [
    {name: "C Programming Book", price: "₹199"},
    {name: "College Hoodie", price: "₹799"},
    {name: "Scientific Calculator", price: "₹499"},
    {name: "USB Pendrive 64GB", price: "₹599"},
  ];

  items.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.price}</p>
      <button onclick="alert('Added to Wishlist')">♡ Wishlist</button>
      <button onclick="alert('Added to Orders')">🛒 Order</button>
    `;
    productSection.appendChild(div);
  });
}

// Register form validation
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("rname").value.trim();
    const email = document.getElementById("remail").value.trim();
    const pass = document.getElementById("rpass").value.trim();
    const msg = document.getElementById("regMsg");

    if (name.length < 3) return msg.textContent = "Name too short!";
    if (!email.includes("@")) return msg.textContent = "Invalid email!";
    if (pass.length < 6) return msg.textContent = "Password too short!";

    msg.textContent = "Registered Successfully!";
    registerForm.reset();
  });
}

// Login validation
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("lemail").value;
    const pass = document.getElementById("lpass").value;
    const msg = document.getElementById("logMsg");

    if (email === "" || pass === "") msg.textContent = "Please fill all fields!";
    else msg.textContent = "Login Successful!";
  });
}

// Contact form
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("contactMsg").textContent = "Message sent successfully!";
    contactForm.reset();
  });
}
