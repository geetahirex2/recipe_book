import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;
  //@Output() recipeSelected = new EventEmitter<void>();
  // constructor(private recipeService: RecipeService) { }

  ngOnInit() {}
  // onSelectRecipe(){
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // }
}
