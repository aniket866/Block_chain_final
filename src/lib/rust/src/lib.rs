
//! DeepChain Rust WebAssembly module for blockchain operations
//! 
//! This would be compiled to WebAssembly and used by the web application
//! through the TypeScript bridge.

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// Module version information
#[wasm_bindgen]
pub fn get_version() -> String {
    "0.1.0".to_string()
}

// Initialize the module
#[wasm_bindgen]
pub fn initialize() -> Result<JsValue, JsValue> {
    console_log!("Initializing DeepChain Rust WASM module");
    
    // Set up panic hook for better error messages
    set_panic_hook();
    
    // Return success
    Ok(JsValue::from_str("Initialized"))
}

// Helper function to set up better panic messages in WASM
fn set_panic_hook() {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function to get better error messages if a panic occurs.
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

// Log a message to the JavaScript console
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

// Macro for console logging
#[macro_export]
macro_rules! console_log {
    ($($t:tt)*) => (crate::log(&format!($($t)*)))
}

// This would include modules for different functionality
mod wallet;
mod transaction;
mod contract;
