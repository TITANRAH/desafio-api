const seleccionDeMoneda = document.getElementById("seleccionDeMoneda");

let html = "";
let monedasCambio = "";
let valorSelected;
let resultado = "";
let ultimosDiezRegistros = [];

//FUNCION PARA OBTENER LA DATA GENERAL
async function getData() {
    const urlBase = "https://mindicador.cl/api";
  try {
    const res = await fetch(urlBase);
    monedasCambio = await res.json();
    cargaSelect(monedasCambio);
  } catch (e) {
    alert("Hubo un error, vuelve a intentarlo..", e);
  }
}

//FUNCION PARA OBTENER LA DATA DE LOS ULTIMOS 10 DIAS CON PARAMETRO
async function getLast10Dias(endPoint) {
    const urlBaseLast = "https://mindicador.cl/api/";
  try {

    const res = await fetch(`${urlBaseLast}${endPoint}`);
    lastDays = await res.json();
    lastRegistros = lastDays.serie;
    ultimosDiezRegistros = lastRegistros.slice(lastRegistros.lenght, 10);

    valor = ultimosDiezRegistros.map((ele) => {
      return ele.valor;
    });

    fecha = ultimosDiezRegistros.map((ele) => {
      return ele.fecha.slice(0, 10);
    });
  } catch (e) {
    alert("Hubo un error, vuelve a intentarlo..", e);
  }

  graficoChart(fecha, valor);

}

//FUNCION GRAFICO CON PARAMETROS
function cargaSelect(monedasCambio) {
  html = `<option value="">Seleccionar Moneda</option>
            <option name="${monedasCambio.bitcoin.codigo}" value="${monedasCambio.bitcoin.valor}">${monedasCambio.bitcoin.codigo}</option>
            <option name="${monedasCambio.euro.codigo}" value="${monedasCambio.euro.valor}">${monedasCambio.euro.codigo}</option>
            <option name="${monedasCambio.dolar.codigo}" value="${monedasCambio.dolar.valor}">${monedasCambio.dolar.codigo}</option>
            <option name="${monedasCambio.dolar_intercambio.codigo}" value="${monedasCambio.dolar_intercambio.valor}">${monedasCambio.dolar_intercambio.codigo}</option>
            <option name="${monedasCambio.ivp.codigo}" value="${monedasCambio.ivp.valor}">${monedasCambio.ivp.codigo}</option>
            <option name="${monedasCambio.libra_cobre.codigo}"  value="${monedasCambio.libra_cobre.valor}">${monedasCambio.libra_cobre.codigo}</option>
            <option name="${monedasCambio.uf.codigo}" value="${monedasCambio.uf.valor}">${monedasCambio.uf.codigo}</option>
            <option name="${monedasCambio.utm.codigo}" value="${monedasCambio.utm.valor}">${monedasCambio.utm.codigo}</option>`;

  seleccionDeMoneda.innerHTML = html;
}


////FUNCION PARA CAPTURAR EL DATO SELECCIONADO DEL SELECT
function valorSeleccionado(event) {
  let nombre = seleccionDeMoneda.options[seleccionDeMoneda.selectedIndex].getAttribute("name");
  getLast10Dias(nombre);
  valorSelected = Number(event.target.value);
}


//FUNCION BUSCAR
function buscar() {
  const monedaChilena = Number(document.getElementById("monedaChilena").value);

  if (isNaN(monedaChilena)) {
    console.log("valor ingresado", monedaChilena);
    alert("El valor ingresado debe ser un numero");
  } else if (monedaChilena < 0) {
    alert("El valor ingresado debe ser mayor a cero");
  } else if (monedaChilena == "") {
    alert("El valor ingresado no puede ir vacío");
  } else {
    conversion(valorSelected, monedaChilena);
  }
}


//FUNCION CONVERSION CON PARAMETROS
function conversion(valorSelected, monedaChilena) {
  let htmlConversion = "";

  resultado = (monedaChilena / valorSelected).toFixed(2);
  htmlConversion = `<h4>Resultado: ${resultado}</h4>`;
  resultadoConversion.innerHTML = htmlConversion;
}

//FUNCION GRAFICO CON PARAMETROS
function graficoChart(fecha, valor) {
  
  const ctx = document.getElementById("myChart").getContext("2d");

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: fecha,
      datasets: [
        {
          label: "Hitórico últimos 10 dias",
          data: valor,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// FUNCION PARA PODER INICIALIZAR CON LA DATA OBTENIDA
window.onload = function () {
  getData();
};
