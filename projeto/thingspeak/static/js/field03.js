var config_line3 = {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Media de Pressão',
        data2: [],
        borderWidth: 3,
        borderColor: 'rgba(0,0,255)',
        backgroundColor: 'transparent',
      },
      {
        label: 'Variação de Pressão',
        data: [],
        borderWidth: 3,
        borderColor: 'rgba(255,69,0)',
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
            labelString: 'Pressão'
          }
        }]
      }
    }
  };
  
  /*cria o grafico myline3 com os ultimos valores enviados#
  * para o thingspeak
  */
  function createMyLine3() {
    var ctx = document.getElementById('field3').getContext('2d');
    window.myLine3 = new Chart(ctx, config_line3);
    getLastThingSpeak3Data();
   
  };
  
  /*
  * requisita os ultimos dados enviados para o thingspeak
  * e atualiza os valores no grafico
  */
  function getLastThingSpeak3Data(){
    
    var channel_id = 196384; //id do canal
    var field_number3 = 3; //numero do field
    let media = [];
    let variacao = [];
    let cont = 1;
    let soma = 0;
    let somaVariacao = 0;
    
    $.getJSON('https://api.thingspeak.com/channels/' + channel_id + '/fields/' + field_number3 + '.json?results=500', function(data) {
      // get the data2 point
      feeds = data.feeds;
      // imprime os feeds recebidos
      //console.log(data.feeds)

      // calculando media e desvio padão fiald03
      for(i in feeds){
        var numero = parseInt(feeds[i].field3)
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

      for (j in media) {
        config_line3.data.datasets[0].data.push(media[j]);
      }
      
      // intera em todos os feeds recebidos e os adiciona no grafico
      for (d in feeds)
      {
        //variavel config_line3.data.datasets[0].data eh equivalente ao eixo y
        //config_line3.data.datasets[0].data.push(feeds[d].field3);
        //variavel config_line3.labels eh equivalente ao eixo x
        var x_date = new Date(feeds[d].created_at);
        config_line3.data.labels.push(x_date);
      }
      window.myLine3.update();

      for (p in variacao) {
        config_line3.data.datasets[1].data.push(variacao[p]);
      }
      for (t in feeds)
      {
        //variavel config_line4.data.datasets[0].data eh equivalente ao eixo y
        //config_line4.data.datasets[0].data.push(feeds[d].field4);
        //variavel config_line4.labels eh equivalente ao eixo x
        
        var u_date = new Date(feeds[t].created_at);
        config_line3.data.labels.push(u_date);
      }

      

      window.myLine4.update();
      
    });
  
  }