$(document).ready(function() {
    $("#form").submit(function(event) {
        event.preventDefault();
        const url = $("#ffurl").val();
        axios.post('/submit', {
            'url': url
        })
        .catch((err)=> {
            console.log(err);
        })
        .then((res) => {
            console.log('success');
        })
        
    })
});
