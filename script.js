const form = document.querySelector('.formulario');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let cidade = e.target[0].value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    verificaApi(cidade);
});

async function verificaApi(cidade) {
    const apiKey = 'c34e2e366bae46d885f133616231810';
    const link = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cidade}&days=1&lang=pt`;
    
    try {
        let api = await fetch(link);
        let resultado = await api.json();

        template(resultado);

    } catch {
        throw new Error(`Não foi possivel buscar o a cidade: ${cidade}`);
    }
}

async function template(resultado) {
    const secaoClima = document.querySelector('.secao-clima');
    
    let hoje = new Date();
    let meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    
    secaoClima.innerHTML = `
    <h1 class='titulo-tempo'>Previsão de Hoje ${hoje.getDate()} / ${meses[(hoje.getMonth())]} <br/> ${resultado.location.name} - ${resultado.location.region}</h1>
    <ul class='lista-tempo'>
        <li class='lista-linha'>
            <span class='texto-tempo'>Temperatura: ${resultado.current.temp_c}º</span>
        </li>
        <li class='lista-linha'>
            <img class='img-tempo' src="${resultado.current.condition.icon}" alt="Icone de ${resultado.current.condition.text}">
            <span class='texto-tempo'>${resultado.current.condition.text}</span>
        </li>
        <li class='lista-linha'>
            <span class='texto-tempo'>Sensação Térmica: ${resultado.current.feelslike_c}º</span>
        </li>
        <li class='lista-linha'>
        <img class='img-tempo' src="${resultado.forecast.forecastday[0].day.condition.icon}" alt="Icone de ${resultado.forecast.forecastday[0].day.condition.text.icon}">
            <span class='texto-tempo'>Durante o dia há  ${resultado.forecast.forecastday[0].day.condition.text}</span>
        </li>
        <li class='lista-linha'>
            <span class='texto-tempo'>Temperatura min: ↓ ${resultado.forecast.forecastday[0].day.mintemp_c}º</span>
            <span class='texto-tempo'>temperatura máx: ↑ ${resultado.forecast.forecastday[0].day.maxtemp_c}º</span>
        </li>
    </ul>
    `;
}

