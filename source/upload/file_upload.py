from bottle import request, response, redirect, url
from bottle import post, get, put, delete
import string
import random
import os
import zipfile
import shutil
from bottle import static_file 
from bottle import error
import json
import sys
import yaml
from upload import util

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
    return static_file("file_share_util.html", root=request.app.config['web_files'])


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
    try:
        yaml.load(request.forms.get('yaml_text'))
        return {"success":"SUCCESS"}
    except yaml.YAMLError as exc:
        print(exc)
        return {"failure":str(exc)}

@post("/convertpfxtopem")        
def convert_pfx_to_pem():
    '''Handles name creation'''
    single_files = request.files.getall('single_file[]')
    zip_create_name = zip_create = ''.join(random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(8))
    file_save_path = request.app.config['file_save_path']
    if not os.path.exists(os.path.join(file_save_path, zip_create)):
        os.makedirs(os.path.join(file_save_path, zip_create))
        
    print("file saved path is {0}".format(os.path.join(file_save_path, zip_create)))
    zip_create = os.path.join(file_save_path, zip_create)
    
    for upload in single_files:
        print(upload.raw_filename)
        file_full_path = os.path.join(zip_create,  upload.raw_filename)
        print(file_full_path)
        if not os.path.exists(os.path.dirname(file_full_path)):
            os.makedirs(os.path.dirname(file_full_path))
              
        upload.save(file_full_path)
        
        cert_password = request.forms.get('cert_password')
        util.cert_convert(file_full_path, cert_password, zip_create)
    
    zip(zip_create, zip_create)
    shutil.rmtree(zip_create)
    response.headers['Content-Type'] = 'application/json'
    return {"Hashcode": "/download/"+zip_create_name}      

@post("/create-article")
def save_article():
    current_file  = __file__
    current_dir = os.path.dirname(current_file)
    root_dir = os.path.abspath(os.path.join(os.path.join(current_dir, os.pardir),  os.pardir))
    web_dir = os.path.join(root_dir, "validator")
    # featching the data from article
    url_name = request.forms.get('url_name')
    article_data = request.forms.get('article_data')
    title = request.forms.get('title')
    description = request.forms.get('description')
    keywords = request.forms.get('keywords')

    #New Web Form
    new_post = url_name.replace(" ", "-")+".html"
    
    #load the template
    util.jinja_render_file(web_dir, "template_render.html", new_post, {"title": title, "content": article_data, "description": description, "keywords": keywords})
    
    #Save the template
    from fabric.operations import local
    git_commit_path = local("git add -A && git commit -m \"Added New Article\"")
    if git_commit_path.succeeded:
        print(git_commit_path.return_code)
    
    return redirect("file_share_util.html")
    
    
@error(404)
def error404(error):
    return 'Nothing here, sorry'

@post("/encode-decode")
def encode_decode():
    # type and get the data for encodeing or decoding
    encoding_type = request.forms.get('encoding_type')
    type_of_selection = request.forms.get('type')    
    #implementation code changes
    if type_of_selection == "encode":
        encode_data = request.forms.get('encode')
        print(util.encoding(encode_data, encoding_type))
        return {"content": util.encoding(encode_data, encoding_type)}
    elif type_of_selection == "decode":
        decode_data = request.forms.get('decode')
        return {"content": util.decoding(decode_data, encoding_type)}