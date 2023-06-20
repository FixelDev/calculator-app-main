let selectedTheme = 'th1';

document.querySelectorAll('.theme-changeable').forEach(element =>
{
    element.classList.add(selectedTheme);
});

document.querySelectorAll('input[type=radio]').forEach(radioBtn =>
{
    radioBtn.addEventListener('input', () =>
    {
        changeTheme(radioBtn.value);
    });
});

function changeTheme(theme)
{
    document.querySelectorAll('.theme-changeable').forEach(element =>
    {
        element.classList.replace(selectedTheme, theme);        
    });

    selectedTheme = theme;
}