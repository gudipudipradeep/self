from bottle import request, response, redirect
from bottle import post, get, put, delete
import string
import random
import os
import zipfile
import shutil
from bottle import static_file 
from bottle import error


def zip(src, dst):
    zf = zipfile.ZipFile("%s.zip" % (dst), "w", zipfile.ZIP_DEFLATED)
    abs_src = os.path.abspath(src)
    for dirname, subdirs, files in os.walk(src):
        for filename in files:
            absname = os.path.abspath(os.path.join(dirname, filename))
            arcname = absname[len(abs_src) + 1:]
            print('zipping %s as %s' % (os.path.join(dirname, filename), arcname))
            zf.write(absname, arcname)
    zf.close()
            

@get('/')
def redirect_defalut():
    '''Handles name creation'''
#     response.headers['Content-Type'] = 'application/json'
#     return {"Hello World":"Hello World"}
    return redirect("file_share_util.html")


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
        
    zip(zip_create, zip_create)
    
    shutil.rmtree(zip_create)
    response.headers['Content-Type'] = 'application/json'
    return {"Hashcode": "/download/"+zip_create_name}    
    
@get("/download/<filename:path>")        
def download_zip(filename):
    return static_file("{0}.zip".format(filename), root=request.app.config['file_save_path'], download="{0}.zip".format(filename))     
        

@post("/yamlvalidate")        
def yaml_validate():
    '''Handles name creation'''
    response.headers['Content-Type'] = 'application/json'
    return {"Hello World":"Hello World"}

@error(404)
def error404(error):
    return 'Nothing here, sorry'
