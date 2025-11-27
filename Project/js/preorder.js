document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const preorderForm = document.getElementById("preorderForm")
  const pickupDateInput = document.getElementById("pickupDate")

  // Set minimum date to today
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, "0")
  const dd = String(today.getDate()).padStart(2, "0")
  pickupDateInput.min = `${yyyy}-${mm}-${dd}`

  // Handle form submission
  preorderForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const username = document.getElementById("preUsername").value
    const itemName = document.getElementById("preItemName").value
    const amount = Number.parseInt(document.getElementById("preAmount").value)
    const pickupDate = document.getElementById("pickupDate").value
    const timeSlot = document.getElementById("timeSlot").value

    // Get selected toppings
    const toppings = []
    document.querySelectorAll('.topping-item input[type="checkbox"]:checked').forEach((checkbox) => {
      toppings.push(checkbox.value)
    })

    // Create preorder object
    const preorder = {
      id: Date.now().toString(),
      username,
      itemName,
      amount,
      toppings,
      pickupDate,
      timeSlot,
      status: "pending",
      date: new Date().toISOString(),
    }

    // Save to localStorage
    const preorders = JSON.parse(localStorage.getItem("preorders")) || []
    preorders.push(preorder)
    localStorage.setItem("preorders", JSON.stringify(preorders))

    // Reset form
    preorderForm.reset()

    // Show success message
    alert(
      `Pre-order scheduled successfully! Your order will be ready for pickup on ${formatDate(pickupDate)} at ${timeSlot}`,
    )
  })

  // Format date for display
  function formatDate(dateString) {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
})

