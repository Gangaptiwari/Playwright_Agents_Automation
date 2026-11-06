interface UserCredentials {
  username: string;
  password: string;
}

interface AuthenticationData {
  standardUser: UserCredentials;
  expectedInventory: string[];
}

interface InventoryProduct {
  name: string;
  price: string;
}

interface InventoryData {
  products: InventoryProduct[];
  sortOrders: {
    nameAscending: string[];
    nameDescending: string[];
    priceAscending: string[];
    priceDescending: string[];
  };
}

export const authenticationTestData = require('./authentication.json') as AuthenticationData;
export const inventoryTestData = require('./inventory.json') as InventoryData;
