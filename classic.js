/**
 * Monaca Education Classic Library
 *
 * @version 2.1
 * @author  Asial Corporation
 */
/**
 * 行番号を表示するための仕込み
 */
let createError = function() {
    try {
        throw new Error()
    } catch (error) {
        return error
    }
}
// デバッグアシスタントのHTML
let debugArea = document.createElement("section");
let titleArea = document.createElement("h1");
let logArea = document.createElement("ul");
let errorArea = document.createElement("p");
debugArea.classList.add("debug");
logArea.classList.add("log");
errorArea.classList.add("error");
titleArea.innerHTML = "デバッグアシスタント";
debugArea.appendChild(titleArea);
debugArea.appendChild(logArea);
debugArea.appendChild(errorArea);

// デバッグアシスタントのCSS
let educationStyle = document.createElement('style');
educationStyle.innerText = `
section.debug {
    border:solid 2px blue;
    padding:5px;
    display:none;
    margin-top:50px;
}
.debug h1 {
    text-align:center;
    font-size:medium;
}
.debug li {
   list-style-type: circle;
}
.debug .error {
}
.debug li.error {
   list-style-type: square;
}
.debug li.log::before {
}
`;

function createDebugArea() {
    document.body.appendChild(debugArea);
    document.querySelector("head").appendChild(educationStyle);
}
window.addEventListener('load', createDebugArea);

// エラー発生時の振る舞いを変更
onerror = function(message, file, line, col, error)  {
    debugArea.style.display = "block";
    debugArea.style.borderColor = "red";

    let filename = file.match(/[^/]+$/);
    let messageJ = message;
    // Syntax
    messageJ     = messageJ.replace("Uncaught SyntaxError:", "文法に間違いがあるようです <br> ");
    // Reference
    messageJ     = messageJ.replace("Uncaught ReferenceError:", "未定義の変数や関数を呼び出している可能性があります <br> ");
    // Type
    messageJ     = messageJ.replace("Uncaught TypeError:", "関数ではないものを関数として呼んだ？ <br> ");
    // Unexpected
    messageJ     = messageJ.replace("Unexpected token", "恐らく記号にミスがあります <br> ");
    messageJ     = messageJ.replace("Unexpected end of input", "恐らく閉じ括弧が抜けています <br> ");
    // その他
    messageJ     = messageJ.replace(" is not defined", "は未定義です<br> ");
    messageJ     = messageJ.replace(" is not a function", "は関数ではありません<br> ");
    messageJ     = messageJ.replace(" Invalid or unexpected token", "不正もしくは予期しない記号が混ざり込んでいるようです");
    messageJ     = messageJ.replace(" Invalid regular expression", "不正な式が混ざり込んでいるようです");
    messageJ     = messageJ.replace("missing", "原因は恐らく");

    // エラー原因のファイル名が分かる場合はそれを表示
    if (filename) {
        messageJ     += " <br> " + filename + " ファイルの " + line + "行目付近を確認して下さい";
    } else {
        messageJ     += " <br> 原因箇所は不明です。各種デバッガーを使えば詳細が分かるかもしれません。";
    }
    errorArea.innerHTML += messageJ + "<br>";
}

/**
 * Monaca Education AlternativeAlert 
 *
 * @version 2.1
 * @author  Asial Corporation
 */
/*
let alertDialog = document.createElement("dialog");
alertDialog.id = "alertDialog";
alertDialog.addEventListener('click', function onOpen() 
{
    alertDialog.close();
    alertDialogMessage.innerHTML = "";
});
let alertDialogMessage = document.createElement("p");
alertDialog.appendChild(alertDialogMessage);
// dialog要素が使えるブラウザの場合はalert()を独自関数に置き換える
if (typeof alertDialog.showModal === "function") {
    window.alert = function (...message) {
        alertDialogMessage.innerHTML += message.join() + "<br>";
        // alertDialogのDOM構築後であれば、自分でshowModal()などを行う
        if (document.getElementById("alertDialog")) {
            if(alertDialog.open === false) {
                alertDialog.showModal();
            }
        }
    }
}
// loadイベントのタイミングでbody要素にダイアログ要素を追記
window.addEventListener('load', createAlertDialog);
// ダイアログ要素をbody要素に追記する関数。表示すべきメッセージがあれば表示も行う。
function createAlertDialog() {
    document.body.appendChild(alertDialog);
    if (alertDialogMessage.innerText.length > 0) {
        alertDialog.showModal();
    }
}
*/