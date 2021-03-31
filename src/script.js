const API_URL = '/goods.json';

import search from './search.js';

import goods_item from './goods_item';



import cart from './cart.js'



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
