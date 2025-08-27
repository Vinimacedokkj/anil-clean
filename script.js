document.getElementById("whatsapp-image").addEventListener("click", function () {
    // Format: https://wa.me/PHONE?text=MESSAGE
    const phoneNumber = "5511930145556"; // Replace with your number (country code + area code + number)
    const message = "Olá, vim do site e gostaria de solicitar um orçamento";

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp in a new tab
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    });

