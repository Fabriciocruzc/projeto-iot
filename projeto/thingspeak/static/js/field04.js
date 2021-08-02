var config_line4 = {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Media de Humidade',
        data: [],
        borderWidth: 3,
        borderColor: 'rgba(255,255,0)',
        backgroundColor: 'transparent',
      },
      {
        label: 'Variação de Umidade',
        data: [],
        borderWidth: 3,
        borderColor: 'rgba(56,176,222,0.85)',
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
            labelString: 'Humidade'
          }
        }]
      }
    }
  };
  
  /*cria o grafico myline4 com os ultimos valores enviados#
  * para o thingspeak
  */
  function createMyLine4() {
    var ctx = document.getElementById('field4').getContext('2d');
    window.myLine4 = new Chart(ctx, config_line4);
    getLastThingSpeak4Data();
   
  };
  
  /*
  * requisita os ultimos dados enviados para o thingspeak
  * e atualiza os valores no grafico
  */
  function getLastThingSpeak4Data(){
    
    var channel_id = 196384; //id do canal
    var field_number4 = 4; //numero do field
    let media = [];
    let variacao = [];
    let somaVariacao = 0;
    let cont = 1;
    let soma = 0;
    
    $.getJSON('https://api.thingspeak.com/channels/' + channel_id + '/fields/' + field_number4 + '.json?results=500', function(data) {
      // get the data2 point
      feeds = data.feeds;
      // imprime os feeds recebidos
     
      //console.log(data.feeds)

      // calculando media e desvio padão fiald04
      for(i in feeds){
        var numero = parseInt(feeds[i].field4)
        soma = soma + numero
        media.push(soma/cont);
        //console.log(numero)
        var diferenca = Math.pow((numero - media[i]), 2);
        somaVariacao = somaVariacao + diferenca;
        //console.log(diferenca)
        variacao.push(Math.sqrt(somaVariacao / cont))
        cont++;
      }

      //console.log(variacao)
     //console.log(media);
      
      for (k in media) {
        config_line4.data.datasets[0].data.push(media[k]);
      }
      for (d in feeds)
      {
        //variavel config_line4.data.datasets[0].data eh equivalente ao eixo y
        //config_line4.data.datasets[0].data.push(feeds[d].field4);
        //variavel config_line4.labels eh equivalente ao eixo x
        
        var x_date = new Date(feeds[d].created_at);
        config_line4.data.labels.push(x_date);
      }
      
      window.myLine4.update();

      for (p in variacao) {
        config_line4.data.datasets[1].data.push(variacao[p]);
      }
      for (t in feeds)
      {
        //variavel config_line4.data.datasets[0].data eh equivalente ao eixo y
        //config_line4.data.datasets[0].data.push(feeds[d].field4);
        //variavel config_line4.labels eh equivalente ao eixo x
        
        var u_date = new Date(feeds[t].created_at);
        config_line4.data.labels.push(u_date);
      }

      

      window.myLine4.update();
      
    });
  
  }