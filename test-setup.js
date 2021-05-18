// Importing from separate script. This convoluted method is necessary
// because ES6 imports are hoisted, so initializing globals 'before'
// importing mithril here won't work.
import "./test-setup-globals.js";

// Require Mithril to make sure it loads properly.
import "mithril";
