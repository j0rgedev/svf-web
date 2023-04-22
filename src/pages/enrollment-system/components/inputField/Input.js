export default function showPassword(){
    var character = document.getElementsByClassName("input-field")
    if (character.type == 'password') {
        character.type = 'text';
    }else{
        character.type='password';
    }
}