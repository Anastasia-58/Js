const API_URL = '/goods.json';
const vue = new Vue({
  el: "#app",
  data: {
    goods: [],
    filtredGoods: [],
    search: '',
    busketgoods: [],
    sum: 0,
    haveGoods: false
  },
  methods: {
    searchHandler() { //Поиск осуществляется без кнопки
              if(this.search === '') {
                this.filtredGoods = this.goods;
              }
              const regexp = new RegExp(this.search, 'gi');
              this.filtredGoods = this.goods.filter((good) => regexp.test(good.title));
    },

    fetch(error, success) {
            let xhr;
          
            if (window.XMLHttpRequest) {
              xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) { 
              xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
          
            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                if(xhr.status === 200) {
                this.haveGoods = true;
                    console.log(this.haveGoods);
                  success(JSON.parse(xhr.responseText));
                    
                } else if(xhr.status > 400) {
                  error('Error');
                }
              }
            }
          
            xhr.open('GET', API_URL, true);
            xhr.send();
    },

    fetchPromise() {
            return new Promise((resolve, reject) => {
              this.fetch(reject, resolve)
            }) 
    },
    showCart(){ //В методичке isVisibleCart
        document.querySelector('.cart').classList.toggle("display-block");
        document.querySelector('.cart').classList.toggle("visually-hidden");
        this.allsum();
    },
    allsum() {
        this.sum = 0;
        let sumHTML = document.querySelector('.sum-price');
        this.busketgoods.forEach(good => {
            this.sum += good.price*good.quantity;
        });
        sumHTML.innerText = this.sum;
    },
    addToCart(e){
    let add = this.filtredGoods[e];
        console.log(add);
        var repeat = false;
        this.busketgoods.forEach(good =>{
            if(good.title === add.title){
                good.quantity+=1;
                repeat = true;
            }
        })
        if (!repeat){
           this.busketgoods.push(add);
            this.busketgoods[this.busketgoods.length-1].quantity = 1;
        }
        this.allsum();
        
    },
    buttonplus(e) {
            this.busketgoods[e].quantity+=1;
        
            let qnt = document.querySelectorAll('.quantity-text')[e];
            qnt.innerText = this.busketgoods[e].quantity;
                this.allsum();
            },
    buttonminus(e) {
            if (this.busketgoods[e].quantity > 1){
                this.busketgoods[e].quantity-=1;
                
                let qnt = document.querySelectorAll('.quantity-text')[e];
                qnt.innerText = this.busketgoods[e].quantity;
                this.allsum();
            }
             else {this.deleteItem(e)}
            },
//    getQuantity(q){
//          return q.quantity;
//      },
      
    deleteItem(el){
        this.busketgoods.splice(el,1);
        this.allsum();
    }

      
  },
  mounted() {
    this.fetchPromise()
      .then(data => {
        this.goods = data;
        this.filtredGoods = data;
      })
      .catch(err => {
        console.log(err);
      }) 
  }
})

