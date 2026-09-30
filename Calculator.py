from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route('/')
def home():
    """Serve the calculator page."""
    return render_template('Calculator.html')


@app.route('/calculate', methods=['POST'])
def calculate():
    """Receive two numbers and an operator, return the result."""
    data = request.get_json()

    try:
        num1 = float(data.get('num1', 0))
        num2 = float(data.get('num2', 0))
        operator = data.get('operator')

        if operator == '+':
            result = num1 + num2
        elif operator == '-':
            result = num1 - num2
        elif operator == '*':
            result = num1 * num2
        elif operator == '/':
            if num2 == 0:
                return jsonify({"error": "Cannot divide by zero"}), 400
            result = num1 / num2
        else:
            return jsonify({"error": "Unknown operator"}), 400

        # Return as int if the result is a whole number (e.g. 6.0 → 6)
        result = int(result) if result == int(result) else result
        return jsonify({"result": result})

    except (TypeError, ValueError) as e:
        return jsonify({"error": f"Invalid input: {str(e)}"}), 400


if __name__ == '__main__':
    app.run(debug=True)
