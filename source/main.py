from bottle import hook, route, response, run, default_app, request, Bottle
from upload import file_upload
import sys
from bottle import static_file
import os
from datetime import datetime
from functools import wraps
import logging

logger = logging.getLogger()

# set up the logger
logger.setLevel(logging.INFO)
file_handler = logging.FileHandler('C:\inforbc\myapp.log')
formatter = logging.Formatter('%(msg)s')
file_handler.setLevel(logging.INFO)
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

def log_to_logger(fn):
    '''
    Wrap a Bottle request so that a log line is emitted after it's handled.
    (This decorator can be extended to take the desired logger as a param.)
    '''
    @wraps(fn)
    def _log_to_logger(*args, **kwargs):
        request_time = datetime.now()
        actual_response = fn(*args, **kwargs)
        # modify this to log exactly what you need:
        logger.info('%s %s %s %s %s' % (request.remote_addr,
                                        request_time,
                                        request.method,
                                        request.url,
                                        response.status))
        return actual_response
    return _log_to_logger

app = application = default_app()
 

dir_path = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir, "validator"))
download_path = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir, os.pardir, "fileshare_temp"))

_allow_origin = '*'
_allow_methods = 'PUT, GET, POST, DELETE, OPTIONS'
_allow_headers = 'Authorization, Origin, Accept, Content-Type, X-Requested-With'
 
if not os.path.exists(os.path.dirname(download_path)):
    os.makedirs(os.path.dirname(download_path))
    
#adding global variables
app.install(log_to_logger)
app.config['file_save_path']    = download_path 
app.config['web_files']    = dir_path


 
@route('/<filepath:path>')
def server_static(filepath):
    print(filepath)
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