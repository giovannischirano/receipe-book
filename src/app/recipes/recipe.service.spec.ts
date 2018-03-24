import { TestBed, inject } from '@angular/core/testing';

import { RecipeService } from './recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

describe('RecipeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeService]
    });
  });

  it('should be created', inject([RecipeService], (service: RecipeService) => {
    expect(service.hello()).toBe("Hello!");
  }));
});
