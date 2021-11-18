let areasCtrlModal = new Array(30);
areasCtrlModal = document.querySelectorAll(".controlModal");

function requisicao(URL, func) {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        if(this.readyState == 4 && this.status == 200) {

            if(func != undefined) {

                func(this.responseText);
            }
        } else {

            console.log(`ReadyState: ${this.readyState} | Status: ${this.status}`);
        }
    };

    xhttp.open("GET", URL, true);
    xhttp.send();
}

/* Modal */

function AtivarModal() {

    // Informações Padrões
    let id = this.getAttribute("data-movie-id");
    let URL_Modal = `${config.TM_BASE_URL}/movie/${id}?api_key=${config.TM_KEY}&language=${config.TM_LANGUAGE}`;
    document.querySelector("#modalTitulo").innerHTML = "";
    document.querySelector(".modal-body").innerHTML = "";

    requisicao(URL_Modal, CriarModal);
}

function CriarModal(modalJSON) {

    let modalParsed = JSON.parse(modalJSON);

    // Título e Botões
    let titulo = modalParsed.title;
    let IMDB_ID = modalParsed.imdb_id;
    let URL_IMDB = `https://www.imdb.com/title/${IMDB_ID}`;

    // Corpo do Modal
    let tituloOrg = modalParsed.original_title;
    let img = modalParsed.backdrop_path;
    let idiomaOrg = modalParsed.spoken_languages[0].name;

    let generos = modalParsed.genres[0].name;
    for(let i = 1; i < modalParsed.genres.length; i++) {

        generos += " | " + modalParsed.genres[i].name;
    }

    let empresas = modalParsed.production_companies[0].name;
    for(let i = 1; i < modalParsed.production_companies.length; i++) {

        empresas += " | " + modalParsed.production_companies[i].name;
    }

    // Inserindo Informações
    let item_Modal = `
    <div class="row">
        <img src="https://image.tmdb.org/t/p/w500/${img}" alt="Banner de ${titulo}">
    </div>
    <div class="row" id="modalCorpoTexto">
        <p><strong>Título Original:</strong> <cite>${tituloOrg}</cite></p>
        <p><strong>Idioma Original:</strong> ${idiomaOrg}</p>
        <p><strong>Empresas:</strong> ${empresas}</p>
        <p><strong>Gêneros:</strong> ${generos}</p>
    </div>
    `;

    document.querySelector("#modalTitulo").insertAdjacentHTML("afterbegin", titulo);
    document.querySelector(".modal-body").insertAdjacentHTML("afterbegin", item_Modal);
    document.querySelector("#linkIMDB").setAttribute("href", URL_IMDB);
}

/* Slides */

function adcCast(detalhesJSON) {

    let detalhesParsed = JSON.parse(detalhesJSON);

    // Informações Padrões
    let id = detalhesParsed.id;
    let atores = detalhesParsed.cast;
    let equipe = detalhesParsed.crew;

    // Descobrindo Cast
    let elementAtores = document.querySelector(`div[data-movie-id="${id}"] p#atores`, id);
    let elementEquipe = document.querySelector(`div[data-movie-id="${id}"] p#equipe`, id);

    let nomeDiretor, nomeRoteirista;

    let i = 0;
    do {

        if(nomeDiretor == undefined && equipe[i].job == "Director") {

            nomeDiretor = equipe[i].original_name;
        }

        if(nomeRoteirista == undefined && equipe[i].department == "Writing" &&
           equipe[i].job == "Story" || equipe[i].job == "Original Film Writer" || equipe[i].job == "Writer" ||
           equipe[i].job == "Characters" || equipe[i].job == "Screenstory" || equipe[i].job == "Screenplay" ||
           equipe[i].job == "Storyboard") {

            nomeRoteirista = equipe[i].original_name;
        }

        i++;
    } while((nomeDiretor == undefined || nomeRoteirista == undefined) && i < equipe.length);

    // Inserindo Cast
    let item_Atores = `<strong>Elenco:</strong><br> ${atores[0].name} | ${atores[1].name} | ${atores[2].name} | ${atores[3].name}`;
    let item_Equipe = `<strong>Diretor:</strong> ${nomeDiretor}&nbsp;&nbsp;<strong>Roteirista:</strong> ${nomeRoteirista}<br>`;

    elementAtores.insertAdjacentHTML("afterbegin", item_Atores);
    elementEquipe.insertAdjacentHTML("afterbegin", item_Equipe);
}

/* Notícias */

function CriarNoticias(noticiasJSON) {

    let noticiasParsed = JSON.parse(noticiasJSON);
    let artigosNotc = noticiasParsed.articles;

    let elementNotc = document.querySelector("#noticiasArea");

    for (let i = 0; i < 4; i++) {

        // Informações Padrões
        let img = artigosNotc[i].urlToImage;
        let titulo = artigosNotc[i].title;
        let link = artigosNotc[i].url;
        let autor = artigosNotc[i].author;

        // Alterando texto
        let texto = artigosNotc[i].content;
        texto = texto.replace(/ *\[[^]*\] */g, "");

        // Inserindo Notícias
        let item_Notc = `
        <div class="row cardNoticia">

            <div class="col-12 col-sm-4">
                <img class="iconNoticia" src="${img}" alt="Imagem da Noticia">
            </div>

            <div class="col-12 col-sm-8">
                <h5>${titulo}</h5>
                <h6>${autor}</h6>
                <p>
                    ${texto}
                    <a target="_blank" href="${link}">Leia mais...</a>
                </p>
            </div>

        </div>
        `;

        elementNotc.insertAdjacentHTML("beforeend", item_Notc);
    }
}