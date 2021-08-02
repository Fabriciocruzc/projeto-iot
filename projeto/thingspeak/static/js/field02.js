var config_line2 = {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Media de Temperatura',
        data2: [],
        borderWidth: 3,
        borderColor: 'rgba(255,0,0)',
        backgroundColor: 'transparent',
      },
      {
        label: 'Variação de Temperatura',
        data: [],
        borderWidth: 3,
        borderColor: 'rgba(0,100,0)',
        backgroundColor: 'transparent',
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: ''
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          type: 'time',
          ticks: {
            minRotation: 90,
            source: 'time'  
          },
          distribution: 'series',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Tempo'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Temperatura'
          }
        }]
      }
    }
  };
  
  /*cria o grafico myline2 com os ultimos valores enviados#
  * para o thingspeak
  */
  function createMyLine2() {
    var con = document.getElementById('field2').getContext('2d');
    window.myLine2 = new Chart(con, config_line2);
    getLastThingSpeak2Data();
   
  };
  
  /*
  * requisita os ultimos dados enviados para o thingspeak
  * e atualiza os valores no grafico
  */
  function getLastThingSpeak2Data(){
    
    var channel_id = 196384; //id do canal
    var field_number2 = 2; //numero do field
    let media = [];
    let variacao = [];
    let cont = 1;
    let soma = 0;
    let somaVariacao = 0;
    
    $.getJSON('https://api.thingspeak.com/channels/' + channel_id + '/fields/' + field_number2 + '.json?results=500', function(data) {
      // get the data2 point
      feeds = data.feeds;
      // imprime os feeds recebidos
      //console.log(data.feeds)

      // calculando media e desvio padão fiald02
      for(i in feeds){
        var numero = parseInt(feeds[i].field2)
        soma = soma + numero
        media.push(soma/cont);
        //console.log(numero)
        var diferenca = Math.pow((numero - media[i]), 2);
        somaVariacao = somaVariacao + diferenca;
        //console.log(diferenca)
        variacao.push(Math.sqrt(somaVariacao / cont))
        cont++;
      }
      //console.log(media);
      //console.log(variacao);
      // lina da media
      for (ii in media) {
        config_line2.data.datasets[0].data.push(media[ii]);
      }
      
      // intera em todos os feeds recebidos e os adiciona no grafico
      for (d in feeds)
      {
        //variavel config_line2.data.datasets[0].data eh equivalente ao eixo y
        //config_line2.data.datasets[0].data.push(feeds[d].field2);
        //variavel config_line2.labels eh equivalente ao eixo x
        var x_date = new Date(feeds[d].created_at);
        config_line2.data.labels.push(x_date);
      }
      window.myLine2.update();
      // linha da variação
      for (p in variacao) {
        config_line2.data.datasets[1].data.push(variacao[p]);
      }
      for (t in feeds)
      {
        //variavel config_line4.data.datasets[0].data eh equivalente ao eixo y
        //config_line4.data.datasets[0].data.push(feeds[d].field4);
        //variavel config_line4.labels eh equivalente ao eixo x
        
        var u_date = new Date(feeds[t].created_at);
        config_line2.data.labels.push(u_date);
      }

      

      window.myLine4.update();
      
    });
  
  }