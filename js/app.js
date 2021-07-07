const criptomonedasselect=document.querySelector('#criptomonedas');
const monedaHtml=document.querySelector('#moneda');
const resultadoHTML=document.querySelector('#resultado');


const formulario=document.querySelector('#formulario');
//este es para llenar el objeto con los datos que seleccione el usuario
const objetoBusqueda={
    moneda:'', //aqui se pone el name de la etiqueta del html ya que es ahi donde se va a tomar el valor en el selector
    criptomoneda:'' //aqui se pone el name de la etiqueta del html ya que es ahi donde se va a tomar el valor en el selector
}
//crear una promesa con una expresion functin

const obtenerCriptomonedasDescargadas=criptomonedas => new Promise(resolve => {
    resolve(criptomonedas)
});
document.addEventListener('DOMContentLoaded',()=>{
    consultarCriptomonedas();
    formulario.addEventListener('submit',submitformulario)
    criptomonedasselect.addEventListener('change',leervaloralcambiar) //mapeo de la etiqueta correcto porque tengo el atributo name en esa etiqueta
    monedaHtml.addEventListener('change',leervaloralcambiar) //mapeo de la etiqueta correcto porque tengo el atributo name en esa etiqueta

})
function leervaloralcambiar(e)
{
    //llenar el objeto cuando es global
    objetoBusqueda[e.target.name]=e.target.value //llenando el atributo del objeto global
    
}

async function consultarCriptomonedas()
{
    const url='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=50&tsym=USD';
    // fetch(url)
    // .then(respuesta=> respuesta.json())
    // ///.then(resultado=>console.log(resultado.Data)); aqui muestra el arreglo de criptomonedas
    // .then(datos=>obtenerCriptomonedasDescargadas(datos.Data))
    // .then(criptomonedas=>SelectCriptomonedas(criptomonedas))

    try {
        const respuesta= await fetch(url)
        const datos=await respuesta.json()
        const criptomomedass= await obtenerCriptomonedasDescargadas(datos.Data)
        SelectCriptomonedas(criptomomedass)
        
    } catch (error) {
        console.log(error)
        
    }
}
//llenar el select con valores de la api
function SelectCriptomonedas(criptomonedas)
{
    criptomonedas.forEach(element => { //iterador porque es un arreglo
        const {FullName,Name}=element.CoinInfo
        const option=document.createElement('option');
        option.value=Name;
        option.textContent=FullName;
        criptomonedasselect.appendChild(option);
    });

}
function submitformulario(e)
{
    e.preventDefault();
    //validacion
    const {moneda,criptomoneda}=objetoBusqueda;
    if(moneda===''||criptomoneda==='')
    {
        imprimiralerta('Ambos campos son requeridos');
        return;
    }
    //consultar la api con los resultados
    consultarapi();
    
}
function imprimiralerta(mensaje)
{
    const existeerror=document.querySelector('.error');
    if(!existeerror) //sino existe la variable se crea
    {
        const divmensaje=document.createElement('div');
        divmensaje.classList.add('error');
        divmensaje.textContent=mensaje;
        formulario.appendChild(divmensaje)
        setTimeout(() => {
            divmensaje.remove();
        }, 3000);

    }

}
async function consultarapi()
{
    const {moneda,criptomoneda}=objetoBusqueda
    const url=`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
    
    Mostrarespinner();
    // fetch(url)
    // .then (respuesta=>respuesta.json())
    // //.then(datos=>console.log(datos))//esto sirve para ver la informacion usar antes pafra acceder a los daros de forma correcta
    // .then(datos=>
    //     {
    //         MostrarInfo(datos.DISPLAY[criptomoneda][moneda]);

    //     })

        try {
            const resultado1=await fetch(url)
            const respuesta1=await resultado1.json();
            MostrarInfo(respuesta1.DISPLAY[criptomoneda][moneda]);
            
        } catch (error) {
            console.log(error)
            
        }
      
}
function MostrarInfo(cotizacion)
{
    limpiarhtml();
    const {PRICE,HIGHDAY,LOWDAY,HIGH24HOUR,LOW24HOUR,CHANGEPCT24HOUR,LASTUPDATE}=cotizacion
    const precio=document.createElement('p');
    precio.classList.add('precio')
    precio.innerHTML=`El precio es: <span>${PRICE}</span>`;
    //percio alto
    const precioalto=document.createElement('p');
    precioalto.innerHTML=`El precio alto: <span>${HIGHDAY}</span>`;
       //percio bajo
       const preciobajo=document.createElement('p');
       preciobajo.innerHTML=`El precio bajo: <span>${LOWDAY}</span>`;

        //percio bajo
        const ultimahoras=document.createElement('p');
        ultimahoras.innerHTML=`Variacion ultimas 24 horas: <span>${CHANGEPCT24HOUR} %</span>`;
        //percio hora mas alta
        const horanasalta=document.createElement('p');
        horanasalta.innerHTML=`precio mas mas alta ultimas 24 horas: <span>${HIGH24HOUR}</span>`;
        //percio hora mas alta
        const hora_mas_baja=document.createElement('p');
        hora_mas_baja.innerHTML=`precio mas bajo ultimas 24 horas:: <span>${LOW24HOUR}</span>`;
          //percio hora mas alta
        const LASTUPDATEs=document.createElement('p');
        LASTUPDATEs.innerHTML=`Ultima actualizacion: <span>${LASTUPDATE}</span>`;
 
    
    
    
    resultadoHTML.appendChild(precio)
    resultadoHTML.appendChild(precioalto)
    resultadoHTML.appendChild(preciobajo)
    resultadoHTML.appendChild(ultimahoras)
    resultadoHTML.appendChild(horanasalta)
    resultadoHTML.appendChild(hora_mas_baja)
    resultadoHTML.appendChild(LASTUPDATEs)

}
function limpiarhtml()
{
    while(resultadoHTML.firstChild)
    {
        resultadoHTML.removeChild(resultadoHTML.firstChild)
    }
}
function Mostrarespinner()
{
    limpiarhtml();
    const esppinner=document.createElement('div');
    esppinner.classList.add('sk-cube-grid');
    esppinner.innerHTML=`

    <div class="sk-cube sk-cube1"></div>
    <div class="sk-cube sk-cube2"></div>
    <div class="sk-cube sk-cube3"></div>
    <div class="sk-cube sk-cube4"></div>
    <div class="sk-cube sk-cube5"></div>
    <div class="sk-cube sk-cube6"></div>
    <div class="sk-cube sk-cube7"></div>
    <div class="sk-cube sk-cube8"></div>
    <div class="sk-cube sk-cube9"></div>

    `;
    resultadoHTML.appendChild(esppinner)
}