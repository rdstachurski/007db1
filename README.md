
<h3 align="center">Journey Builder React Coding Challenge</h3>

<!-- ABOUT THE PROJECT -->
## About The Project
This project is my attempt at the Avantos Junior Software Engineer Coding Challenge. The project is built with React and TypeScript and was first created by using Vite. It utilizes tools and frameworks like React Flow, Tailwind, and Vitest. 

This project displays a DAG and where each node is a form with field elements. Field elements can be set by user values OR prefilled values from either global values or values from the node's prerequitie nodes.

<!-- GETTING STARTED -->
## Getting Started
The following are steps to get a local copy up and running. 

### Prerequisites
To sucessfully build and run this project, a package manager like npm is required for React/TypeScript. These steps will be using npm but feel free to use yarn or other alternatives. Please follow this  [guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for installing npm if need. 

In your terminal, run this command to install npm. 
* npm
  ```sh
  npm install npm@latest -g
  ```
The coding challenge provided a [repo](https://github.com/mosaic-avantos/frontendchallengeserver) of a simple backend server to fetch the necessary data. Please follow the instructions on the repo to run the server.

* You can set the base url and endpoint to different values in the ./src/config/apiConfig.ts file if needed.
### Installation

1. Clone the repo
   ```sh
   git clone (https://github.com/rdstachurski/007db1.git
   ```
2. CD into the project's root folder
   ```sh
   cd journey-builder-react
   ```   
3. Install NPM packages
   ```sh
   npm install
   ```
4. Run the project
   ```sh
   npm run dev
   ```


<!-- USAGE EXAMPLES -->
## Usage

The DAG will be fully displayed when the page is first loaded in like this:

When a node is clicked, a modal will pop-up with form fields associated with the node.

The toggle button gives the user the option to use prefilled values from global values or values from direct and transitive prequisitive nodes. 

*Toggled off

*Toggled on

When the prefill toggle is on and the user clicks on a field, the prefill option sidemenu will appear with available values from different sources. After selecting a prefilled value, the field will be populated with the source of the value and what field the value is from.

Clicking on the x on the right hand of the field will unpopulate that field. 

<!-- CONTACT -->
## Contact

Robert Stachurski - robertdstachurski@gmail.com

