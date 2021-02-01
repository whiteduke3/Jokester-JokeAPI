const getJoke = document.getElementById("submitbutton");

if(localStorage.length > 0) {
    let arr = Object.keys(localStorage).sort(function(a, b){return b-a});
    arr.forEach((key) => {

        let div = document.createElement("div");
        div.classList.add("jokediv");

        let obj = JSON.parse(localStorage.getItem(key));
        let len = Object.keys(obj).length;

        if (len === 2) {
            let h4 = document.createElement("h4");
            let other_h4 = document.createElement("h4");
            h4.textContent = obj.setup;
            other_h4.textContent = obj.delivery;
            div.appendChild(h4);
            div.appendChild(other_h4);
        } else {
            let h4 = document.createElement("h4");
            h4.textContent = obj.joke;
            div.appendChild(h4);
        }
        
        document.body.appendChild(div);

    });
    
}

getJoke.onclick = async function () {
    event.preventDefault();

    if (localStorage.length >= 10) {
        localStorage.clear();
    }

    var jsonData = await fetch('https://v2.jokeapi.dev/joke/Any')
        .then(response => response.json());


    if(jsonData.setup) {
        let myJoke = {
            setup: jsonData.setup,
            delivery: jsonData.delivery
        }

        localStorage.setItem(localStorage.length + 1, JSON.stringify(myJoke));

    } else {
        let myJoke = {
            joke: jsonData.joke
        }

        localStorage.setItem(localStorage.length + 1, JSON.stringify(myJoke));
    }

    location.reload();

};



