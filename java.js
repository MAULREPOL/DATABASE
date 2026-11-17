document.addEventListener("DOMContentLoaded", cargarTareas);

function AgregarTarea() {

  let nuevatarea = document.getElementById("nuevatarea").value;

  if (nuevatarea === "") {
    alert("Ingresa una tarea.");
    return;
  }

  // Crear elemento visual
  let nuevatarea2 = document.createElement("li");
  nuevatarea2.textContent = nuevatarea + " ";

  let botonEli = document.createElement("button");
  botonEli.textContent = "BORRAR";
  
  



  nuevatarea2.appendChild(botonEli);
  document.getElementById("listaTareas").appendChild(nuevatarea2);

  // Guardar en localStorage
  guardarTareaDB(nuevatarea);

  // Limpiar input
  document.getElementById("nuevatarea").value = "";
}
function eliminarTareaBD(id) {

    fetch(`http://localhost:5000/tareas/${id}`, {
        method: "DELETE"
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        console.log(datos);
    })
    .catch(error => {
        console.log(error);
    });
  }

function guardarTareaDB(tarea) {

    fetch("http://localhost:5000/tareas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            titulo: tarea
        })
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        console.log(datos);
    })
    .catch(error => {
        console.log(error);
    });

}


// --- FUNCIONES DE LOCALSTORAGE ---

function guardarTarea(tarea) {
  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas.push(tarea);
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function cargarTareas() {

    console.log("Cargando tareas...");

    fetch("http://localhost:5000/tareas")
        .then(respuesta => respuesta.json())
        .then(tareas => {

            console.log(tareas);

            tareas.forEach(tarea => {

                let li = document.createElement("li");

                li.textContent = tarea.titulo + " ";

                let botonEli = document.createElement("button");

                botonEli.textContent = "Eliminar";

                botonEli.onclick = function() {

                  eliminarTareaBD(tarea.id);

                  li.remove();

                };

              li.appendChild(botonEli);

              document.getElementById("listaTareas").appendChild(li);

            });

        })
        .catch(error => {
            console.log(error);
        });

}

function eliminarTarea(tarea) {
  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  let nuevas = tareas.filter(t => t !== tarea);
  localStorage.setItem("tareas", JSON.stringify(nuevas));
}
