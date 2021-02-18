let isSelected = false

window.onload = () => {
  const registroButton = document.querySelector("#consultaRegistro")
  const certidaoButton = document.querySelector("#consultaCertidao")
  const container = document.querySelector("#consultaContainer")
  const div = document.createElement("div")

  div.className = "row pt-3"

  registroButton.addEventListener("click", (e) => {
    if (isSelected) container.removeChild(div)

    div.innerHTML = `<div class="col-md-6 col-sm-12 col-xs-12 justify-content-center">
      <label for="year" class="text-white mr-1">Informe o número do registro/processo: </label>
      <div id="consulta" class="form-inline">
        <div class="input-group">
          <input name="number" type="text" class="form-control" placeholder="Número" id="numeroRegistro">
          <div class="input-group-append">
            <button type="submit" class="btn btn-primary" onclick="searchRegistro()">
              <div class="d-flex align-items-center">
                <span class="material-icons ml-1">search</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>`

    certidaoButton.disabled = false
    registroButton.disabled = true
    isSelected = true
    container.appendChild(div)
  })

  certidaoButton.addEventListener("click", (e) => {
    if (isSelected) container.removeChild(div)

    div.innerHTML = `<div class="col-md-8 col-sm-12 col-xs-12 justify-content-center">
      <label for="year" class="text-white">Informe o número da averbação/certidão: </label>
      <div id="consulta" class="form-inline">
        <input id="anoCertidao" type="text" class="form-control mr-1" style="width: 20%" placeholder="Ano">
        <div class="input-group w-75">
          <input name="number" type="text" class="form-control" placeholder="Número" id="numeroCertidao">
          <div class="input-group-append">
            <button type="submit" class="btn btn-primary" onclick="searchCertidao()">
              <div class="d-flex align-items-center">
                <span class="material-icons ml-1">search</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>`

    registroButton.disabled = false
    certidaoButton.disabled = true
    isSelected = true
    container.appendChild(div)
  })
}

async function searchRegistro() {
  renderLoading()
  const numeroRegistro = document.querySelector("#numeroRegistro").value

  const response = await fetch(
    `https://servcom.com.br/atualizacao-andamentos/gateway?OPER=CONSULTA_REGISTRO&NUMERO=${numeroRegistro}&ID_CLIENTE=702&WEB=true`,
    {
      headers: {
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.5",
      },
      referrer: "https://9oficioniteroi.com/andamentos.html",
      method: "GET",
      mode: "cors",
    }
  )

  const sanitizedResult = await parseResponse(response)
  handleResult(sanitizedResult)
}

async function searchCertidao() {
  renderLoading()
  const anoCertidao = document.querySelector("#anoCertidao").value
  const numeroCertidao = document.querySelector("#numeroCertidao").value

  const response = await fetch(
    `https://servcom.com.br/atualizacao-andamentos/gateway?OPER=CONSULTA_CERTIDAO&NUMERO=${anoCertidao}%2F${numeroCertidao}&ID_CLIENTE=702&WEB=true`,
    {
      headers: {
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.5",
      },
      referrer: "https://9oficioniteroi.com/andamentos.html",
      method: "GET",
      mode: "cors",
    }
  )

  const sanitizedResult = await parseResponse(response)
  handleResult(sanitizedResult)
}

async function parseResponse(response) {
  const responseText = await response.text()
  const responseJSON = JSON.parse(responseText)
  const result = responseJSON.RESULTADO[0]

  return parseHTMLtoJSON(result)
}

