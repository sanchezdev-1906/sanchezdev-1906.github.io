let editor = $(".editform .editor textarea")[0]
let form = $(".editform")[0]
let historial = [""];

// * Logica del formulario
$(".editor button").on("click",(e)=>{
  e.preventDefault()
})

$("form").on("submit",(e)=>{
  e.preventDefault()
  let validForm = true
  let data = {}
  
  // logica de agregar la imagen
  let filetype
  if (form.image.files.length > 0) {
    filetype = form.image.files[0].type  
  }

  if (form.image.files.length == 0) {
    $(".fieldimage").addClass("warning")
    let message = $(".fieldimage .message")[0];
    message.textContent = "Agregue una imagen"
   
    data.img = undefined
    validForm = false
  }
  else if (!(filetype == "image/png" || filetype == "image/jpg" || filetype == "image/webp" || filetype == "image/jpeg")) {
    console.log(filetype);
    $(".fieldimage").addClass("warning")
    let message = $(".fieldimage .message")[0];
    message.textContent = `La imagen debe ser png/jpg/jpeg/webp`
    
    data.img = undefined
    validForm = false
  }else{
    const imgURL = $('#previewimage')[0];
    data.img = imgURL.src
  }

  // logica de titulo
  let title = form.title.value
  if (title == "" || title.length > 150 || title.length < 15) {
    $(".fieldtitle").addClass("warning")
    $(".fieldtitle .message").html(`El titulo debe tener de 15 a 150 caracteres`)
    validForm = false
  }

  data.title = title
  // logica de las etiquetas, pueden no haber 
  let tags = form.tags.value
  if (tags == "") {
    data.tags = []
  }
  else{
    data.tags = tags.split(" ")
  }

  let content = form.content.value
  if (content.length == 0) {
    $(".editor").addClass("warning")
    $(".editor .message").html("Debe haber contenido")
    validForm = false
  }
  data.content = content
  data.user = JSON.parse(localStorage.getItem("localuser")).username
  data.likes = 0
  data.datetime = new Date().toISOString()

  if (validForm) {
    let request = indexedDB.open("dover", 1)
    request.onerror = function(event) {
      console.log("Error al abrir la base de datos");
    };
    request.onsuccess = ()=>{
        let db = request.result
        let transaction = db.transaction(["articles"], "readwrite")
        let objectStorage = transaction.objectStore("articles")
        
        let req = objectStorage.add(data)

        req.onsuccess = ()=>{
            location.replace(`index.html?action=login`)
        }
    }
  }
})

$("#inputimage").on("change",function (e) {
  let input = e.target
  const img = $('#previewimage')[0];
  if (input.files.length > 0) {
    const selectedFile = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const base64URL = e.target.result;
        img.src = base64URL;
        img.classList.remove("hidden");
      };

    reader.readAsDataURL(selectedFile);
  } else {
    img.src = '';
    img.classList.add("hidden");
  }
})
$(".fieldtitle .title").on("keypress",()=>{
  $(".fieldtitle").removeClass("warning")
})
$("#inputimage").on("change",()=>{
  $(".fieldimage").removeClass("warning")
})
$("#content").on("keypress",()=>{
  $(".editor").removeClass("warning")
})

// * Logica del editor
$(editor).on("input",(e)=>{
  if (e.originalEvent.data == " " || e.originalEvent.data == undefined) {
    historial.push(editor.value);
  }
})
$(".button-bold").on("click",()=>{
  var selectedText = getSelectedTextOrWord(editor);
  var newText = '**' + selectedText + '**';
  insertTextAtCursor(editor, newText);
})
$(".button-italic").on("click",()=>{
  var selectedText = getSelectedTextOrWord(editor);
  var newText = '*' + selectedText + '*';
  insertTextAtCursor(editor, newText);
})

// Deshacer un cambio
$(document).on("keydown",(e)=>{
  if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
    e.preventDefault();
    if (historial.length > 1) {
      historial.pop(); // TODO El cambio es permanente
      editor.value = historial[historial.length - 1];
    }
  }
})
/* $(document).on("keydown",(e)=>{
  if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
    e.preventDefault();
    if (historial.length > 1 && historial.length) {
      historial.pop(); // TODO
      textarea.value = historial[historial.length - 1];
    }
  }
}) */

function getSelectedTextOrWord(textarea) {
  var text = textarea.value;
  var selectionStart = textarea.selectionStart;
  var selectionEnd = textarea.selectionEnd;

  if (selectionStart !== selectionEnd) {
      return text.substring(selectionStart, selectionEnd);
  }

  var startOfWord = text.lastIndexOf(' ', selectionStart - 1) + 1;
  var endOfWord = text.indexOf(' ', selectionStart);

  startOfWord = startOfWord === -1 ? selectionStart : startOfWord;
  endOfWord = endOfWord === -1 ? selectionStart : endOfWord;

  return text.substring(startOfWord, endOfWord);
}

function insertTextAtCursor(textarea, newText) {
  var text = textarea.value;
  var selectionStart = textarea.selectionStart;
  var selectionEnd = textarea.selectionEnd;

  var newTextLength = newText.length;
  var newTextStart = text.substring(0, selectionStart) + newText;
  var newTextEnd = text.substring(selectionEnd);

  textarea.value = newTextStart + newTextEnd;

  textarea.setSelectionRange(selectionStart + newTextLength, selectionStart + newTextLength);

  textarea.focus();
}
