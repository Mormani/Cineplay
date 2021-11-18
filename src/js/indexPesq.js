/* Pesquisa */

function CriarPesquisa(pesquisaJSON) {

    let pesquisaParsed = JSON.parse(pesquisaJSON);
    let resultsPesq = pesquisaParsed.results;
    let tam = resultsPesq.length;

    let elementFilmes = document.querySelector("#pesq");

    for(let i = 0; i < tam; i++) {

        // Informações Padrões
        let img = resultsPesq[i].poster_path;
        let titulo = resultsPesq[i].title;
        let sinopse = resultsPesq[i].overview;
        let nota = resultsPesq[i].vote_average;
        let id = resultsPesq[i].id;

        // Data de Estreia
        let data = resultsPesq[i].release_date;
        let dataVet = data.split("-").reverse();
        let novaData =  dataVet.join("/");

        // Inserindo Informações
        let item_Filmes = `
        <div class="row filmesInfo">
            <div class="col-12 col-sm-4 col-lg-6">
                <img src="https://image.tmdb.org/t/p/w342/${img}" alt="Poster de ${titulo}">
            </div>

            <div class="col-12 col-sm-8 col-lg-6" data-movie-id="${id}">
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
        const URL_Detalhes = `${config.TM_BASE_URL}/movie/${id}/credits?api_key=${config.TM_KEY}&language=${config.TM_LANGUAGE}`;
        requisicao(URL_Detalhes, adcCast);
    }

    // Adicionando ação ao apertar botão
    areasCtrlModal = document.querySelectorAll(".controlModal");
    areasCtrlModal.forEach(item => item.addEventListener("click", AtivarModal));
}

/* Função Principal */

onload = () => {

    const params = (new URL(document.location)).searchParams;
    const pesquisa = params.get("pesquisa");
    document.title = `Pesquisa ${pesquisa} | Cineplay - O Seu Portal de Filmes!`;

    const pesquisaMais = `<strong>Pesquisa sobre:</strong> ${pesquisa.toUpperCase()}`;
    document.querySelector(".divTitle > div > p").innerHTML = pesquisaMais;

    const URL_Pesquisa = `${config.TM_BASE_URL}/search/movie?api_key=${config.TM_KEY}&language=${config.TM_LANGUAGE}&query=${pesquisa}&page=1&include_adult=0`;

    requisicao(URL_Pesquisa, CriarPesquisa);
    requisicao(config.NW_URL, CriarNoticias);
};