// Script to be imported by 'test-setup.js'. This convoluted method is necessary
// because ES6 imports are hoisted, so we need to initialize globals here
// to make sure they are initialized before mithril is imported in 'test-setup.js'.
import o from "ospec";
import jsdom from "jsdom";

const dom = new jsdom.JSDOM("", {
    // So we can get `requestAnimationFrame`
    pretendToBeVisual: true,
});

// Fill in the globals Mithril needs to operate. Also, the first two are often
// useful to have just in tests.
global.window = dom.window;
global.document = dom.window.document;
global.requestAnimationFrame = dom.window.requestAnimationFrame;

// And now, make sure JSDOM ends when the tests end.
o.after(function() {
    dom.window.close()
});