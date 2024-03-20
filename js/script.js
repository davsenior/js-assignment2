// Add event listener to the form when it is submitted
document.getElementById("smoothieForm").addEventListener("submit", function(event) {
    //Prevent the default form submission
    event.preventDefault();
    
    //Get the selected flavor, size, and extras from the form
    const flavor = document.getElementById("flavor").value;
    const size = document.querySelector('input[name="size"]:checked').value;
    const extras = Array.from(document.querySelectorAll('input[name="extras"]:checked')).map(e => e.value);

    //Create a new Smoothie object with the options
    const smoothie = new Smoothie(flavor, size, extras);
    
    //Generate the description and total price of the smoothie
    const description = smoothie.getDescription();
    const total = smoothie.getTotalPrice();
    
    document.getElementById("smoothieDescription").innerHTML = `
        <h2>Your Smoothie:</h2>
        <p>${description}</p>
        <p><strong>Total Price: $${total.toFixed(2)}</strong></p>
    `;
});

    //Define the Smoothie class
class Smoothie {
    constructor(flavor, size, extras) {
        this.flavor = flavor;
        this.size = size;
        this.extras = extras;
    }

    //Generate the description of the smoothie
    getDescription() {
        let description = `You have ordered a ${this.size} ${this.flavor} smoothie`;

        // Add extra toppings to the description if any were selected
        if (this.extras.length > 0) {
            description += " with ";
            description += this.extras.join(", ");
        }

        description += ".";
        return description;
    }

    //Calculate the total price of the smoothie
    getTotalPrice() {
        let basePrice = 0;
        switch (this.size) {
            case "small":
                basePrice = 5.00;
                break;
            case "medium":
                basePrice = 6.50;
                break;
            case "large":
                basePrice = 8.00;
                break;
        }

        let extrasPrice = 0;
        //Calculate the price of each extra topping
        this.extras.forEach(extra => {
            switch (extra) {
                case "protein":
                    extrasPrice += 1.50;
                    break;
                case "spinach":
                    extrasPrice += 0.75;
                    break;
                case "chia":
                    extrasPrice += 1.00;
                    break;
            }
        });

        //Return the total price
        return basePrice + extrasPrice;
    }
}