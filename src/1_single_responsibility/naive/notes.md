#Single Responsibility Principle (SRP)
##Naive Implementation

###Overview
The naive implementation of the product manager is to demonstrate code which works fine but breaks the Single Responsibility Principle by attempting to do too many things. Below is an overview of the operations the manager exposes.

#### True Responsibility:

Maintain a collection of products. Full-stop.

All products are added and updated through the manager with an encapsulated collection. This means the manager's domain of responsibility is the storage of products it is told to hold. It doesn't care about the products themselves, what prices they have, if they need to be unique, etc...

<span style="color:#FFFF00">Responsibility 1: Maintain collection of products</span>
<span style="color:orange">Responsibility 2: Determine if product is valid</span>
<span style="color:red">Responsibility 3: Determine which validation rules are broken</span>


* <span style="color: #FFFF00">Add new products</span>
	* <span style="color:orange">Validate new product</span>
	* <span style="color:#FFFF00">Valid: Add product to collection</span>
	* <span style="color:red">Invalid: Determine validation error and return</span>
</span>
* <span style="color:#FFFF00">Update existing products</span>
	* <span style="color:orange">Validate update context</span>
	* <span style="color:#FFFF00">Valid: Update product information</span>
	* <span style="color:red">Invalid: Determine validation error and return</span>
* <span style="color:#FFFF00">List all products</span>
	* <span style="color:#FFFF00">Return products</span>

As shown above, there are at least 3 distinct responsibilities. The reason why they are distinct is because of the way they would need to change based on external factors. The only reason the manager should need to change is if the underlying collection changes.

New business validation requirements should not mean the inventory manager needs to care. It simply holds what it's told to. This is the second responsibility being added to the manager.

Additionally, the manager care which validation errors take place. A real-life example is a warehouse not caring if the products being stored there are priced correctly. The warehouse just holds or releases what it is told. A misnamed or priced item is none of its business and the naive implementation forces this 3rd responsibility
