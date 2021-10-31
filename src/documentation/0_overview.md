#Overview
This repository is meant to demonstrate the 5 SOLID principles, what they are, why they are worth thinking about, and show examples of how to refactor existing code which breaks the principles into better maintainable and scalable implementations

##Single Responsibility Principle (SRP)
The SRP outlines where to draw complexity lines with regards to implementation design. In other words, it is meant to limit how much responsibility any given block of code or component has. The greater the complexity and set of responsibilities, the harder the code is to maintain.

###Definition
> A class should have 1 and only 1 reason to change

It's important to abstract the concept of a responsibility from the code itself so that there is a cohesiveness to the class which avoids extra functionality if it isn't driving by a single scope of responsibility.

For example:
A class might be responsible for calculating a fee might also need to determine what factors go into the calculation. utility class might allow logging to an info stream, debug stream, or error stream. All of these operations are a single responsibility: to log different levels of information.

The example above starts to break SRP when it needs to change due to external pressure. In this case it might be that the logger is supposed to create a log file if it doesn't already exist. The reason this breaks SRP is that if the file location ever changed or the type of logging (maybe it should go to a database instead of flat file), the class would need to be updated