const [
	foodsSelect,
	customerList,
	ordersList,
	clientId,
	userHeader
] = getElement('#foodsSelect', '.customers-list', '.orders-list', '#clientId', '#userHeader')


async function renderUsers () {
	let { users } = await request(USERS)
	for(let user of users) {
		let [li, span, a] = createElement('li', 'span', 'a')

		li.classList.add('customer-item')
		span.classList.add('customer-name')
		a.classList.add('customer-phone')
		
		
		span.textContent = user.username
		a.textContent = '+' + user.contact
		a.setAttribute('href', 'tel:+'+ user.contact)

		li.append(span)
		li.append(a)
		customerList.append(li)


		li.onclick = () => {
			clientId.textContent = user.userId
			userHeader.textContent = user.username
			renderOrders(user.userId)
		}
	}

}


async function renderOrders (userId) {
	let { orders } = await request(ORDERS, { userId })
	ordersList.innerHTML = null
	for (let order of orders) {
		const [li, img, div, foodName, foodCount] = createElement('li', 'img', 'div', 'span', 'span')

		li.classList.add('order-item')
		foodName.classList.add('order-name')
		foodCount.classList.add('order-count')

		img.setAttribute('src', order.food.foodImg)
		img.setAttribute('alt', order.food.foodName)

		foodName.textContent = order.food.foodName
		foodCount.textContent = order.count

		div.append(foodName)
		div.append(foodCount)
		li.append(img)
		li.append(div)
		ordersList.append(li)
	}
}

renderUsers()



async function renderFoods () {
	let { foods } = await request(FOODS)
	for(let food of foods) {
		let [option] = createElement('option')
		option.value = food.foodId
		option.textContent = food.foodName
		foodsSelect.append(option)
	}
}

renderFoods()