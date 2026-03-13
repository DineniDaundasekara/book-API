import { Component, OnInit } from '@angular/core';
import { Book } from './models/book.model';
import { BookService } from './services/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  books: Book[] = [];
  showForm = false;
  isEditing = false;
  successMessage = '';
  errorMessage = '';
  editingId: number | null = null;

  formData: Partial<Book> = {
    title: '',
    author: '',
    isbn: '',
    publicationDate: ''
  };

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAll().subscribe({
      next: (data) => (this.books = data),
      error: () => this.showError('❌ Failed to load books. Is the backend running?')
    });
  }

  openAddForm(): void {
    this.isEditing = false;
    this.editingId = null;
    this.formData = { title: '', author: '', isbn: '', publicationDate: '' };
    this.showForm = true;
    this.clearMessages();
  }

  openEditForm(book: Book): void {
    this.isEditing = true;
    this.editingId = book.id;
    this.formData = {
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publicationDate: book.publicationDate.substring(0, 10)
    };
    this.showForm = true;
    this.clearMessages();
  }

  closeForm(): void {
    this.showForm = false;
    this.clearMessages();
  }

  submitForm(): void {
    if (
      !this.formData.title?.trim() ||
      !this.formData.author?.trim() ||
      !this.formData.isbn?.trim() ||
      !this.formData.publicationDate
    ) {
      this.showError('⚠️ Please fill in all fields.');
      return;
    }

    if (this.isEditing && this.editingId !== null) {
      this.bookService.update(this.editingId, this.formData).subscribe({
        next: () => {
          this.showSuccess('✅ Book updated successfully!');
          this.loadBooks();
          this.closeForm();
        },
        error: () => this.showError('❌ Failed to update book.')
      });
    } else {
      this.bookService.create(this.formData).subscribe({
        next: () => {
          this.showSuccess('✅ Book added successfully!');
          this.loadBooks();
          this.closeForm();
        },
        error: () => this.showError('❌ Failed to add book.')
      });
    }
  }

  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.delete(id).subscribe({
        next: () => {
          this.showSuccess('✅ Book deleted successfully!');
          this.loadBooks();
        },
        error: () => this.showError('❌ Failed to delete book.')
      });
    }
  }

  showSuccess(msg: string): void {
    this.successMessage = msg;
    this.errorMessage = '';
    setTimeout(() => (this.successMessage = ''), 3500);
  }

  showError(msg: string): void {
    this.errorMessage = msg;
    this.successMessage = '';
  }

  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }
}