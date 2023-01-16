    document.addEventListener('DOMContentLoaded', function () {
        let listaTareas = document.getElementById("listaTareas");
        let nuevaTareaInput = document.getElementById("nuevaTarea");
        let agregarBtn = document.getElementById("agregarBtn");
        let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
        let editando = false;

        // Cargar tareas guardadas en el almacenamiento local al cargar la página
        tareas.forEach(function (tarea) {
            let li = crearListItem(tarea);
            listaTareas.appendChild(li);
        });

        // Agregar tarea al presionar el botón o la tecla Enter
        agregarBtn.addEventListener("click", agregarTarea);
        nuevaTareaInput.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                agregarTarea();
            }
        });

        // Crea un elemento li con la tarea y los botones de eliminar y editar
        function crearListItem(tarea) {
            let li = document.createElement("li");
            li.textContent = tarea;

        // Agregar botón de eliminar tarea
let btnEliminar = document.createElement("button");
btnEliminar.innerHTML = "Eliminar";
btnEliminar.addEventListener("click", function(){
eliminarTarea(li, tarea);
});
li.appendChild(btnEliminar);

        // Agregar boton de editar tarea 
        let btnEditar = document.createElement("button");
        btnEditar.innerHTML = "Editar";
        btnEditar.addEventListener("click", function(){
            editarTarea(li, tarea);
        });
        li.appendChild(btnEditar);

        return li;
    }

    function agregarTarea() {
        let tarea = nuevaTareaInput.value;
        if (tarea === "" || editando) {
            return;
        }
        // Agrega la tarea a la lista y al almacenamiento local
        tareas.push(tarea);
        localStorage.setItem("tareas", JSON.stringify(tareas));

        // Crea el elemento li y lo agrega a la lista de tareas en el HTML
        let li = crearListItem(tarea);
        listaTareas.appendChild(li);
        nuevaTareaInput.value = "";
        console.log("Tarea agregada: " + tarea);
    }

    function eliminarTarea(li, tarea) {
        tareas.splice(tareas.indexOf(tarea), 1);
        localStorage.setItem("tareas", JSON.stringify(tareas));
        listaTareas.removeChild(li);
        console.log("Tarea eliminada: " + tarea);
    }

    function editarTarea(li, tarea) {
        if(editando) return;
        editando = true;
        let valorActual = li.firstChild.nodeValue;
        let input = document.createElement("input");
        input.type = "text";
        input.value = valorActual;
        li.replaceChild(input, li.firstChild);
        //crear botón guardar
        let btnGuardar = document.createElement("button");
        btnGuardar.innerHTML = "Guardar";
        btnGuardar.addEventListener("click", function(){
            guardarTarea(li, input, tarea);
        });
        li.appendChild(btnGuardar);

        //agrega evento keydown para guardar al presionar enter
        input.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                guardarTarea(li, input, tarea);
            }
        });
    }

    function guardarTarea(li, input, tarea) {
        let nuevaTarea = input.value;
        tareas[tareas.indexOf(tarea)] = nuevaTarea;
        localStorage.setItem("tareas", JSON.stringify(tareas));
        li.replaceChild(document.createTextNode(nuevaTarea), input);
        let btnGuardar = li.querySelector("button");
        li.removeChild(btnGuardar);
        editando = false;
        console.log("Tarea guardada: " + nuevaTarea);
        }
        });
