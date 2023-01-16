document.addEventListener('DOMContentLoaded', function () {
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    // Cargar tareas guardadas en el almacenamiento local al cargar la página
    tareas.forEach(function (tarea) {
        let listaTareas = document.getElementById("listaTareas");
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(tarea));

        // Agregar botón de eliminar tarea
        let btnEliminar = document.createElement("button");
        btnEliminar.innerHTML = "Eliminar";
        btnEliminar.onclick = () => eliminarTarea(li);
        li.appendChild(btnEliminar);

        // Agregar boton de editar tarea 
        let btnEditar = document.createElement("button");
        btnEditar.innerHTML = "Editar";
        btnEditar.onclick = () => editarTarea(li);
        li.appendChild(btnEditar);

        listaTareas.appendChild(li);
    });

    function agregarTarea() {
        let tarea = document.getElementById("nuevaTarea").value;
        tareas.push(tarea);
        localStorage.setItem("tareas", JSON.stringify(tareas));

        // Crear elemento li y agregarlo a la lista de tareas en el HTML
        let listaTareas = document.getElementById("listaTareas");
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(tarea));

        // Agregar botón de eliminar tarea
        let btnEliminar = document.createElement("button");
        btnEliminar.innerHTML = "Eliminar";
        btnEliminar.onclick = () => eliminarTarea(li);
        li.appendChild(btnEliminar);

        // Agregar boton de editar tarea 
        let btnEditar = document.createElement("button");
        btnEditar.innerHTML = "Editar";
        btnEditar.onclick = () => editarTarea(li);
        li.appendChild(btnEditar);

        listaTareas.appendChild(li);
        document.getElementById("nuevaTarea").value = "";
        console.log("Tarea agregada: " + tarea);
    }
    
    document.getElementById("agregarBtn").addEventListener("click", agregarTarea);

    document.getElementById("nuevaTarea").addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {
            agregarTarea();
        }
    });

    function eliminarTarea(li) {
        let tareaEliminada = tareas[tareas.indexOf(li.firstChild.nodeValue)];
        tareas.splice(tareas.indexOf(li.firstChild.nodeValue), 1);
        localStorage.setItem("tareas", JSON.stringify(tareas));
        let listaTareas = document.getElementById("listaTareas");
        listaTareas.removeChild(li);
        console.log("Tarea eliminada: " + tareaEliminada);
    }

    function editarTarea(li) {
        let valorActual = li.firstChild.nodeValue;
        let input = document.createElement("input");
        input.type = "text";
        input.value = valorActual;
        li.replaceChild(input, li.firstChild);

        input.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                let nuevoValor = input.value;
                tareas[tareas.indexOf(valorActual)] = nuevoValor;
                localStorage.setItem("tareas", JSON.stringify(tareas));
                li.replaceChild(document.createTextNode(nuevoValor), input);
                li.removeChild(btnGuardar);
            }
        });

        let btnGuardar = document.createElement("button");
        btnGuardar.innerHTML = "Guardar";
        btnGuardar.onclick = function () {
            let nuevoValor = input.value;
            tareas[tareas.indexOf(valorActual)] = nuevoValor;
            localStorage.setItem("tareas", JSON.stringify(tareas));
            li.replaceChild(document.createTextNode(nuevoValor), input);
            li.removeChild(btnGuardar);
        };

        li.appendChild(btnGuardar);
    }

});





