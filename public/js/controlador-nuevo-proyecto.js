var HTML = CodeMirror(document.getElementById('html'), {
    lineNumbers: true,
    mode:'xml'
  });

  var CSS = CodeMirror(document.getElementById('css'), {
    lineNumbers: true,
    mode:'css'
  });

  var JS = CodeMirror(document.getElementById('js'), {
    lineNumbers: true,
    mode:'javascript'
  });

  var input = document.getElementById("select");
  function selectTheme() {
    var theme = input.options[input.selectedIndex].textContent;
    HTML.setOption("theme", theme);
    CSS.setOption("theme", theme);
    JS.setOption("theme", theme);
    location.hash = "#" + theme;
  }
  var choice = (location.hash && location.hash.slice(1)) ||
              (document.location.search &&
                decodeURIComponent(document.location.search.slice(1)));
  if (choice) {
    input.value = choice;
    HTML.setOption("theme", choice);
    CSS.setOption("theme", choice);
    JS.setOption("theme", choice);
  }
  CodeMirror.on(window, "hashchange", function() {
    var theme = location.hash.slice(1);
    if (theme) { input.value = theme; selectTheme(); }
  });

  function ejecutarProyecto(){
    var html = HTML.getValue();
    var css = CSS.getValue();
    var js = JS.getValue();

    var estructura = `<!DOCTYPE html>
                      <html>
                      <head>
                            <meta charset="utf-8">
                            <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
                      <style>
                            body{
                              background-color: #f8f9fc !important;
                            }
                            
                            ${css}  
                      </style>  
                      </head>
                      <body>
                            ${html} 
                      <script>${js}<"/script>
                      </body>

                      </html>`;

    var res = document.getElementById("resultado").contentWindow.document;
    res.body.innerHTML=estructura;
  }

  function guardarProyecto(){
    location.href = "proyectos.html";
  }