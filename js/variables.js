
function VerEdad(){
    console.log(document.getElementById("edad").value);
    }
    

const Bienvenido = ()=> {
    let usuario=prompt("Ingreaste a una calculadora de precios, ingresa tu nombre: ");
    while(usuario===""){
        usuario= prompt("Ingreaste a una calculadora de notas, ingresa tu nombre: ");
    }
    console.log("Hola "+ usuario);
};




function limpiar(){
    document.getElementById('miFormulario').reset();
}
function sumar(){
    let x= parseInt(document.getElementById('valor1').value);
    let y= parseInt(document.getElementById('valor2').value);
    
    document.getElementById('el-resultado').innerHTML=x+y;
}
function restar(){
    let x= parseInt(document.getElementById('valor1').value);
    let y= parseInt(document.getElementById('valor2').value);
    
    document.getElementById('el-resultado').innerHTML=x-y;
}
function multiplicar(){
    let x= parseInt(document.getElementById('valor1').value);
    let y= parseInt(document.getElementById('valor2').value);
    
    document.getElementById('el-resultado').innerHTML=x*y;
}
function dividir(){
    let x= parseInt(document.getElementById('valor1').value);
    let y= parseInt(document.getElementById('valor2').value);
    
    document.getElementById('el-resultado').innerHTML=x/y;
}
function calcularPorcentaje (numero, porcentaje){
    return numero / 100* porcentaje;

}
function pesosDolares(valNum) {
    document.getElementById("inputDolares").value=valNum*1;
  }
  function dolaresPesos(valNum) {
    document.getElementById("inputPesos").value=valNum*180;
  }


const a=["COCO", "MARACUYA","ARANDANOS" ]
console.log(a);
console.log(a.length)
console.log(a [1])
const Nombre1={
    nombre : "Maximiliano",
    apellido: "Vega",
    edad: "35",
    soltero: false,
}

let NombreString=JSON.stringify(Nombre1);
let NombreStr=JSON.parse(NombreString);

console.log(Nombre1);
console.log(Nombre1.nombre);
console.log(Nombre1.edad); 
console.log(Nombre1.apellido);
console.log(Nombre1.soltero);


 let NumerosPrimeros = ['Luis',"Tus compras son por trimestre:", '18', '15', '19'];
let NumerosSegundos = ['Juan', "Tus compras son por trimestre:",'15', '19', '17'];
let NumerosTerceros= ['Pedro',"Tus notas son por trimestre:", '10', '19', '18'];
let NumerosFinales = NumerosPrimeros.concat(NumerosSegundos).concat(NumerosTerceros);
console.log(NumerosFinales)



Bienvenido();


const carrito = document.getElementById('carrito');
const barritas = document.getElementById('lista-barras');
const listaBarritas = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

cargarEventListeners();

function cargarEventListeners(){
  barritas.addEventListener('click', comprarBarra);
  
  carrito.addEventListener('click', eliminarBarra);
  
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

  document.addEventListener('DOMContentLoaded', cargarLocalStorage);
}

function comprarBarra(e){
  e.preventDefault();
  
  if(e.target.classList.contains('agregar-carrito')){
    const barra = e.target.parentElement.parentElement;
    
    leerDatosBarra(barra);
  }
}

function leerDatosBarra(barra){
  
  const infoBarra = {
    imagen: barra.querySelector('img').src,
    titulo: barra.querySelector('h4').textContent,
    precio: barra.querySelector('.precio span').textContent,
    id: barra.querySelector('a').getAttribute('data-id')
  }
  
  insertarCarrito(infoBarra);
}

function insertarCarrito(infoBarra){
 
  
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>
      <img src="${infoBarra.imagen}" width=100>
    </td>
    <td>${infoBarra.titulo}</td>
    <td>${infoBarra.precio}</td>
    <td>
      <a href="#" class="borrar-barra" data-id="${infoBarra.id}">X</a>
    </td>
  `;
  
  listaBarritas.appendChild(row);

  guardarBarraLocalStorage(infoBarra);
}

function eliminarBarra(e){
  e.preventDefault();
  
  let barra, barraId;
  
  if(e.target.classList.contains('borrar-barra')){
    
    barra = e.target.parentElement.parentElement;
    e.target.parentElement.parentElement.remove();
    barraId = barra.querySelector('a').getAttribute('data-id');
    console.log(barraId);
  }
  
  eliminarBarraLocalStorage(barraId);
}

function vaciarCarrito(){

  while(listaBarritas.firstChild){
    listaBarritas.removeChild(listaBarritas.firstChild);
  }
  
  vaciarCarritoLocalStorage();
  return false;
}

function guardarBarraLocalStorage(infoBarra){
  let barritas;

  barritas = obtenerBarritasLocalStorage();
  barritas.push(infoBarra);
  
  localStorage.setItem('barritas', JSON.stringify(barritas));
}

function obtenerBarritasLocalStorage(){
  
  let barrasLS;

  if(localStorage.getItem('barritas') === null){
    barrasLS = [];
  } else {
    barrasLS = JSON.parse(localStorage.getItem('barritas'));
  }

  return barrasLS;
}

function cargarLocalStorage(){
  let barritas;

  barritas = obtenerBarritasLocalStorage();

  barritas.forEach(barra => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${barra.imagen}" width=100>
      </td>
      <td>${barra.titulo}</td>
      <td>${barra.precio}</td>
      <td>
        <a href="#" class="borrar-barra" data-id="${barra.id}">X</a>
      </td>
    `;
    
    listaBarritas.appendChild(row);
  });
}

function eliminarBarraLocalStorage(barraId){
  let barritas;

  barritas = obtenerBarritasLocalStorage();
  
 
  
  for(i=0; i<barritas.length; i++){
    if(barritas[i].id === barraId){
      barritas.splice(i, 1);
      break;
    }
  }
  localStorage.setItem('barritas', JSON.stringify(barritas));
}

function vaciarCarritoLocalStorage(){
  localStorage.clear();
}