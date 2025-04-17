const $wrapper = document.querySelector('.pizzas-wrapper')
const $basketAside = document.querySelector('.basket-aside')
const $orderModal = document.querySelector('.order-modal')
const $orderModalDetail = document.querySelector('.order-detail')
const $orderModalBtn = document.querySelector('.new-order-btn')
const $orderModalWrapper = document.querySelector('.order-modal-wrapper')

const API = "https://prime-garfish-currently.ngrok-free.app"

let basket = []

async function getProducts() {
    const res = await fetch(`${API}/products`, {
        headers: {
            "ngrok-skip-browser-warning": "1",
            "Content-Type": "application/json",
          },
    })
    const data = await res.json()


    data.forEach(product =>{
        createProduct(product)
    })
}


    function createProduct(product) {

        const $item = document.createElement('div')
        $item.classList.add('pizza-item')


        const $img = document.createElement('img')
        $img.classList.add('pizza-picture')
        $img.src = product.image
        $img.alt = product.name
        $img.title = product.description


        const $button = document.createElement('span')
        $button.classList.add('add-to-cart-btn')
        $button.setAttribute('data-id', product.id)

        const $cardImage = document.createElement('img')
        $cardImage.src = 'images/carbon_shopping-cart-plus.svg'


        const $list = document.createElement('ul')
        $list.classList.add('pizza-infos')


        const $pizzaName = document.createElement('li')
        $pizzaName.classList.add('pizza-name')
        $pizzaName.textContent = product.name

        const $price = document.createElement('li')
        $price.classList.add('pizza-price')
        $price.textContent = "$" + product.price

        $button.addEventListener('click', function (e) {
            const id = e.target.getAttribute('data-id')
            e.target.classList.add('hidden')
            document.querySelector(`.added-to-basket-btn[data-id="${id}"]`).classList.remove('hidden')
            increaseBasket(product)
        })

        const $addedToBasket = document.createElement('span')
        $addedToBasket.classList.add('added-to-basket-btn')
        $addedToBasket.classList.add('hidden')
        $addedToBasket.setAttribute('data-id', product.id)


        const $addedToBasketDecrease = document.createElement('img')
        $addedToBasketDecrease.src = './images/Subtract Icon.svg'

        const $addedToBasketText = document.createElement('p')
        $addedToBasketText.textContent = "1"

        const $addedToBasketIncrease = document.createElement('img')
        $addedToBasketIncrease.src = "./images/Add Icon.svg"

        $addedToBasketDecrease.addEventListener('click', function (e) {
            const id = e.target.parentElement.getAttribute('data-id')
            const text = e.target.parentElement.querySelector('p')
            text.textContent--
            decreaseBasket(product)
        })


        $addedToBasketIncrease.addEventListener('click', function (e) {
            const id = e.target.parentElement.getAttribute('data-id')
            const text = e.target.parentElement.querySelector('p')
            text.textContent++
            increaseBasket(product)
        })



        $wrapper.appendChild($item)
        $item.appendChild($img)
        $item.appendChild($button)
        $item.appendChild($addedToBasket)
        $addedToBasket.appendChild($addedToBasketDecrease)
        $addedToBasket.appendChild($addedToBasketText)
        $addedToBasket.appendChild($addedToBasketIncrease)
        $button.appendChild($cardImage)
        $button.append(" Ajouter au panier")
        $item.appendChild($list)
        $list.appendChild($pizzaName)
        $list.appendChild($price)
    }


    function decreaseBasket(product) {
        const item = basket.find(item => item.id == product.id)
        console.log(item)

    if (item.quantity === 1) {
        const index = basket.indexOf(item)
        basket.splice(index, 1)
        document.querySelector(`.added-to-basket-btn[data-id="${product.id}"]`).classList.add('hidden')
        document.querySelector(`.added-to-basket-btn[data-id="${product.id}"] p`).textContent = 1
        document.querySelector(`.add-to-cart-btn[data-id="${product.id}"]`).classList.remove('hidden')
    } else {
        item.quantity--

    }
    displayBasket() 
}





function increaseBasket(product) {


    const item = basket.find(item => item.id == product.id)

    if (item) {
        item.quantity += 1
    } else {
        const item = {
            name: product.name,
            price: product.price,
            id: product.id,
            quantity: 1
        }

        basket.push(item)
    }

    displayBasket()

}



function removeFromBasket(id) {
    const index = basket.indexOf(id)
    console.log("doudoub");
    
    basket.splice(index, 1)

    document.querySelector(`.added-to-basket-btn[data-id="${id}"]`).classList.add('hidden')
    document.querySelector(`.added-to-basket-btn[data-id="${id}"] p`).textContent = 1
    document.querySelector(`.add-to-cart-btn[data-id="${id}"]`).classList.remove('hidden')

    console.log(basket)
    displayBasket()

}


