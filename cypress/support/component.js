// Import commands.js using ES2015 syntax:
import "./commands";
import { mount } from "cypress/react18";

Cypress.Commands.add("mount", mount);

// Example use:
// cy.mount(<MyComponent />)

// Import commands.js using ES2015 syntax:
import "./commands";

// Import the necessary Chakra components
import { ToastProvider } from "@chakra-ui/react";

// Override the ToastProvider to disable toasts during tests
if (Cypress.config().isInteractive) {
  const NoopToastProvider = ({ children }) => children;
  ToastProvider.overrideNoopProvider();
}
