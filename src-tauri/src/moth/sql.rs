use postgres::{Client, NoTls};
use serde_json::{json, Value};
use std::collections::HashMap;

#[tauri::command]
pub fn execute_query(query: String) -> Vec<HashMap<String, Value>> {
    let mut client = Client::connect("host=localhost user=postgres password=postgres", NoTls).unwrap();

    let mut rows_vec = Vec::new();
    let query: &str = &query;
    let rows = client.query(query, &[]).unwrap();

    for row in rows {
        let mut cols_map: HashMap<String, Value> = HashMap::new();

        for (col_index, column) in row.columns().iter().enumerate() {
            let col_type = column.type_().to_string();
            let col_name = column.name().to_string();

            if col_type == "int4" {
                cols_map.insert(col_name, json!(row.get::<usize, i32>(col_index)));
            } else if col_type == "text" {
                cols_map.insert(col_name, json!(row.get::<usize, String>(col_index)));
            }
        }

        rows_vec.push(cols_map);
    }

    rows_vec
}

#[test]
fn test_query() {
    let mut client = Client::connect("host=localhost user=postgres password=postgres", NoTls).unwrap();

    client.batch_execute("
        DROP TABLE IF EXISTS books;
        CREATE TABLE books (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL
        );
    ").unwrap();

    client.execute("INSERT INTO books (name) VALUES ('Rust in Action');", &[]).unwrap();
    client.execute("INSERT INTO books (name) VALUES ('The Art of Computer Programming');", &[]).unwrap();

    let vec = execute_query(String::from("SELECT * FROM books;"));

    assert_eq!(vec[0].get("id").unwrap(), &json!(1));
    assert_eq!(vec[0].get("name").unwrap(), &json!("Rust in Action"));
    assert_eq!(vec[1].get("id").unwrap(), &json!(2));
    assert_eq!(vec[1].get("name").unwrap(), &json!("The Art of Computer Programming"));
}
