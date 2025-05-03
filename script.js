const modal = document.getElementById('signupModal');
const openBtn = document.getElementById('openSignup');
const closeBtn = document.querySelector('.close');

openBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const res = await fetch('/api/Signup', {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert("🎉 Account created successfully!");
      signupForm.reset();
      document.getElementById("signupModal").classList.add("hidden");
    } else {
      alert("❌ Error: " + data.error);
    }
  } catch (err) {
    console.error("Error during sign-up", err);
    alert("Something went wrong. Try again later!");
  }
});





