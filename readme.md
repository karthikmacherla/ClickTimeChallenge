# Question 2: Mock E-Commerce Site:

## How to Run:
The site is run on Node.js + Express.js (although most work is done on client side).

To run the application, simply hit npm start at the front of the directory, then move to localhost:3000.

## How it Works:
The site has two routes, the index route where you can see items on sale, and the checkout page.

- The items being sold is rendered from the server (generated from a items.json file).
- The information about what items the user has purchased are stored in the localStorage.
- The pricing algorithm is done using the values stored in the localStorage.
- As the user changes the quantities in the My Cart page, the localStorage is updated and the costs are updated.
- Style was developed using Bulma.