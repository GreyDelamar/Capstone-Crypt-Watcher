$(document).ready(function() {
  $('#converter').on('submit', function(e){
    e.preventDefault();
  });
  $.get("https://api.coinmarketcap.com/v1/ticker/")
    .then(function(Rates) {
      google.charts.load('current', {
        'packages': ['table']
      });
      google.charts.setOnLoadCallback(drawTable);

      function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Crypto-Currencies');
        data.addColumn('string', 'Coin Symbol');
        data.addColumn('string', 'Cost in USD');
        data.addColumn('string', '% 1h');
        data.addColumn('string', '% 24h');
        data.addRows(Rates.map(v => [v.id, v.symbol, v.price_usd, v.percent_change_1h, v.percent_change_24h]));

        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(data, {
          showRowNumber: true,
          width: '100%',
          height: '100%',
          page: 'enable',
          pageSize: 20
        });
      }
      for (i in Rates) {

        var opt = $("<option>")
        $("#coinmultiselect").append(opt);
        opt.text(Rates[i].name)
        opt.attr("value", Rates[i].name)
      }
      for (i in Rates) {

        var opt = $("<option>")
        $("#coinselect").append(opt);
        opt.text(Rates[i].name)
        opt.attr("value", Rates[i].price_btc)

        var btcexerate = (1 / Rates[0].price_usd)
        var pt1equation = (1 / btcexerate)



        $('#coinselect').change(function() {
          var checkopt = $("#coinselect").find("option:selected");
          var btcprice = checkopt[0].value;
          var equation = btcprice * pt1equation;
          $('#userInput').change(function() {
            var input = $('#userInput').val();
            var answer = "$" + input * equation.toFixed(8);
            var answerout = $("#answer");
            answerout.val(answer)
          })
        });
        setTimeout(Rates, 15000)
      };
    });
});
