# 📚 Book Manager Application

A full-stack web application to manage a list of books with full **Create, Read, Update, and Delete (CRUD)** functionality.

Built with **Angular** (Frontend) and **ASP.NET Core with C#** (Backend).

---

## 🖥️ What This App Does

- View all books in a clean table
- Add a new book using a form
- Edit any existing book
- Delete a book with a confirmation prompt
- Shows success/error messages after every action

---

## 🛠️ Technologies Used

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 17, TypeScript, HTML, CSS |
| Backend | ASP.NET Core 8, C# |
| API Style | RESTful API |
| Storage | In-Memory List |
| API Docs | Swagger UI |

---

## 🚀 How to Run the Project

### ✅ Prerequisites

Make sure you have these installed before starting:

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js v18+](https://nodejs.org)
- Angular CLI → install with:
  ```bash
  npm install -g @angular/cli
  ```

---

### Step 1 — Start the Backend

```bash
# Go into the backend folder
cd BookApi

# Restore dependencies
dotnet restore

# Run the API
dotnet run
```

**The API runs at:** `http://localhost:5227`  
**Swagger UI (test your API):** `http://localhost:5227/swagger`

---

### Step 2 — Start the Frontend

Open a **new terminal window** and run:

```bash
# Go into the frontend folder
cd book-app

# Install dependencies
npm install

# Start the app
ng serve
```

**The app opens at:** `http://localhost:4200`

> ⚠️ **Important:** Start the backend FIRST, then the frontend. Both must run at the same time.

---

## 🔌 API Endpoints

Base URL: `http://localhost:5227/api/books`

| Method | Endpoint | What It Does |
|--------|----------|-------------|
| `GET` | `/api/books` | Get all books |
| `GET` | `/api/books/{id}` | Get one book by ID |
| `POST` | `/api/books` | Add a new book |
| `PUT` | `/api/books/{id}` | Update a book |
| `DELETE` | `/api/books/{id}` | Delete a book |

### Example Book JSON

```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "978-0132350884",
  "publicationDate": "2008-08-01T00:00:00"
}
```

---

## 📋 Book Model

The `Book` object has these fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | int | Auto-generated unique ID |
| `title` | string | Title of the book |
| `author` | string | Author's name |
| `isbn` | string | ISBN number |
| `publicationDate` | DateTime | Date the book was published |

---

## 📂 Key Files Explained

### Backend

| File | What it does |
|------|-------------|
| `Book.cs` | Defines the Book data model with all 5 properties |
| `BooksController.cs` | Handles all API requests — GET, POST, PUT, DELETE |
| `Program.cs` | App startup, CORS configuration to allow Angular |

### Frontend

| File | What it does |
|------|-------------|
| `book.model.ts` | TypeScript interface that matches the backend Book model |
| `book.service.ts` | Makes HTTP requests to the backend API |
| `app.component.ts` | All the logic — loading books, adding, editing, deleting |
| `app.component.html` | The HTML template — table, form modal, alerts |
| `app.component.css` | All the styling for the app |
| `app.module.ts` | Registers `HttpClientModule` and `FormsModule` |

---

## ✅ Requirements Checklist

- [x] Angular UI — display list of books
- [x] Angular UI — form to add new books
- [x] Angular UI — edit existing books
- [x] Angular UI — delete books
- [x] ASP.NET REST API — GET all books
- [x] ASP.NET REST API — GET book by ID
- [x] ASP.NET REST API — POST create book
- [x] ASP.NET REST API — PUT update book
- [x] ASP.NET REST API — DELETE book
- [x] In-memory list storage (as per assignment requirements)
- [x] Book model with `id`, `title`, `author`, `isbn`, `publicationDate`
- [x] CORS configured for Angular frontend

---

## 💡 Notes

- Data is stored **in-memory**, meaning it resets when the backend restarts. This is as specified in the assignment requirements.
- The backend runs on **port 5227** and the frontend on **port 4200**.
- CORS is configured in `Program.cs` to allow requests from `http://localhost:4200`.
- You can test the API directly using **Swagger UI** at `http://localhost:5227/swagger` without needing the frontend running.

