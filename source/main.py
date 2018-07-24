from bottle import hook, route, response, run, default_app
from upload import file_upload
import sys

app = application = default_app()


_allow_origin = '*'
_allow_methods = 'PUT, GET, POST, DELETE, OPTIONS'
_allow_headers = 'Authorization, Origin, Accept, Content-Type, X-Requested-With'

app.config['file_save_path']    = "C:\\Infor\\file_save_folder\\" 

@hook('after_request')
def enable_cors():
    '''Add headers to enable CORS'''

    response.headers['Access-Control-Allow-Origin'] = _allow_origin
    response.headers['Access-Control-Allow-Methods'] = _allow_methods
    response.headers['Access-Control-Allow-Headers'] = _allow_headers




if __name__ == '__main__':
#     app.run(server='cgi')
#     app.run(host = '127.0.0.1', port = 8000)
    run(app)