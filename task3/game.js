var ok, gain = 0,
    run = true;

run = write(works.a00, works.a1, works.a2, works.a3, works.a4, works.a0, works.a11);
if (run) {
    run = write(works.b00, works.b1, works.b2, works.b3, works.b4, works.b0, works.b11);
    if (run) {
        run = write(works.c00, works.c1, works.c2, works.c3, works.c4, works.c0, works.c11);
    }
}
alert("Ваш выигрыш составляет: " + gain);
alert('Спасибо за игру');

//------------------------------------------
function write(question, var1, var2, var3, var4, col, ans) {
    var event, next = true;
    do { 
        ok = false;
        event = +prompt(question + var1 + var2 + var3 + var4 + '-1 - Забрать деньги');

        if (event == -1) {
            next = false;
            break;
        } else {
            ok = isAnswer(col, event);
        }
    } while (!ok);
    if (next) {
        if (event == ans) {
            gain += 100;
            alert("Верный ответ! Ваш выигрыш составляет: " + gain);
        } else {
            alert("К сожалению, вы ошиблись. Правильный ответ: " + ans);
        }
    }
    return next;
}

function isAnswer(q, event) {
    if (isNaN(event) || !isFinite(event)) {
        alert('Вы ввели недопустимый символ');
        return false;
    } else if (event < 1 || event > q) {
        alert('Ваше число выходит из допустимого диапозона');
        return false;
    }
    return true;

}