function displayBasket() {
    let price = 0

    if (basket.length === 0) {
        $basketAside.innerHTML = `
        <h2>Votre panier (0)</h2>
        <div class="empty-basket">
          <img src="../images/pizza.png" alt="" />
          <p>Votre panier est vide...</p>
        </div>
      `
        return

    } else {
        console.log("azrae  ")
        $basketAside.innerHTML = '<h2> Votre panier (<span class="basket-item-quantity"></span>) </h2>'

        const $basket = document.createElement('ul')
        $basket.classList.add('basket-products')

        $basketAside.appendChild($basket)

        document.querySelector('.basket-item-quantity').textContent += basket.length



        basket.forEach(product => {

            price += product.price * product.quantity

            const $productItem = document.createElement('li')
            $productItem.classList.add('basket-product-item')
            $productItem.setAttribute("data-id", product.id)

            const $itemName = document.createElement('span')
            $itemName.classList.add('basket-product-item-name')
            $itemName.textContent = product.name

            const $itemDetails = document.createElement('span')
            $itemDetails.classList.add('basket-product-details')

            const $itemQuantity = document.createElement('span')
            $itemQuantity.classList.add('basket-product-details-quantity')
            $itemQuantity.textContent = product.quantity

            const $itemPrice = document.createElement('span')
            $itemPrice.classList.add('basket-product-details-unit-price')
            $itemPrice.textContent = "@ $" + product.price

            const $itemTotalPrice = document.createElement('span')
            $itemTotalPrice.classList.add('basket-product-details-total-price')
            $itemTotalPrice.textContent = "$" + product.price * product.quantity

            const $removeItem = document.createElement('img')
            $removeItem.classList.add('basket-product-remove-icon')
            $removeItem.src = "./images/remove-icon.svg"


            $removeItem.addEventListener("click", function (e) {
                const id = e.target.parentElement.getAttribute('data-id')
                removeFromBasket(id)
            })



            $basket.appendChild($productItem)
            $productItem.appendChild($itemName)
            $productItem.appendChild($itemDetails)
            $itemDetails.appendChild($itemQuantity)
            $itemDetails.appendChild($itemPrice)
            $itemDetails.appendChild($itemTotalPrice)
            $productItem.appendChild($removeItem)



        });



        const $totalOrder = document.createElement('p')
        $totalOrder.classList.add('total-order')

        const $title = document.createElement('span')
        $title.classList.add('total-order-title')
        $title.textContent = "Order total"

        const $totalPrice = document.createElement('span')
        $totalPrice.classList.add('total-order-price')
        $totalPrice.textContent = "$" + price

        const $deliveryInfo = document.createElement('p')
        $deliveryInfo.classList.add('delivery-info')
        $deliveryInfo.innerHTML = ' This is a <span>carbon neutral</span> delivery '


        const $confirmOrder = document.createElement('a')
        $confirmOrder.classList.add('confirm-order-btn')
        $confirmOrder.textContent = "Confirm order"

        $confirmOrder.addEventListener('click', function () {
            confirmOrder()
        })

        $basket.appendChild($totalOrder)
        $basket.appendChild($deliveryInfo)
        $basket.appendChild($confirmOrder)
        $totalOrder.appendChild($title)
        $totalOrder.appendChild($totalPrice)
    }
}


async function confirmOrder() {
    const access_token = localStorage.getItem('access_token')
    const reqBody = basket.map(item => {
        return {
            uuid: item.id,
            quantity: item.quantity
        }
    })

    const req = await fetch(`${API}/orders`, {
        "method": "POST",
        headers: {
            'Authorization': access_token,
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "1",
        },

        body: JSON.stringify({
            products: reqBody
        })
    })
    const res = await req.json()
    
        if (!res || !res.products) {
            console.error('Invalid response from API:', res);
            return;
        }


    displayOrderModal(res.products)
}


function displayOrderModal(order) {
    $orderModalWrapper.classList.remove('hidden')

    let price = 0
    order.forEach(item => {
        price += item.product.price * item.quantity


        const $orderDetailItem = document.createElement('li')
        $orderDetailItem.classList.add('order-detail-product-item')


        const $orderItemImage = document.createElement('img')
        $orderItemImage.classList.add('order-detail-product-image')
        $orderItemImage.src = item.product.image


        const $orderItemTitle = document.createElement('span')
        $orderItemTitle.classList.add('order-detail-product-name')
        $orderItemTitle.textContent = item.product.name

        const $orderItemQuantity = document.createElement('span')
        $orderItemQuantity.classList.add('order-detail-product-quantity')
        $orderItemQuantity.textContent = item.quantity + "x"

        const $orderItemUnitPrice = document.createElement('span')
        $orderItemUnitPrice.classList.add('order-detail-product-unit-price')
        $orderItemUnitPrice.textContent = "@ $" + item.product.price

        const $orderItemTotalPrice = document.createElement('span')
        $orderItemTotalPrice.classList.add('order-detail-product-total-price')
        $orderItemTotalPrice.textContent = "$" + item.product.price * item.quantity


        $orderModalDetail.appendChild($orderDetailItem)
        $orderDetailItem.appendChild($orderItemImage)
        $orderDetailItem.appendChild($orderItemTitle)
        $orderDetailItem.appendChild($orderItemQuantity)
        $orderDetailItem.appendChild($orderItemUnitPrice)
        $orderDetailItem.appendChild($orderItemTotalPrice)

    })

    const $totalOrder = document.createElement('li')
    $totalOrder.classList.add('order-detail-total-price')


    const $totalOrderTitle = document.createElement('span')
    $totalOrderTitle.classList.add('total-order-title')
    $totalOrderTitle.textContent = "Order total"


    const $totalOrderPrice = document.createElement('span')
    $totalOrderPrice.classList.add('total-order-price')
    $totalOrderPrice.textContent = "$" + price



    $orderModalDetail.appendChild($totalOrder)
    $totalOrder.appendChild($totalOrderTitle)
    $totalOrder.appendChild($totalOrderPrice)

}


$orderModalBtn.addEventListener('click', function () {
    window.location.reload()
})


getProducts()
