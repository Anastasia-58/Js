class Hamburger {
  constructor() { 
    this.good = [];
  }
  addMain(size,stuffing){
        this.size = size;
        this.stuffing = stuffing;
    }
  addFlavoring(flavoring) {  
    this.flavoring = flavoring;
  }
  addMayonnaise(mayonnaise){
  this.mayonnaise = mayonnaise;
  }
  ulatePrice() { 
      let price = 0;
      if (this.size==1){
          price+=50;
      }
      else {price+=100};
      if(this.stuffing == 1){
          price+=10;
      }
      else if (this.stuffing == 2){
          price+=20;
      }
      else {price+=15;}
      if (this.flavoring = 1){price+=15;}
      if (this.mayonnaise = 1){price+=20;}
      let resprice = '<h2 class="text">Общая стоимость: '+price+'<h2>';
      document.querySelector('.res').insertAdjacentHTML('beforeend',resprice);
  }
  calculateCalories() {  
      let colories = 0;
      if (this.size==1){
          colories+=20;
      }
      else {colories+=40};
      if(this.stuffing == 1){
          colories+=20;
      }
      else if (this.stuffing == 2){
          colories+=5;
      }
      else {colories+=10;}
      if (this.mayonnaise = 1){colories+=5;}
      let rescol = '<h2 class="text">Колории: '+colories+'<h2>';
      document.querySelector('.res').insertAdjacentHTML('beforeend',rescol);
  }
}

var size = +prompt("Введите размер бургера.\n1.Маленький\n2.Большой");
var stuffing = +prompt("Введите начинку бургера.\n1.С сыром\n2.С салатом\n2.С картофелем");
var flavoring = +prompt("Добавить приправу?\n1.Да\n2.Нет");
var mayonnaise = +prompt("Добавить майонез?\n1.Да\n2.Нет"); 

const burger = new Hamburger();
burger.addMain(size,stuffing);
burger.addFlavoring(mayonnaise);
burger.addMayonnaise(mayonnaise);
burger.ulatePrice();
burger.calculateCalories();