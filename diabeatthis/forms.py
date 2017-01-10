from .models import Profile
from django.contrib.auth.models import User
from django import forms
from django.forms import extras
from django.core.files.images import get_image_dimensions

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
    # dob = forms.DateField(widget=extras.SelectDateWidget(years=range(1920, 2017)))
    steps_goal = forms.IntegerField(required=False)
    water_goal = forms.IntegerField(required=False)


    class Meta:
        model = Profile
        fields = ('height', 'weight', 'sex', 'dob', 'race', 'avatar',
                    'steps_goal', 'water_goal')

    def clean_avatar(self):
        avatar = self.cleaned_data['avatar']

        try:
            # w, h = get_image_dimensions(avatar)
            #
            # #validate dimensions
            # max_width = max_height = 100
            # if w > max_width or h > max_height:
            #     raise forms.ValidationError(
            #         u'Please use an image that is '
            #          '%s x %s pixels or smaller.' % (max_width, max_height))
            #
            # #validate content type
            main, sub = avatar.content_type.split('/')
            if not (main == 'image' and sub in ['jpeg', 'pjpeg', 'gif', 'png']):
                raise forms.ValidationError(u'Please use a JPEG, '
                    'GIF or PNG image.')
            #
            # #validate file size
            # if len(avatar) > (20 * 1024):
            #     raise forms.ValidationError(
            #         u'Avatar file size may not exceed 20k.')

        except AttributeError:
            """
            Handles case when we are updating the user profile
            and do not supply a new avatar
            """
            pass

        return avatar
