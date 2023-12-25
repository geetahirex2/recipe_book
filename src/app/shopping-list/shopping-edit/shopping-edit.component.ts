import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DecimalValuePipe } from '../../decimal-value.pipe';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) form: NgForm;
  @ViewChild('price', { static: false }) _price: number;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  //@Output() ingredientDeleted = new EventEmitter<Ingredient>();

  constructor(
    private shoppingListService: ShoppingListService,
    private pipe: DecimalValuePipe
  ) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
          purchaseDate: this.editedItem.purchaseDate,
          place: this.editedItem.place,
          price: this.editedItem.price,
        });
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAdd(f: NgForm) {
    const value = f.value;
    const newIngredient = new Ingredient(
      value.name,
      value.amount,
      value.purchaseDate,
      value.place,
      value.price
    );
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    console.log(f.value);
    this.form.reset();
    this.editMode = false;
  }

  onClear() {
    this.form.reset();
    this.editMode = !this.editMode;
  }

  usePipe(value:any) {
    this._price = this.pipe.transform(value);
    console.log(this._price);
    //return this.pipe.transform(value);
  }
}
