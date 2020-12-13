/* //<![CDATA[ */
// Uncheck radio buttons on A3 form (primeira lista de radio)
var uncheckOthers = function (radio, coluna) {
    var elements = Array.from(radio.form.elements);
    var objects = [];
    var i;

    elements.map(function (element, index) {
        if (radio.name === element.name) {
            i = index;
        }
    })

    if (coluna === 0) {
        elements[i + 1].checked = false;
        elements[i + 2].checked = false;
    } else if (coluna === 1) {
        elements[i - 1].checked = false;
        elements[i + 1].checked = false;
    } else {
        elements[i - 1].checked = false;
        elements[i - 2].checked = false;
    }
}

// Uncheck radio buttons on A3 form (segunda lista de radio)
var uncheck = function (radio, coluna) {
    var elements = Array.from(radio.form.elements);
    var objects = [];
    var i;

    elements.map(function (element, index) {
        if (radio.name === element.name) {
            i = index;
        }
    })

    if (coluna === 0) {
        elements[i + 1].checked = false;
    }
    else {
        elements[i - 1].checked = false;
    }
}

// Exibir exclamação quando radio estiver vazio, e verificar se os inputs de texto estão preenchidos no formulário de A3
var count = 0;
$('.acoes input[name*="a3Save"]').on('click', function (event) {
    debugger;
    var lista = Array.from($('.coluna'));
    var campos = Array.from($('textarea'));
    var retorno;
    var countCheck = 0;
    var unchecked = [];

    lista.map(function (e, index) {

        //nesse If so entra as td com os inputs
        if (e.cellIndex === 1) {
            //So entra se existir conteudo filho
            if ($(lista[index + 2]).length !== 0) {

                if (($(lista[index])[0].cellIndex === 1)) {
                    for (var i = 0; i < 2; i++) {
                        if ($(lista[index]).find('input')[i].checked === false) {
                            countCheck = countCheck + 1;
                        }
                        else {
                            $(lista[index - 1]).find('i').removeClass('fa fa-exclamation');
                            count = count + 1;
                        }
                    }

                    if (countCheck >= 3) {
                        if (/^[0-9a-zA-Z]+$/.test(lista[index - 1].textContent[0])) {
                            unchecked.push($(lista[index - 1]));
                            countCheck = 0;
                        }
                    }
                }
                // else {
                //     for (var i = 0; i < 2; i++) {
                //         if ($(lista[index + i]).find('input')[0].checked === false) {
                //             countCheck = countCheck + 1;
                //         }
                //         else {
                //             $(lista[index - 1]).find('i').removeClass('fa fa-exclamation');
                //             count = count + 1;
                //         }

                //         if (countCheck === 2) {
                //             if (i === 1 && /^[0-9a-zA-Z]+$/.test(lista[(i + index) - 2].textContent[0])) {
                //                 unchecked.push($(lista[(i + index) - 2]));
                //                 countCheck = 0;
                //             }
                //         }
                //     }
                // }
            }

            unchecked.map(function (u) {
                if ($(u).find('i').length === 0) {
                    $(u).append(' <i class="fa fa-exclamation" style="color: red"></i>');
                }
            })
        }
    })

    if (window.location.href.indexOf("/formularios/a3") > -1) {
        var textSize1 = $('textarea[id*="atividadeDesenvolvidaInput"]')[0].value.length;
        var textSize2 = $('textarea[id*="sugestaoInput"]')[0].value.length;
        var textSize3 = $('textarea[id*="dificuldadeInput"]')[0].value.length;

        var limit1 = $('textarea[id*="atividadeDesenvolvidaInput"]').attr('minlength');

        if ((textSize1 < parseInt(limit1) || textSize2 == 0 || textSize3 == 0)) {
            event.preventDefault();

            if (textSize2 == 0) {
                $('textarea[id*="sugestaoInput"]').attr('style', 'border-color: red;');
            }
            else {
                $('textarea[id*="sugestaoInput"]').attr('style', 'border-color: #cccccc;');
            }

            if (textSize3 == 0) {
                $('textarea[id*="dificuldadeInput"]').attr('style', 'border-color: red;');
            }
            else {
                $('textarea[id*="sugestaoInput"]').attr('style', 'border-color: #cccccc;');
            }
        } else if (count >= 18) {
            $('input[name*="jsClick"]').click();
        }
    }
})

// Mostra quantos caracteres faltam em mensagem abaixo do input de atividades no formulário A3
var charactersLeft = function (e, size) {
    var element = $(e).next();
    var left = size - parseInt($(e)[0].value.length);

    if (left >= 0) {
        element[0].textContent = "";
        element[0].append('Faltam ' + left + ' characters.');
    }
    else {
        element[0].textContent = "";
        element[0].append('Faltam 0 characters.');
    }
}

// Bloqueia botão de emissão de certificados/comprovantes
var bloqueiaEmissao = function (e) {
    var element = $(e);

    if (element.attr('class').indexOf('disabled') > -1) {
        element.first().removeAttr('onclick');
    }
}
/* //]]> */