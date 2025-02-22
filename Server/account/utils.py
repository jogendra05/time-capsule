# from django.core.mail import EmailMessage
# import os

# class Util:
#   @staticmethod
#   def send_email(data):
#     email = EmailMessage(
#       subject=data['subject'],
#       body=data['body'],
#       from_email=os.environ.get('EMAIL_FROM'),
#       to=[data['to_email']]
#     )
#     email.send()

# from django.core.mail import EmailMessage
# import smtplib
# import os

# class Util:
#     @staticmethod
#     def send_email(data):
#         email = EmailMessage(
#             subject=data['subject'],
#             body=data['body'],
#             from_email=os.environ.get('EMAIL_FROM'),
#             to=[data['to_email']]
#         )
#         try:
#             # Ensure no extra parameters in starttls()
#             email.connection = email.get_connection()
#             email.connection.open()
#             email.connection.starttls()  # No extra arguments
#             email.send()
#             email.connection.close()
#         except smtplib.SMTPException as e:
#             print(f"SMTP error: {e}")


from django.core.mail import EmailMessage
import os

class Util:
    @staticmethod
    def send_email(data):
        email = EmailMessage(
            subject=data['subject'],
            body=data['body'],
            from_email=os.environ.get('EMAIL_FROM'),
            to=[data['to_email']]
        )
        try:
            email.send(fail_silently=False)  # Let Django handle exceptions
            print("Email sent successfully.")
        except Exception as e:
            print(f"Email sending failed: {e}")
