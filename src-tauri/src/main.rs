#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod moth;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![moth::sql::execute_query])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
