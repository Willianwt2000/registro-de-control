document.addEventListener('DOMContentLoaded', function () {
  const inputNombre = document.getElementById('nombre');
  const inputPago = document.getElementById('pago');
  const btnAgregar = document.getElementById('agregar');
  const tbody = document.querySelector('tbody');
  

  const datosGuardados = JSON.parse(localStorage.getItem('clientes')) || [];

  function obtenerFechaActual() {
      const fecha = new Date();
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1; // Meses son indexados desde 0
      const año = fecha.getFullYear();
      return `${dia}/${mes}/${año}`;
  }

  function guardarEnLocalStorage(clientes) {
      localStorage.setItem('clientes', JSON.stringify(clientes));
  }

  function cargarDatosGuardados() {
      datosGuardados.forEach(cliente => {
          const newRow = document.createElement('tr');
          newRow.innerHTML = `
              <td>${cliente.nombre}</td>
              <td>${cliente.pago}</td>
              <td>${cliente.fecha} <i class="bi bi-trash-fill" style="float: right; cursor: pointer;"></i></td>`;
          tbody.appendChild(newRow);

          const iconoEliminar = newRow.querySelector('.bi-trash-fill');
          iconoEliminar.addEventListener('click', function () {
              eliminarRegistro(newRow);
          });
      });
  }

  function crearClientes() {
      if (inputNombre.value.trim() === '' || inputPago.value.trim() === '') {
          alert('Por favor, complete todos los campos.');
          return;
      }

      const nuevoCliente = {
          nombre: inputNombre.value,
          pago: inputPago.value,
          fecha: obtenerFechaActual()
      };

      datosGuardados.push(nuevoCliente);
      guardarEnLocalStorage(datosGuardados);

      const newRow = document.createElement('tr');
      newRow.innerHTML = `
          <td>${nuevoCliente.nombre}</td>
          <td>${nuevoCliente.pago}</td>
          <td>${nuevoCliente.fecha} <i class="bi bi-trash-fill"></i></td>`;
      tbody.appendChild(newRow);

      const iconoEliminar = newRow.querySelector('.bi-trash-fill');
      iconoEliminar.addEventListener('click',() =>{
          eliminarRegistro(newRow);
      });

      inputNombre.value = '';
      inputPago.value = '';
  }

  //Eliminar registro
  function eliminarRegistro(row) {
      const index = datosGuardados.findIndex(cliente => cliente.nombre === row.cells[0].textContent);
      if (index !== -1) {
          datosGuardados.splice(index, 1);
          guardarEnLocalStorage(datosGuardados);
      }
      row.remove();
      console.log('Registro eliminado');
  }

  btnAgregar.addEventListener('click', crearClientes);

  window.addEventListener('load', cargarDatosGuardados);
});