function parseHTMLtoJSON(html) {
  const jsonHtml = $.parseHTML($.trim(html))

  if (jsonHtml.length === 3) {
    return {
      error: jsonHtml[0].innerText,
      message: jsonHtml[2].innerText
    }
  } else {
    const status = jsonHtml[0].childNodes[0].childNodes[1].innerText
    const toPay = jsonHtml[0].childNodes[1].childNodes[1].innerText
    const number = jsonHtml[1].childNodes[1].innerText
    const openDate = jsonHtml[2].childNodes[1].innerText
    const reopenDate = jsonHtml[3].childNodes[1].innerText
    const type = jsonHtml[4].childNodes[1].innerText
    const imovel = jsonHtml[5].childNodes[1].innerText
    const requerente = jsonHtml[6].childNodes[1].innerText

    return {
      status: status !== "-" ? status : null,
      toPay: toPay !== "-" ? toPay : null,
      number: number !== "-" ? number : null,
      openDate: openDate !== "-" ? openDate : null,
      reopenDate: reopenDate !== "-" ? reopenDate : null,
      type: type !== "-" ? type : null,
      imovel: imovel !== "-" ? imovel : null,
      requerente: requerente !== "-" ? requerente : null,
    }
  }
}

function handleResult(response) {
  if (response.error) {
    renderError(response)
    return
  }

  renderResult(response)
}

function renderResult(response) {
  const resultContainer = document.querySelector("#consultaResultado")

  resultContainer.innerHTML = ''

  const resultView = `<div class="text-center py-3" style="border:2px solid #0073ff; border-radius: 3px; background-color: rgba(0,0,0,0.5);">
    <h2 class="text-center text-primary"><strong>${response.type.toUpperCase()}</strong></h2>
    <div class="icon bg-primary d-flex justify-content-center align-items-center mb-0" style="border:2px solid #0073ff">
      ${response.status === 'PRONTO' ? `<span class="material-icons ml-1" style="color: #fff">done_all</span>` : ''}
      ${response.status === 'BUSCA' ? `<span class="material-icons ml-1" style="color: #fff">search</span>` : ''}
    </div>
    <p class="text-center mt-0 text-primary">${response.status}</p>
    <div class="text">
      <p class="text-center">${response.number}</p>
      ${response.toPay ? `<p class="text-center text-danger">Total a pagar: ${response.toPay}</p>` : ''}
      ${response.openDate ? `<p>Data do pedido: ${response.openDate}</p>` : ''}
      ${response.reopenDate ? `<p>Data da reentrada: ${response.reopenDate}</p>` : ''}
      ${response.imovel ? `<p>Imóvel: ${response.imovel}</p>` : ''}
      ${response.requerente ? `<p>Requerente: ${response.requerente}</p>` : ''}
    </div>
  </div>`
  
  
  resultContainer.innerHTML = `<h2 class="subheading text-right mb-0">RESULTADO</h2>${resultView}`
}

function renderError(response) {
  const resultContainer = document.querySelector("#consultaResultado")

  resultContainer.innerHTML = ''

  const resultView = `<div class="text-center py-3 px-2" style="border:2px solid #ff0033; border-radius: 3px; background-color: rgba(0,0,0,0.5);">
    <div class="icon bg-danger d-flex justify-content-center align-items-center mb-0" style="border:2px solid #ff0033">
      <span class="material-icons ml-1" style="color: #fff">priority_high</span>
    </div>
    <div class="text">
      <p class="text-center mb-0"><strong>${response.error.split('!')[0]}!</strong></p>
      <p class="text-center">${response.error.split('!')[1]}</p>
      <p class="text-center"><small>${response.message}</small></p>
    </div>
  </div>`
  
  
  resultContainer.innerHTML = `<h2 class="subheading text-right mb-0" style="color: #ff0033">ERRO</h2>${resultView}`
}

function renderLoading() {
  const resultContainer = document.querySelector("#consultaResultado")

  resultContainer.innerHTML = ''

  const loading = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`
  const resultView = `<div class="text-center py-3" style="border:2px solid #0073ff; border-radius: 3px; background-color: rgba(0,0,0,0.5);">
    ${loading}
    <p class="text-center mt-0 text-primary">Consultando...</p>
  </div>`
  
  
  resultContainer.innerHTML = resultView
}
