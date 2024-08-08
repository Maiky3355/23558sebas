

//funcion PARA MOSTRAR ALERTAS PERSONALIZADAS
export function alertAgrego(titAlert, suceso, tipoAlert) {
    //ponemos el titulo del producto en el alert
    let alertTitulo = document.getElementById("alertTit");
    alertTitulo.textContent = `${titAlert} `;

    //ponemos el suceso del alert- sea danger o sucess
    let alertSuceso = document.getElementById("alertSuceso");
    alertSuceso.textContent = `${suceso} `;

    let alertAgrego = document.getElementById("alertAgrego");
    //hacemos el alert visible 
    alertAgrego.classList.remove("hide", "show");
    alertAgrego.style.cssText = 'z-index: -50 !important;';

    alertAgrego.classList.remove("alert-success", "alert-danger");
    alertAgrego.classList.add(tipoAlert);

    alertAgrego.classList.add("show");
    alertAgrego.style.cssText = 'z-index: 50 !important;';
    //Colocamos el timpo del alert antes de desactivarse
    setTimeout(() => {
        alertAgrego.classList.remove("hide", "show");
        alertAgrego.style.cssText = 'z-index: -50 !important;';
        alertAgrego.classList.add("hide");


    }, 2000);

};

