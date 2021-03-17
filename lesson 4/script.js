//1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.

//var str = "'Давай скорее!' – попросила мама. 'Ты будешь обедать?' – спросила бабушка. 'Я хочу поиграть на этой площадке', – ответил мне брат."
//
//const regexp = /'/gm;
//console.log(str.match(regexp));
//console.log(str.replace(regexp, '"'));

//2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.

//var str = "'Давай скорее!' – попросила мама. 'Ты будешь обедать?' – спросила бабушка. 'Я хочу поиграть на этой площадке', – ответил мне брат. are'n I'm"
//
//const regexp = /\B'\B/gmi;
//console.log(str.replace(regexp, '"'));

//3. *Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
//a. Имя содержит только буквы.
//b. Телефон имеет вид +7(000)000-0000.
//c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
//d. Текст произвольный.
//e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.

var button = document.querySelector('#but');
var name = document.querySelector('#name');
var phone = document.querySelector('#phone');
var email = document.querySelector('#email');
var regExpName = /\d/;
var regExpPhone = /\+7([0-9]{3})[0-9]{3}-[0-9]{4}/;
var regExpEmail = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/
console.log(name);
console.log(phone);

button.addEventListener('click',(e)=>{
    if(regExpName.test(name.value) && name.value!=''){
        console.log(name.value);
        name.classList.add('red');
        alert('Ошибка! Некорректный name');
    }
    if(regExpPhone.test(phone.value) && phone.value!=''){
        phone.classList.add('red');
        alert('Ошибка! Некорректный phone');
    }
    if(!regExpEmail.test(email.value) && email.value!=''){
        email.classList.add('red');
        alert('Ошибка! Некорректный email');
    }
});