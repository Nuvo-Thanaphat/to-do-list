from django.views import generic, View
from django.shortcuts import get_object_or_404, redirect, render
import copy
from .models import List, Task
from .forms import ListForm, TaskForm, TaskStatusForm, TaskUpdateForm

class ListIndex(generic.edit.CreateView):
    model = List
    fields = ["name"]

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the to-do lists
        context['lists'] = List.objects.all().order_by('-created_at')
        return context

class ListDetailView(View):
    template_name = 'list_management/list_detail.html'

    def get_context_data(self, list_obj, **kwargs):
        context = {
            'list': list_obj,
            'tasks': Task.objects.filter(list=list_obj).order_by('-created_at'),
            'list_form': kwargs.get('list_form', ListForm(instance=list_obj)),
            'task_form': kwargs.get('task_form', TaskForm()),
        }
        
        # Add task update and status forms
        context['task_update_forms'] = {
            task.id: TaskUpdateForm(instance=task) 
            for task in context['tasks']
        }
        context['task_status_forms'] = {
            task.id: TaskStatusForm(instance=task) 
            for task in context['tasks']
        }
        
        return context
    
    def get(self, request, pk):
        list_obj = get_object_or_404(List, pk=pk)
        context = self.get_context_data(list_obj)
        return render(request, self.template_name, context)

    def post(self, request, pk):
        list_obj = get_object_or_404(List, pk=pk)

        if 'update_list_name' in request.POST:
            # Create a shallow copy of list_obj before any changes
            original_list = copy.copy(list_obj)
            list_form = ListForm(request.POST, instance=list_obj)
            if list_form.is_valid():
                list_form.save()
                return redirect('list_management:list-detail', pk=pk)
            else:
                context = self.get_context_data(original_list, list_form=list_form)
                return render(request, self.template_name, context)

        elif 'delete_list' in request.POST:
            list_obj.delete()
            return redirect('list_management:index')

        elif 'add_task' in request.POST:
            task_form = TaskForm(request.POST)
            if task_form.is_valid():
                task = task_form.save(commit=False)
                task.list = list_obj
                task.save()
                return redirect('list_management:list-detail', pk=pk)
            else:
                context = self.get_context_data(list_obj, task_form=task_form)
                return render(request, self.template_name, context)

        elif 'update_task_status' in request.POST:
            task_id = request.POST.get('task_id')
            task = get_object_or_404(Task, id=task_id, list=list_obj)
            form = TaskStatusForm(request.POST, instance=task)
            form.save()
            return redirect('list_management:list-detail', pk=pk)

        elif 'update_task' in request.POST:
            task_id = request.POST.get('task_id')
            task = get_object_or_404(Task, id=task_id, list=list_obj)
            form = TaskUpdateForm(request.POST, instance=task)
            if form.is_valid():
                form.save()
                return redirect('list_management:list-detail', pk=pk)
            else:
                # Create a dict of task update forms with the invalid form included
                task_update_forms = {
                    t.id: (TaskUpdateForm(instance=t) if t.id != task.id else form)
                    for t in Task.objects.filter(list=list_obj)
                }
                context = self.get_context_data(list_obj)
                context['task_update_forms'] = task_update_forms
                return render(request, self.template_name, context)

        elif 'delete_task' in request.POST:
            task_id = request.POST.get('task_id')
            task = get_object_or_404(Task, id=task_id, list=list_obj)
            task.delete()
            return redirect('list_management:list-detail', pk=pk)

        return redirect('list_management:list-detail', pk=pk)
