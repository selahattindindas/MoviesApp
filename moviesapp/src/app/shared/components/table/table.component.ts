import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent<T extends { id: number; name: string }> implements OnInit {
  @ViewChild('form', { static: true }) form: NgForm;
  @Input() title: string = '';
  @Input() items: T[] = [];
  createItem: T = { id: 0, name: '' } as T;
  updateItem: T | null = null;
  showCreateFormFlag: boolean = false;
  itemBeingUpdatedId: number | null = null;

  @Output() itemCreate = new EventEmitter<T>();
  @Output() itemUpdate = new EventEmitter<T>();
  @Output() itemDelete = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

  create() {
    if (!this.form.valid) return;

    const create = { ...this.createItem, id: 0 }; 
    this.itemCreate.emit(create);
    this.showCreateForm();
  }

  update(action: string) {
    if (action === 'submit' && this.form.valid && this.updateItem) {
      const update = { ...this.updateItem };
      this.itemUpdate.emit(update);
      this.itemBeingUpdatedId = null;
    } else if (action === 'cancel') {
      this.itemBeingUpdatedId = null; 
    }
  }

  deleteItem(id: number) {
    this.itemDelete.emit(id);
  }

  showCreateForm() {
    this.showCreateFormFlag = !this.showCreateFormFlag;
    this.createItem = { id: 0, name: '' } as T;
  }

  showUpdateForm(item: T) {
    this.updateItem = { ...item };
    this.itemBeingUpdatedId = item.id;
    this.showCreateFormFlag = false; 
  }
}
