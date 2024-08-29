import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.css']
})
export class FormItemComponent<T>{
  @ViewChild('form', { static: true }) form: NgForm;
  @Input() headerTitle: string = '';
  @Input() label: string = '';
  @Input() items: T[] = []; 
  @Input() createItem: T = {} as T;
  @Input() itemProperty: keyof T;
  @Output() itemRemoved = new EventEmitter<number>();
  @Output() itemCreated = new EventEmitter<T>();

  onSubmit() {
    if (!this.form.valid) return;

    const create = { ...this.createItem };
    this.itemCreated.emit(create);
    this.createItem = {} as T; 
  }

  removeItem(id: number) {
    this.itemRemoved.emit(id);
  }
}
