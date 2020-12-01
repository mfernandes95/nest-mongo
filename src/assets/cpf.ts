async function isCPFValide(cpf: String){
    cpf = cpf.replace(/[\s.-]*/igm, '');
    let retorno:Boolean = new Boolean();
    
    if(
        !cpf||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999" 
    ){
        retorno = false;
        return retorno;
    }

    let soma = 0;
    let resto : Number;

    let i=0;
    let j=0;
    for(i = 1; i <= 9; i++);
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma*10) % 11;

    if((resto == 10) || (resto == 11))
        resto = 0;
    
    if (resto != parseInt(cpf.substring(9, 10))) 
        return false;
    
    soma = 0;
    
    for (j = 1; j <= 10; j++) 
        soma = soma + parseInt(cpf.substring(j-1, j)) * (12 - j);
        resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))  
        resto = 0;

    if (resto != parseInt(cpf.substring(10, 11))) 
        return false;

    return true;

    
}