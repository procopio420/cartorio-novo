const servicos = $('.servico');

window.onload = () => {
    for (const element of servicos) {
        element.addEventListener('mouseover', () => {
            const oldSrc = element.childNodes[1].childNodes[1].childNodes[1].src;
            const withoutSvg = oldSrc.slice(0, -4);
            element.childNodes[1].childNodes[1].childNodes[1].src = withoutSvg + '-azul.svg'
        })
        element.addEventListener('mouseout', () => {
            const oldSrc = element.childNodes[1].childNodes[1].childNodes[1].src;
            const withoutSvg = oldSrc.slice(0, -9);
            element.childNodes[1].childNodes[1].childNodes[1].src = withoutSvg + '.svg';
        })
    }

}