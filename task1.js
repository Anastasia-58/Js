var block = document.querySelector("div div.house"),
    m = 10,
    whitechess = [ '1','&#9814;','&#9816;','&#9815;','&#9813;','&#9812;','&#9815;','&#9816;','&#9814;','1' ],
    whitepawn = [ '2','&#9817;','&#9817;','&#9817;','&#9817;','&#9817;','&#9817;','&#9817;','&#9817;','2' ],
    blackchess = ['8', '&#9820;', '&#9822;', '&#9821;', '&#9819;', '&#9818;', '&#9821;', '&#9822;', '&#9820;', '8'],
    blackpawn = ['7', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '7'],
    alf = ["", "A", "B", "C", "D", "E", "F", "G", "H", ""];

function chess(block) {
    for (var i = 0; i < 10; i++) {
        m--;
        block.insertAdjacentHTML("beforeEnd", "<div class='line" + i + "'></div>");
        var line = document.querySelector("div div.house div.line" + i);
        line.classList.add("chessdesk");
        switch (i) {
            case 0:
                for (var j = 0; j < 10; j++) {
                    line.insertAdjacentHTML("beforeEnd", "<div class ='letter rotate line" + i + " col" + j + "'><span>" + alf[j] + "</span></div>");
                }
                break;
            case 1:
                for (var j = 0; j < 10; j++) {
                    if (j==0){
                        line.insertAdjacentHTML("beforeEnd", "<div class='number padding-top line" + i + " col" + j + "'>" + blackchess[j] + "</div>");
                    }
                    else if (j==9){
                        line.insertAdjacentHTML("beforeEnd", "<div class='rotate number line" + i + " col" + j + "'>" + blackchess[j] + "</div>");
                    }
                    else if (j % 2) {
                        line.insertAdjacentHTML("beforeEnd", "<div class='whitechessboard line" + i + " col" + j + "'>" + blackchess[j] + "</div>");
                    } else {
                        line.insertAdjacentHTML("beforeEnd", "<div class='blackchessboard line" + i + " col" + j + "'>" + blackchess[j] + "</div>");
                    }
                }
                break;
            case 2:
                for (var j = 0; j < 10; j++) {
                    if (j==0){
                        line.insertAdjacentHTML("beforeEnd", "<div class='number padding-top line" + i + " col" + j + "'>" + blackpawn[j] + "</div>");
                    }
                    else if (j==9){
                        line.insertAdjacentHTML("beforeEnd", "<div class='rotate number line" + i + " col" + j + "'>" + blackpawn[j] + "</div>");
                    }
                    else if (j % 2) {
                        line.insertAdjacentHTML("beforeEnd", "<div class='blackchessboard line" + i + " col" + j + "'>" + blackpawn[j] + "</div>");
                    } else {
                        line.insertAdjacentHTML("beforeEnd", "<div class='whitechessboard line" + i + " col" + j + "'>" + blackpawn[j] + "</div>");
                    }
                    }
                break;
            case 7:
                for (var j = 0; j < 10; j++) {
                    if (j==0){
                        line.insertAdjacentHTML("beforeEnd", "<div class='number padding-top line" + i + " col" + j + "'>" + whitepawn[j] + "</div>");
                    }
                    else if (j==9){
                        line.insertAdjacentHTML("beforeEnd", "<div class='rotate number line" + i + " col" + j + "'>" + whitepawn[j] + "</div>");
                    }
                    else if (j % 2) {
                        line.insertAdjacentHTML("beforeEnd", "<div class='whitechessboard line" + i + " col" + j + "'>" + whitepawn[j] + "</div>");
                    } else {
                        line.insertAdjacentHTML("beforeEnd", "<div class='blackchessboard line" + i + " col" + j + "'>" + whitepawn[j] + "</div>");
                    }
                }
                break;
            case 8:
                for (var j = 0; j < 10; j++) {
                    if (j==0){
                        line.insertAdjacentHTML("beforeEnd", "<div class='number padding-top line" + i + " col" + j + "'>" + whitechess[j] + "</div>");
                    }
                    else if (j==9){
                        line.insertAdjacentHTML("beforeEnd", "<div class='rotate number line" + i + " col" + j + "'>" + whitechess[j] + "</div>");
                    }
                    else if (j % 2) {
                        line.insertAdjacentHTML("beforeEnd", "<div class='blackchessboard line" + i + " col" + j + "'>" + whitechess[j] + "</div>");
                    } else {
                        line.insertAdjacentHTML("beforeEnd", "<div class='whitechessboard line" + i + " col" + j + "'>" + whitechess[j] + "</div>");
                    }
                }
                break;
            case 9:
                for (var j = 0; j < 10; j++) {
                    line.insertAdjacentHTML("beforeEnd", "<div class ='letter line" + i + " col" + j + "'><span>" + alf[j] + "</span></div>");
                }
                break;
            default:
                for (var j = 0; j < 10; j++) {
                    if (j == 0) {
                        line.insertAdjacentHTML("beforeEnd", "<div class ='number padding-top line" + i + " col" + j + "'>" + m + "</div>");
                    } else if (j == 9) {
                        line.insertAdjacentHTML("beforeEnd", "<div class =' number padding-bottom rotate line" + i + " col" + j + "'>" + m + "</div>");
                    } else if (i % 2 == j % 2) {
                            line.insertAdjacentHTML("beforeEnd", "<div class='whitechessboard line" + i + " col" + j + "'></div>");
                        } else {
                            line.insertAdjacentHTML("beforeEnd", "<div class='blackchessboard line" + i + " col" + j + "'></div>");
                        }
                }
        }

    }
}
chess(block);
