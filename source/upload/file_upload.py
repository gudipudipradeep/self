from bottle import request, response
from bottle import post, get, put, delete
import string
import random
import os
import zipfile
import shutil


def zipdir(path, ziph):
    # ziph is zipfile handle
    for root, dirs, files in os.walk(path):
        for file in files:
            ziph.write(os.path.join(root, file))
            

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
    zip_create_name = zip_create = ''.join(random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(8))
    file_save_path = request.app.config['file_save_path']
    if not os.path.exists(os.path.join(file_save_path, zip_create)):
        os.makedirs(os.path.join(file_save_path, zip_create))
        
    print("file saved path is {0}".format(os.path.join(file_save_path, zip_create)))
    zip_create = os.path.join(file_save_path, zip_create)
    
    for upload in uploads:
        print(upload.__dict__)
        print(upload.filename)
        print(upload.raw_filename)
        print(os.path.abspath(upload.raw_filename))
        file_full_path = os.path.join(zip_create,  os.path.normpath(upload.raw_filename))
        print(file_full_path)
        if not os.path.exists(os.path.dirname(file_full_path)):
            os.makedirs(os.path.dirname(file_full_path))
              
        upload.save(file_full_path)
        
    for upload in single_files:
        print(upload.raw_filename)
        file_full_path = os.path.join(zip_create,  upload.raw_filename)
        print(file_full_path)
        if not os.path.exists(os.path.dirname(file_full_path)):
            os.makedirs(os.path.dirname(file_full_path))
              
        upload.save(file_full_path)
        
    zipf = zipfile.ZipFile(zip_create+'.zip', 'w', zipfile.ZIP_DEFLATED)
    zipdir(zip_create, zipf)
    zipf.close()
    
    shutil.rmtree(zip_create)
    
    
            
        

@post("/yamlvalidate")        
def yaml_validate():
    pass