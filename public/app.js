window.addEventListener('load', () =>{
    document.getElementById('button-line').addEventListener('click', ()=>{
        let andThen = document.getElementById('next-line').value;
        console.log(andThen);

        document.getElementById('button-author').addEventListener('click', ()=>{
            let authorName = document.getElementById('author-name').value;
            console.log(authorName);

        //create the object
        let obj = {
            "line" : andThen,
            "author" : authorName,
        };

        //stringify the object
        let jsonData = JSON.stringify(obj);

        //1. Make a fetch request of type POST so that we can send the (noCops) info to the server

        fetch('/andThen', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            //send the data in the body
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)})

    })})

    document.getElementById('get-story').addEventListener('click', ()=>{
        fetch('/andThen')
        .then(resp=> resp.json())
        .then(data=> {
            document.getElementById('story-info').innerHTML = '';
            console.log(data.data);
            for(let i=0; i<data.data.length; i++){
                let string = data.data[i].author + ": " + data.data[i].line;
                let elt = document.createElement('p');
                elt.innerHTML = string;
                document.getElementById('story-info').appendChild(elt);
            }
        })
    })
})
