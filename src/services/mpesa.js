export async function initiateMpesaPayment(phone, amount) {
  try {
    const response = await fetch("http://localhost/M-Pesa/stkpush.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        phone: phone,
        amount: amount,
      }),
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Payment error:", error);
    return { error: "Payment failed" };
  }
}
