using Microsoft.AspNetCore.Mvc;
using BookApi.Models;

namespace BookApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        // In-memory storage
        private static List<Book> _books = new List<Book>
        {
            new Book
            {
                Id = 1,
                Title = "Clean Code",
                Author = "Robert C. Martin",
                Isbn = "978-0132350884",
                PublicationDate = new DateTime(2008, 8, 1)
            },
            new Book
            {
                Id = 2,
                Title = "The Pragmatic Programmer",
                Author = "Andrew Hunt",
                Isbn = "978-0201616224",
                PublicationDate = new DateTime(1999, 10, 20)
            },
            new Book
            {
                Id = 3,
                Title = "Design Patterns",
                Author = "Gang of Four",
                Isbn = "978-0201633610",
                PublicationDate = new DateTime(1994, 11, 10)
            }
        };

        private static int _nextId = 4;

        // GET: api/books
        [HttpGet]
        public ActionResult<IEnumerable<Book>> GetAll()
        {
            return Ok(_books);
        }

        // GET: api/books/1
        [HttpGet("{id}")]
        public ActionResult<Book> GetById(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null)
                return NotFound(new { message = $"Book with ID {id} not found." });
            return Ok(book);
        }

        // POST: api/books
        [HttpPost]
        public ActionResult<Book> Create([FromBody] Book book)
        {
            if (book == null)
                return BadRequest(new { message = "Invalid book data." });

            book.Id = _nextId++;
            _books.Add(book);
            return CreatedAtAction(nameof(GetById), new { id = book.Id }, book);
        }

        // PUT: api/books/1
        [HttpPut("{id}")]
        public ActionResult Update(int id, [FromBody] Book updatedBook)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null)
                return NotFound(new { message = $"Book with ID {id} not found." });

            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.Isbn = updatedBook.Isbn;
            book.PublicationDate = updatedBook.PublicationDate;

            return NoContent();
        }

        // DELETE: api/books/1
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null)
                return NotFound(new { message = $"Book with ID {id} not found." });

            _books.Remove(book);
            return NoContent();
        }
    }
}