const escreventes = [{
        id: 1,
        name: 'Elizabeth Cristina Andrade Sousa',
        phone: '(21) 99491-9695',
        email: 'elizabethandradesousa@gmail.com',
    },
    {
        id: 2,
        name: 'Iara Marcelino Santos',
        phone: '(21) 96416-6887',
        email: 'iaracall97@gmail.com',
    },
    {
        id: 3,
        name: 'Letícia Nóbrega Vieira',
        phone: '(21) 97242-5005',
        email: 'leticia9oficio@gmail.com',
    },
    {
        id: 4,
        name: 'Paula de Abreu Cunha',
        phone: '(21) 97964-7556',
        email: 'paulaabreu_cunha@hotmail.com',
    },
    {
        id: 5,
        name: 'Rosângela Nascimento dos Santos',
        phone: '(21) 99600-6940',
        email: 'sontiero01@gmail.com',
    },
    {
        id: 6,
        name: 'Valéria Santos Melo',
        phone: '(21) 97008-5827',
        email: 'vallmello_@hotmail.com',
    },
];

const select = document.getElementById('escreventeSelect');

window.onload = function() {
    escreventes.forEach(escrevente => {
        const option = document.createElement('option');
        option.value = escrevente.name;
        option.innerHTML = escrevente.name;
        select.appendChild(option);
    });

}