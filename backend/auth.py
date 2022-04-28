from http import HTTPStatus
import sys
from fastapi import HTTPException, Request, Response
from starlette.responses import RedirectResponse
from dbaccess import database

def my_email(request: Request) -> str:
    try:
        return request.session['email']
    except KeyError:
        raise HTTPException(status_code=HTTPStatus.UNAUTHORIZED, detail='Not logged in.')

def is_admin(request: Request) -> bool:
    #database.admins schema:
    #{email: abc@example.com}
    return 0 != database['Admins'].count_documents({'email': my_email(request)})

def is_responder(request: Request) -> bool:
    return 0 != database['Responders'].count_documents({'_id': my_email(request)})

def is_student(request: Request) -> bool:
    return not (is_admin(request) or is_responder(request))

def only_admin(request: Request) -> bool:
    if not is_admin(request):
        raise HTTPException(status_code=HTTPStatus.FORBIDDEN, detail='Not an admin')

def atleast_responder(request: Request) -> bool:
    if is_student(request):
        raise HTTPException(status_code=HTTPStatus.FORBIDDEN, detail='Not for students')

def google_landing(token, request: Request) -> Response:
    from google.oauth2 import id_token
    from google.auth.transport import requests
    CLIENT_ID = '514647942452-4j1gla2p1ekgtje0utsthn3ebn17eaf5.apps.googleusercontent.com'

    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
        domain = idinfo['hd']
        email = idinfo['email']
        name = idinfo['name']

        if domain != 'iith.ac.in':
            raise HTTPException(status_code=HTTPStatus.FORBIDDEN, detail='Sign in with IITH email.')

        request.session['email'] = email
        return RedirectResponse('http://localhost:3000/', status_code=HTTPStatus.FOUND)
    
    except ValueError:
        print(idinfo, file=sys.stderr)
        raise HTTPException(status_code=HTTPStatus.UNAUTHORIZED, detail='Could not Login')

def google_logout(request: Request) -> Response:
    request.session.pop('email', None)
    return RedirectResponse('http://localhost:3000/', status_code=HTTPStatus.FOUND)