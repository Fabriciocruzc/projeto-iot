
var config_line1 = {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Media de Temperatura',
        data: [],
        borderWidth: 3,
        borderColor: 'rgba(0,250,154)',
        backgroundColor: 'transparent',
      },
      {
        label: 'Variação de Temperatura',
        data: [],
        borderWidth: 3,
        borderColor: 'rgba(220,20,60)',
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
            minRotation: 1,
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
  
  /*cria o grafico myline1 com os ultimos valores enviados#
  * para o thingspeak
  */
  function createMyLine1() {
    var ctx = document.getElementById('field1').getContext('2d');
    window.myLine1 = new Chart(ctx, config_line1);
    getLastThingSpeakData();
   
  };
  
  /*
  * requisita os ultimos dados enviados para o thingspeak
  * e atualiza os valores no grafico
  */
  function getLastThingSpeakData(){
    
    var channel_id = 196384; //id do canal
    var field_number1 = 1; //numero do field
    let media = [];
    let variacao = [];
    let cont = 1;
    let soma = 0;
    let  somaVariacao = 0;
    
    $.getJSON('https://api.thingspeak.com/channels/' + channel_id + '/fields/' + field_number1 + '.json?results=500', function(data) {
      // get the data point
      feeds = data.feeds;
      // imprime os feeds recebidos
      //console.log(data.feeds)

      // calculando media e desvio padão fiald04

      for(i in feeds){
        var numero = parseInt(feeds[i].field1)
        soma = soma + numero
        // calculando media
        media.push(soma/cont);
        //calculando variação
        var diferenca = Math.pow((numero - media[i]), 2);
        somaVariacao = somaVariacao + diferenca;
        
        variacao.push(Math.sqrt(somaVariacao / cont))
        cont++;
      }
     // console.log(media);
      console.log(variacao);

      for (j in media) {
        config_line1.data.datasets[0].data.push(media[j]);
      }
      
     
      for (d in feeds)
      {
        
        var x_date = new Date(feeds[d].created_at);
        config_line1.data.labels.push(x_date);
      }
      //window.myLine1.update();

      for (p in variacao) {
        config_line1.data.datasets[1].data.push(variacao[p]);
      }
      for (t in feeds)
      {
        
        
        var u_date = new Date(feeds[t].created_at);
        config_line1.data.labels.push(u_date);
      }

      

      window.myLine1.update();
      
    });
  
  }