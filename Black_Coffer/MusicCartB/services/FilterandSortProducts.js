const Product = require('../models/List'); // Assuming you have a Product model

// Function to fetch products
async function fetchProducts(query) {
    try {
        const products = await Product.find(query);
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Error fetching products');
    }
}
function applyFilters(products, filters) {
    try {
        if (filters) {
          if (typeof filters === 'object') {
            // Check if both fields are empty, return full data if true
            if (filters.category === "" && filters.color === "") {
              return products;
            }
            for (const [key, value] of Object.entries(filters)) {
                switch (key) {
                    case 'category':
                    case 'color':
                    case 'brand':
                        // Apply filtering only if the value is not empty
                        if (value !== "") {
                          products = products.filter(item => item[key].toLowerCase() === value.toLowerCase());
                        }
                        break;
                    case 'priceRange':
                        const [minPrice, maxPrice] = value.split('-');
                        products = products.filter(item => item.price >= parseFloat(minPrice) && item.price <= parseFloat(maxPrice));
                        break;
                    // Add more cases for other filter types if needed
                }
            }
        }
    }
    return products;
    } catch (error) {
      console.error('Error applying filters:', error);
      throw new Error('Error applying filters');
    }
  }
  

// Function to sort products based on the sort criteria
function applySorting(products, sortCriteria) {
    try {
      
        if (sortCriteria) {
            // Parse the sortCriteria to get the field and order
            const [field, direction] = sortCriteria.split('_');
            
            // Apply sorting based on the field and direction
            products.sort((a, b) => {
                if (field === 'price') {
                    console.log("price Triggered")
                    // If sorting by price, convert price to numeric for comparison
                    const priceA = parseFloat(a[field]);
                    const priceB = parseFloat(b[field]);
                    if (direction === 'asc') {
                        return priceA - priceB;
                    } else {
                        return priceB - priceA;
                    }
                } else if (field === 'productname') {
                    // If sorting by name, use localeCompare for string comparison
                    console.log("productname Triggered")
                    if (direction === 'asc') {
                        return a[field].localeCompare(b[field]);
                    } else {
                        return b[field].localeCompare(a[field]);
                    }
                } else {
                    console.log(">>> Triggered")
                    // For other fields, assume numeric comparison
                    if (direction === 'asc') {
                        return a[field] - b[field];
                    } else {
                        return b[field] - a[field];
                    }
                } 
            }); 
        }
        return products;
    } catch (error) {
        console.error('Error applying sorting:', error);
        throw new Error('Error applying sorting');
    }
}

// Function to filter products based on the search query
function applyProductNameSearch(products, search) {
    try {
        console.log("Applying product name search:", search);
        if (search) {
            const searchRegex = new RegExp('\\b' + search + '\\b', 'i'); // Whole-word search, case-insensitive
            products = products.filter(product => searchRegex.test(product.productname));
        }
        return products; // Return all products if no search query is provided
    } catch (error) {
        console.error('Error applying product name search:', error);
        throw new Error('Error applying product name search');
    }
}

// Function to filter and sort products
// Function to filter and sort products
async function filterAndSortProducts(filters, sortCriteria, search) {
    try {
        console.log("Filters:", filters);
        console.log("Sort criteria:", sortCriteria);
        console.log("Search:", search);

        let query = {};

        // Fetch all products
        let products = await fetchProducts(query);

        // Variable to hold products based on search or default products
        if (search) {
            products = await applyProductNameSearch(products, search);
        }
        // Apply filters
        if (filters) {
        products = applyFilters(products, filters);
        }
        if (sortCriteria) {
            products = applySorting(products, sortCriteria);
        }
        return products;
    } catch (error) {
        console.error('Error in filterAndSortProducts:', error);
        throw new Error('Error in filterAndSortProducts');
    }
}

module.exports = {
    filterAndSortProducts
};
