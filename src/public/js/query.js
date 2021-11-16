const FOODS = `
	query {
		foods {
			foodId
			foodName
		}
	}
`

const USERS = `
	query {
		users {
			userId
			username
			contact
		}
	}
`

const ORDERS = `
	query ($userId: ID) {
		orders(userId: $userId) {
			food {
				foodName
				foodImg
			}
			count
		}
	}
`