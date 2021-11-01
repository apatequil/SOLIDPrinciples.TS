<!-- Principle's Name -->
# Open/Close Principle (OCP)

<!-- Add principle overview and why it matters -->
The Open/Close Principle defines what kind modifications are needed when new types or features are added. A common example is a class which uses a switch statement to determine the execution path. The reason why this breaks OCP is that if a new switch case is needed, you would have to modify the class. Therefore although the class can be extended, it can't be done so without modification to the core object.

### Definition
> A class should be open for extension but closed for modification

The idea isn't that the class can no longer be modified as there could be a bug that needs fixing. It's that it should be able to be extended *without* modification. This is beneficial because existing use cases aren't going to break with additional functionality being added. From a maintenance perspective, this means lowered testing effort as well as increasing reusability and flexibility.

### Naive Implementation
Add naive implementation diagram if applicable
<!-- ![Select launch profile (VSCode)](images/srp_naive.png) -->

#### Overview
The task given to the developers here is to allow

### Refactored Implementation

Add refactored implementation diagram if applicable
<!-- ![Refactored Implementation](images/srp_refactored.png) -->

#####Refactor Note 1
Lorem ipsum...

#####Refactor Note 2
Lorem ipsum...
