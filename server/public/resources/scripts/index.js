$(document).ready(function() {
    $("#post-info").hide();
    $("#form").submit(function(event) {
        event.preventDefault();
        const url = $("#ffurl").val();
        const maxChap = $("#ffmaxchap").val();
        axios.post('/submit', {
            'url': url,
            'maxChap': maxChap,
        })
        .catch((err)=> {
            console.log(err);
        })
        .then((res) => {
            // console.log(res.data);
            $('#fic').append(res.data);
            $('#info-submit').hide();
            $("#post-info").hide();
        })
        
    })
});
