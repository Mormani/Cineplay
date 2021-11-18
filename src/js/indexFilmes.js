let pagAtual = window.location.href;

/* Em Cartaz e Populares */

function CriarFilmes(filmesJSON) {

    let filmesParsed = JSON.parse(filmesJSON);
    let resultadosFil = filmesParsed.results;

    let elementFilmes;

    if(pagAtual.includes("cartaz.html")) {

        elementFilmes = document.querySelector("#emCartaz");
    } else if(pagAtual.includes("populares.html")) {

        elementFilmes = document.querySelector("#populares");
    }

    for(let i = 0; i < 18; i++) {

        // Informações Padrões
        let img = resultadosFil[i].poster_path;
        let titulo = resultadosFil[i].title;
        let sinopse = resultadosFil[i].overview;
        let nota = resultadosFil[i].vote_average;
        let id = resultadosFil[i].id;

        // Data de Estreia
        let data = resultadosFil[i].release_date;
        let dataVet = data.split("-").reverse();
        let novaData =  dataVet.join("/");

        // Inserindo Informações
        let item_Filmes = `
        <div class="row filmesInfo">
            <div class="col-12 col-lg-6">
                <img src="https://image.tmdb.org/t/p/w342/${img}" alt="Poster de ${titulo}">
            </div>

            <div class="col-12 col-lg-6" data-movie-id="${id}">
                <h1>${titulo}</h1>
                <p><strong>Sinopse:</strong> ${sinopse}</p>
                <p id="equipe">

                    <strong>Estreia:</strong> ${novaData}
                </p>
                <p id="atores">

                </p>
                <p>
                    <strong>Avaliação:</strong> ${nota} <i class="fas fa-star"></i>
                </p>
                <p>
                    <button type="button" class="btn btn-warning controlModal" data-movie-id="${id}"
                        data-bs-toggle="modal" data-bs-target="#exemploModal">
                        <i class="fas fa-plus"></i> Mais informações
                    </button>
                </p>
            </div>
        </div>
        `;

        elementFilmes.insertAdjacentHTML("beforeend", item_Filmes);

        // Adicionando Créditos
        const URL_Creditos = `${config.TM_BASE_URL}/movie/${id}/credits?api_key=${config.TM_KEY}&language=${config.TM_LANGUAGE}`;
        requisicao(URL_Creditos, adcCast);
    }

    // Adicionando ação ao apertar botão
    areasCtrlModal = document.querySelectorAll(".controlModal");
    areasCtrlModal.forEach(item => item.addEventListener("click", AtivarModal));
}

/* Função Principal */

onload = () => {

    const URL_Recomendados = `${config.TM_BASE_URL}/movie/popular?api_key=${config.TM_KEY}&language=${config.TM_LANGUAGE}`;
    const URL_Cartaz = `${config.TM_BASE_URL}/movie/now_playing?api_key=${config.TM_KEY}&language=${config.TM_LANGUAGE}`;

    if(pagAtual.includes("cartaz.html")) {

        requisicao(URL_Cartaz, CriarFilmes);
    } else if(pagAtual.includes("populares.html")) {

        requisicao(URL_Recomendados, CriarFilmes);
    }

    requisicao(config.NW_URL, CriarNoticias);

    areasCtrlModal = document.querySelectorAll(".controlModal");
    areasCtrlModal.forEach(item => item.addEventListener("click", AtivarModal));
};