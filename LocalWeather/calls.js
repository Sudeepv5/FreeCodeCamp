$(document).ready(function(){
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callZeus);
    } else { 
        $("#comment").html("Belurbbbeh! Weather so unpredictable that it broke our computers!");
    }
});


function callZeus(position){
    var qUrl='https://simple-weather.p.mashape.com/weatherdata';
    $.ajax({
        url: qUrl,
        type:'GET',
        dataType: 'json',
        data:{"lat":position.coords.latitude,
              "lng":position.coords.longitude},
        success:function(response){
            sendThunders(response)
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
    $("#location").html(prb.location.city+", "+prb.location.country);
    $("#w-icon").html(prb.item.description);
    $("#temp").html(prb.item.condition.temp);
    $("#comment").html(prb.item.condition.text);
}

