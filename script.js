class Api {
    constructor() {
        this.url = '/goods.json';
    }

    fetch(error, success) { //В методичке makeGETRequest
        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    
                    success(JSON.parse(xhr.responseText));
                } else if (xhr.status > 400) {
                    error('Error');
                }

            }
        }
        
        

        xhr.open('GET', this.url, true);
        xhr.send();
    }
    
    fromJSON(data){
        
        return new Promise((resolve)=>{
            resolve(JSON.parse(data));
        })
    }
    
    fetchPromise(){
        return new Promise((resolve,reject)=>{
            this.fetch(reject,resolve);
        })
    }
}



class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    getHtml() {
        return `<div class="goods-item"><img src="./img/img.jpg" alt="img" class="goods-img" width="145"><h3 class="goods-title">${this.title}</h3><p class="goods-price">${this.price}</p><button class="add-button" type="button">Добавить</button></div>`;
    }
}

class GoodsList {
    constructor() {
        this.api = new Api();
        this.cart = new Cart();
        this.header = new Header();
        this.$goodlist = document.querySelector('.goods-list');
        this.goods = [];
        this.filtereGoods = [];
        
        this.header.setSearchHandler((evt)=>{
            this.search(evt.target.value);
        })
        
        this.header.setButtonHandler((evt)=>{
            this.cart.showCart(evt.target.value);
        })
        
        

        this.api.fetch(this.onFetchError.bind(this), this.onFetchSuccess.bind(this)); //без промисов
        
//        this.api.fetchPromise()
//        .then ((response) => this.api.fromJSON(data)) //Парсим данные через промис
//        .then((data) => { this.onFetchSuccess(data)})
//        .catch((err) => { this.onFetchError(err)});
    }

    onFetchSuccess(data) {
        this.goods = data.map(({
            title,
            price
        }) => new GoodsItem(title, price));
        this.render();
        
    }

    onFetchError(err) {
        this.$goodlist.insertAdjacentHTML('beforeend', '<h3>'+err+'<h3>');
    }
    
    search(str){
        if (str === ''){
            this.filtereGoods = this.goods;
        }
        const regexp = new RegExp(str, 'gi');
        this.filtereGoods = this.goods.filter((good)=>regexp.test(good.title));
        this.render();
    }

    render() {
        this.$goodlist.textContent = '';
        this.goods.forEach(good => {
            this.$goodlist.insertAdjacentHTML('beforeend', good.getHtml());

        });
        let buttonadd = this.$goodlist.querySelectorAll('.add-button');
        var i = 0;
        buttonadd.forEach(button=>{
            button.id = i;
            i++;
        })
        buttonadd.forEach(button => {
            
                button.addEventListener('click', (()=>{
            this.cart.addToCart(this.goods[button.id]);
        }));
            });
        
        }

    
    
}

class Cart {
    constructor(){
    this.$containercart = document.querySelector('.cart');
    this.$cartlist = document.querySelector('.cart-goods');
    this.busketgoods = [];
    }
    
    //добавление нового товара в корзину
    addToCart(e){
        var repeat = false;
        this.busketgoods.forEach(good =>{
            if(good.title === e.title){
                repeat = true;
            }
        })
        if (!repeat){
           this.busketgoods.push(new CartItem(e.title,e.price));
            this.render();
        }
        this.allsum();
        
    }
    
    render(){
        this.$cartlist.textContent = '';
        this.busketgoods.forEach(good => {
            this.$cartlist.insertAdjacentHTML('beforeend', good.getHtml());
        });
        
        //Добавление события увеличения колличества товаров в корзине
        let buttonplus = this.$cartlist.querySelectorAll('.plus-button');
        var i = 0;
        buttonplus.forEach(button=>{
            button.id = i;
            i++;
        })
        buttonplus.forEach(button => {
            button.addEventListener('click', (()=>{
            this.busketgoods[button.id].quantity+=1;
            let qnt = document.querySelectorAll('.quantity-text')[button.id];
                qnt.innerText = this.busketgoods[button.id].quantity;
                this.allsum();
            }
        ))
            });
        
        //Добавление события уменьшения колличества товаров в корзине
        let buttonminus = this.$cartlist.querySelectorAll('.minus-button');
        var i = 0;
        buttonminus.forEach(button=>{
            button.id = i;
            i++;
        })
        buttonminus.forEach(button => {
            button.addEventListener('click', (()=>{
            if (this.busketgoods[button.id].quantity > 1){
                this.busketgoods[button.id].quantity-=1;
                let qnt = document.querySelectorAll('.quantity-text')[button.id];
                qnt.innerText = this.busketgoods[button.id].quantity;
                this.allsum();
            }
             else {this.deleteItem(button.id)}
            }
        ))
            });
        
        let buttondel = this.$cartlist.querySelectorAll('.del-button');
        i = 0;
        buttondel.forEach(button=>{
            button.id = i;
            i++;
        })
        
        buttondel.forEach(button =>{ //Удаление элементов из корзины
            button.addEventListener('click', (()=>{this.deleteItem(button.id)}))
        })
    }
    
    //удаление товара из корзины
    deleteItem(id){
        this.busketgoods.splice(id,1);
        document.querySelectorAll('.cart-item')[id].classList.toggle('visually-hidden');
        this.allsum();
    }
    
    showCart(e){
        this.$containercart.classList.toggle("display-block");
        this.$containercart.classList.toggle("visually-hidden");
        this.allsum();
    }
    
    allsum() {
        let sum = 0;
        let sumHTML = document.querySelector('.sum-price');
        this.busketgoods.forEach(good => {
            sum += good.price*good.quantity;
        });
        sumHTML.innerText = sum;
    }
}

class CartItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
        this.quantity = 1;
    }
    getHtml() {
        return `<div class="cart-item"><img src="./img/img.jpg" alt="img" class="cart-img" width="145"><div class="cart-info"><h3 class="cart-title">${this.title}</h3><p class="cart-price">${this.price}</p><div class = "quantity"><button class="plus-button" type="button"><img src="./img/plus.png" alt="plus" class="plus-img" width="25"></button><p class="quantity-text">${this.quantity}</p><button class="minus-button" type="button"><img src="./img/minus.png" alt="minus" class="minus-img" width="25"></button></div><button class="del-button" type="button">Удалить</button></div></div>`;
    }
    
    getQuantity(c){
        this.quantity = c;
    }
}

class Header {
    constructor(){
        this.$container = document.querySelector('header');
        this.$buttoncart = this.$container.querySelector('.cart-button');
        this.$search = this.$container.querySelector('#search');
    }
    
    setSearchHandler (callback){
        this.$search.addEventListener('input',callback);
    }
    
    setButtonHandler(callback){
        this.$buttoncart.addEventListener('click', callback);
    }
    
}





const goodList = new GoodsList();
//const cart = new Cart();



