from bottle import hook, route, response, run, default_app, request
from upload import file_upload
import sys
from bottle import static_file
import os

app = application = default_app()
 

dir_path = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir, "validator"))
download_path = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir, os.pardir, "fileshare_temp"))

_allow_origin = '*'
_allow_methods = 'PUT, GET, POST, DELETE, OPTIONS'
_allow_headers = 'Authorization, Origin, Accept, Content-Type, X-Requested-With'
 
if not os.path.exists(os.path.dirname(download_path)):
    os.makedirs(os.path.dirname(download_path))
    
app.config['file_save_path']    = download_path 
app.config['web_files']    = dir_path
 
 
@route('/<filepath:path>')
def server_static(filepath):
    print filepath
    return static_file(filepath, root=request.app.config['web_files'])
 
@hook('after_request')
def enable_cors():
    '''Add headers to enable CORS'''
 
    response.headers['Access-Control-Allow-Origin'] = _allow_origin
    response.headers['Access-Control-Allow-Methods'] = _allow_methods
    response.headers['Access-Control-Allow-Headers'] = _allow_headers
 
 
 
 
if __name__ == '__main__':
#     app.run(server='cgi')
#     app.run(host = '127.0.0.1', port = 8000)
#     print(dir_path)
    run(app)
# print(download_path)