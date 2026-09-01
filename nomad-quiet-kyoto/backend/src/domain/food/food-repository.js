export class FoodRepository {
  constructor(food) {
    this.food = food;
  }

  list() {
    return [...this.food];
  }

  findById(id) {
    return this.food.find((item) => item.id === id) ?? null;
  }
}
