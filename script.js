// Crea un array vacío para almacenar las tareas
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Función para agregar una tarea
function agregarTarea(tarea) {
    tareas.push(tarea);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    let listaTareas = document.getElementById("listaTareas");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(tarea));

    // Agregar botón de eliminar tarea
    let btnEliminar = document.createElement("button");
    btnEliminar.innerHTML = "Eliminar";
    btnEliminar.onclick = function() {
        eliminarTarea(li);
    };
    li.appendChild(btnEliminar);
    listaTareas.appendChild(li);
    console.log("Tarea agregada: " + tarea);
}

// Función para eliminar una tarea
function eliminarTarea(li) {
    let tareaEliminada = tareas[tareas.indexOf(li.firstChild.nodeValue)];
    tareas.splice(tareas.indexOf(li.firstChild.nodeValue), 1);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    let listaTareas = document.getElementById("listaTareas");
    listaTareas.removeChild(li);
    console.log("Tarea eliminada: " + tareaEliminada);
}

// Agregar evento onload al body
window.onload = function() {
    // Recuperar tareas del localStorage
    tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    // Mostrar tareas en la lista
    let listaTareas = document.getElementById("listaTareas");
    for (let i = 0; i < tareas.length; i++) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(tareas[i]));

        // Agregar botón de eliminar tarea
        let btnEliminar = document.createElement("button");
        btnEliminar.innerHTML = "Eliminar";
        btnEliminar.onclick = function() {
            eliminarTarea(li);
        };
        li.appendChild(btnEliminar);
        listaTareas.appendChild(li);
    }

    // Agregar evento keydown al input de nueva tarea
    let inputTarea = document.getElementById("nuevaTarea");
    inputTarea.addEventListener("keydown", function(event) {
        if (event.keyCode === 13) {
            agregarTarea(inputTarea.value);
            inputTarea.value = "";
        }
    });
}
