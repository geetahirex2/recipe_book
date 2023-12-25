import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DecimalValuePipe } from '../decimal-value.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ShoppingListComponent },
    ]),
    FormsModule,
  ],
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
    DecimalValuePipe,
  ],
  providers:[DecimalValuePipe]
})
export class ShoppingListModule {}
