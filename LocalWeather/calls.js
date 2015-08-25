$(document).ready(function(){
    
    $("#panel").hide();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callZeus);
    } else { 
        $("#comment").html("Belurbbbeh! Weather so unpredictable that it broke our computers!");
    }
    
    
    $("#f-toggle").click(function(){
        $("#c-toggle").removeClass("active");
        $("#f-toggle").addClass("active");
        $("#temp").html(tempF);                  
    });
    $("#c-toggle").click(function(){
        $("#f-toggle").removeClass("active");
        $("#c-toggle").addClass("active");
       $("#temp").html(tempC);
    });
    $("#d-toggle").click(function(){
        if($("#details").is(":visible"))
            $("#details").hide();
        else
            $("#details").show();
    });
    
});

var tempC=0;
var tempF=0;
function callZeus(position){
    var qUrl='https://simple-weather.p.mashape.com/weatherdata';
    $.ajax({
        url: qUrl,
        type:'GET',
        dataType: 'json',
        data:{"lat":position.coords.latitude,
              "lng":position.coords.longitude},
        success:function(response){
            console.log(response);
            sendThunders(response);
        },
        error:function(){
            $("#comment").html("Belurbbbeh! Weather so unpredictable that it broke our computers!");
        },
        beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Key", "eu9VlPK6RvmshuQg2Z4Dy5gT57a2p1PDTIzjsnmZGJbARF2Dc1");
        }
    });
};

function sendThunders(report)
{
    var prb=report.query.results.channel;
    $("#location").html(prb.location.city+", "+((prb.location.region==="") ? prb.location.country : prb.location.region));
    $("#temp").html(prb.item.condition.temp);
    $("#comment").html(prb.item.condition.text);
    $("#details").html(prb.item.description);
    $("#details").hide();
    $("#panel").show();
    tempC=prb.item.condition.temp;
    tempF=Math.round((tempC*9/5) + 32);
    $("#spinner").hide();
}

