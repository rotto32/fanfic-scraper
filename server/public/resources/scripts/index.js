$(document).ready(function() {
    $("#post-info").hide();
    $("#form").submit(function(event) {
        event.preventDefault();
        const url = $("#ffurl").val();
        const ficName = url.split('/').pop();
        const maxChap = $("#ffmaxchap").val();
        const minChap = $("#ffminchap").val();
        const timeMinutes = Math.floor(((Number(maxChap)-Number(minChap) + 1) * 3)/60);
        const ficLink = '/fics/' + ficName + '.html';
        $('#info-submit').hide();
        $('#fic-link').append('<p>After '+ timeMinutes + ' minute(s), go to <a href="' + ficLink + '">'+ficName+'</a>.<br /> If the entire fic is not there, wait an additional couple of minutes and reload the page.</p>');
        axios.post('/submit', {
            'url': url,
            'maxChap': maxChap,
            'minChap': minChap,
        })
        .catch((err)=> {
            console.log(err);
        })
        .then((res) => {
        
        })
        
    })
});
