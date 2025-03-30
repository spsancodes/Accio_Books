from google import genai
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
client = genai.Client(api_key="AIzaSyBpDWk42QCyqpcGsrLV7NZtHvzbZHRLA-c")


def message(books):
    content = 'Suggest Me Some Similiar Books, I liked '
    for book in books:
        content+= book + ", "
    content+= ' .Output Only 5 Books and Authors Name, with a short description in Numbered List Form.'
    return content

@app.route('/books', methods=['POST'])
def get_books():
    data = request.get_json()  # Expecting JSON input
    if not data or 'books' not in data:
        return jsonify({"error": "No books provided"}), 400

    books = data['books']
    response = client.models.generate_content(
    model="gemini-2.0-flash", contents=message(books)
    )
    return jsonify({"message": response.text})

if __name__ == '__main__':
    app.run()


