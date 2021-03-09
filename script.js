
class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><img src="./img/img.jpg" alt="img" class="goods-img" width="145"><h3 class="goods-title">${this.title}</h3><p class="goods-price">${this.price}</p><button class="add-button" type="button">Добавить</button></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods() {
    this.goods = [
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
      { title: 'Sneakers', price: 450 },
    ];
  }
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
  allsum(){
      let sum = 0;
      let sumHTML = document.querySelector('.sum');
      console.log(this.goods);
      this.goods.forEach(good => {
      sum += good.price;
    });
      let ressum = '<span class="sum-price">'+sum+'<span>';
      sumHTML.insertAdjacentHTML('beforeend', ressum);
  } 
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.allsum();
