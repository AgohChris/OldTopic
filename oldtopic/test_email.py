from django.core.mail import send_mail

send_mail(
    subject='Test Email',
    message='Ceci est un test d\'envoi d\'email depuis Django.',
    from_email='agohchris90@gmail.com',
    recipient_list=['agihchris90@gmail.com'],
    fail_silently=False,
)