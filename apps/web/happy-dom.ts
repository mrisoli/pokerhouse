import { GlobalRegistrator } from "@happy-dom/global-registrator";

// Must run before any module that reads `document` at evaluation time
// (e.g. @testing-library/dom's `screen`). Keep this file free of other imports.
GlobalRegistrator.register();
