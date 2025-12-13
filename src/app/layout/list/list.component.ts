import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  entity = input<string>();
  addLink = input<string>();
  inputSearch = input<string>("");

  delete = output<void>();
  onSearch = output<string>();

  emitDelete() {
    this.delete.emit();
  }

  emitOnSearch(value: string) {
    this.onSearch.emit(value);
  }
}
