const tg = window.Telegram.WebApp;
tg.ready();
let cart = [];
const products = [
  {id:1,name:'Book',emoji:'📚',price:10},
  {id:2,name:'Coffee',emoji:'☕',price:5},
  {id:3,name:'Phone',emoji:'📱',price:299},
  {id:4,name:'Laptop',emoji:'💻',price:1299},
  {id:5,name:'Watch',emoji:'⌚',price:199},
  {id:6,name:'Headphones',emoji:'🎧',price:79}
];
function renderProducts(){
  const el=document.getElementById('products');
  el.innerHTML=products.map(p=>`<div class="product"><div class="product-emoji">${p.emoji}</div><div class="product-name">${p.name}</div><div class="product-price">$${p.price}</div><button class="add-btn" onclick="addToCart(${p.id})">Add</button></div>`).join('');
}
function addToCart(id){
  const p=products.find(x=>x.id===id);
  cart.push(p);
  updateCart();
  tg.HapticFeedback?.impactOccurred('light');
}
function updateCart(){
  document.getElementById('cartBadge').textContent=cart.length;
  const total=cart.reduce((s,p)=>s+p.price,0);
  document.getElementById('total').textContent=total;
}
renderProducts();
