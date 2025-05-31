import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import app1.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'webrtc_project.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": URLRouter(app1.routing.websocket_urlpatterns),
})
