$(document).ready(function() {
  // $('form').on('submit', function(e){
  //   e.preventDefault();
  // });
  $.get("https://api.coinmarketcap.com/v1/ticker/")
    .then(function(Rates) {
      for (i in Rates) {
        var tr = $("<tr>");
        var td = $("<td>");
        $(".tablerow").append(tr);

        var td1 = $("<td>");
        tr.append(td1)
        td1.text(Rates[i].name)

        var td2 = $("<td>");
        tr.append(td2)
        td2.text("1 " + Rates[i].symbol)

        var td3 = $("<td>")
        tr.append(td3)
        td3.text("$ " + Rates[i].price_usd)

        var td4 = $("<td>")
        tr.append(td4)
        td4.text(Rates[i].percent_change_1h);

        tr.append(td)
        td.text(Rates[i].percent_change_24h)

        var opt = $("<option>")
        $("#coinselect").append(opt);
        opt.text(Rates[i].name)
        opt.attr("value", Rates[i].name)

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
