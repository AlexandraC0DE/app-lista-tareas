document.addEventListener('DOMContentLoaded', function () {
    const listaTareas = document.getElementById("listaTareas");
    const nuevaTareaInput = document.getElementById("nuevaTarea");
    const agregarBtn = document.getElementById("agregarBtn");
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    let editando = false;
    let tareaActual = "";

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
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", function () {
            eliminarTarea(li, tarea);
        });
        li.appendChild(btnEliminar);

        // Agregar boton de editar tarea
        let btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", function () {
            editarTarea(li, tarea);
        });
        li.appendChild(btnEditar);
        return li;
    }

    function agregarTarea() {
        let tarea = nuevaTareaInput.value;
        if (tarea === "") {
            alert("La tarea no puede estar vacía.");
            return;
        }
        if (editando) {
            alert("Debe finalizar la edición antes de agregar una nueva tarea");
            return;
        }
        if (tareas.includes(tarea)) {
            alert("Ya existe una tarea con ese nombre, ingrese uno diferente.");
            return;
        }
        // Agrega la tarea a la lista y al almacenamiento local
        tareas.push(tarea);
        guardarTareas();

        // Crea el elemento li y lo agrega a la lista de tareas
        let li = crearListItem(tarea);
        listaTareas.appendChild(li);

        // Limpia el input y enfoca en él
        nuevaTareaInput.value = "";
        nuevaTareaInput.focus();
        editando = false;
    }

    function eliminarTarea(li, tarea) {
        if (editando) {
            alert("Debe finalizar la edición antes de eliminar una tarea.");
            return;
        }
        // Elimina la tarea de la lista y del almacenamiento local
        listaTareas.removeChild(li);
        tareas.splice(tareas.indexOf(tarea), 1);
        guardarTareas();
    }

    document.getElementById("formulario-editar-tarea").addEventListener("submit", guardarTareaEditada);

    function editarTarea(li, tarea) {
        if (editando) {
            alert("Debe finalizar la edición antes de comenzar otra.");
            return;
        }
        //Activa el modo de edición
        editando = true;
        tareaActual = tarea;

        function guardarTareaEditada(event) {
            event.preventDefault();
            //Actualizar la tarea en el almacenamiento local
            tareas[tareas.indexOf(tareaActual)] = nuevaTareaInput.value;
            guardarTareas();

            //Actualizar la tarea en la lista
            li.textContent = nuevaTareaInput.value;
            nuevaTareaInput.value = "";
            nuevaT
        }

        //Agrega un input de texto con el valor de la tarea Actual en el elemento li y oculta el contenido de texto
        let inputEditar = document.createElement("input");
        inputEditar.type = "text";
        inputEditar.value = tarea;
        li.textContent = "";
        li.appendChild(inputEditar);

        //Agrega un boton de guardar y cancelar
        let btnGuardar = document.createElement("button");
        btnGuardar.textContent = "Guardar";
        btnGuardar.addEventListener("click", function () {
            guardarEdicion(li, tarea);
        });
        li.appendChild(btnGuardar);
        let btnCancelar = document.createElement("button");
        btnCancelar.textContent = "Cancelar";
        btnCancelar.addEventListener("click", function () {
            cancelarEdicion(li, tarea);
        });
        li.appendChild(btnCancelar);
    }
    function guardarEdicion(li, tarea) {
        let nuevaTarea = li.firstChild.value;
        if (nuevaTarea === "") {
            alert("La tarea no puede estar vacía.");
            return;
        }
        if (tareas.includes(nuevaTarea)) {
            alert("Ya existe una tarea con ese nombre, ingrese uno diferente.");
            return;
        }
        tareas[tareas.indexOf(tarea)] = nuevaTarea;
        guardarTareas();
        li.textContent = nuevaTarea;
        li.appendChild(crearBtnEditar());
        li.appendChild(crearBtnEliminar());
        editando = false;
    }
    function cancelarEdicion(li, tarea) {
        li.textContent = tarea;
        li.appendChild(crearBtnEditar());
        li.appendChild(crearBtnEliminar());
        editando = false;
    }
    function crearBtnEditar() {
        let btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", function () {
            let tarea = this.parentNode.firstChild.data;
            editarTarea(this.parentNode, tarea);
        });
        return btnEditar;
    }

    function crearBtnEliminar() {
        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", function () {
            let tarea = this.parentNode.firstChild.data;
            eliminarTarea(this.parentNode, tarea);
        });
        return btnEliminar;
    }

    function guardarTareas() {
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }
});    
