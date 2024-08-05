// // Add SDK credentials
// // REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
// const mp = new MercadoPago("TEST-8a687449-380b-4845-aede-5352500674e0", "TEST-7469243817254275-080419-0ef6b9d1baa88e210d6b3dd93ad9d90a-237516622", {
//   locale: "es-AR" // Puedes cambiar el locale según tu preferencia
// });

// const preference = {
//   items: [
//       {
//           title: "Mi producto",
//           description: "Descripción del producto",
//           quantity: 1,
//           currency_id: "ARS",
//           unit_price: 100
//       }
//   ],
//   back_urls: {
//       success: "http://tudominio.com/success",
//       failure: "http://tudominio.com/failure",
//       pending: "http://tudominio.com/pending"
//   },
//   auto_return: "approved"
// };


// document.getElementById('boton-pago').addEventListener('click', () => {
//   mp.checkout({
//     preference,
//     render: {
//         container: '#boton-pago',
//         label: 'Pagar'
//     },
//     autoOpen: true // Agrega esta opción
// });
// });

        
import { loadMercadoPago } from "@mercadopago/sdk-js";

await loadMercadoPago();
const mp = new window.MercadoPago("TEST-8a687449-380b-4845-aede-5352500674e0");

const cardForm = mp.cardForm({
  amount: "100.5",
  iframe: true,
  form: {
    id: "form-checkout",
    cardNumber: {
      id: "form-checkout__cardNumber",
      placeholder: "Numero de tarjeta",
    },
    expirationDate: {
      id: "form-checkout__expirationDate",
      placeholder: "MM/YY",
    },
    securityCode: {
      id: "form-checkout__securityCode",
      placeholder: "Código de seguridad",
    },
    cardholderName: {
      id: "form-checkout__cardholderName",
      placeholder: "Titular de la tarjeta",
    },
    issuer: {
      id: "form-checkout__issuer",
      placeholder: "Banco emisor",
    },
    installments: {
      id: "form-checkout__installments",
      placeholder: "Cuotas",
    },        
    identificationType: {
      id: "form-checkout__identificationType",
      placeholder: "Tipo de documento",
    },
    identificationNumber: {
      id: "form-checkout__identificationNumber",
      placeholder: "Número del documento",
    },
    cardholderEmail: {
      id: "form-checkout__cardholderEmail",
      placeholder: "E-mail",
    },
  },
  callbacks: {
    onFormMounted: error => {
      if (error) return console.warn("Form Mounted handling error: ", error);
      console.log("Form mounted");
    },
    onSubmit: event => {
      event.preventDefault();

      const {
        paymentMethodId: payment_method_id,
        issuerId: issuer_id,
        cardholderEmail: email,
        amount,
        token,
        installments,
        identificationNumber,
        identificationType,
      } = cardForm.getCardFormData();

      fetch("/process_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          issuer_id,
          payment_method_id,
          transaction_amount: Number(amount),
          installments: Number(installments),
          description: "Descripción del producto",
          payer: {
            email,
            identification: {
              type: identificationType,
              number: identificationNumber,
            },
          },
        }),
      });
    },
    onFetching: (resource) => {
      console.log("Fetching resource: ", resource);

      // Animate progress bar
      const progressBar = document.querySelector(".progress-bar");
      progressBar.removeAttribute("value");

      return () => {
        progressBar.setAttribute("value", "0");
      };
    }
  },
});