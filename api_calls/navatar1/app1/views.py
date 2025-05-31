from django.shortcuts import render,redirect
from .forms import AddUserForm
from .models import User, Company

def super_admin_dashboard(request):
    if request.method == 'POST':
        form = AddUserForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('super_admin_dashboard')
    else:
        form = AddUserForm()

    users = User.objects.select_related('company').all()
    return render(request, 'app1/admin.html', {
        'form': form,
        'users': users,
    })
