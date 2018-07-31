# import bottle
# from bottle import route, run
# 
# @route('/index')
# def index():
#     return '<h1>Hello Bottle!</h1>'
# 
# 
# app = bottle.default_app()
# 
# # import wsgiserver
# # from cgi import parse_qs, escape
# # 
# # def hello_world(environ, start_response):
# #     parameters = parse_qs(environ.get('QUERY_STRING', ''))
# #     if 'subject' in parameters:
# #         subject = escape(parameters['subject'][0])
# #     else:
# #         subject = 'World'
# #     start_response('200 OK', [('Content-Type', 'text/html')])
# #     return ['''Hello %(subject)s Hello %(subject)s!''']
# 
# if __name__ == '__main__':
#     from wsgiref.simple_server import make_server
#     srv = make_server('localhost', 8090, app)
#     srv.serve_forever()