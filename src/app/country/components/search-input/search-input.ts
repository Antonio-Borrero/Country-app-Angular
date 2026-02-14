import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class SearchInput {
  placeholder = input.required();
  value = output<string>();
  inputValue = signal<string>("");
  debounceTime = input(500)

  debounceEffect = effect((onCleanup) => {

    const value = this.inputValue();

    const timeOut = setTimeout(() => {
      this.value.emit(value)
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeOut)
    })
  })
}
