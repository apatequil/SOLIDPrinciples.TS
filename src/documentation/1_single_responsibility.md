#Single Responsibility Principle (SRP)

The SRP outlines where to draw complexity lines with regards to implementation design. It is meant to limit how much responsibility any given block of code or component has since the greater the complexity and set of responsibilities, the harder the code is to maintain.

###Definition
> A class should have 1 and only 1 reason to change

It's important to abstract the concept of a responsibility from the code itself. For example, SRP doesn't mean a class can only do one single thing but rather the overall collection of the class's functionality is cohesive around a single responsibility. As long as the only reason to change the class is a change to the class's domain, it's still following SRP.

To demonstrate this principle's violations, let's take a look at the naive implementation of the [product manager](../1_single_responsibility/naive/product_manager.ts) as it has multiple responsibilities outlined below.

### Naive Implementation

####Overview
The naive implementation of the product manager demonstrates code which works fine but breaks the Single Responsibility Principle by attempting to cover too many things. Below is what the true responsibility of the manager should be, what responsibilities the naive implementation has, and why those responsibilities aren't conducive to maintainable code.

#### True Responsibility:

The product manager's only responsiblity is to maintain a collection of products. Full-stop.

All products are added and updated through the manager with an encapsulated collection. This means the manager's domain of responsibility is the storage of products it is told to hold. It doesn't care about the products themselves, what prices they have, if they need to be unique, etc...just that it is storing what it is told to and can report the contents of the collection. Note that reporting the contents of the collection could be argued as a separate responsibility but as long as it's just listing what it has and not providing formatting or filtering, there aren't additional responsibilities.

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

As shown above, there are at least 3 distinct responsibilities. The reason why they are distinct is because of the way they would need to change based on external factors. This means the manager would need to be modified if the validations changed despite the fact the manager doesn't really care. The only reason the manager should need to change is if the underlying collection has domain requirement changes.

New business validation requirements should not mean the inventory manager needs to care. It simply holds what it's told to. This is the second responsibility being added to the manager.

Additionally, the manager cares which validation errors take place with this implementation. A real-life example is a warehouse not caring if the products being stored there are priced correctly. The warehouse just holds or releases what it is told. A misnamed or priced item is none of its business and the naive implementation forces this 3rd responsibility

### Refactored Implementation