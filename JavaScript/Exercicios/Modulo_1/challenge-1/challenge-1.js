(function(win, doc) {
    'use strict';

    const endereco = {
        rua: 'Rua dos pinheiros',
        numero: 1293,
        bairro: 'Centro',
        cidade: 'São Paulo',
        uf: 'SP'
    };

    readObj(endereco);
    
    function readObj(obj) {
        const fragment = doc.createDocumentFragment();
        const tagP = doc.createElement('p');
        const spaceBetweenBar = ' / ';
        const commaSpace = ', ';
        const textElement = doc.createTextNode
        (
            'O usuário mora em ' + obj.cidade + spaceBetweenBar + 
            obj.uf + commaSpace + 'no bairro ' + obj.bairro +
            commaSpace + 'na rua "' + obj.rua + '" ' + 'com nº ' +
            obj.numero + '.'    
        );

        tagP.appendChild(textElement);
        fragment.appendChild(tagP);

        return doc.body.appendChild(fragment);
    }

})(window, document);