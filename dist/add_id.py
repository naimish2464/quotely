import json
import uuid

def add_unique_ids_to_json(input_file, output_file):
    """
    Reads a JSON file, adds a unique '_id' to each object, and writes the modified JSON to a new file.

    Args:
        input_file (str): Path to the input JSON file.
        output_file (str): Path to the output JSON file.
    """
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)

        if not isinstance(data, list):
            raise ValueError("JSON data must be a list of objects.")

        for item in data:
            if isinstance(item, dict):
                item['_id'] = str(uuid.uuid4())  # Generate and add UUID as _id
            else:
                raise ValueError("JSON list must contain only objects(dictionaries).")

        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False) #added ensure_ascii=False

        print(f"Unique '_id's added and saved to {output_file}")

    except FileNotFoundError:
        print(f"Error: Input file '{input_file}' not found.")
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in '{input_file}'.")
    except ValueError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# Example usage:
input_json_file = 'TravelQuotes.json'  # Replace with your input file name
output_json_file = 'TravelQuotes_with_ids.json'  # Replace with your desired output file name

add_unique_ids_to_json(input_json_file, output_json_file)