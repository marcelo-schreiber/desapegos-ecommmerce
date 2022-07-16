const checkout = async (id: string) => {
  const item = { price: id, quantity: 1 };
  const res = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify(item),
  });

  const b = await res.json();
  window.location.href = b.session.url;
};

export default checkout;
