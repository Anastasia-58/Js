Vue.component('goods_item', { // Создание нового компонента
    template: '<div :data-id="id" class="goods-item"><img src="./img/img.jpg" alt="img" class="goods-img" width="145"><h3 class="goods-title">{{ title }}</h3><p class="goods-price">{{ price }}</p><button class="add-button" type="button" v-on:click="addToCart">Добавить</button></div>',
    props: ['title', 'price', 'id'] // задаем параметры компонента
})
