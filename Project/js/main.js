document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const orderForm = document.getElementById("orderForm")
  const purchasesList = document.getElementById("purchasesList")
  const searchInput = document.getElementById("search")

  // Load purchases from localStorage
  const purchases = JSON.parse(localStorage.getItem("purchases")) || []

  // Display purchases
  function displayPurchases(purchasesToShow) {
    purchasesList.innerHTML = ""

    if (purchasesToShow.length === 0) {
      const emptyMessage = document.createElement("div")
      emptyMessage.className = "empty-message"
      emptyMessage.textContent = searchInput.value ? "No purchases found for this username" : "No purchase history yet"
      purchasesList.appendChild(emptyMessage)
      return
    }

    purchasesToShow.forEach((purchase) => {
      const purchaseItem = document.createElement("div")
      purchaseItem.className = "purchase-item slideIn"

      const purchaseHeader = document.createElement("div")
      purchaseHeader.className = "purchase-header"

      const username = document.createElement("strong")
      username.textContent = purchase.username

      const date = document.createElement("span")
      date.textContent = new Date(purchase.date).toLocaleString()

      purchaseHeader.appendChild(username)
      purchaseHeader.appendChild(date)

      const purchaseDetails = document.createElement("div")
      purchaseDetails.className = "purchase-details"

      const itemInfo = document.createElement("p")
      itemInfo.textContent = `${purchase.amount} x ${purchase.itemName}`

      purchaseDetails.appendChild(itemInfo)

      if (purchase.toppings && purchase.toppings.length > 0) {
        const toppingsInfo = document.createElement("p")
        toppingsInfo.textContent = `Toppings: ${purchase.toppings.join(", ")}`
        purchaseDetails.appendChild(toppingsInfo)
      }

      purchaseItem.appendChild(purchaseHeader)
      purchaseItem.appendChild(purchaseDetails)

      purchasesList.appendChild(purchaseItem)
    })
  }

  // Filter purchases by username
  function filterPurchases() {
    const searchTerm = searchInput.value.toLowerCase()
    const filteredPurchases = purchases.filter((purchase) => purchase.username.toLowerCase().includes(searchTerm))
    displayPurchases(filteredPurchases)
  }

  // Handle form submission
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const username = document.getElementById("username").value
    const itemName = document.getElementById("itemName").value
    const amount = Number.parseInt(document.getElementById("amount").value)

    // Get selected toppings
    const toppings = []
    document.querySelectorAll('.topping-item input[type="checkbox"]:checked').forEach((checkbox) => {
      toppings.push(checkbox.value)
    })

    // Create purchase object
    const purchase = {
      id: Date.now().toString(),
      username,
      itemName,
      amount,
      toppings,
      date: new Date().toISOString(),
    }

    // Add to purchases array
    purchases.unshift(purchase)

    // Save to localStorage
    localStorage.setItem("purchases", JSON.stringify(purchases))

    // Update display
    displayPurchases(purchases)

    // Reset form
    orderForm.reset()

    // Show success message
    alert("Order confirmed successfully!")
  })

  // Search functionality
  searchInput.addEventListener("input", filterPurchases)

  // Initial display
  displayPurchases(purchases)
})

