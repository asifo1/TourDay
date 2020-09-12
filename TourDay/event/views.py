from django.shortcuts import render
from .models import Event, Transactions
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .serializer import EventSerializer
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from user_profile.models import Profile
from _auth.models import User
from django.contrib.auth.decorators import login_required


@login_required
@csrf_exempt
def dashboard(request):
    if request.method == "POST":
        event = Event()
        event.host = request.user
        event.title = request.POST.get('title')
        event.location = request.POST.get('location')
        event.date = request.POST.get('date')
        event.details = request.POST.get('details')
        event.pay1 = request.POST.get('pay1')
        event.pay2 = request.POST.get('pay2')
        event.pay1_method = request.POST.get('pay1_method')
        event.pay2_method = request.POST.get('pay2_method')
        event.save()
        return JsonResponse({'status': 200, "id": event.id})
    return render(request, 'event/dashboard.html')


class EventList(APIView, LimitOffsetPagination):
    permission_classes = [AllowAny]
    serializer_class = EventSerializer

    def get(self, request, *args, **kwargs):
        instance = Event.objects.filter(host=request.user).order_by("-date")
        # instance = Event.objects.all()
        instance = self.paginate_queryset(instance, request, view=self)
        serializer = self.serializer_class(instance, many=True)
        return self.get_paginated_response(serializer.data)


@csrf_exempt
def edit_event(request, id):
    if request.method == "POST":
        event = Event.objects.get(id=id)
        if request.user == event.host:
            event.title = request.POST.get('title').title()
            event.location = request.POST.get('location')
            event.date = request.POST.get('date')
            event.details = request.POST.get('details')
            event.pay1 = request.POST.get('pay1')
            event.pay2 = request.POST.get('pay2')
            event.pay1_method = request.POST.get('pay1_method')
            event.pay2_method = request.POST.get('pay2_method')
            if request.FILES.get("image") != None:
                event.image = request.FILES.get("image")
            event.save()
            return JsonResponse({'status': 200, "id": event.id})
    return JsonResponse({'status': 400})


def eventView(request, id):
    event = Event.objects.get(id=id)
    going = Profile.objects.filter(user__in=event.going.all())
    transaction = Transactions.objects.filter(user__in=event.pending.all())
    return render(request, 'event/event.html', {"event": event, "going": going, "transaction": transaction})


@csrf_exempt
def action(request, id):
    if request.method == "POST":
        event = Event.objects.get(id=id)
        is_accepted = request.POST.get("is_accepted")
        user = User.objects.get(id=request.POST.get("user_id"))
        tr = Transactions.objects.get(user=user)
        if is_accepted == "1":
            event.going.add(user)
            event.pending.remove(user)
            tr.status = True
            tr.save()
            profile = Profile.objects.get(user=user)
            context = {
                'status': 200,
                'img': profile.picture.url,
                "name": profile.name,
                "username": user.username,
                "email": user.email
            }
            return JsonResponse(context)
        elif is_accepted == "0":
            event.pending.remove(user)
            tr.delete()
            return JsonResponse({'status': 200})

    return JsonResponse({'status': 400})
