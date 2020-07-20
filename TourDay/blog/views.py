from django.shortcuts import render, redirect
from blog.forms import blogPostForm
from django.contrib.auth.decorators import login_required
from blog.models import blogPost

# Create your views here.
def search(request):
    return render(request,'blog/search.html')

def home(request):

    allpost = blogPost.objects.all().order_by('-id')
    

    return render(request,'blog/home.html', {'allpost' : allpost})

def details(request, id):

    details_obj = blogPost.objects.get(id = id)

    return render(request,'blog/details.html', {'details_obj' : details_obj})

@login_required
def addPost(request):
    
    if request.method == 'POST'  and 'blog_submit' in request.POST:
        form = blogPostForm(request.POST, request.FILES)
        if form.is_valid():
            post_item = form.save(commit=False)
            post_item.blog_user = request.user
            # info.user_id = request.user.id
            post_item.save()
            return redirect('blog_home')
           
    else:
        form = blogPostForm()
    return render(request,'blog/add_post.html', {'form':form})
