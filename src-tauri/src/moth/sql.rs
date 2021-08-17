use std::collections::HashMap;

#[tauri::command]
pub fn execute_query(query: String) -> Vec<HashMap<String, i64>> {
    let mut rows = Vec::new();

    for i in 0..10 {
        let mut row = HashMap::new();

        row.insert(String::from("a"), i);
        row.insert(String::from("b"), i+1);
        row.insert(String::from("c"), i+2);

        rows.push(row)
    }

    rows
}
