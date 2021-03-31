const API_URL = '/goods.json';

Vue.component('search', {
    template: '<input id="search" v-model="search" v-on:input="searchHandler">',
    data() {
        return {
            search: '',
        }
    },
    methods: {
        searchHandler() {
            this.$emit('search', this.search);
        }
    }
})

Vue.component('goods-item', { // Создание нового компонента
    template: '<div :data-id="id" class="goods-item"><img src="./img/img.jpg" alt="img" class="goods-img" width="145"><h3 class="goods-title">{{ title }}</h3><p class="goods-price">{{ price }}</p><button class="add-button" type="button" v-on:click="addToCart">Добавить</button></div>',
    props: ['title', 'price', 'id'] // задаем параметры компонента
})

Vue.component('cart-item', {
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

Vue.component('cart', { // создание компонента корзины
    template: `<div class="cart-goods"><cart-item 
          v-on:remove="removeFromCartHandler" 
          v-on:buttonplus="buttonplus" 
          v-on:buttonminus="buttonminus"
          v-for="good in cart" 
          v-bind:title="good.title" 
          v-bind:price="good.price"
          v-bind:quantity="quantity"
          v-bind:id="good.id"
        /></div>`,
    props: ['cart'],
    data() { // данные компонента (Обязательно в виде метода!)
        return {
            quantity: 1,
        }
    },
    methods: {

        removeFromCartHandler(e) {
            const id = e.target.closest('.cart').dataset.id;
            const goodIndex = this.cart.findIndex((item) => item.id == id);

            this.cart.splice(goodIndex - 1, 1);
            fetch('/cart', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id})
            });
        },

        buttonplus(e) {
            console.log(e.currentTarget.id)
            //                                const id = e.target.id-1;
            //                                const goodIndex = this.cart.findIndex((item)=>item.id==id);        console.log(goodIndex);                
            //                                this.cart[goodIndex-1].quantity+=1;
            //                    
            //                                let qnt = document.querySelectorAll('.quantity-text')[goodIndex-1];
            //                                qnt.innerText = this.cart[goodIndex-1].quantity;
            //                this.allsum();
        },
        buttonminus(e) {
            console.log(e.target)
            //                            const id = e.target.id;
            //                                if (this.cart[id-1].quantity > 1){
            //                                    this.cart[id-1].quantity+=1;
            //                                    
            //                                    let qnt = document.querySelectorAll('.quantity-text')[id];
            //                                qnt.innerText = this.cart[id-1].quantity;
            //                    //                this.allsum();
            //                                }
            //else {this.removeFromCartHandler(e)}
            //},



        },
    }
})

const vue = new Vue({
    el: "#app",
    data: {
        cart: [],
        goods: [],
        filtredGoods: [],
        isLoaded: false,
    },
    methods: {
        addToCartHandler(e) {
            const id = e.target.closest('.goods-item').dataset.id;
            const good = this.goods.find((item) => item.id == id);
            fetch('/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(good)
            });

            this.cart.push(good);
        },


        searchHandler(search) {
            if (search === '') {
                this.filtredGoods = this.goods;
            }
            const regexp = new RegExp(search, 'gi');
            this.filtredGoods = this.goods.filter((good) => regexp.test(good.title));
        },

        showCart() {
            document.querySelector('.cart').classList.toggle("display-block");
            document.querySelector('.cart').classList.toggle("visually-hidden");
        },


        fetchPromise(url, callback) {
            return new Promise((resolve, reject) => {
                this.fetch(reject, resolve)
            })
        }
    },
    mounted() {
        fetch('/catalogData')
            .then(response => response.json())
            .then(data => {
                this.goods = data;
                this.filtredGoods = data;

                this.isLoaded = true;
            })
            .catch(err => {
                console.log(err);
            })

        fetch('/cart')
            .then(response => response.json())
            .then(data => {
                this.cart = data;
            })
            .catch(err => {
                console.log(err);
            })
    }
})
