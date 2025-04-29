from django.apps import AppConfig


class OldtopicConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'oldtopic'

    def ready(self):
        import oldtopic.signals
