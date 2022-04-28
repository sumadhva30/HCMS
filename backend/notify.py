import os
import smtplib

def notify_user(rec, sub: str, body: str):
    EMAIL_ADDRESS = "vamshi.test1234@gmail.com"
    EMAIL_PASSWORD = "gxpokrpfarbvhugw"

    with smtplib.SMTP('smtp.gmail.com',587) as smtp:
        smtp.ehlo()
        smtp.starttls()
        smtp.ehlo()

        smtp.login(EMAIL_ADDRESS,EMAIL_PASSWORD)

        subject = sub
        bod = body

        msg = f'Subject: {subject}\n\n{bod}'
        smtp.sendmail(EMAIL_ADDRESS,rec,msg)


