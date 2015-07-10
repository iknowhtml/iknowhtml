#!venv/bin/python

from flask import Flask

app = Flask(__name__)

from flask import render_template

@app.route("/")
@app.route("/index")
def index():
    return render_template('what_the.html')

if __name__ == "__main__":
    app.run()
