// ****************** COLETE INFANTIL PERSONALIZADO ******************
document.querySelector("#colete-infantil-personalizado").addEventListener("click", function () {
    // Format: https://wa.me/PHONE?text=MESSAGE
    const phoneNumber = "5511930145556"; // Replace with your number (country code + area code + number)
    const message = "Olá, vim através do site e gostaria de solicitar um orçamento de um colete infantil personalizado";

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp in a new tab
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
});

// ****************** WHATSAPP REQ ORÇAMENTO ******************
document.querySelector(".whatsapp-req-orcamento").addEventListener("click", function () {
    // Format: https://wa.me/PHONE?text=MESSAGE
    const phoneNumber = "5511930145556"; // Replace with your number (country code + area code + number)
    const message = "Olá, vim através do site e gostaria de solicitar um orçamento de um produto";

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp in a new tab
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
});
