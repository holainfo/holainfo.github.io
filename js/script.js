let usuario = "holainfo"
let datos = {};

window.onload = function () {
    works();
}

function works() {
    let works = document.getElementById("works");
    fetch('https://api.github.com/users/' + usuario + '/repos')
        .then(response => response.json())
        .then(data => {
            data.forEach(repo => {
                // console.log(repo.name);
                // console.log("-------------------");
                // console.log(repo.owner["login"]);
                // console.log("-------------------");
                //console.log(repo.description);
                // console.log("-------------------");
                // console.log(repo.html_url);
                // console.log("-------------------");
                // console.log(repo);
                // console.log("-------------------");
                if (repo.name != usuario) {
                    datos[repo.name] = {};

                    let article = document.createElement("article");
                    article.classList.add("article");
                    article.addEventListener("click", verModal);
            

                    datos[repo.name].url = repo.html_url;

                    let figure = document.createElement("figure");
                    figure.classList.add("figure");

                    let img = document.createElement("img");
                    img.setAttribute("alt", "Imagen");
                    img.classList.add("img");
                    img.setAttribute("loading", "lazy");
                    let imgSrc = new Image();
                    imgSrc.src = "https://raw.githubusercontent.com/" + repo.owner["login"] + "/" + repo.name + "/main/img/portada.png";




                    if (repo.name == usuario + ".github.io") {
                        img.src = "https://raw.githubusercontent.com/" + repo.owner["login"] + "/" + repo.name + "/main/img/logo.png";
                        datos[repo.name].img = img.src;
                        datos[repo.name].descripcion = repo.description;

                    } else {
                        //La imagen ha cargado correctamente
                        imgSrc.onload = function () {
                            img.src = imgSrc.src;
                            datos[repo.name].img = img.src;
                            datos[repo.name].descripcion = repo.description;
                        };
                        //La imagen no ha cargado correctamente / no existe
                        imgSrc.onerror = function () {
                            img.src = "img/portada.png";
                            datos[repo.name].img = img.src;
                            datos[repo.name].descripcion = repo.description;
                        };
                    }

                    //console.log(" -----------------------  URL GitHub  ---------------------------------");
                    //console.log(datos);

                    let h4 = document.createElement("h4");
                    h4.classList.add("h4");
                    let texto = document.createTextNode(repo.name);

                    h4.appendChild(texto);

                    figure.appendChild(img);
                    figure.appendChild(h4);

                    article.appendChild(figure);

                    works.appendChild(article);

                }

            });
        })
        .catch(error => console.error('Error:', error));

}


function verModal(event) {

    let modal = document.getElementsByClassName("modal")[0];
    modal.style.display = "grid";


    let imagenX = document.createElement("img");
    imagenX.setAttribute("alt", "Imagen X");
    imagenX.classList.add("modalX");
    imagenX.setAttribute("src", "img/x.png");
    imagenX.addEventListener("click", cerrarModal);
    modal.appendChild(imagenX);

    let figure = document.createElement("figure");
    figure.classList.add("figureModal");

    let img;
    let p;
    let div = document.createElement("div");
    div.classList.add("divEnlaces");
    let aGitHub = document.createElement("a");
    aGitHub.classList.add("url");

    //console.log("******************************* Texto ***********************");
    //console.log(event.target.textContent);
    Object.keys(datos).forEach(key => {
        if (key == event.target.textContent) {
            aGitHub.setAttribute("href",  datos[key].url);
            aGitHub.innerHTML = "Visitar GitHub";
            div.appendChild(aGitHub);
            img = document.createElement("img");
            img.classList.add("imgModal");
            img.setAttribute("src", datos[key].img);
            figure.appendChild(img);
            modal.appendChild(figure);

            if (datos[key].descripcion != null) {
                p = document.createElement("p");
                p.classList.add("descripcion");
                let texto = document.createTextNode(datos[key].descripcion);

                p.appendChild(texto);
                modal.appendChild(p);

            }
        }
    });

    fetch("json/config.json")
        .then(response => response.json())
        .then(datosURL => {
            // console.log(" *******************************  Datos JSON  *******************************************"); 
            // console.log(datosURL); 
            // console.log(datosURL.prueba1); 
            Object.keys(datosURL).forEach(key => {
                if (key == event.target.textContent) {
                    // console.log(key); 
                    // console.log(datosURL); 
                    // console.log(datosURL[key]); 

                    let a = document.createElement("a");
                    a.setAttribute("href", datosURL[key]);
                    a.classList.add("url");
                    a.innerHTML = "Visitar video";
                    div.appendChild(a);
                }
            });

        })
        .catch(error => {
            console.error('Error al cargar el JSON:', error);
        });

        modal.appendChild(div);
   

}


function cerrarModal() {
    let modal = document.getElementsByClassName("modal")[0];
    modal.style.display = "none";
    modal.innerHTML = '';
}
