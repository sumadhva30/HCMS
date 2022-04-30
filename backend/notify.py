import os
import smtplib

def notify_user(rec, sub: str, body: str):
    EMAIL_ADDRESS = os.environ['EMAIL_ADDRESS']
    EMAIL_PASSWORD = os.environ['EMAIL_PASSWORD']

    with smtplib.SMTP('smtp.gmail.com',587) as smtp:
        smtp.ehlo()
        smtp.starttls()
        smtp.ehlo()

        smtp.login(EMAIL_ADDRESS,EMAIL_PASSWORD)

        subject = sub
        bod = body

        msg = f'Subject: {subject}\n\n{bod}'
        print(rec)
        smtp.sendmail(EMAIL_ADDRESS,rec,msg)

def generate_email(notif_type, subject, message, sender=None):
    if notif_type == "create":
        sub = "Incident Creation and Assignment"
        msg = f"Incident <{subject}> has been created and assigned.\n\n\
            {message}"
    elif notif_type == "message":
        sub = "New Message in Incident"
        msg = f"Incident <{subject}> has been updated.\n\n\
            Sender: {sender}\n\
            Message: {message}"
    elif notif_type == "note":
        sub = "New Note in Incident"
        msg = f"Incident <{subject}> has been updated.\n\n\
            Sender: {sender}\n\
            Note: {message}"
    return sub, msg
