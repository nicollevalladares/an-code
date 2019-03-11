var editor = CodeMirror(document.getElementById('html'), {
    lineNumbers: true,
    mode:'xml'
  });

  var editor2 = CodeMirror(document.getElementById('css'), {
    lineNumbers: true,
    mode:'css'
  });

  var editor3 = CodeMirror(document.getElementById('js'), {
    lineNumbers: true,
    mode:'javascript'
  });

  var input = document.getElementById("select");
  function selectTheme() {
    var theme = input.options[input.selectedIndex].textContent;
    editor.setOption("theme", theme);
    editor2.setOption("theme", theme);
    editor3.setOption("theme", theme);
    location.hash = "#" + theme;
  }
  var choice = (location.hash && location.hash.slice(1)) ||
              (document.location.search &&
                decodeURIComponent(document.location.search.slice(1)));
  if (choice) {
    input.value = choice;
    editor.setOption("theme", choice);
    editor2.setOption("theme", choice);
    editor3.setOption("theme", choice);
  }
  CodeMirror.on(window, "hashchange", function() {
    var theme = location.hash.slice(1);
    if (theme) { input.value = theme; selectTheme(); }
  });

  function ejecutarProyecto(){
      
  }

  function guardarProyecto(){
    location.href = "proyectos.html";
  }