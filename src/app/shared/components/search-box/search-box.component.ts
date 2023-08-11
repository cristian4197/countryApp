import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer:Subject<string> = new Subject<string>();
  private debouncerSuscription!: Subscription;

  @Input() placeholder:string = '';

  @Input() initialValue:string = '';

  @Output() onValue = new EventEmitter<string>();

  @Output() onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer.
    pipe(
      //Cuando el observable deje de emitir valores por un x tiempo se ejecuta el suscribe
      debounceTime(500)
    )
    .subscribe( value => {
      // Este sucribe se ejecuto luego de 500 milisegundos
      this.onDebounce.emit(value);
    });
  }

  emitInputValue(term:string):void {
    this.onValue.emit(term);
  }

  onKeyPress(searchTerm:string):void {
    this.debouncer.next(searchTerm);
  }

  ngOnDestroy(): void {
    this.debouncerSuscription.unsubscribe();
  }
}
