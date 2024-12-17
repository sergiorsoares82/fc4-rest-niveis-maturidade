# Curso REST

## Exemplo REST meia boca para E-commerce

| Operação                                 | Método HTTP | Path                             |
| ---------------------------------------- | ----------- | -------------------------------- |
| JWT login                                | POST        | /jwt/login                       |
| Session login                            | POST        | /session/login                   |
| Session logout                           | POST        | /session/logout                  |
| Create a customer                        | POST        | /customers/createCustomer        |
| Get a customer by ID                     | GET         | /admin/customers/getCustomerById |
| List customers with pagination           | GET         | /admin/customers/listCustomers   |
| Update a customer                        | POST        | /admin/customers/updateCustomer  |
| Delete a customer                        | POST        | /admin/customers/deleteCustomer  |
| Create a category                        | POST        | /admin/categories/createCategory |
| Get a category by slug                   | GET         | /categories/getCategoryBySlug    |
| List categories with pagination          | GET         | /categories/listCategories       |
| List categories in admin with pagination | GET         | /admin/categories/listCategories |
| Update a category                        | POST        | /admin/categories/updateCategory |
| Delete a category                        | POST        | /admin/categories/deleteCategory |
| Create a product                         | POST        | /admin/products/createProduct    |
| Get a product by ID                      | GET         | /admin/products/getProductById   |
| Get a product by slug                    | GET         | /products/getProductBySlug       |
| Update a product                         | POST        | /admin/products/updateProduct    |
| Delete a product                         | POST        | /admin/products/deleteProduct    |
| List products with pagination            | GET         | /products/listProducts           |
| List products in admin with pagination   | GET         | /admin/products/listProducts     |
| Get CSV of products                      | GET         | /admin/products/listProducts.csv |
| Add an item to the cart                  | POST        | /carts/addItemToCart             |
| Get a cart by ID                         | GET         | /carts/getCart                   |
| Remove an item from the cart             | POST        | /carts/removeItemFromCart        |
| Clear the cart                           | POST        | /carts/clearCart                 |
| Create an order                          | POST        | /orders/createOrder              |
| List orders with pagination              | GET         | /orders/listOrders               |

# Exemplo de Level 0

## RPC Style - JSON

### Criar um customer

```http
POST /customers HTTP/1.1
{
    "call": "create",
    "data": {
        "name": "John Doe",
        "email": "user@customer.com",
        "phone": "1234567890"
        "address": {
            "street": "1234 Main St",
            "city": "Springfield",
            "state": "IL",
            "zip": "62701"
        }
    }
}
```

### Pegar um customer

```http
POST /customers HTTP/1.1
{
    "call": "get",
    "data": {
        "id": 123
    }
}
```

## RPC Style - XML

### Criar um customer

```http
POST /customers HTTP/1.1
<methodCall>
    <methodName>create</methodName>
    <params>
        <param>
            <value>
                <struct>
                    <member>
                        <name>name</name>
                        <value>John Doe</value>
                    </member>
                    <member>
                        <name>email</name>
                        <value>user@user.com</value>
                    </member>
                    <member>
                        <name>phone</name>
                        <value>1234567890</value>
                    </member>
                    <member>
                        <name>address</name>
                        <value>
                            <struct>
                                <member>
                                    <name>street</name>
                                    <value>1234 Main St</value>
                                </member>
                                <member>
                                    <name>city</name>
                                    <value>Springfield</value>
                                </member>
                                <member>
                                    <name>state</name>
                                    <value>IL</value>
                                </member>
                                <member>
                                    <name>zip</name>
                                    <value>62701</value>
                                </member>
                            </struct>
                        </value>
                    </member>
                </struct>
            </value>
        </param>
    </params>
</methodCall>
```

### Pegar um customer

```http
POST /customers HTTP/1.1
<methodCall>
    <methodName>get</methodName>
    <params>
        <param>
            <value>
                <struct>
                    <member>
                        <name>id</name>
                        <value>123</value>
                    </member>
                </struct>
            </value>
        </param>
    </params>
</methodCall>
```

# Exemplo do level 1 - resources

## Exemplo REST meia boca para E-commerce

| Operação                                 | Método HTTP | Path                                  |
| ---------------------------------------- | ----------- | ------------------------------------- |
| JWT login                                | POST        | /jwt/login                            |
| Session login                            | POST        | /session/login                        |
| Session logout                           | POST        | /session/logout                       |
| Create a customer                        | POST        | /customers                            |
| Get a customer by ID                     | GET         | /admin/customers/:customer_id         |
| List customers with pagination           | GET         | /admin/customers                      |
| Update a customer                        | POST        | /admin/customers/:customer_id         |
| Delete a customer                        | POST        | /admin/customers/:customer_id/delete  |
| Create a category                        | POST        | /admin/categories                     |
| Get a category by slug                   | GET         | /categories/:category_slug            |
| List categories with pagination          | GET         | /categories                           |
| List categories in admin with pagination | GET         | /admin/categories                     |
| Update a category                        | POST        | /admin/categories/:category_id        |
| Delete a category                        | POST        | /admin/categories/:category_id/delete |
| Create a product                         | POST        | /admin/products                       |
| Get a product by ID                      | GET         | /admin/products/:product_id           |
| Get a product by slug                    | GET         | /products/:product_slug               |
| Update a product                         | POST        | /admin/products/:product_id           |
| Delete a product                         | POST        | /admin/products/:product_id/delete    |
| List products with pagination            | GET         | /products                             |
| List products in admin with pagination   | GET         | /admin/products                       |
| Get CSV of products                      | GET         | /admin/products.csv                   |
| Add an item to the cart                  | POST        | /cart/items                           |
| Get a cart by ID                         | GET         | /cart                                 |
| Remove an item from the cart             | POST        | /carts/items/:cart_item_id            |
| Clear the cart                           | POST        | /carts/clear                          |
| Create an order                          | POST        | /orders                               |
| List orders with pagination              | GET         | /orders                               |
