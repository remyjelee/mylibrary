const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Selectors
const addNewButton = document.querySelector(".fixed-button");
const modal = document.getElementById("bookModal");
const cancelButton = document.getElementById("cancelButton");
const bookForm = document.getElementById("bookForm");
const collection = document.querySelector(".collection");

// Function to toggle modal visibility
function toggleModal() {
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

// Function to add a book to the library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  updateLibraryDisplay();
}

// Function to remove a book from the library
function removeBook(index) {
  myLibrary.splice(index, 1);
  updateLibraryDisplay();
}

// Function to toggle the read status of a book
function toggleReadStatus(index) {
  myLibrary[index].read = !myLibrary[index].read;
  updateLibraryDisplay();
}

// Function to update the library display
function updateLibraryDisplay() {
  collection.innerHTML = ""; // Clear existing books
  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard", book.read ? "read" : "unread");

    // Card content
    bookCard.innerHTML = `
      <div class="card-text">
        <strong>${book.title}</strong><br>
        <em>by ${book.author}</em><br>
        ${book.pages} pages
      </div>
    `;

    // Card actions
    const cardActions = document.createElement("div");
    cardActions.classList.add("card-actions");

    // Toggle Read Button
    const toggleButton = document.createElement("button");
    toggleButton.classList.add("toggle-read");
    toggleButton.textContent = book.read ? "Read" : "Unread";
    toggleButton.addEventListener("click", () => toggleReadStatus(index));

    // Remove Button
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-book");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeBook(index));

    // Append buttons to card actions
    cardActions.appendChild(toggleButton);
    cardActions.appendChild(removeButton);

    // Append actions and card to collection
    bookCard.appendChild(cardActions);
    collection.appendChild(bookCard);
  });

  document.querySelector(".bookCount").textContent = `Total books: ${myLibrary.length}`;
}

// Event listener for the "Add New Book" button
addNewButton.addEventListener("click", toggleModal);

// Event listener for the cancel button in the modal
cancelButton.addEventListener("click", toggleModal);

// Event listener for the form submission
bookForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form from refreshing the page
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;
  addBookToLibrary(title, author, pages, read);
  toggleModal(); // Close the modal after adding the book
  bookForm.reset(); // Clear the form inputs
});
