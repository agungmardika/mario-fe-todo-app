const API_URL = "http://192.168.1.6:8000/api/todos";
const TOKEN = localStorage.getItem("token");

$.ajaxSetup({
  headers: { Authorization: `Bearer ${TOKEN}` },
});

function getTodos() {
  $.ajax({
    url: API_URL,
    type: "GET",
    success: function (todos) {
      $("#todoList").empty();
      todos.forEach((todo, index) => {
        $("#todoList").append(`
          <tr>
            <td class="border p-2">${index + 1}</td>
            <td class="border p-2">${todo.name}</td>
            <td class="border p-2">${todo.progress}%</td>
            <td class="border p-2">${todo.status}</td>
            <td class="border p-2 space-x-2">
              <button onclick="editTodo(${todo.id}, '${todo.name}', ${
          todo.progress
        }, '${todo.status}')"
                      class="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500">Edit</button>
              <button onclick="deleteTodo(${todo.id})"
                      class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Hapus</button>
              <button onclick="logout()"
                      class="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600">Logout</button>
            </td>
          </tr>
        `);
      });
    },
    error: function (xhr) {
      if (xhr.status === 401) {
        // Jika token tidak valid, redirect ke login
        window.location.href = "login.html";
      }
    },
  });
}
