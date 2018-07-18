from bottle import request, response
from bottle import post, get, put, delete

@get('/')
def helloworld():
    '''Handles name creation'''
    response.headers['Content-Type'] = 'application/json'
    return {"Hello World":"Hello World"}

@post("/upload")
def upload():
    uploads = request.files.getall('files')
    for upload in uploads:
        print(upload.filename)