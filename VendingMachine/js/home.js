$(document).ready(function(){

  LoadItems();

  var amount = 0;
 
  $("#addDollar").click(function(){
    amount += 1;
    $('#totalIn').val(amount);
  });
  $("#addQuarter").click(function(){
    amount += 0.25;
    $('#totalIn').val(amount);
  });
  $("#addDime").click(function(){
    amount += 0.10;
    $('#totalIn').val(amount);
  });
  $("#addNickel").click(function(){
    amount += 0.05;
    $('#totalIn').val(amount);
  });

  $("#1").click(function(){
    $('#inputItem').val(1);
  });
  $("#2").click(function(){
    $('#inputItem').val(2);
  });
  $("#3").click(function(){
    $('#inputItem').val(3);
  });
  $("#4").click(function(){
    $('#inputItem').val(4);
  });
  $("#5").click(function(){
    $('#inputItem').val(5);
  });
  $("#6").click(function(){
    $('#inputItem').val(6);
  });
  $("#7").click(function(){
    $('#inputItem').val(7);
  });
  $("#8").click(function(){
    $('#inputItem').val(8);
  });
  $("#9").click(function(){
    $('#inputItem').val(9);
  });

  $("#makePurchaseButton").click(function(){
    MakePurchase();
  });

  $("#changeReturnButton").click(function(){
    ClearAll();
    amount = 0;
    LoadItems();

  });
/*end of doc ready function*/
});

function LoadItems(){

  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/items',
    success:function(itemArray){
      $.each(itemArray, function(index, item){
        var id = item.id;
        var name = item.name;
        var price = item.price;
        var quantity = item.quantity;

        $('#'+id).append(id+'<br><br>'+name+'<br><br>'+price+'<br><br><br> Quantity Left: '+quantity);
      })
    },
    error:function(jqxhr,textstatus,errorthrown){
      alert("failed")
    }
  });
}

function MakePurchase(){
  if ($('#totalIn').val() != "" && $('#inputItem').val() != "")
  {
  $.ajax({
    type:'GET',
    url: 'http://localhost:8080/money/'+ $('#totalIn').val() +'/item/'+ $('#inputItem').val(),
    success: function(data, status){
      var quarters = data.quarters;
      var dimes = data.dimes;
      var nickels = data.nickels;
      var pennies = data.pennies;
      $('#changeQuarters').val(quarters);
      $('#changeDimes').val(dimes);
      $('#changeNickels').val(nickels);
      $('#changePennies').val(pennies);
      $('#inputMessages').val('Thank You!');
    },
    error:function(xhr, status, error){
      $('#inputMessages').val(xhr.responseJSON.message);

    }
  });
  }
  else
  {
    $('#inputMessages').val('Please choose Item and add money.');
  }
}

function ClearAll() {
    for (i = 1; i <= 9; i++)
    {
        $('#' + i).empty();
    }
  $('#totalIn').val('');
  $('#inputItem').val('');
  $('#inputMessages').val('');
  $('#inputChange').val('');
  amount = 0;
}
