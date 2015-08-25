$(document).ready(function(){
    enlightenMe();
    $("#enlighten").click(function(){
        enlightenMe();
    });
    
    $("#tw-share").click(function(){
        var targetLink="https://twitter.com/intent/tweet/?text="+$("#quote").text()+" - "+$("#author").text();   
        $("#tw-share").prop("href",targetLink);
    });
});


var enlightenMe=function(){
    var qUrl='https://andruxnet-random-famous-quotes.p.mashape.com/category=famous';
    $.ajax({
        url: qUrl,
        type:'GET',
        dataType: 'json',
        success:function(response){
            $("#quote").html(response.quote);
            $("#author").html(response.author);
        },
        error:function(){
            $("#quote").html("Life is full of surprises and broken APIs");
            $("#author").html("Sudeep Vaka");
        },
        beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Key", "jVDiTUYWPzmsh1t22314i02v9PSGp13ug2WjsnlElnJarN8x3L");
        }
    });

};

