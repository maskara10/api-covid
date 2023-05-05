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
        <span>${dadosGlobal.TotalConfirmed.toLocaleString("pt-BR")}</span>
  `;

    let tMortes = document.getElementById("totalMort");
    tMortes.innerHTML = `
<p>Total de Mortes</p>
      <span>${dadosGlobal.TotalDeaths.toLocaleString("pt-BR")}</span>
`;

    let tRecuperados = document.getElementById("totalRec");
    tRecuperados.innerHTML = `
<p>Total Recuperados</p>
    <span>${dadosGlobal.TotalRecovered.toLocaleString("pt-BR")}</span>
`;

    const ctx = document.getElementById("chartPizza");

    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Confirmados", "Recuperados", "Mortes"],
        datasets: [
          {
            label: "My First Dataset",
            data: [
              dadosGlobal.NewConfirmed,
              dadosGlobal.NewRecovered,
              dadosGlobal.NewDeaths,
            ],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Distribuiçaõ de Novos Casos",
          },
        },
      },
    });

    const ctx1 = document.getElementById("chartBarra");

    new Chart(ctx1, {
      type: "bar",
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
          dadosPais[9].Country,
        ],
        datasets: [
          {
            label: "Total de Mortes",
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
              dadosPais[9].TotalDeaths,
            ],
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgb(255, 99, 132)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Total de Mortes por País - Top 10",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    console.log(dadosPais);


  })
  .catch(function (error) {
    console.log(error);
  });

  

  const dataInicio = document.getElementById("dataInicio");
  const dataFim = document.getElementById("dataFim");
  const pais = document.getElementById("paisOrigem");
  const btnBuscar = document.getElementById("buscar");
  const chartElement = document.getElementById("chartLine");


  let chart;

  function filterDataByDate(data, startDate, endDate) {
    return data.filter((item) => {
      const itemDate = new Date(item.Date);
      return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });
  }

  btnBuscar.addEventListener("click", () => {
    const country = pais.value;
    const startDate = dataInicio.value;
    const endDate = dataFim.value;

    if (!country) {
      alert("Informe um país.");
      return;
    }

    if (!startDate || !endDate) {
      alert("Selecione um intervalo de datas.");
      return;
    }

    axios
      .get(
        `https://api.covid19api.com/country/${country}?from=${startDate}T00:00:00Z&to=${endDate}T00:00:00Z`
      )
      .then((response) => {
        const rawDate = response.data;
        const filterData = filterDataByDate(rawDate, startDate, endDate);
        const labels = [];
        const values = [];
        console.log(rawDate)

        filterData.forEach((element) => {
          labels.push(element.Date.slice(0, 10));
          values.push(element.Confirmed);
        });

        if (chart) {
          chart.destroy();
        }

        chart = new Chart(chartElement, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Casos Confirmados",
                data: values,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        })
      }).catch((err) => { err });
  });

//TotalDeaths
