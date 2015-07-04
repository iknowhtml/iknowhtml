from flask import render_template
from personal_site import app

@app.route('/')
@app.rout('/index')
def index:
	return render_template('index.html')
