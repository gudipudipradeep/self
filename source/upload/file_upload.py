from bottle import request, response
from bottle import post, get, put, delete

@get('/')
def helloworld():
    '''Handles name creation'''
    response.headers['Content-Type'] = 'application/json'
    return {"Hello World":"Hello World"}

@post("/upload")
def upload():
#   print(request.body.read())
    uploads = request.files.getall('files[]')
    single_files = request.files.getall('single_file[]')
    
    for upload in uploads:
        print(upload.__dict__)
        print(upload.filename)
        print(upload.raw_filename)
        print(upload.headers.filename)
        
    for upload in single_files:
        print(upload.filename)
        

@post("/yamlvalidate")        
def yaml_validate():
    pass