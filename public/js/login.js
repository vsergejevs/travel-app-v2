const login = async (email, password) => {
  console.log(email, password);
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    console.log(res, ' this lives in public/js/login.js');
  } catch (err) {
    console.log(err);
  }
};

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault(); // prevents form from loading other pages
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});