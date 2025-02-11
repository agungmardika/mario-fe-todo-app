const API_LOGIN = "http://192.168.1.6:8000/api/login";
const API_LOGOUT = "http://192.168.1.6:8000/api/logout";

// Cek jika sudah login
if (
  localStorage.getItem("token") &&
  window.location.pathname.includes("login.html")
) {
  window.location.href = "index.html";
}

// Proses Login
$("#loginForm").submit(function (e) {
  e.preventDefault();
  const email = $("#email").val();
  const password = $("#password").val();

  $.ajax({
    url: API_LOGIN,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ email, password }),
    success: function (response) {
      localStorage.setItem("token", response.token); // Simpan token di LocalStorage
      window.location.href = "index.html"; // Redirect ke halaman utama
    },
    error: function () {
      $("#errorMsg").removeClass("hidden");
    },
  });
});

// Proses Logout
function logout() {
  const token = localStorage.getItem("token");
  if (token) {
    $.ajax({
      url: API_LOGOUT,
      type: "POST",
      headers: { Authorization: `Bearer ${token}` },
      success: function () {
        localStorage.removeItem("token");
        window.location.href = "login.html";
      },
    });
  }
}
