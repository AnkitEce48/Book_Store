import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book, BookService } from 'src/app/services/book.service';
import { BookCardComponent } from 'src/app/components/book-card/book-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export default class HomeComponent implements OnInit {
  private bookService = inject(BookService);
  books: Book[] = [];

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe({
      next: (res) => {
        console.log('Books:', res.data);
        this.books = res.data;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}

