const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];


const $goodsList = document.querySelector('.goods-list');
  
const renderGoodsItem = ({ title, price }) => {
    return `<div class="goods-item"><img src="./img/img.jpg" alt="img" class="goods-img" width="145"><h3 class="goods-title">${title}</h3><p class="goods-price">${price}</p><button class="add-button" type="button">Добавить</button></div>`;
};
  
const renderGoodsList = (list = goods) => {
    let goodsList = list.map(
            item => renderGoodsItem(item)
        ).join('\n'); //С помощью join убираем запятую

    $goodsList.insertAdjacentHTML('beforeend', goodsList);
}
  
renderGoodsList();