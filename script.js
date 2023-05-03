axios
  .get("https://api.covid19api.com/summary")
  .then(function (response) {
    let dadosGlobal = response.data.Global;
    // aqui você pode manipular os dados da resposta como desejar
    let tConfimardos = document.getElementById("totalConf");
    tConfimardos.innerHTML = `
  <p>Total de Confirmados</p>
        <span>${dadosGlobal.TotalConfirmed.toLocaleString('pt-BR')}</span>
  `;

  let tMortes = document.getElementById("totalMort");
  tMortes.innerHTML = `
<p>Total de Mortes</p>
      <span>${dadosGlobal.TotalDeaths.toLocaleString('pt-BR')}</span>
`;

let tRecuperados = document.getElementById("totalRec");
tRecuperados.innerHTML = `
<p>Total Recuperados</p>
    <span>${dadosGlobal.TotalRecovered.toLocaleString('pt-BR')}</span>
`;

const ctx = document.getElementById('chartPizza');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: [
        'Confirmados',
        'Recuperados',
        'Mortes'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [dadosGlobal.NewConfirmed, dadosGlobal.NewRecovered, dadosGlobal.NewDeaths],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    },
    options: {
      plugins: {
          title: {
              display: true,
              text: 'Distribuiçaõ de Novos Casos'
          }
      }
  }
  });
  })
  .catch(function (error) {
    console.log(error);
  });
