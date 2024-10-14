window.onload = function () {
    works();
}

function works() {
    let works = document.getElementById("works");
    //https://api.github.com/users/MiguelOlmoP/repos
    fetch('https://api.github.com/users/holainfo/repos')
        .then(response => response.json())
        .then(data => {
            data.forEach(repo => {
                console.log(repo.name);
                console.log("-------------------");
                console.log(repo.owner["login"]);
                console.log("-------------------");
                console.log(repo.description);
                console.log("-------------------");
                console.log(repo.html_url);
                console.log("-------------------");
                console.log(repo);
                console.log("-------------------");
                if (repo.name != "holainfo.github.io") {

                    let article = document.createElement("article");
                    article.classList.add("article");

                    let a = document.createElement("a");
                    a.setAttribute("href", repo.html_url);
                    a.setAttribute("title", repo.name);
                    a.classList.add("a");

                    let figure = document.createElement("figure");
                    figure.classList.add("figure");

                    let img = document.createElement("img");
                    img.setAttribute("src", "https://raw.githubusercontent.com/" + repo.owner["login"] + "/" + repo.name + "/main/img/portada.png");
                    img.setAttribute("alt", "Imagen");
                    img.classList.add("img");
                    img.setAttribute("loading", "lazy");


                    let h4 = document.createElement("h4");
                    h4.classList.add("h4");
                    let texto = document.createTextNode(repo.name);

                    h4.appendChild(texto);

                    figure.appendChild(img);
                    figure.appendChild(h4);

                    a.appendChild(figure);

                    article.appendChild(a);

                    works.appendChild(article);

                }

            });
        })
        .catch(error => console.error('Error:', error));

}