Vue.component('cart_item', {
    template: '<div :data-id="id" class="cart-item"><img src="./img/img.jpg" alt="img" class="cart-img" width="145"><div class="cart-info"><h3 class="cart-title">{{ title }}</h3>   <p class="cart-price">{{ price }}</p><div class="quantity"><button class="plus-button" type="button" :id="id" v-on:click="buttonplus">+</button><p class="quantity-text" :data-id="id">{{ quantity}}</p><button class="minus-button" type="button" :id="id" v-on:click="buttonminus">-</button></div><button class="del-button" type="button" v-on:click="removeFromCartHandler">Удалить</button></div>',
    props: ['title', 'price', 'id', 'quantity'],
    methods: {
        removeFromCartHandler(e) {
            this.$emit('remove', e) // Генерируем пользовательское событие
        },
        buttonplus(e) {
            console.log(e);
            this.$emit('buttonplus', e)
        },
        buttonminus(e) {
            this.$emit('buttonminus', e)
        }
    }
})
