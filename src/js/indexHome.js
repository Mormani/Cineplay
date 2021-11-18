const Cartazes = {
    controlCartaz: 0
}

/* Slides */

function CriarSlidePopulares(popularJSON) {

    let popularParsed = JSON.parse(popularJSON);
    let resultadosPop = popularParsed.results;

    let elementCarroselInner = document.querySelector(".carousel-inner");
    let elementCarroselIndicators = document.querySelector(".carousel-indicators");

    for(let i = 0; i < 5; i++) {

        // Informações Padrões
        let img = resultadosPop[i].poster_path;
        let titulo = resultadosPop[i].title;
        let sinopse = resultadosPop[i].overview;
        let nota = resultadosPop[i].vote_average;
        let id = resultadosPop[i].id;

        // Data de Estreia
        let data = resultadosPop[i].release_date;
        let dataVet = data.split("-").reverse();
        let novaData =  dataVet.join("/");

        // Inserindo Informações
        let item_carrossel = `
        <div class="carousel-item">
            <div class="row">
                <div class="col-12 col-lg-6">
                    <img src="https://image.tmdb.org/t/p/w342/${img}" alt="Poster de ${titulo}">
                </div>

                <div class="col-12 col-lg-6" data-movie-id="${id}">
                    <h2>${titulo}</h2>
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

        </div>
        `;

        let item_indicator = `<button type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide-to="${i}"aria-label="Slide ${i + 1}"></button>`;

        elementCarroselInner.insertAdjacentHTML("beforeend", item_carrossel);
        elementCarroselIndicators.insertAdjacentHTML("beforeend", item_indicator);

        // Ativando Primeiro Slide do Carrossel
        if(i == 0) {

            document.querySelector(".carousel-inner > .carousel-item").classList.add("active");

            document.querySelector(".carousel-indicators > button").classList.add("active");
            document.querySelector(".carousel-indicators > button").setAttribute("aria-current", "true");
        }

        // Adicionando Créditos
        const URL_Creditos = `${config.TM_BASE_URL}/movie/${id}/credits?api_key=${config.TM_KEY}&language=${config.TM_LANGUAGE}`;
        requisicao(URL_Creditos, adcCast);
    }

    // Adicionando ação ao apertar botão
    areasCtrlModal = document.querySelectorAll(".controlModal");
    areasCtrlModal.forEach(item => item.addEventListener("click", AtivarModal));
}

/* Cartazes */

function CriarCartazes(cartazesJSON) {

    let cartazesParsed = JSON.parse(cartazesJSON);
    let resultadosCart = cartazesParsed.results;

    // Informações Padrões
    let img, nome, id;

    if(Cartazes.controlCartaz < 4) {

        // Cartazes iniciais
        let elementCartazes = document.querySelector("#cartazes div");

        for(Cartazes.controlCartaz = 0; Cartazes.controlCartaz < 4; Cartazes.controlCartaz++) {

            img = resultadosCart[Cartazes.controlCartaz].poster_path;
            nome = resultadosCart[Cartazes.controlCartaz].title;
            id = resultadosCart[Cartazes.controlCartaz].id;

            // Inserindo Cartaz
            let item_Cartaz = `
            <div class="col-12 col-sm-6 col-lg-3 bannerCartaz">
                <a href="#" class="controlModal" data-movie-id="${id}" data-bs-toggle="modal" data-bs-target="#exemploModal">
                    <img src="https://image.tmdb.org/t/p/w500/${img}" alt="Banner de ${nome}">
                </a>
            </div>
            `;

            elementCartazes.insertAdjacentHTML("beforebegin", item_Cartaz);
            areasCtrlModal = document.querySelectorAll(".controlModal");
            areasCtrlModal.forEach(item => item.addEventListener("click", AtivarModal));
        }
    } else {

        // Cartazes adicionais
        let elementCartazes2 = document.querySelector("#cartazes div:last-child");

        for(let i = 0; i < 4; i++, Cartazes.controlCartaz++) {

            img = resultadosCart[Cartazes.controlCartaz].poster_path;
            nome = resultadosCart[Cartazes.controlCartaz].title;
            id = resultadosCart[Cartazes.controlCartaz].id;

            // Inserindo Cartaz
            let item_Cartaz = `
            <div class="col-12 col-sm-6 col-lg-3 bannerCartaz">
                <a href="#" class="controlModal" data-movie-id="${id}" data-bs-toggle="modal" data-bs-target="#exemploModal">
                    <img src="https://image.tmdb.org/t/p/w500/${img}" alt="Banner de ${nome}">
                </a>
            </div>
            `;

            elementCartazes2.insertAdjacentHTML("beforebegin", item_Cartaz);
            areasCtrlModal = document.querySelectorAll(".controlModal");
            areasCtrlModal.forEach(item => item.addEventListener("click", AtivarModal));
        }

    }

    if(Cartazes.controlCartaz >= 20) {
        document.querySelector("#btnCartaz").classList.add("disabled");
    }
}

/* Função Principal */

onload = () => {

    const URL_Recomendados = `${config.TM_BASE_URL}/movie/popular?api_key=${config.TM_KEY}&language=${config.TM_LANGUAGE}`;
    const URL_Cartaz = `${config.TM_BASE_URL}/movie/now_playing?api_key=${config.TM_KEY}&language=${config.TM_LANGUAGE}`;

    requisicao(URL_Recomendados, CriarSlidePopulares);
    requisicao(URL_Cartaz, CriarCartazes);
    requisicao(config.NW_URL, CriarNoticias);

    areasCtrlModal = document.querySelectorAll(".controlModal");
    areasCtrlModal.forEach(item => item.addEventListener("click", AtivarModal));

    btnCartaz.onclick = () => requisicao(URL_Cartaz, CriarCartazes);
};