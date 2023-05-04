axios
  .get("https://api.covid19api.com/summary")
  .then(function (response) {
    let dadosGlobal = response.data.Global;
    let dadosPais = response.data.Countries;
    dadosPais.sort((a, b) => b.TotalDeaths - a.TotalDeaths);
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

    const ctx1 = document.getElementById('chartBarra');

    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: [
          dadosPais[0].Country,
          dadosPais[1].Country,
          dadosPais[2].Country,
          dadosPais[3].Country,
          dadosPais[4].Country,
          dadosPais[5].Country,
          dadosPais[6].Country,
          dadosPais[7].Country,
          dadosPais[8].Country,
          dadosPais[9].Country
        ],
        datasets: [{
          label: 'Total de Mortes',
          data: [
            dadosPais[0].TotalDeaths,
            dadosPais[1].TotalDeaths,
            dadosPais[2].TotalDeaths,
            dadosPais[3].TotalDeaths,
            dadosPais[4].TotalDeaths,
            dadosPais[5].TotalDeaths,
            dadosPais[6].TotalDeaths,
            dadosPais[7].TotalDeaths,
            dadosPais[8].TotalDeaths,
            dadosPais[9].TotalDeaths
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
  
          ],
          borderColor: [
            'rgb(255, 99, 132)'
    
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Total de Mortes por País - Top 10'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    console.log(dadosPais)
  })
  .catch(function (error) {
    console.log(error);
  });


  //TotalDeaths