async function main() {
  let response = await fetch("http://localhost:3001/listBooks");
  let books = await response.json();
  books.forEach(renderBook);
}

function renderBook(book) {
  let root = document.querySelector(".book-container");
  // console.log(book.imageURL);
  root.innerHTML += `
    <li class="list-group-item mb-2">
        <label class="form-label mb-2"> ${book.title} </label>
        <input class="form-control mb-2" onchange=getQuantity(id) id=${book.id} value=${book.quantity} />
        <button class="btn btn-primary" onclick=updateBook(${book.id})>Save</button>
        <button class="btn btn-danger" onclick=deleteBook(${book.id}) >Delete</button>
    </li>
`;
}
function getQuantity(id) {
  console.log(document.getElementById(id).value);
  return document.getElementById(id).value;
}

// Updating a book
async function updateBook(id) {
  console.log("save button clicked on id:", id);
  let response = await fetch("http://localhost:3001/updateBook", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      quantity: getQuantity(id),
    }),
  });
  console.log(response);
  let data = await response.json();
  console.log(data);
}

// Adding a new book
let addbookBtn = document.getElementById("addBook-submit");
addbookBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  let response = await fetch("http://localhost:3001/addBook", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // "id": 2,
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      year: document.getElementById("year").value,
      quantity: document.getElementById("quantity").value,
      imageURL: document.getElementById("imageURL").value,
    }),
  });
  // .then(console.log(response))
});

async function deleteBook(id) {
  console.log("delete button clicked on id:", id);
  let response = await fetch("http://localhost:3001/removeBook/" + id, {
    method: "DELETE",
  });
  let data = await response.json();
  console.log(data);
}
main();
