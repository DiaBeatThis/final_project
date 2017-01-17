from .models import Profile
from django.contrib.auth.models import User
from django import forms

class UserForm(forms.ModelForm):

    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name')

    def __init__(self, *args, **kwargs):
         super(UserForm, self).__init__(*args, **kwargs)

    def save(self, commit=True):
        user = super(UserForm, self).save(commit=False)
        user.email = self.cleaned_data["email"]
        user.username = user.email
        if commit:
            user.save()
        return user


class UserUpdateForm(forms.ModelForm):

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name')

    def __init__(self, *args, **kwargs):
         super(UserUpdateForm, self).__init__(*args, **kwargs)

    def save(self, commit=True):
        user = super(UserUpdateForm, self).save(commit=False)
        user.email = self.cleaned_data["email"]
        user.username = user.email
        if commit:
            user.save()
        return user


class ProfileForm(forms.ModelForm):

    steps_goal = forms.IntegerField(required=False)
    water_goal = forms.IntegerField(required=False)

    class Meta:
        model = Profile
        fields = ('height', 'weight', 'sex', 'dob', 'race', 'avatar',
                    'steps_goal', 'water_goal')

    def clean_avatar(self):
        avatar = self.cleaned_data['avatar']
        try:
            main, sub = avatar.content_type.split('/')
            if not (main == 'image' and sub in ['jpeg', 'pjpeg', 'gif', 'png']):
                raise forms.ValidationError(u'Please use a JPEG, '
                    'GIF or PNG image.')
        except AttributeError:
            pass
        return avatar
