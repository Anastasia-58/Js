import cart_item from './cart_item.js';

Vue.component('cart', { // создание компонента корзины
    template: `<div class="cart-goods"><cart_item 
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

export default {
    components: {
        cart
    }
}